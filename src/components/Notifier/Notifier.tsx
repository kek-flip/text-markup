import { useEffect } from "react";
import { useMarkup } from "../../contexts/MarkupProvider/MarkupProvider";

export default function Notifier() {
    const markup = useMarkup();
    useEffect(() => {
        if (markup.error) alert(markup.error);
    }, [markup.error]);
    return <></>;
}
