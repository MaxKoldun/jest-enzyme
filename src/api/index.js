import ApiClient               from './ApiClient.js';

function makeApiList() {
    const api = new ApiClient();

    return {
        apiClient : api
    };
}

export default makeApiList;
