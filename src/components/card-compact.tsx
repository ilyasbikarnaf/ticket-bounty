import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type CardCompactProps = {
  className?: string;
  title: string;
  description: string;
  content: React.ReactNode;
  footer?: React.ReactNode;
};

export default function CardCompact({
  className,
  title,
  description,
  content,
  footer,
}: CardCompactProps) {
  return (
    <Card className={className}>
      <CardHeader className="gap-1">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>{content}</CardContent>

      {footer && (
        <CardFooter className="text-sm text-muted-foreground flex justify-between">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}
