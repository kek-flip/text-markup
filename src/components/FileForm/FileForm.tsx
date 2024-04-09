import { FormEvent } from "react";

import "./FileForm.scss";

export interface FileFormProps {
    submitText: string;
    onFile?: (file: File) => void;
}

export default function FileForm({
    submitText,
    onFile = () => {},
}: FileFormProps) {
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const fileInput = e.currentTarget.elements.namedItem(
            "file"
        ) as HTMLInputElement;
        onFile(fileInput.files![0]);
    }

    return (
        <form className="file-form" onSubmit={handleSubmit}>
            <div className="file-form__file-area">
                <label
                    className="file-form__file-area__label"
                    htmlFor="file-form__file"
                >
                    Загрузите файл
                </label>
                <input
                    type="file"
                    name="file"
                    id="file-form__file"
                    hidden
                    required
                />
            </div>
            <button className="file-form__submit" type="submit">
                {submitText}
            </button>
        </form>
    );
}
