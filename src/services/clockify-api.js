import moment from 'moment';

const baseUri = 'https://api.clockify.me/api/v1';

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
            'X-Api-Key': getApiKey()
        }
    });
};

export const getCurrentUser = async () => {
    const endpoint = `${baseUri}/user`;

    const response = await fetchWrapper(endpoint);

    return response.json();
};

export const getWorkspaces = async () => {
    const endpoint = `${baseUri}/workspaces`;

    const response = await fetchWrapper(endpoint);

    return response.json();
};

export const getClients = async (workspaceId) => {
    const endpoint = `${baseUri}/workspaces/${workspaceId}/clients`;

    const response = await fetchWrapper(endpoint);

    return response.json();
};

export const getProjects = async (workspaceId) => {
    const endpoint = `${baseUri}/workspaces/${workspaceId}/projects`;

    const response = await fetchWrapper(endpoint);

    return response.json();
};

export const getTags = async (workspaceId) => {
    const endpoint = `${baseUri}/workspaces/${workspaceId}/tags`;

    const response = await fetchWrapper(endpoint);

    return response.json();
};

export const updateTimeEntry = async (workspaceId, id, updates) => {
    const endpoint = `${baseUri}/workspaces/${workspaceId}/time-entries/${id}`;

    const response = await fetchWrapper(endpoint, {
        method: 'PUT',
        body: JSON.stringify(updates)
    });

    if (!response.ok) {
        throw new Error(`Unable to update entry ${JSON.stringify(updates)}`);
    }
};

export const getTimeEntry = async (workspaceId, entryId, hydrated = false) => {
    const endpoint = `${baseUri}/workspaces/${workspaceId}/time-entries/${entryId}?hydrated=${hydrated}`;

    const response = await fetchWrapper(endpoint);

    return response.json();
};

export const getTimeEntries = async (workspaceId, userId, startDate, endDate, hydrated = false) => {
    startDate = moment(startDate).toISOString();
    endDate = moment(endDate).add(1, 'days').toISOString();

    const endpoint = `${baseUri}/workspaces/${workspaceId}/user/${userId}/time-entries?hydrated=${hydrated}&page-size=5000&start=${startDate}&end=${endDate}`;

    const response = await fetchWrapper(endpoint);

    return response.json();
};

export const addTagToTimeEntry = async (workspaceId, entryId, tagId) => {
    const endpoint = `${baseUri}/workspaces/${workspaceId}/time-entries/${entryId}`;

    const entry = await getTimeEntry(workspaceId, entryId);

    const entryWithTag = {
        start: entry.timeInterval.start,
        billable: entry.billable,
        description: entry.description,
        projectId: entry.projectId,
        taskId: entry.taskId,
        end: entry.timeInterval.end,
        tagIds: (entry.tagIds || []).concat(tagId)
    };

    const response = await fetchWrapper(endpoint, {
        method: 'PUT',
        body: JSON.stringify(entryWithTag)
    });

    if (!response.ok) {
        throw new Error(`Unable to add tag to entry ${entryId}`);
    }
};
