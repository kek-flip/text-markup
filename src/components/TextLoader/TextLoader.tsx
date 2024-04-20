import Api, { RequestError } from "../../api/api";
import { useState } from "react";
import Chooser from "../Chooser/Chooser";
import TextForm from "../TextForm/TextForm";

import "./TextLoader.scss";
import FileForm from "../FileForm/FileForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export type TextSource = "Текст" | "Файл";

export interface TextLoaderProps {
    onText: (text: string | null) => void;
    onTextMarkup: (textMarkup: {
        textClass: string;
        tags: string[];
        labels: string[];
    }) => void;
}

export default function TextLoader({ onText, onTextMarkup }: TextLoaderProps) {
    const textSourses: TextSource[] = ["Текст", "Файл"];
    const [textSource, setTextSource] = useState<TextSource>("Текст");
    const navigate = useNavigate();

    async function handleText(text: string) {
        onText(text);
        const response = await Api.markupText.fetch(JSON.stringify({ text }));
        onTextMarkup({
            textClass: response.class,
            tags: response.tags,
            labels: response.labels,
        });
        navigate("/markup");
    }

    async function handleFile(file: File) {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            onText(reader.result as string);
        };

        const formData = new FormData();
        formData.append("file", file);
        const response = await Api.markupFile.fetch(formData);
        onTextMarkup({
            textClass: response.class,
            tags: response.tags,
            labels: response.labels,
        });
        navigate("/markup");
    }

    return (
        <div className="text-loader">
            <Chooser
                options={textSourses}
                startOption={textSource}
                onChoose={(textSrc) => setTextSource(textSrc as TextSource)}
            />
            {textSource == "Текст" && (
                <TextForm
                    submitText="Получить разметку"
                    onText={(e) => {
                        toast.promise<void, RequestError>(handleText(e), {
                            pending: "Обработка текста",
                            success: "Успешно",
                            error: {
                                render({ data }) {
                                    return data.message;
                                },
                            },
                        });
                    }}
                />
            )}
            {textSource == "Файл" && (
                <FileForm
                    submitText="Получить разметку"
                    onFile={(e) => {
                        toast.promise<void, RequestError>(handleFile(e), {
                            pending: "Обработка текста",
                            success: "Успешно",
                            error: {
                                render({ data }) {
                                    return data.message;
                                },
                            },
                        });
                    }}
                />
            )}
        </div>
    );
}
