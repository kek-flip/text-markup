import { toast } from "react-toastify";
import MarkupViewer from "../../components/MarkupViewer/MarkupViewer";
import TextViewer from "../../components/TextViewer/TextViewer";
import {
    useMarkup,
    useMarkupDispatch,
} from "../../contexts/MarkupProvider/MarkupHooks";
import Page from "../Page/Page";

import "./MarkupPage.scss";
import Api, { RequestError } from "../../api/api";

export default function MarkupPage() {
    const markup = useMarkup();
    const markupDispatch = useMarkupDispatch();

    async function handleText(text: string) {
        markupDispatch({ type: "TEXT", payload: text });
        const respose = await Api.markupText.fetch(JSON.stringify({ text }));
        markupDispatch({ type: "TEXT_MARKUP", payload: respose });
    }

    return (
        <Page>
            <div className="markup-page">
                <div className="markup-page__content">
                    <TextViewer
                        onText={(text) => {
                            toast.promise<void, RequestError>(
                                handleText(text),
                                {
                                    pending: "Обработка текста",
                                    success: "Успешно",
                                    error: {
                                        render({ data }) {
                                            return data.message;
                                        },
                                    },
                                }
                            );
                        }}
                        submitText="Получить разметку"
                    />
                    <MarkupViewer
                        tags={markup.tags}
                        labels={markup.labels}
                        textClass={markup.textClass!}
                    />
                </div>
            </div>
        </Page>
    );
}
