import {
    Dispatch,
    ReactNode,
    createContext,
    useContext,
    useReducer,
} from "react";

interface Markup {
    text: string | null;
    tags: string[];
    labels: string[];
    textClass: string | null;
    error: string | null;
}

type MarkupActionType = "TEXT" | "TEXT_MARKUP" | "ERROR";

interface MarkupAction {
    type: MarkupActionType;
    payload: unknown;
}

type TextPayload = string | null;

type TextMarkupPayload = {
    textClass: string;
    tags: string[];
    labels: string[];
};

type ErrorPayload = string | null;

function markupReducer(state: Markup, action: MarkupAction): Markup {
    const { type, payload } = action;
    switch (type) {
        case "TEXT":
            return {
                ...state,
                text: payload as TextPayload,
                textClass: null,
                tags: [],
                labels: [],
                error: null,
            };
        case "TEXT_MARKUP":
            return {
                ...state,
                tags: (payload as TextMarkupPayload).tags,
                labels: (payload as TextMarkupPayload).labels,
                textClass: (payload as TextMarkupPayload).textClass,
            };
        case "ERROR":
            return {
                ...state,
                error: payload as ErrorPayload,
            };
    }
}

const MarkupContext = createContext<Markup | null>(null);
const MarkupDispatchContext = createContext<Dispatch<MarkupAction> | null>(
    null
);

interface MarkupProviderProps {
    children: ReactNode;
}

export default function MarkupProvider({ children }: MarkupProviderProps) {
    const [markup, dispatch] = useReducer(markupReducer, {
        text: null,
        textClass: null,
        tags: [],
        labels: [],
        error: null,
    });

    return (
        <MarkupContext.Provider value={markup}>
            <MarkupDispatchContext.Provider value={dispatch}>
                {children}
            </MarkupDispatchContext.Provider>
        </MarkupContext.Provider>
    );
}

export function useMarkup() {
    return useContext(MarkupContext)!;
}

export function useMarkupDispatch() {
    return useContext(MarkupDispatchContext)!;
}
