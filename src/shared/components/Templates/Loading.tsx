import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@components/ui/empty";
import { Spinner } from "@components/ui/spinner";

type LoadingProps = {
    titulo: string,
    descripcion: string,
};

export function Loading({ titulo, descripcion }: LoadingProps) {
  return (
    <Empty className="w-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner />
        </EmptyMedia>
        <EmptyTitle>{titulo}</EmptyTitle>
        <EmptyDescription>
          {descripcion}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
