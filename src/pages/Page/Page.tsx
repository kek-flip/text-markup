import "./Page.scss";

export interface PageProps {
    children: JSX.Element;
}

export default function Page({ children }: PageProps) {
    return (
        <div className="page-container">
            <header className="header">Cluster text</header>
            {children}
        </div>
    );
}
