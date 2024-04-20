import { FormEvent, DragEvent, ChangeEvent } from "react";
import "./TextViewer.scss";
import { toast } from "react-toastify";
import {
    useMarkup,
    useMarkupDispatch,
} from "../../contexts/MarkupProvider/MarkupHooks";

export interface TextViewerProps {
    onText?: (text: string) => void;
    submitText: string;
}

export default function TextViewer({
    onText = () => {},
    submitText,
}: TextViewerProps) {
    const markup = useMarkup();
    const markupDispatch = useMarkupDispatch();

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const textArea = e.currentTarget.elements.namedItem(
            "text"
        ) as HTMLTextAreaElement;
        if (textArea.value) onText(textArea.value);
    }

    function hadleFileLoad(e: ChangeEvent<HTMLInputElement>) {
        if (!e.currentTarget.files?.item(0)) return;

        const reader = new FileReader();
        reader.readAsText(e.currentTarget.files.item(0)!);
        reader.onload = () => {
            markupDispatch({ type: "TEXT", payload: reader.result as string });
        };
    }

    function handleFileDrop(e: DragEvent<HTMLTextAreaElement>) {
        e.preventDefault();
        e.currentTarget.classList.remove("file-form__file-area_file-over");
        if (e.dataTransfer.items[0].kind != "file") {
            toast.error("Выберите файл");
            return;
        }
        if (e.dataTransfer.items.length > 1) {
            toast.error("Выберите только один файл");
            return;
        }

        const reader = new FileReader();
        reader.readAsText(e.dataTransfer.items[0].getAsFile()!);
        reader.onload = () => {
            markupDispatch({ type: "TEXT", payload: reader.result as string });
        };
    }

    function handleFileDragOver(e: DragEvent<HTMLTextAreaElement>) {
        e.preventDefault();
        e.currentTarget.classList.add("file-form__file-area_file-over");
    }

    function handleFileDragLeave(e: DragEvent<HTMLTextAreaElement>) {
        e.preventDefault();
        e.currentTarget.classList.remove("file-form__file-area_file-over");
    }

    return (
        <form className="text-viewer" onSubmit={handleSubmit}>
            <textarea
                className="text-viewer__textarea"
                name="text"
                id="text-viewer_text"
                placeholder="Вставьте текст..."
                value={markup.text || ""}
                onChange={(e) =>
                    markupDispatch({ type: "TEXT", payload: e.target.value })
                }
                onDrop={handleFileDrop}
                onDragOver={handleFileDragOver}
                onDragLeave={handleFileDragLeave}
            ></textarea>
            <div className="text-viewer__file-loader">
                <label
                    className="text-viewer__file-loader__label"
                    htmlFor="text-viewer__file"
                >
                    Загрузить файл
                </label>
                <input
                    type="file"
                    name="file"
                    id="text-viewer__file"
                    onChange={hadleFileLoad}
                    hidden
                />
            </div>
            <button className="text-viewer__submit submit-button" type="submit">
                {submitText}
            </button>
        </form>
    );
}
