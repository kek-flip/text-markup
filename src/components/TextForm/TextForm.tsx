import { FormEvent } from "react";

import "./TextForm.scss";

export interface TextFormProps {
    onText?: (text: string) => void;
    submitText: string;
    error: string | null;
}

export default function TextForm({
    onText = () => {},
    submitText,
    error,
}: TextFormProps) {
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const textArea = e.currentTarget.elements.namedItem(
            "text"
        ) as HTMLTextAreaElement;
        onText(textArea.value);
    }

    return (
        <form className="text-form" onSubmit={handleSubmit}>
            <textarea
                className="text-form__textarea"
                name="text"
                id="text-form_text"
            ></textarea>
            <button className="text-form__submit" type="submit">
                {submitText}
            </button>
        </form>
    );
}
