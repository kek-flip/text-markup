import { useRef, PointerEvent } from "react";
import TextLoader from "../../components/TextLoader/TextLoader";
import { useMarkupDispatch } from "../../contexts/MarkupProvider/MarkupHooks";
import Page from "../Page/Page";

import "./TextPage.scss";

export default function TextPage() {
    const markupDispatch = useMarkupDispatch();
    const textLoaderRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement>(null);

    function handleTryItClick(e: PointerEvent<HTMLAnchorElement>) {
        e.preventDefault();

        textLoaderRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }

    function handleAboutClick() {
        aboutRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    }

    return (
        <Page>
            <div className="text-page">
                <div id="text-loader" ref={textLoaderRef}>
                    <h2
                        className="text-loader__title"
                        onClick={handleAboutClick}
                    >
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
                    />
                </div>
                <div className="about" ref={aboutRef}>
                    <h2 className="about__header">About us</h2>
                    <div className="about__text">
                        Welcome to our keyword tagging website, where precision
                        meets efficiency. With our user-friendly interface,
                        marking key words in your text has never been easier.
                        Say goodbye to the chaos of disorganized content and
                        hello to a streamlined, clear, and structured approach
                        to identifying and highlighting the most important
                        terms. Our advanced algorithm ensures accuracy and
                        speed, saving you time and effort. Join us and unlock
                        the power of effective keyword tagging for a better,
                        more organized online presence.
                    </div>
                    <img
                        src="about.jpg"
                        alt="Text markup"
                        className="about__image"
                    />
                    <a
                        className="about__try-it"
                        href="#text-loader"
                        onClick={handleTryItClick}
                    >
                        Try it
                    </a>
                </div>
            </div>
        </Page>
    );
}
