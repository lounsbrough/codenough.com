const baseUri = 'https://gql.waveapps.com/graphql/public';

let apiKey;

const getApiKey = () => apiKey;

export const setApiKey = (key) => {
    apiKey = key;
};

const fetchWrapper = async (url, options) => {
    return fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getApiKey()}`
        }
    });
};

export const getBusinesses = async () => {
    const query = `
    {
        businesses {
            edges {
                node {
                    id
                    name
                }
            }
        }
    }
    `;

    const response = await fetchWrapper(baseUri, {
        method: 'POST',
        body: JSON.stringify({query}),
    });

    const json = await response.json();

    return json.data.businesses.edges.map((edge) => edge.node);
};

export const getCustomers = async (businessId) => {
    const query = `
    {
        business(id: "${businessId}") {
            id
            customers(sort: [NAME_ASC]) {
                edges {
                    node {
                        id
                        name
                        email
                    }
                }
            }
        }
    }
    `;

    const response = await fetchWrapper(baseUri, {
        method: 'POST',
        body: JSON.stringify({query}),
    });

    const json = await response.json();

    return json.data.business.customers.edges.map((edge) => edge.node);
};



export const getProducts = async (businessId) => {    
    const query = `
    {
        business(id: "${businessId}") {
            id
            products {
                edges {
                    node {
                        id
                        name
                        description
                        unitPrice
                    }
                }
            }
        }
    }
    `;

    const response = await fetchWrapper(baseUri, {
        method: 'POST',
        body: JSON.stringify({query}),
    });

    const json = await response.json();

    return json.data.business.products.edges.map((edge) => edge.node);
};

export const createInvoice = async (businessId, customerId, items) => {
    const query = `
    mutation ($input: InvoiceCreateInput!) {
        invoiceCreate(input: $input) {
            didSucceed
            inputErrors {
                code
                message
                path
            }
            invoice {
                status
                currency {
                    code
                }
                items {
                    description
                    quantity
                    product {
                        id
                    }
                }
            }
        }
    }
    `;

    const variables = {
        input: {
            businessId,
            customerId,
            status: "DRAFT",
            currency: "USD",
            invoiceNumber: "",
            title: "INVOICE",
            items
        }
    };

    const response = await fetchWrapper(baseUri, {
        method: 'POST',
        body: JSON.stringify({
            query,
            variables
        }),
    });

    if (!response.ok) {
        throw new Error(`Unable to create invoice ${JSON.stringify(variables)}`);
    }

    return await response.json();
};