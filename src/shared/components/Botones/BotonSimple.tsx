import { Button } from "@components/ui/button";

interface BotonSimpleProps {
    title: string,
    onClick: () => void,
}

export default function BotonSimple({ title, onClick}: BotonSimpleProps) {
    return (
        <Button onClick={onClick}>
            {title}
        </Button>
    )
}