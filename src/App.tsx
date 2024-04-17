import { RouterProvider, createBrowserRouter } from "react-router-dom";
import TextPage from "./pages/TextPage/TextPage";
import MarkupPage from "./pages/MarkupPage/MarkupPage";
import MarkupProvider from "./contexts/MarkupProvider/MarkupProvider";

import "./App.scss";

const router = createBrowserRouter([
    {
        path: "/",
        element: <TextPage />,
    },
    {
        path: "/markup",
        element: <MarkupPage />,
    }
]);

export default function App() {
    return (
        <MarkupProvider>
            <RouterProvider router={router} />
        </MarkupProvider>
    );
}
