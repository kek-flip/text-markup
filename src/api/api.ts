export enum HTTPMethod {
    GET = "GET",
    POST = "POST",
    PATCH = "PATCH",
    PUT = "PUT",
    DELETE = "DELETE",
    OPTIONS = "OPTIONS",
}

const URL = import.meta.env.VITE_API_URL;

class Route {
    private _method: HTTPMethod;
    private _route: string;
    private _headers: HeadersInit;
    private _options: { [index: string]: string } | undefined;

    constructor(
        method: HTTPMethod,
        route: string,
        headers: HeadersInit,
        options?: { [index: string]: string }
    ) {
        this._method = method;
        this._route = route;
        this._headers = headers;
        this._options = options;
    }

    async Fetch(body: string) {
        return fetch(URL + this._route, {
            method: this._method,
            headers: this._headers,
            body,
            ...this._options,
        });
    }
}

const Api: { [index: string]: Route } = {
    markup: new Route(HTTPMethod.POST, "/markup", {
        "Content-Type": "application/json",
    }),
};

export default Api;
