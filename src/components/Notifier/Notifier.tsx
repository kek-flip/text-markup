export interface NotifierProps {
    error?: string;
}

export default function Notifier({ error }: NotifierProps) {
    if (error) alert(error);
    return <></>;
}
