import { forwardRef } from "react";

import "./MarkupView.scss";

export interface MarkupViewProps {
    tags: string[];
    error: string | null;
}

const MarkupView = forwardRef<HTMLDivElement, MarkupViewProps>(
    function MarkupView({ tags, error }, ref) {
        return (
            <div className="tags" ref={ref}>
                <h3 className="tags__title">Tags</h3>
                {!error && tags.map((tag) => <span>{tag}</span>)}
            </div>
        );
    }
);

export default MarkupView;
