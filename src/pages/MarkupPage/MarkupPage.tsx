import { Link, useNavigate } from "react-router-dom";
import MarkupViewer from "../../components/MarkupViewer/MarkupViewer";
import TextViewer from "../../components/TextViewer/TextViewer";
import { useMarkup } from "../../contexts/MarkupProvider/MarkupHooks";
import Page from "../Page/Page";
import { useEffect } from "react";

import "./MarkupPage.scss";

export default function MarkupPage() {
    const markup = useMarkup();
    const navigate = useNavigate();

    useEffect(() => {
        if (!markup.text) navigate("/");
    });

    return (
        <Page>
            <main className="markup-page">
                <Link to="/" className="markup-page__button">
                    Markup new text
                </Link>
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
