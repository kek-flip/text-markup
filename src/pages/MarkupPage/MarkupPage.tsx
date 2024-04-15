import MarkupViewer from "../../components/MarkupViewer/MarkupViewer";
import TextViewer from "../../components/TextViewer/TextViewer";
import { useMarkup } from "../../contexts/MarkupProvider/MarkupProvider";
import Page from "../Page/Page";

import "./MarkupPage.scss";

export interface MarkupPageProps {
    onBack: () => void;
}

export default function MarkupPage({ onBack }: MarkupPageProps) {
    const markup = useMarkup();

    return (
        <Page>
            <main className="markup-page">
                <button
                    className="markup-page__button"
                    type="button"
                    onClick={() => onBack()}
                >
                    Markup new text
                </button>
                <div className="markup-page__content">
                    <TextViewer text={markup.text!} />
                    <MarkupViewer
                        tags={markup.tags}
                        labels={markup.labels}
                        textClass={markup.textClass!}
                    />
                </div>
            </main>
        </Page>
    );
}
