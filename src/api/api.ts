export enum HTTPMethod {
    GET = "GET",
    POST = "POST",
    PATCH = "PATCH",
    PUT = "PUT",
    DELETE = "DELETE",
    OPTIONS = "OPTIONS",
}

const URL = "https://cluster-text.ru/api/v1";

interface TextMarkup {
    labels: string[];
    tags: string[];
}
interface ApiResponse<T = unknown> {
    data?: T;
    error?: string;
}

class Route<T = unknown> {
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

    async fetch(body: BodyInit): Promise<ApiResponse<T>> {
        const res = await fetch(URL + this._route, {
            method: this._method,
            headers: this._headers,
            body,
            ...this._options,
        });

        return res.json();
    }
}

const Api = {
    markupText: new Route<TextMarkup>(HTTPMethod.POST, "/markup", {
        "Content-Type": "application/json",
    }),
    markupFile: new Route<TextMarkup>(HTTPMethod.POST, "/markup-file", {
        "Content-Type": "multipart/form-data",
    }),
};

export default Api;
