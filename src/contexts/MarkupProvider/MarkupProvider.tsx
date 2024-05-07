import { Dispatch, ReactNode, createContext, useReducer } from "react";

interface Markup {
    text: string | null;
    tags: string[];
    labels: string[];
    textClass: string | null;
}

type MarkupActionType = "TEXT" | "TEXT_MARKUP" | "TEXT_WITH_MARKUP";

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
    }
}

export const MarkupContext = createContext<Markup | null>(null);
export const MarkupDispatchContext =
    createContext<Dispatch<MarkupAction> | null>(null);

export interface MarkupProviderProps {
    children: ReactNode;
}

export default function MarkupProvider({ children }: MarkupProviderProps) {
    const [markup, dispatch] = useReducer(markupReducer, {
        text: null,
        textClass: null,
        tags: [],
        labels: [],
    });

    return (
        <MarkupContext.Provider value={markup}>
            <MarkupDispatchContext.Provider value={dispatch}>
                {children}
            </MarkupDispatchContext.Provider>
        </MarkupContext.Provider>
    );
}
