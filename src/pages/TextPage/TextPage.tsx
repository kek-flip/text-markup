import TextLoader from "../../components/TextLoader/TextLoader";
import Page from "../Page/Page";

import "./TextPage.scss";

export interface TextPageProps {
    onText: (text: string) => void;
    onTags: (tags: string[]) => void;
    onLabels: (labels: string[]) => void;
    onTextClass: (textClass: string) => void;
    onError: (error?: string) => void;
    onFinish: () => void;
}

export default function TextPage({
    onText,
    onTags,
    onLabels,
    onTextClass,
    onError,
    onFinish,
}: TextPageProps) {
    return (
        <Page>
            <main className="text-page">
                <TextLoader
                    onText={onText}
                    onTags={onTags}
                    onLabels={onLabels}
                    onTextClass={onTextClass}
                    onError={onError}
                    onFinish={onFinish}
                />
            </main>
        </Page>
    );
}
