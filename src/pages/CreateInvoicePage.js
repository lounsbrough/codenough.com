import React from 'react';
import netlifyIdentity from 'netlify-identity-widget';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import moment from 'moment';

import * as clockifyApi from '../services/clockify-api';
import * as waveApi from '../services/wave-api';

class CreateInvoicePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            clockify: {
                workspaces: [],
                clients: [],
                tags: []
            },
            wave: {
                businesses: [],
                customers: [],
                products: []
            }
        };
    }

    async componentDidMount() {
        await this.loadClockifyCurrentUser();
        await this.loadClockifyWorkspaces();
        await this.loadWaveBusinesses();
    }

    setStateAsync = (newState) => new Promise((resolve) => this.setState(newState, resolve));

    async setClockifyState(state) {
        await this.setStateAsync({
            clockify: {
                ...this.state.clockify,
                ...state
            }
        });
    }

    async setWaveState(state) {
        await this.setStateAsync({
            wave: {
                ...this.state.wave,
                ...state
            }
        });
    }

    async loadClockifyCurrentUser() {
        const { id: currentUserId } = await clockifyApi.getCurrentUser();

        await this.setClockifyState({ currentUserId });
    }

    async loadClockifyWorkspaces() {
        const workspaces = await clockifyApi.getWorkspaces();

        await this.setClockifyState({ workspaces });
    }

    async loadClockifyClients() {
        const clients = await clockifyApi.getClients(this.state.clockify.workspaceId);

        await this.setClockifyState({ clients });
    }

    async loadClockifyTags() {
        const tags = await clockifyApi.getTags(this.state.clockify.workspaceId);

        await this.setClockifyState({ tags });
    }

    async loadWaveBusinesses() {
        const businesses = await waveApi.getBusinesses();

        await this.setWaveState({ businesses });
    }

    async loadWaveCustomers() {
        const customers = await waveApi.getCustomers(this.state.wave.businessId);

        await this.setWaveState({ customers });
    }

    async loadWaveProducts() {
        const products = await waveApi.getProducts(this.state.wave.businessId);

        await this.setWaveState({ products });
    }

    async clockifyWorkspaceChanged(workspaceId) {
        await this.setClockifyState({
            workspaceId,
            clients: [],
            tags: []
        });

        if (workspaceId) {
            this.loadClockifyClients();
            this.loadClockifyTags();
        }
    }

    async clockifyClientChanged(clientId) {
        await this.setClockifyState({ clientId });
    }

    async clockifyStartDateChanged(startDate) {
        await this.setClockifyState({ startDate });
    }

    async clockifyEndDateChanged(endDate) {
        await this.setClockifyState({ endDate });
    }

    async waveBusinessChanged(businessId) {
        await this.setWaveState({
            businessId,
            customers: [],
            products: []
        });

        if (businessId) {
            this.loadWaveCustomers();
            this.loadWaveProducts();
        }
    }

    async waveCustomerChanged(customerId) {
        await this.setWaveState({ customerId });
    }

    async waveProductChanged(productId) {
        await this.setWaveState({ productId });
    }

    addTotalHours(timeEntries) {
        return timeEntries.map((entry) => ({
            ...entry,
            totalHours: Number(moment(entry.timeInterval.end).diff(moment(entry.timeInterval.start), 'hours', true).toFixed(3))
        }));
    }

    filterToSelectedClient(timeEntries) {
        return timeEntries.filter((entry) => entry.project.clientId === this.state.clockify.clientId);
    }

    removeNonBillableAndBilled(timeEntries) {
        const billedTag = this.getBilledTag();

        return timeEntries.filter((entry) => entry.billable && !entry.tags.some((tag) => tag.id === billedTag.id));
    }

    getBilledTag() {
        return this.state.clockify.tags.find((tag) => tag.name.toLowerCase() === 'billed');
    }

    async markTimeEntriesAsBilled(timeEntries) {
        await Promise.all(
            timeEntries.map((entry) => clockifyApi.addTagToTimeEntry(this.state.clockify.workspaceId, entry.id, this.getBilledTag().id))
        );
    }

    async getTimeEntries() {
        const { workspaceId, currentUserId, startDate, endDate } = this.state.clockify;

        let timeEntries = await clockifyApi.getTimeEntries(workspaceId, currentUserId, startDate, endDate, true);

        timeEntries = this.addTotalHours(timeEntries);
        timeEntries = this.filterToSelectedClient(timeEntries);
        timeEntries = this.removeNonBillableAndBilled(timeEntries);

        const { businessId, customerId, productId } = this.state.wave;

        const invoiceItems = timeEntries.map((entry) => ({
            description: entry.description,
            quantity: entry.totalHours,
            productId
        }));

        await waveApi.createInvoice(businessId, customerId, invoiceItems);

        await this.markTimeEntriesAsBilled(timeEntries);
    }

    async submitForm(event) {
        event.preventDefault();
        event.stopPropagation();

        this.getTimeEntries();
    }

    render() {
        const user = netlifyIdentity.currentUser();

        console.log({ user });

        return (
            <div>
                <Form
                    onSubmit={(event) => this.submitForm(event)}
                >

                    <h4>{'Set Clockify Parameters'}</h4>

                    <FormGroup>
                        <Input
                            type="select"
                            onChange={(event) => this.clockifyWorkspaceChanged(event.target.value)}
                        >
                            <option value="">{'Select a workspace'}</option>
                            {this.state.clockify.workspaces.map((workspace) =>
                                <option
                                    key={workspace.id}
                                    value={workspace.id}
                                >
                                    {workspace.name}
                                </option>
                            )}
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Input
                            type="select"
                            onChange={(event) => this.clockifyClientChanged(event.target.value)}
                        >
                            <option>{'Select a client'}</option>
                            {this.state.clockify.clients.map((client) =>
                                <option
                                    key={client.id}
                                    value={client.id}
                                >
                                    {client.name}
                                </option>
                            )}
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label>Start Date</Label>
                        <Input
                            type="date"
                            onChange={(event) => this.clockifyStartDateChanged(event.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>End Date</Label>
                        <Input
                            type="date"
                            onChange={(event) => this.clockifyEndDateChanged(event.target.value)}
                        />
                    </FormGroup>

                    <h4>{'Set Wave Parameters'}</h4>

                    <FormGroup>
                        <Input
                            type="select"
                            onChange={(event) => this.waveBusinessChanged(event.target.value)}
                        >
                            <option>{'Select a business'}</option>
                            {this.state.wave.businesses.map((business) =>
                                <option
                                    key={business.id}
                                    value={business.id}
                                >
                                    {business.name}
                                </option>
                            )}
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Input
                            type="select"
                            onChange={(event) => this.waveCustomerChanged(event.target.value)}
                        >
                            <option>{'Select a customer'}</option>
                            {this.state.wave.customers.map((customer) =>
                                <option
                                    key={customer.id}
                                    value={customer.id}
                                >
                                    {customer.name}
                                </option>
                            )}
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Input
                            type="select"
                            onChange={(event) => this.waveProductChanged(event.target.value)}
                        >
                            <option>{'Select a product'}</option>
                            {this.state.wave.products.map((product) =>
                                <option
                                    key={product.id}
                                    value={product.id}
                                >
                                    {product.name}
                                </option>
                            )}
                        </Input>
                    </FormGroup>

                    <Button color="primary">Process Invoice</Button>
                </Form>
            </div>
        );
    }
}

export default CreateInvoicePage;