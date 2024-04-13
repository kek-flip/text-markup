import TextPage from "./pages/TextPage/TextPage";
import { useState } from "react";

import "./App.scss";
import MarkupPage from "./pages/MarkupPage/MarkupPage";
import Notifier from "./components/Notifier/Notifier";

export default function App() {
    const [text, setText] = useState<string>();
    const [tags, setTags] = useState<string[]>([]);
    const [labels, setLabels] = useState<string[]>([]);
    const [textClass, setTextClass] = useState<string>();
    const [error, setError] = useState<string>();

    const [page, setPage] = useState<string>("text-page");

    return (
        <>
            <Notifier error={error} />
            {page == "text-page" && (
                <TextPage
                    onText={(text) => setText(text)}
                    onTags={(tags) => setTags(tags)}
                    onLabels={(labels) => setLabels(labels)}
                    onTextClass={(textClass) => setTextClass(textClass)}
                    onError={(error) => setError(error)}
                    onFinish={() => setPage("markup-page")}
                />
            )}
            {page == "markup-page" && (
                <MarkupPage
                    text={text ?? ""}
                    tags={tags}
                    labels={labels}
                    textClass={textClass ?? ""}
                    onBack={() => setPage("text-page")}
                />
            )}
        </>
    );
}
