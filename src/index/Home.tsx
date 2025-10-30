import BotonSimple from "@components/Botones/BotonSimple";
import PageBase from "@components/PageBase/PageBase";

export default function Home() {
    

    return (
        <PageBase>
                <BotonSimple
                    title="Click me"
                    onClick={() => console.log(" Soy un botón de ui.shadcn")}
                />
        </PageBase>
    );
}