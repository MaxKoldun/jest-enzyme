import queryString      from 'query-string';

export default class ApiClient {
    constructor() {
        this.apiUrl = '';
    }

    async get(url, params) {
        return this.request({
            url,
            params,
            method : 'GET'
        });
    }

    async post(url, payload = {}) {
        return this.request({
            url,
            method : 'POST',
            body   : payload
        });
    }

    async put(url, payload = {}) {
        return this.request({
            url,
            method : 'PUT',
            body   : payload
        });
    }

    async patch(url, payload = {}) {
        return this.request({
            url,
            method : 'PATCH',
            body   : payload
        });
    }

    async delete(url, payload = {}) {
        return this.request({
            url,
            method : 'DELETE',
            body   : payload
        });
    }

    async request({ url, method, params = {}, body }) {
        const query = Object.keys(params).length ? `?${queryString.stringify(params)}` : '';
        const fetchParameters = [
                `${this.apiUrl}${url}${query}`,
                {
                    method,
                    headers : {
                        'Content-Type'  : 'application/json',
                        'Cache-Control' : 'no-cache',
                        'pragma'        : 'no-cache'
                    },
                    withCredentials : true,
                    crossDomain     : false,
                    body            : method !== 'GET' ? JSON.stringify(body) : undefined
                }
        ];

        const response = await fetch(...fetchParameters);
        const json = await response.json();

        if (!response.ok) throw json;

        return json;
    }
}
