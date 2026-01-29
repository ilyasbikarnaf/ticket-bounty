import { Separator } from "./ui/separator";

type HeadingProps = {
  title: string;
  description: string;
  tabs?: React.ReactElement;
};

export default function Heading({ tabs, title, description }: HeadingProps) {
  return (
    <>
      {tabs}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <Separator />
    </>
  );
}
