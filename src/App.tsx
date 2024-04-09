import { useRef, useState } from "react";
import Chooser from "./components/Chooser/Chooser";
import TextForm from "./components/TextForm/TextForm";
import MarkupView from "./components/MarkupView/MarkupView";

import "./App.scss";
import Api from "./api/api";

type TextSource = "text" | "file" | "link";

export default function App() {
    const textSourses: TextSource[] = ["text", "link", "file"];

    const [textSource, setTextSource] = useState<TextSource>("text");
    const [tags, setTags] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const tagRef = useRef<HTMLDivElement>(null);

    async function handleText(text: string) {
        try {
            const response = await Api.markup.fetch(JSON.stringify({ text }));
            setTags(response.data?.tags || []);
            setError(response.error);
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
