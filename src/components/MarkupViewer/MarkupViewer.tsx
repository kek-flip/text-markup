import "./MarkupViewer.scss";
export interface MarkupViewerProps {
    tags: string[];
    labels: string[];
    textClass: string;
}

export default function MarkupViewer({
    tags = [],
    labels = [],
    textClass,
}: MarkupViewerProps) {
    const items = [];
    for (let i = 0; i < tags.length; i++) {
        items.push({
            tag: tags[i],
            label: labels[i],
        });
    }

    return (
        <div className="markup-viewer">
            <div className="markup-viewer__text-class">
                <h3 className="markup-viewer__text-class__title">
                    Класс текста:
                </h3>
                <span className="markup-viewer__text-class__class-value">
                    {textClass}
                </span>
            </div>
            <div className="markup-viewer__tags-labels">
                <h3 className="markup-viewer__tags-labels__tags-title">Теги</h3>
                <h3 className="markup-viewer__tags-labels__labels-title">
                    Метки
                </h3>
                {items.map(({ tag, label }) => (
                    <>
                        <div key={tag} className="markup-viewer__tags-labels__tag">
                            {tag}
                        </div>
                        <div key={label} className="markup-viewer__tags-labels__label">
                            {label}
                        </div>
                    </>
                ))}
            </div>
        </div>
    );
}
