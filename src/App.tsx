import TextPage from "./pages/TextPage/TextPage";
import { useState } from "react";

import "./App.scss";
import MarkupPage from "./pages/MarkupPage/MarkupPage";
import Notifier from "./components/Notifier/Notifier";
import MarkupProvider from "./contexts/MarkupProvider/MarkupProvider";

export default function App() {
    const [page, setPage] = useState<string>("text-page");

    return (
        <>
            <MarkupProvider>
                <Notifier />
                {page == "text-page" && (
                    <TextPage onFinish={() => setPage("markup-page")} />
                )}
                {page == "markup-page" && (
                    <MarkupPage onBack={() => setPage("text-page")} />
                )}
            </MarkupProvider>
        </>
    );
}
