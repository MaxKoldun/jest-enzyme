class Base {
    constructor({ apiClient }) {
        if (!apiClient) throw new Error('[apiClient] required');
        this.apiClient = apiClient;
    }
}

export default Base;
