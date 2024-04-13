import "./TextViewer.scss";

export interface TextViewerProps {
    text: string;
}

export default function TextViewer({ text }: TextViewerProps) {
    return <div className="text-viewer">{text}</div>;
}
