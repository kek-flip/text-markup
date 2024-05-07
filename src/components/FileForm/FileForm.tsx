import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import Api, { RequestError } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useMarkupDispatch } from "../../contexts/MarkupProvider/MarkupHooks";
import FileDropArea from "../FileDropArea/FileDropArea";

import "./FileForm.scss";

export interface FileFormProps {}

export default function FileForm() {
    const [file, setFile] = useState<File | null>(null);
    const navigate = useNavigate();
    const markupDispatch = useMarkupDispatch();

    async function handleFile(file: File) {
        const formData = new FormData();
        formData.append("file", file);
        const response = await Api.markupFile.fetch(formData);

        const text = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => {
                resolve(reader.result as string);
            };
            reader.onerror = () => {
                reject("Не удалось прочитать файл");
            };
        });

        markupDispatch({
            type: "TEXT_WITH_MARKUP",
            payload: {
                text,
                textClass: response.class,
                tags: response.tags,
                labels: response.labels,
            },
        });

        navigate("/markup");
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!file) {
            toast.error("Выберите файл");
            return;
        }

        toast.promise<void, RequestError | string>(handleFile(file), {
            pending: "Обработка текста",
            success: "Успешно",
            error: {
                render({ data }) {
                    if (typeof data == "string") {
                        return data;
                    } else {
                        return data.message;
                    }
                },
            },
        });
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
