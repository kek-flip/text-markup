import { useRef, PointerEvent } from "react";
import Notifier from "../../components/Notifier/Notifier";
import TextLoader from "../../components/TextLoader/TextLoader";
import { useMarkupDispatch } from "../../contexts/MarkupProvider/MarkupHooks";
import Page from "../Page/Page";

import "./TextPage.scss";

export default function TextPage() {
    const markupDispatch = useMarkupDispatch();
    const textLoaderRef = useRef<HTMLDivElement>(null);

    function handleClick(e: PointerEvent<HTMLAnchorElement>) {
        e.preventDefault();

        textLoaderRef.current!.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }

    return (
        <Page>
            <Notifier />
            <main className="text-page">
                <div id="text-loader" ref={textLoaderRef}>
                    <h2 className="text-loader__title">
                        Paste text or upload a file
                    </h2>
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
                </div>
                <div className="about">
                    <h2 className="about__header">About us</h2>
                    <div className="about__text">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Nobis odit ipsum suscipit voluptate, perferendis
                        ipsa alias esse hic eum distinctio reprehenderit harum
                        adipisci praesentium voluptatem consectetur! Ipsam
                        tempore asperiores quam!
                    </div>
                    <img
                        src="about.jpg"
                        alt="Text markup"
                        className="about__image"
                    />
                    <a
                        className="about__try-it"
                        href="#text-loader"
                        onClick={handleClick}
                    >
                        Try it
                    </a>
                </div>
            </main>
        </Page>
    );
}
