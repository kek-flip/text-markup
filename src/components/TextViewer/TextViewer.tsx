import { FormEvent, ChangeEvent, useEffect, useState } from "react";
import {
    useMarkup,
    useMarkupDispatch,
} from "../../contexts/MarkupProvider/MarkupHooks";
import FileDropArea from "../FileDropArea/FileDropArea";

import "./TextViewer.scss";
import Api, { RequestError } from "../../api/api";
import { toast } from "react-toastify";

export interface TextViewerProps {}

export default function TextViewer() {
    const { text } = useMarkup();
    const markupDispatch = useMarkupDispatch();
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if (!file) return;

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
                markupDispatch({
                    type: "TEXT_WITH_MARKUP",
                    payload: {
                        text: text,
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
    }, [file, markupDispatch]);

    async function handleText(text: string) {
        const response = await Api.markupText.fetch(JSON.stringify({ text }));
        markupDispatch({
            type: "TEXT_WITH_MARKUP",
            payload: {
                text,
                textClass: response.class,
                tags: response.tags,
                labels: response.labels,
            },
        });
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

    function hadleFileLoad(e: ChangeEvent<HTMLInputElement>) {
        setFile(e.currentTarget.files!.item(0));
    }

    return (
        <form className="text-viewer" onSubmit={handleSubmit}>
            <FileDropArea
                className="text-viewer__file-area"
                onFile={(file) => setFile(file)}
            >
                <textarea
                    className="text-viewer__file-area__textarea"
                    name="text"
                    id="text-viewer_text"
                    placeholder="Вставьте текст..."
                    value={text || ""}
                    onChange={(e) =>
                        markupDispatch({
                            type: "TEXT",
                            payload: e.target.value,
                        })
                    }
                ></textarea>
            </FileDropArea>
            <div className="text-viewer__file-loader">
                <label
                    className="text-viewer__file-loader__label"
                    htmlFor="text-viewer__file"
                >
                    Загрузить файл
                </label>
                <input
                    type="file"
                    name="file"
                    id="text-viewer__file"
                    onChange={hadleFileLoad}
                    hidden
                />
            </div>
            <button className="text-viewer__submit submit-button" type="submit">
                Получить разметку
            </button>
        </form>
    );
}
