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

interface RouteOptions {
    headers?: HeadersInit;
    failureCodesMapper?: StatusCodeMapper;
    fetchOptions?: RequestInit;
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
    private _fetchOptions: RequestInit | undefined;
    private _failureCodesMapper: StatusCodeMapper;

    constructor(method: HTTPMethod, route: string, options?: RouteOptions) {
        this._method = method;
        this._route = route;
        this._headers = options?.headers;
        this._fetchOptions = options?.fetchOptions;
        this._failureCodesMapper = Object.assign(
            {},
            DEFAULT_FAILURE_CODES_MAPPER,
            options?.failureCodesMapper
        );
    }

    async fetch(body: BodyInit): Promise<T> {
        let res;
        try {
            res = await fetch(URL + this._route, {
                method: this._method,
                headers: this._headers,
                body,
                ...this._fetchOptions,
            });

            // Выкидывается единица, чтобы попасть в catch и пройти по ветвлению
            if (res.status in this._failureCodesMapper) throw 1;
            console.log(this._failureCodesMapper);

            return (await res.json()) as ApiResponse<T>;
        } catch (e) {
            if (res && res.status in this._failureCodesMapper) {
                throw new RequestError(this._failureCodesMapper[res.status]);
            } else if (e instanceof TypeError) {
                throw new RequestError("Отсутствует подключение к интернету");
            } else {
                throw new RequestError("Неизвестная ошибка сервера");
            }
        }
    }
}

interface TextMarkup {
    labels: string[];
    tags: string[];
    class: string;
}

const Api = {
    markupText: new Route<TextMarkup>(HTTPMethod.POST, "/markup", {
        headers: {
            "Content-Type": "application/json",
        },
        failureCodesMapper: {
            204: "Не удалость найти теги в тексте",
        },
    }),
    markupFile: new Route<TextMarkup>(HTTPMethod.POST, "/markup-file", {
        failureCodesMapper: {
            204: "Не удалость найти теги в тексте",
        },
    }),
};

export default Api;
