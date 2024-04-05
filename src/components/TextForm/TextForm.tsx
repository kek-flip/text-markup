import { FormEvent, useRef } from "react";

import "./TextForm.scss";

export interface TextFormProps {
    onText?: (text: string) => void;
    submitText: string;
}

export default function TextForm({
    onText = () => {},
    submitText,
}: TextFormProps) {
    const formRef = useRef<HTMLFormElement>(null);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const textArea = formRef.current?.elements.namedItem(
            "text"
        ) as HTMLTextAreaElement;
        onText(textArea.value);
    }

    return (
        <form className="text-form" onSubmit={handleSubmit} ref={formRef}>
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
