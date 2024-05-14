import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useMarkupDispatch } from "../../contexts/MarkupProvider/MarkupHooks";
import FileDropArea from "../FileDropArea/FileDropArea";

import "./FileForm.scss";
import { useNavigate } from "react-router-dom";

export interface FileFormProps {}

export default function FileForm() {
    const [file, setFile] = useState<File | null>(null);
    const markupDispatch = useMarkupDispatch();
    const navigate = useNavigate();

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!file) {
            toast.error("Выберите файл");
            return;
        }

        markupDispatch({ type: "FETCH_FILE", payload: file });
        navigate("/markup");
    }

    function handleFileLoad(e: ChangeEvent<HTMLInputElement>) {
        setFile(e.currentTarget.files!.item(0));
    }

    return (
        <>
            <form className="file-form" onSubmit={handleSubmit}>
                <FileDropArea
                    className="file-form__file-area"
                    onFile={(file) => setFile(file)}
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
                        onChange={handleFileLoad}
                        hidden
                    />
                </FileDropArea>
                <button
                    className="file-form__submit submit-button"
                    type="submit"
                >
                    Получить разметку
                </button>
            </form>
        </>
    );
}
