import Api from "./api/api";
import MarkupViewer from "./components/MarkupViewer/MarkupViewer";
import TextLoader from "./components/TextLoader/TextLoader";
import { useState } from "react";

import "./App.scss";

export default function App() {
    const [tags, setTags] = useState<string[]>([]);
    const [labels, setLabels] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    return (
        <div className="main-container">
            <main className="main">
                <h1 className="header">Text markup</h1>
                <TextLoader
                    onTags={(tags) => setTags(tags)}
                    onLabels={(labels) => setLabels(labels)}
                    onError={(error) => setError(error)}
                />
                {(tags.length != 0 || labels.length != 0) && (
                    <MarkupViewer tags={tags} labels={labels} />
                )}
            </main>
        </div>
    );
}
