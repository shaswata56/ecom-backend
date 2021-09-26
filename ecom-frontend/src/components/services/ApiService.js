export default class ApiService {
    constructor(token, userid, entity) {
        this.token = token;
        this.userid = userid;
        this.entity = entity;
    }

    callApi(method, data, id) {
        let url;
        if (id == null) {
            url = 'http://localhost:8080/'+ this.entity;
        } else {
            url = 'http://localhost:8080/'+ this.entity +'/'+ id;
        }
        return fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.token
            },
            body: (data === null) ? undefined : JSON.stringify(data)
        }).then(data => data.json());
    }

    getAll() {
        return this.callApi('GET', null, null);
    }

    getOne(id) {
        return this.callApi('GET', null, id)
    }

    addOne(data) {
        return this.callApi('POST', data, null)
    }

    updateOne(data, id) {
        return this.callApi('PUT', data, id);
    }

    deleteOne(id) {
        return this.callApi('DELETE', null, id);
    }

    deleteAll() {
        return this.callApi('DELETE', null, null)
    }
}