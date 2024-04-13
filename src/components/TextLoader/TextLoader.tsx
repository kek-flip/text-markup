import { useState } from "react";
import Api, { RequestError } from "../../api/api";
import Chooser from "../Chooser/Chooser";
import TextForm from "../TextForm/TextForm";

import "./TextLoader.scss";
import FileForm from "../FileForm/FileForm";

export type TextSource = "text" | "file" | "link";

export interface TextLoaderProps {
    onText: (text: string) => void;
    onTags: (tags: string[]) => void;
    onLabels: (labels: string[]) => void;
    onTextClass: (textClass: string) => void;
    onError: (error?: string) => void;
    onFinish: () => void;
}

export default function TextLoader({
    onText,
    onTags,
    onLabels,
    onTextClass,
    onError,
    onFinish,
}: TextLoaderProps) {
    const textSourses: TextSource[] = ["text", "file"];
    const [textSource, setTextSource] = useState<TextSource>("text");

    async function handleText(text: string) {
        try {
            const response = await Api.markupText.fetch(
                JSON.stringify({ text })
            );
            onText(text);
            onTags(response.tags);
            onLabels(response.labels);
            onTextClass(response.class);
            onFinish();
            onError();
        } catch (e) {
            if (e instanceof RequestError) {
                onError(e.message);
            } else {
                throw e;
            }
        }
    }

    async function handleFile(file: File) {
        const formData = new FormData();
        formData.append("file", file);
        try {
            const response = await Api.markupFile.fetch(formData);
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => {
                onText(reader.result as string);
            };
            onTextClass(response.class);
            onTags(response.tags);
            onLabels(response.labels);
            onFinish();
            onError();
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
                onChoose={(textSrc) => {
                    setTextSource(textSrc as TextSource);
                    onTags([]);
                    onLabels([]);
                    onError();
                }}
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
