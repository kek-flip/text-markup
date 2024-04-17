import { useState } from "react";
import Api, { RequestError } from "../../api/api";
import Chooser from "../Chooser/Chooser";
import TextForm from "../TextForm/TextForm";

import "./TextLoader.scss";
import FileForm from "../FileForm/FileForm";
import { useNavigate } from "react-router-dom";

export type TextSource = "text" | "file" | "link";

export interface TextLoaderProps {
    onText: (text: string | null) => void;
    onTextMarkup: (textMarkup: {
        textClass: string;
        tags: string[];
        labels: string[];
    }) => void;
    onError: (error: string | null) => void;
}

export default function TextLoader({
    onText,
    onTextMarkup,
    onError,
}: TextLoaderProps) {
    const textSourses: TextSource[] = ["text", "file"];
    const [textSource, setTextSource] = useState<TextSource>("text");
    const navigate = useNavigate();

    async function handleText(text: string) {
        onText(text);
        try {
            const response = await Api.markupText.fetch(
                JSON.stringify({ text })
            );
            onTextMarkup({
                textClass: response.class,
                tags: response.tags,
                labels: response.labels,
            });
            navigate("/markup");
        } catch (e) {
            if (e instanceof RequestError) {
                onError(e.message);
            } else {
                throw e;
            }
        }
    }

    async function handleFile(file: File) {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            onText(reader.result as string);
        };

        const formData = new FormData();
        formData.append("file", file);
        try {
            const response = await Api.markupFile.fetch(formData);
            onTextMarkup({
                textClass: response.class,
                tags: response.tags,
                labels: response.labels,
            });
            navigate("/markup");
        } catch (e) {
            if (e instanceof RequestError) {
                onError(e.message);
            } else {
                throw e;
            }
        }
    }

    return (
        <div className="text-loader">
            <Chooser
                options={textSourses}
                startOption={textSource}
                onChoose={(textSrc) => setTextSource(textSrc as TextSource)}
            />
            {textSource == "text" && (
                <TextForm submitText="Get markup" onText={handleText} />
            )}
            {textSource == "file" && (
                <FileForm submitText="Get markup" onFile={handleFile} />
            )}
        </div>
    );
}
