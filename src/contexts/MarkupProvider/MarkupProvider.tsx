import { Dispatch, ReactNode, createContext } from "react";
import { useReducerWithMiddleware } from "../../utils/hooks";
import Api, { RequestError } from "../../api/api";
import { toast } from "react-toastify";

interface Markup {
    text: string | null;
    tags: string[];
    labels: string[];
    textClass: string | null;
}

type MarkupAction =
    | {
          type: "TEXT";
          payload: TextPayload;
      }
    | {
          type: "TEXT_MARKUP";
          payload: TextMarkupPayload;
      }
    | {
          type: "TEXT_WITH_MARKUP";
          payload: TextWithMarkupPayload;
      }
    | {
          type: "FETCH_TEXT";
          payload: null;
      }
    | {
          type: "FETCH_FILE";
          payload: File;
      };

type TextPayload = string | null;

type TextMarkupPayload = {
    textClass: string | null;
    tags: string[];
    labels: string[];
};

type TextWithMarkupPayload = { text: string } & TextMarkupPayload;

function markupReducer(state: Markup, action: MarkupAction): Markup {
    const { type, payload } = action;
    switch (type) {
        case "TEXT":
            return {
                ...state,
                text: payload as TextPayload,
            };
        case "TEXT_MARKUP":
            return {
                ...state,
                tags: (payload as TextMarkupPayload).tags,
                labels: (payload as TextMarkupPayload).labels,
                textClass: (payload as TextMarkupPayload).textClass,
            };
        case "TEXT_WITH_MARKUP":
            return {
                ...state,
                text: (payload as TextWithMarkupPayload).text,
                tags: (payload as TextWithMarkupPayload).tags,
                labels: (payload as TextWithMarkupPayload).labels,
                textClass: (payload as TextWithMarkupPayload).textClass,
            };
        default:
            return state;
    }
}

export const MarkupContext = createContext<Markup | null>(null);
export const MarkupDispatchContext =
    createContext<Dispatch<MarkupAction> | null>(null);

function handleText(
    action: MarkupAction,
    dispatch: Dispatch<MarkupAction>,
    state: Markup
): MarkupAction {
    if (action.type != "FETCH_TEXT") return action;

    if (!state.text) return action;

    const textPromise = Api.markupText
        .fetch(JSON.stringify({ text: state.text }))
        .then((response) => {
            dispatch({
                type: "TEXT_MARKUP",
                payload: {
                    textClass: response.class,
                    tags: response.tags,
                    labels: response.labels,
                },
            });
        });

    toast.promise<void, RequestError>(textPromise, {
        pending: "Обработка текста",
        success: "Успешно",
        error: {
            render({ data }) {
                return data.message;
            },
        },
    });

    return action;
}

function handleFile(
    action: MarkupAction,
    dispatch: Dispatch<MarkupAction>
): MarkupAction {
    if (action.type != "FETCH_FILE") return action;

    const { payload: file } = action;

    const formData = new FormData();
    formData.append("file", file);
    const responsePromise = Api.markupFile.fetch(formData);

    const textPromise = new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            resolve(reader.result as string);
        };
        reader.onerror = () => {
            reject("Не удалось прочитать файл");
        };
    });

    const markupPromise = Promise.all([responsePromise, textPromise]).then(
        ([response, text]) => {
            dispatch({
                type: "TEXT",
                payload: text,
            });
            dispatch({
                type: "TEXT_MARKUP",
                payload: {
                    textClass: response.class,
                    tags: response.tags,
                    labels: response.labels,
                },
            });
        }
    );

    toast.promise(markupPromise, {
        pending: "Обработка текста",
        success: "Успешно",
        error: {
            render({ data }) {
                if (typeof data == "string") {
                    return data;
                } else if (data instanceof RequestError) {
                    return data.message;
                }
            },
        },
    });

    return action;
}

export interface MarkupProviderProps {
    children: ReactNode;
}

export default function MarkupProvider({ children }: MarkupProviderProps) {
    const [markup, dispatch] = useReducerWithMiddleware(
        markupReducer,
        {
            text: null,
            textClass: null,
            tags: [],
            labels: [],
        },
        [handleText, handleFile]
    );

    return (
        <MarkupContext.Provider value={markup}>
            <MarkupDispatchContext.Provider value={dispatch}>
                {children}
            </MarkupDispatchContext.Provider>
        </MarkupContext.Provider>
    );
}
