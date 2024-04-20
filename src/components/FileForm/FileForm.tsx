import { ChangeEvent, DragEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

import "./FileForm.scss";

export interface FileFormProps {
    submitText: string;
    onFile?: (file: File) => void;
}

export default function FileForm({
    submitText,
    onFile = () => {},
}: FileFormProps) {
    const [file, setFile] = useState<File | null>(null);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!file) {
            // markupDispatch({ type: "ERROR", payload: "Select a file" });
            toast.error("Выберите файл");
            return;
        }
        onFile(file);
    }

    function handleFileSelection(e: ChangeEvent<HTMLInputElement>) {
        setFile(e.currentTarget.files!.item(0));
    }

    function handleFileDrop(e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.currentTarget.classList.remove("file-form__file-area_file-over");
        if (e.dataTransfer.items[0].kind != "file") {
            toast.error("Выберите файл");
            return;
        }
        if (e.dataTransfer.items.length > 1) {
            toast.error("Выберите только один файл");
            return;
        }
        setFile(e.dataTransfer.items[0].getAsFile());
    }

    function handleFileDragOver(e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.currentTarget.classList.add("file-form__file-area_file-over");
    }

    function handleFileDragLeave(e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.currentTarget.classList.remove("file-form__file-area_file-over");
    }

    return (
        <>
            <form className="file-form" onSubmit={handleSubmit}>
                <div
                    className="file-form__file-area"
                    onDrop={handleFileDrop}
                    onDragOver={handleFileDragOver}
                    onDragLeave={handleFileDragLeave}
                >
                    <label
                        className="file-form__file-area__label"
                        htmlFor="file-form__file"
                    >
                        {file ? file.name : "Выберите файл или перетащите его"}
                    </label>
                    <input
                        type="file"
                        name="file"
                        id="file-form__file"
                        onChange={handleFileSelection}
                        hidden
                    />
                </div>
                <button
                    className="file-form__submit submit-button"
                    type="submit"
                >
                    {submitText}
                </button>
            </form>
        </>
    );
}
