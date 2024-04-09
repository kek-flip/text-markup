import "./MarkupViewer.scss";

interface ItemsViewerProps {
    title: string;
    items: string[];
}

function ItemsViewer({ items, title }: ItemsViewerProps) {
    return (
        <div className="item-viewer">
            <h3 className="item-viewer__title">{title}</h3>
            <hr className="item-viewer__underline" />
            <div className="item-viewer__items">
                {items.map((item) => (
                    <span className="item-viewer__items__tag">{item}</span>
                ))}
            </div>
        </div>
    );
}

export interface MarkupViewerProps {
    tags?: string[];
    labels?: string[];
}

export default function MarkupViewer({
    tags = [],
    labels = [],
}: MarkupViewerProps) {
    return (
        <div className="markup-viewer">
            <ItemsViewer items={tags} title="Tags" />
            <ItemsViewer items={labels} title="Labels" />
        </div>
    );
}
