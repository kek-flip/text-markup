import "./MarkupViewer.scss";

interface ItemsViewerProps {
    tags: string[];
    labels: string[];
}

function ItemsViewer({ tags, labels }: ItemsViewerProps) {
    const items = [];
    for (let i = 0; i < tags.length; i++)
        items.push({
            tag: tags[i],
            label: labels[i],
        });

    return (
        <div className="item-viewer">
            <h3 className="item-viewer__title">Markup</h3>
            <table className="item-viewer__markup-table">
                <tbody>
                    {items.map(({ tag, label }) => (
                        <tr key={tag + label}>
                            <td>{tag}</td>
                            <td>{label}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export interface MarkupViewerProps {
    tags?: string[];
    labels?: string[];
    textClass?: string;
}

export default function MarkupViewer({
    tags = [],
    labels = [],
    textClass,
}: MarkupViewerProps) {
    return (
        <div className="markup-viewer">
            <div className="markup-viewer__text-class">
                <h3 className="markup-viewer__text-class__title">Class:</h3>
                <span className="markup-viewer__text-class__class-value">
                    {textClass}
                </span>
            </div>
            <ItemsViewer tags={tags} labels={labels} />
        </div>
    );
}
