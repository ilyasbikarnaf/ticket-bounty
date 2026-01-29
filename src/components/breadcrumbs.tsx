import { LucideSlash } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type BreadcrumbProps = {
  breadcrumbs: {
    title: string;
    href?: string;
  }[];
};

export function Breadcrumbs({ breadcrumbs }: BreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => {
          let breadcrumbItem = (
            <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
          );

          if (breadcrumb.href) {
            breadcrumbItem = (
              <BreadcrumbLink asChild>
                <Link href={breadcrumb.href}>{breadcrumb.title}</Link>
              </BreadcrumbLink>
            );
          }

          return (
            <Fragment key={`${breadcrumb.title}-${index}`}>
              <BreadcrumbItem>{breadcrumbItem}</BreadcrumbItem>
              {index < breadcrumbs.length - 1 && (
                <BreadcrumbSeparator>
                  <LucideSlash className="size-4" />
                </BreadcrumbSeparator>
              )}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
