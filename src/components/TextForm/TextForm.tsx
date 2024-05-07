import { FormEvent } from "react";

import "./TextForm.scss";
import { toast } from "react-toastify";
import Api, { RequestError } from "../../api/api";
import { useMarkupDispatch } from "../../contexts/MarkupProvider/MarkupHooks";
import { useNavigate } from "react-router-dom";

export interface TextFormProps {}

export default function TextForm() {
    const markupDispatch = useMarkupDispatch();
    const navigate = useNavigate();

    async function handleText(text: string) {
        const response = await Api.markupText.fetch(JSON.stringify({ text }));
        markupDispatch({ type: "TEXT", payload: text });
        markupDispatch({
            type: "TEXT_MARKUP",
            payload: {
                textClass: response.class,
                tags: response.tags,
                labels: response.labels,
            },
        });
        navigate("/markup");
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const textArea = e.currentTarget.elements.namedItem(
            "text"
        ) as HTMLTextAreaElement;
        if (!textArea.value) return;

        toast.promise<void, RequestError>(handleText(textArea.value), {
            pending: "Обработка текста",
            success: "Успешно",
            error: {
                render({ data }) {
                    return data.message;
                },
            },
        });
    }

    return (
        <form className="text-form" onSubmit={handleSubmit}>
            <textarea
                className="text-form__textarea"
                name="text"
                id="text-form_text"
                placeholder="Вставьте текст..."
            ></textarea>
            <button className="text-form__submit submit-button" type="submit">
                Получить разметку
            </button>
        </form>
    );
}
