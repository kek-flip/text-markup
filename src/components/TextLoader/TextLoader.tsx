import { useState } from "react";
import Api from "../../api/api";
import Chooser from "../Chooser/Chooser";
import TextForm from "../TextForm/TextForm";

import "./TextLoader.scss";
import FileForm from "../FileForm/FileForm";

export type TextSource = "text" | "file" | "link";

export interface TextLoaderProps {
    onTags: (tags: string[]) => void;
    onLabels: (labels: string[]) => void;
    onError?: (error: string | null) => void;
}

export default function TextLoader({
    onTags,
    onLabels,
    onError = () => {},
}: TextLoaderProps) {
    const textSourses: TextSource[] = ["text", "file"];
    const [textSource, setTextSource] = useState<TextSource>("text");

    async function handleText(text: string) {
        try {
            const response = await Api.markupText.fetch(
                JSON.stringify({ text })
            );
            onTags(response.data?.tags || []);
            onLabels(response.data?.labels || []);
            onError(response.error || null);
        } catch (e) {
            onError("Ошибка сервера");
            console.error(e);
        }
    }

    async function handleFile(file: File) {
        const formData = new FormData();
        formData.append("file", file);
        try {
            const response = await Api.markupFile.fetch(formData);
            onTags(response.data?.tags || []);
            onLabels(response.data?.labels || []);
            onError(response.error || null);
        } catch (e) {
            onError("Ошибка сервера");
            console.log(e);
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
