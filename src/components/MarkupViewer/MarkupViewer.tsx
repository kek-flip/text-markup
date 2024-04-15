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
                <thead className="item-viewer__markup-table__head">
                    <tr>
                        <th className="item-viewer__markup-table__head__item">
                            Tags
                        </th>
                        <th className="item-viewer__markup-table__head__item">
                            Labels
                        </th>
                    </tr>
                </thead>
                <tbody className="item-viewer__markup-table__body">
                    {items.map(({ tag, label }) => (
                        <tr
                            className="item-viewer__markup-table__body__row"
                            key={tag + label}
                        >
                            <td className="item-viewer__markup-table__body__item">
                                {tag}
                            </td>
                            <td className="item-viewer__markup-table__body__item item-viewer__markup-table__body__item_label">
                                {label}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

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
