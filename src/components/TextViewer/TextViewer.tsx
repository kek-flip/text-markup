import { FormEvent, ChangeEvent } from "react";
import {
    useMarkup,
    useMarkupDispatch,
} from "../../contexts/MarkupProvider/MarkupHooks";
import FileDropArea from "../FileDropArea/FileDropArea";

import "./TextViewer.scss";

export interface TextViewerProps {}

export default function TextViewer() {
    const { text, loading } = useMarkup();
    const markupDispatch = useMarkupDispatch();

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const textArea = e.currentTarget.elements.namedItem(
            "text"
        ) as HTMLTextAreaElement;
        if (!textArea.value) return;

        markupDispatch({ type: "FETCH_TEXT", payload: null });
    }

    function dispatchFile(file: File) {
        markupDispatch({ type: "FETCH_FILE", payload: file });
    }

    function hadleFileLoad(e: ChangeEvent<HTMLInputElement>) {
        const file = e.currentTarget.files?.item(0);
        if (file) dispatchFile(file);
    }

    return (
        <form className="text-viewer" onSubmit={handleSubmit}>
            <FileDropArea
                className="text-viewer__file-area"
                onFile={(file) => dispatchFile(file)}
            >
                <textarea
                    className="text-viewer__file-area__textarea scrollable"
                    name="text"
                    id="text-viewer_text"
                    placeholder="Вставьте текст..."
                    value={text || ""}
                    onChange={(e) =>
                        markupDispatch({
                            type: "TEXT",
                            payload: e.target.value,
                        })
                    }
                    disabled={loading}
                ></textarea>
            </FileDropArea>
            <div className="text-viewer__file-loader">
                <input
                    type="file"
                    name="file"
                    className="text-viewer__file-loader__input"
                    id="text-viewer__file"
                    onChange={hadleFileLoad}
                    hidden
                    disabled={loading}
                    accept=".doc,.docx,.txt"
                />
                <label
                    className="text-viewer__file-loader__label"
                    htmlFor="text-viewer__file"
                >
                    Загрузить файл
                </label>
                <span className="text-viewer__file-area__accept-files">
                    Разрешенные форматы .doc, .docx, .txt
                </span>
            </div>
            <button
                className="text-viewer__submit submit-button"
                type="submit"
                disabled={loading}
            >
                Получить разметку
            </button>
        </form>
    );
}
