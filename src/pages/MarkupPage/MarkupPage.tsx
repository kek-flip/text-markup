import Api, { RequestError } from "../../api/api";
import { toast } from "react-toastify";
import MarkupViewer from "../../components/MarkupViewer/MarkupViewer";
import TextViewer from "../../components/TextViewer/TextViewer";
import {
    useMarkup,
    useMarkupDispatch,
} from "../../contexts/MarkupProvider/MarkupHooks";
import Page from "../Page/Page";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import "./MarkupPage.scss";

export default function MarkupPage() {
    const markup = useMarkup();
    const markupDispatch = useMarkupDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!markup.text) navigate("/");
    }, [markup, navigate]);

    async function handleText(text: string) {
        markupDispatch({ type: "TEXT", payload: text });
        const respose = await Api.markupText.fetch(JSON.stringify({ text }));
        markupDispatch({ type: "TEXT_MARKUP", payload: respose });
    }

    return (
        <Page>
            <div className="markup-page">
                <TextViewer
                    onText={(text) => {
                        toast.promise<void, RequestError>(handleText(text), {
                            pending: "Обработка текста",
                            success: "Успешно",
                            error: {
                                render({ data }) {
                                    return data.message;
                                },
                            },
                        });
                    }}
                    submitText="Получить разметку"
                />
                <MarkupViewer
                    tags={markup.tags}
                    labels={markup.labels}
                    textClass={markup.textClass!}
                />
            </div>
        </Page>
    );
}
