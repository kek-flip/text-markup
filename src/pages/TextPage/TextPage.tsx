import Notifier from "../../components/Notifier/Notifier";
import TextLoader from "../../components/TextLoader/TextLoader";
import { useMarkupDispatch } from "../../contexts/MarkupProvider/MarkupHooks";
import Page from "../Page/Page";

import "./TextPage.scss";

export default function TextPage() {
    const markupDispatch = useMarkupDispatch();

    return (
        <Page>
            <Notifier />
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
                />
            </main>
        </Page>
    );
}
