const baseUri = 'https://gql.waveapps.com/graphql/public';

const encodedApiKey = process.env.REACT_APP_WAVE_API_KEY;

const getApiKey = (encodedKey) => {
    return atob(encodedKey.split('').filter((value, index) => index % 2 === 0).join(''));
}

const apiKey = getApiKey(encodedApiKey);

const fetchWrapper = async (url, options) => {
    return fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
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

    return await response.json();
};