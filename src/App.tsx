import { useRef, useState } from "react";
import Chooser from "./components/Chooser/Chooser";
import TextForm from "./components/TextForm/TextForm";
import MarkupView from "./components/MarkupView/MarkupView";

import "./App.scss";

type TextSource = "text" | "file" | "link";

interface TextMarkup {
    class: string;
    tags: string[] | null;
}
interface ApiResponse<T = unknown> {
    data: T | null;
    error: string | null;
}

export default function App() {
    const textSourses: TextSource[] = ["text", "link", "file"];

    const [textSource, setTextSource] = useState<TextSource>("text");
    const [tags, setTags] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const tagRef = useRef<HTMLDivElement>(null);

    async function handleText(text: string) {
        try {
            const response = await fetch("http://212.233.73.82/api/v1/markup", {
                method: "POST",
                body: JSON.stringify({ text }),
            });
            const parsedResponse: ApiResponse<TextMarkup> =
                await response.json();
            setTags(parsedResponse.data?.tags || []);
            setError(parsedResponse.error);
            tagRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        } catch (e) {
            setError("Ошибка сервера");
            console.error(e);
        }
    }

    return (
        <main className="main">
            <h1 className="main__header">Text markup</h1>

            <Chooser
                options={textSourses}
                startOption={textSource}
                onChoose={(textSrc) => setTextSource(textSrc as TextSource)}
            />

            <TextForm submitText="Get markup" onText={handleText} />

            <MarkupView tags={tags} error={error} ref={tagRef} />
        </main>
    );
}
