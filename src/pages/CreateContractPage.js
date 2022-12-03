import React, {useEffect, useState} from 'react';
import {Button, Col, Container, FormGroup, Input, Label, Row} from 'reactstrap';
import Logo from '../components/logo/Logo';

const contractorName = 'CODENOUGH LLC';
const contractorOfficerName = 'David Lounsbrough';
const contractorEmail = 'contracts@codenough.com';
const contractorAddress = '3006 NE 17th St, Ankeny, IA 50021, USA';

const documentTitle = `${contractorName} Contract Agreement`;

const getNumberWithSuffix = (i) => {
    var j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        return i + "st";
    }
    if (j === 2 && k !== 12) {
        return i + "nd";
    }
    if (j === 3 && k !== 13) {
        return i + "rd";
    }
    return i + "th";
};

const getFormalDate = (date) =>
    `${getNumberWithSuffix(date.getDate())} day of ${date.toLocaleString('default', {month: 'long'})}, ${date.getFullYear()}`

function CreateContractPage() {
    const [clientName, setClientName] = useState('');
    const [clientAddress, setClientAddress] = useState('');

    useEffect(() => {
        document.title = documentTitle;
    }, []);

    const printButtonEnabled = clientName && clientAddress;

    const currentDate = new Date();

    return (
        <>
            <div className="no-print" style={{paddingTop: '50px', paddingLeft: '20%', paddingRight: '20%'}}>
                <h5 className='contract-section-heading'>
                    Here's what you need to do to start a contract:
                </h5>
                <ol>
                    <li>Fill out the form below</li>
                    <li>Print and sign the form
                        <ul>
                            <li>Print as PDF and sign digitally, or print on paper and scan</li>
                        </ul>
                    </li>
                    <li>Return signed form to <a target="_blank " href={`mailto: ${contractorEmail}`} rel="noreferrer">{contractorEmail}</a></li>
                </ol>
                <FormGroup>
                    <Label for="clientName">Client Name</Label>
                    <Input required name="clientName" value={clientName} onChange={(event) => setClientName(event.target.value)} />
                    <br />
                    <Label for="clientAddress">Client Address</Label>
                    <Input required name="clientAddress" value={clientAddress} onChange={(event) => setClientAddress(event.target.value)} />
                    <br />
                    <Button
                        color='primary'
                        onClick={() => window.print()}
                        disabled={!printButtonEnabled}
                    >
                        Print Contract
                    </Button>
                    {!printButtonEnabled && <span style={{marginLeft: '20px', fontStyle: 'italic'}}>please fill out all fields before printing</span>}
                </FormGroup>
            </div>
            <div className="only-print">
                <div data-exp="simple2" >
                    <h1>
                        <Logo format="fill" height={50} width={50} />
                        <span style={{marginLeft: '20px', verticalAlign: 'middle'}}>{documentTitle}</span>
                    </h1>
                    <p><strong>THIS INDEPENDENT CONTRACTOR AGREEMENT (the "Agreement") is dated this {getFormalDate(currentDate)}.</strong>
                    </p>
                    <Container>
                        <Row>
                            <Col xs={6} className="bg-light border">
                                <h2>
                                    Client
                                </h2>
                                <div>
                                    <span>{clientName}</span>
                                    <br />
                                    <span>{clientAddress}</span>
                                </div><span>(the "Client")</span>
                            </Col>
                            <Col xs={6} className="bg-light border">
                                <h2>
                                    Contractor
                                </h2>
                                <div>
                                    <span>{contractorName}</span>
                                    <br />
                                    <span>{contractorAddress}</span>
                                </div><span>(the "Contractor")</span>
                            </Col>
                        </Row>
                    </Container>
                    <ol start="1" >
                        <h5 className='contract-section-heading'><span>BACKGROUND</span><br />
                        </h5>
                        <li value="1"><span>The</span> Client is of the opinion that the Contractor has the necessary
                            qualifications, experience and abilities to provide services to the Client.<br />
                        </li>
                        <li value="2"><span>The</span> Contractor is agreeable to providing such services to the Client on
                            the terms and conditions set out in this Agreement.<br />
                        </li>
                    </ol>
                    <div>
                        <p><strong>IN CONSIDERATION OF</strong> the matters described above and of the
                            mutual benefits and obligations set forth in this Agreement, the receipt and sufficiency of
                            which consideration is hereby acknowledged, the Client and the Contractor (individually the
                            "Party" and collectively the "Parties" to this Agreement) agree as follows:
                        </p>
                        <ol start="1">
                            <h5 className='contract-section-heading'><span>SERVICES PROVIDED</span><br />
                            </h5>
                            <li value="1"><span>The</span> Client hereby agrees to engage the Contractor to provide the
                                Client with the following services (the "Services"):<br />
                                <ul>
                                    <li value="1"><span>Build, maintain, or support software products.</span><br />
                                    </li>
                                </ul>
                            </li>
                            <li value="2"><span>The Services will also include any other</span> tasks which the Parties may
                                agree on. The Contractor hereby agrees to provide such Services to the Client.<br />
                            </li>
                            <h5 className='contract-section-heading'><span>TERM OF </span><strong><u>
                            </u></strong><strong><u>AGREEMENT</u></strong><br />
                            </h5>
                            <li value="3"><span>The term of this</span> Agreement (the "Term") will begin on the date of
                                this Agreement and will remain in full force and effect indefinitely until terminated as
                                provided in this Agreement.<br />
                            </li>
                            <li value="4"><span>In the event that either Party wishes to terminate this</span> Agreement,
                                that Party will be required to provide 10 days' written notice to the other Party.<br />
                            </li>
                            <li value="5"><span>In the event that either Party breaches a material provision under
                                this</span> Agreement, the non-defaulting Party may terminate this Agreement immediately
                                and require the defaulting Party to indemnify the non-defaulting Party against all
                                reasonable damages. <br />
                            </li>
                            <li value="6"><span>This</span> Agreement may be terminated at any time by mutual agreement of
                                the Parties.<br />
                            </li>
                            <li value="7"><span>Except as otherwise provided in this</span> Agreement, the obligations of
                                the Contractor will end upon the termination of this Agreement.<br />
                            </li>
                            <h5 className='contract-section-heading'><span>PERFORMANCE</span><br />
                            </h5>
                            <li value="8"><span>The Parties agree to do everything necessary to ensure that the terms of
                                this</span> Agreement take effect.<br />
                            </li>
                            <h5 className='contract-section-heading'><span>CURRENCY</span><br />
                            </h5>
                            <li value="9"><span>Except as otherwise provided in this</span> Agreement, all monetary amounts
                                referred to in this Agreement are in USD (US Dollars).<br />
                            </li>
                            <h5 className='contract-section-heading'><span>COMPENSATION</span><br />
                            </h5>
                            <li value="10"><span>The</span> Contractor will charge the Client for the Services at the rate
                                of $100.00 per hour (the "Compensation").<br />
                            </li>
                            <li value="11"><span>The Client will be invoiced every month.</span><br />
                            </li>
                            <li value="12"><span>Invoices submitted by the Contractor to the Client are due within 30 days
                                of receipt.</span><br />
                            </li>
                            <li value="13"><span>The Contractor will not be reimbursed for any expenses incurred in
                                connection with providing the Services of this Agreement.</span><br />
                            </li>
                            <h5 className='contract-section-heading'><span>INTEREST ON LATE PAYMENTS</span><br />
                            </h5>
                            <li value="14"><span>Interest payable on any overdue amounts under this Agreement is charged at
                                a rate of 12.00% per annum or at the maximum rate enforceable under applicable
                                legislation, whichever is lower.</span><br />
                            </li>
                            <h5 className='contract-section-heading'><span>CONFIDENTIALITY</span><br />
                            </h5>
                            <li value="15"><span>Confidential information (the "Confidential Information") refers to any
                                data or information relating to the business of the Client which would reasonably be
                                considered to be proprietary to the Client including, but not limited to, accounting
                                records, business processes, and client records and that is not generally known in the
                                industry of the Client and where the release of that Confidential Information could
                                reasonably be expected to cause harm to the Client.</span><br />
                            </li>
                            <li value="16"><span>The Contractor agrees that they will not disclose, divulge, reveal, report
                                or use, for any purpose, any Confidential Information which the Contractor has obtained,
                                except as authorized by the Client or as required by law. The obligations of
                                confidentiality will apply during the Term and will survive indefinitely upon
                                termination of this Agreement.</span><br />
                            </li>
                            <h5 className='contract-section-heading'><span>OWNERSHIP OF INTELLECTUAL PROPERTY</span><br />
                            </h5>
                            <li value="17"><span>All</span> intellectual property and related material, including any trade
                                secrets, moral rights, goodwill, relevant registrations or applications for registration,
                                and rights in any patent, copyright, trademark, trade dress, industrial design and trade
                                name (the "Intellectual Property") that is developed or produced under this Agreement, is a
                                "work made for hire" and will be the sole property of the Client. The use of the
                                Intellectual Property by the Client will not be restricted in any manner.<br />
                            </li>
                            <li value="18"><span>The</span> Contractor may not use the Intellectual Property for any purpose
                                other than that contracted for in this Agreement except with the written consent of the
                                Client. The Contractor will be responsible for any and all damages resulting from the
                                unauthorized use of the Intellectual Property.<br />
                            </li>
                            <h5 className='contract-section-heading'><span>RETURN OF PROPERTY</span><br />
                            </h5>
                            <li value="19"><span>Upon the expiration or termination of this</span> Agreement, the Contractor
                                will return to the Client any property, documentation, records, or Confidential Information
                                which is the property of the Client.<br />
                            </li>
                            <h5 className='contract-section-heading'><span>CAPACITY/INDEPENDENT CONTRACTOR</span><br />
                            </h5>
                            <li value="20"><span>In providing the Services under this</span> Agreement it is expressly
                                agreed that the Contractor is acting as an independent contractor and not as an employee.
                                The Contractor and the Client acknowledge that this Agreement does not create a partnership
                                or joint venture between them, and is exclusively a contract for service. The Client is not
                                required to pay, or make any contributions to, any social security, local, state or federal
                                tax, unemployment compensation, workers' compensation, insurance premium, profit-sharing,
                                pension or any other employee benefit for the Contractor during the Term. The Contractor is
                                responsible for paying, and complying with reporting requirements for, all local, state and
                                federal taxes related to payments made to the Contractor under this Agreement.<br />
                            </li>
                            <h5 className='contract-section-heading'><span>RIGHT OF SUBSTITUTION</span><br />
                            </h5>
                            <li value="21"><span>Except as otherwise provided in this Agreement, the Contractor may, at the
                                Contractor's absolute discretion, engage a third party sub-contractor to perform some or
                                all of the obligations of the Contractor under this Agreement and the Client will not
                                hire or engage any third parties to assist with the provision of the Services.
                            </span><br />
                            </li>
                            <li value="22"><span>In the event that the Contractor hires a sub-contractor:</span><br />
                                <ul>
                                    <li value="1"><span>the Contractor will pay the sub-contractor for its services and the
                                        Compensation will remain payable by the Client to the Contractor.</span><br />
                                    </li>
                                    <li value="2"><span>for the purposes of the indemnification clause of this Agreement,
                                        the sub-contractor is an agent of the Contractor.</span><br />
                                    </li>
                                </ul>
                            </li>
                            <h5 className='contract-section-heading'><span>AUTONOMY</span><br />
                            </h5>
                            <li value="23"><span>Except as otherwise provided in this Agreement, the Contractor will have
                                full control over working time, methods, and decision making in relation to provision of
                                the Services in accordance with the Agreement. The Contractor will work autonomously and
                                not at the direction of the Client. However, the Contractor will be responsive to the
                                reasonable needs and concerns of the Client. </span><br />
                            </li>
                            <h5 className='contract-section-heading'><span>EQUIPMENT</span><br />
                            </h5>
                            <li value="24"><span>Except as otherwise provided in this Agreement, the Contractor will provide
                                at the Contractor's own expense, any and all tools, machinery, equipment, raw materials,
                                supplies, workwear and any other items or parts necessary to deliver the Services in
                                accordance with the Agreement.</span><br />
                            </li>
                            <h5 className='contract-section-heading'><span>NO EXCLUSIVITY</span><br />
                            </h5>
                            <li value="25"><span>The Parties acknowledge that this Agreement is non-exclusive and that
                                either Party will be free, during and after the Term, to engage or contract with third
                                parties for the provision of services similar to the Services.</span><br />
                            </li>
                            <h5 className='contract-section-heading'><span>NOTICE</span><br />
                            </h5>
                            <li value="26"><span>All notices, requests, demands or other communications required or
                                permitted by the terms of this</span> Agreement will be given in writing and delivered
                                to the Parties at the following addresses: <br />
                                <ol start="1">
                                    <li value="1"><span>{clientName}</span><br />{clientAddress}<br />
                                    </li>
                                    <li value="2"><span>{contractorName}</span><br />{contractorAddress}<br />
                                    </li>
                                </ol>
                                <p>or to such other address as either Party may from time to time notify the other, and will
                                    be deemed to be properly delivered (a) immediately upon being served personally, (b) two
                                    days after being deposited with the postal service if served by registered mail, or (c)
                                    the following day after being deposited with an overnight courier.
                                </p>
                            </li>
                            <h5 className='contract-section-heading'><span>INDEMNIFICATION</span><br />
                            </h5>
                            <li value="27"><span>Except to the extent paid in settlement from any applicable insurance
                                policies, and to the extent permitted by applicable law, each Party agrees to indemnify
                                and hold harmless the other Party, and its respective</span> directors, shareholders,
                                affiliates, officers, agents, employees, and permitted successors and assigns against any
                                and all claims, losses, damages, liabilities, penalties, punitive damages, expenses,
                                reasonable legal fees and costs of any kind or amount whatsoever, which result from or arise
                                out of any act or omission of the indemnifying party, its respective directors,
                                shareholders, affiliates, officers, agents, employees, and permitted successors and assigns
                                that occurs in connection with this Agreement. This indemnification will survive the
                                termination of this Agreement.<br />
                            </li>
                            <h5 className='contract-section-heading'><span>MODIFICATION OF </span><strong><u>
                            </u></strong><strong><u>AGREEMENT</u></strong><br />
                            </h5>
                            <li value="28"><span>Any amendment or modification of this</span> Agreement or additional
                                obligation assumed by either Party in connection with this Agreement will only be binding if
                                evidenced in writing signed by each Party or an authorized representative of each Party.<br />
                            </li>
                            <h5 className='contract-section-heading'><span>TIME OF THE ESSENCE</span><br />
                            </h5>
                            <li value="29"><span>Time is of the essence in this</span> Agreement. No extension or variation
                                of this Agreement will operate as a waiver of this provision.<br />
                            </li>
                            <h5 className='contract-section-heading'><span>ASSIGNMENT</span><br />
                            </h5>
                            <li value="30"><span>The</span> Contractor will not voluntarily, or by operation of law, assign
                                or otherwise transfer its obligations under this Agreement without the prior written consent
                                of the Client.<br />
                            </li>
                            <h5 className='contract-section-heading'><span>ENTIRE AGREEMENT</span><br />
                            </h5>
                            <li value="31"><span>It is agreed that there is no representation, warranty, collateral
                                agreement or condition affecting this</span> Agreement except as expressly provided in
                                this Agreement.<br />
                            </li>
                            <h5 className='contract-section-heading'><span>ENUREMENT</span><br />
                            </h5>
                            <li value="32"><span>This</span> Agreement will enure to the benefit of and be binding on the
                                Parties and their respective heirs, executors, administrators and permitted successors and
                                assigns.<br />
                            </li>
                            <h5 className='contract-section-heading'><span>TITLES/HEADINGS</span><br />
                            </h5>
                            <li value="33"><span>Headings are inserted for the convenience of the Parties only and are not
                                to be considered when interpreting this</span> Agreement.<br />
                            </li>
                            <h5 className='contract-section-heading'><span>GENDER</span><br />
                            </h5>
                            <li value="34"><span>Words in the singular mean and include the plural and vice versa. Words in
                                the masculine mean and include the feminine and vice versa.</span><br />
                            </li>
                            <h5 className='contract-section-heading'><span>GOVERNING LAW</span><br />
                            </h5>
                            <li value="35"><span>This</span> Agreement will be governed by and construed in accordance with
                                the laws of the State of Iowa.<br />
                            </li>
                            <h5 className='contract-section-heading'><span>SEVERABILITY</span><br />
                            </h5>
                            <li value="36"><span>In the event that any of the provisions of this</span> Agreement are held
                                to be invalid or unenforceable in whole or in part, all other provisions will nevertheless
                                continue to be valid and enforceable with the invalid or unenforceable parts severed from
                                the remainder of this Agreement.<br />
                            </li>
                            <h5 className='contract-section-heading'><span>WAIVER</span><br />
                            </h5>
                            <li value="37"><span>The waiver by either Party of a breach, default, delay or omission of any
                                of the provisions of this</span> Agreement by the other Party will not be construed as a
                                waiver of any subsequent breach of the same or other provisions.<br />
                            </li>
                        </ol>
                    </div>
                    <div style={{marginTop: '70px'}}>
                        <p><strong>IN WITNESS WHEREOF</strong> the Parties have duly affixed their signatures on this {getFormalDate(currentDate)}.
                        </p>
                        <div>
                            <div style={{margin: '50px auto'}}>
                                <div>_______________________________</div>
                                <div>{clientName}</div>
                            </div>
                            <div style={{margin: '50px auto'}}>
                                <div>_______________________________</div>
                                <div>
                                    {contractorName}
                                </div>
                                <div>
                                    Officer's Name: <span>{contractorOfficerName}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateContractPage;
