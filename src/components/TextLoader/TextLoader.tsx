import { useState } from "react";
import Chooser from "../Chooser/Chooser";
import TextForm from "../TextForm/TextForm";

import "./TextLoader.scss";

export type TextSource = "text" | "file" | "link";

export interface TextLoaderProps {
    onText?: (text: string) => void;
}

export default function TextLoader({ onText }: TextLoaderProps) {
    const textSourses: TextSource[] = ["text", "link", "file"];
    const [textSource, setTextSource] = useState<TextSource>("text");

    return (
        <div className="text-loader">
            <Chooser
                options={textSourses}
                startOption={textSource}
                onChoose={(textSrc) => setTextSource(textSrc as TextSource)}
            />

            <TextForm submitText="Get markup" onText={onText} />
        </div>
    );
}
