import TextLoader from "../../components/TextLoader/TextLoader";
import { useMarkupDispatch } from "../../contexts/MarkupProvider/MarkupProvider";
import Page from "../Page/Page";

import "./TextPage.scss";

export interface TextPageProps {
    onFinish: () => void;
}

export default function TextPage({ onFinish }: TextPageProps) {
    const markupDispatch = useMarkupDispatch();

    return (
        <Page>
            <main className="text-page">
                <TextLoader
                    onText={(text) =>
                        markupDispatch({ type: "TEXT", payload: text })
                    }
                    onTextMarkup={(textMarkup) =>
                        markupDispatch({
                            type: "TEXT_MARKUP",
                            payload: textMarkup,
                        })
                    }
                    onError={(error) =>
                        markupDispatch({ type: "ERROR", payload: error })
                    }
                    onFinish={onFinish}
                />
            </main>
        </Page>
    );
}
