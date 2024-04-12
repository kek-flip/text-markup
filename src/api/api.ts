export enum HTTPMethod {
    GET = "GET",
    POST = "POST",
    PATCH = "PATCH",
    PUT = "PUT",
    DELETE = "DELETE",
    OPTIONS = "OPTIONS",
}

interface ApiError {
    error?: string;
}

type ApiResponse<T = unknown> = T & ApiError;

export class RequestError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = "RequestError";
    }
}

interface StatusCodeMapper {
    [index: number]: string;
}

const DEFAULT_FAILURE_CODES_MAPPER: StatusCodeMapper = {
    404: "Ресурс не найден",
    500: "Ошибка сервера",
};

const URL = import.meta.env.VITE_API_URL;

class Route<T = unknown> {
    private _method: HTTPMethod;
    private _route: string;
    private _headers: HeadersInit | undefined;
    private _options: { [index: string]: string } | undefined;
    private _failureCodesMapper: StatusCodeMapper;

    constructor(
        method: HTTPMethod,
        route: string,
        headers?: HeadersInit,
        options?: { [index: string]: string },
        failureCodesMapper = DEFAULT_FAILURE_CODES_MAPPER
    ) {
        this._method = method;
        this._route = route;
        this._headers = headers;
        this._options = options;
        this._failureCodesMapper = failureCodesMapper;
    }

    async fetch(body: BodyInit): Promise<T> {
        const res = await fetch(URL + this._route, {
            method: this._method,
            headers: this._headers,
            body,
            ...this._options,
        });

        try {
            const payload = (await res.json()) as ApiResponse<T>;
            if (payload.error) {
                throw new RequestError(payload.error);
            }
            return payload;
        } catch {
            if (this._failureCodesMapper[res.status]) {
                throw new RequestError(this._failureCodesMapper[res.status]);
            } else {
                throw new RequestError("Неизвестная ошибка сервера");
            }
        }
    }
}

interface TextMarkup {
    labels: string[];
    tags: string[];
}

const Api = {
    markupText: new Route<TextMarkup>(HTTPMethod.POST, "/markup", {
        "Content-Type": "application/json",
    }),
    markupFile: new Route<TextMarkup>(HTTPMethod.POST, "/markup-file"),
};

export default Api;
