import Api from "./api/api";
import MarkupViewer from "./components/MarkupViewer/MarkupViewer";
import TextLoader from "./components/TextLoader/TextLoader";
import { useState } from "react";

import "./App.scss";

interface TextMarkup {
    class: string;
    tags: string[] | null;
}
interface ApiResponse<T = unknown> {
    data: T | null;
    error: string | null;
}

export default function App() {
    const [tags, setTags] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    async function handleText(text: string) {
        try {
            const response = await Api.markup.Fetch(JSON.stringify({ text }));
            const parsedResponse: ApiResponse<TextMarkup> =
                await response.json();
            setTags(parsedResponse.data?.tags || []);
            setError(parsedResponse.error);
        } catch (e) {
            setError("Ошибка сервера");
            console.error(e);
        }
    }

    return (
        <div className="main-container">
            <h1 className="header">Text markup</h1>

            <main className="main">
                <TextLoader onText={handleText} />
                <MarkupViewer tags={tags} labels={tags} />
            </main>
        </div>
    );
}
