import MarkupViewer from "../../components/MarkupViewer/MarkupViewer";
import TextViewer from "../../components/TextViewer/TextViewer";
import Page from "../Page/Page";

import "./MarkupPage.scss";

export interface MarkupPageProps {
    text: string;
    tags: string[];
    labels: string[];
    textClass: string;
    onBack: () => void;
}

export default function MarkupPage({
    text,
    tags,
    labels,
    textClass,
    onBack,
}: MarkupPageProps) {
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
                    <TextViewer text={text} />
                    <MarkupViewer
                        tags={tags}
                        labels={labels}
                        textClass={textClass}
                    />
                </div>
            </main>
        </Page>
    );
}
