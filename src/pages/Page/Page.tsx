import { ReactNode } from "react";
import "./Page.scss";

export interface PageProps {
    children: ReactNode;
}

export default function Page({ children }: PageProps) {
    return (
        <div className="page-container">
            <header className="header">Cluster text</header>
            <main className="main">{children}</main>
        </div>
    );
}
