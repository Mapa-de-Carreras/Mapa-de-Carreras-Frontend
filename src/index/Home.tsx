import BotonSimple from "@components/Botones/BotonSimple";
import PageBase from "@components/PageBase/PageBase";

export default function Home() {
    return (
        <PageBase>
            <div className="flex min-h-svh flex-col items-center justify-center">
                <BotonSimple
                    title="Click me"
                    onClick={() => console.log(" Soy un botón de ui.shadcn")}
                />
            </div>
        </PageBase>
    );
}