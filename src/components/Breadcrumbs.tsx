"use client";

import { BreadcrumbsContext } from "@/lib/breadcrumbs-context";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Children, ReactNode, useMemo, useState } from "react";
import arrow from "@/app//assets/round-arrow-right.png";
import Image from "next/image";

type BreadcrumbsContainerProps = {
  children: ReactNode;
  separator?: string | ReactNode;
};
type BreadcrumbsProps = {
  children: ReactNode;
  withHome: boolean;
};
type BreadcrumbItemProps = {
  children: ReactNode;
  href: string;
};

const BreadcrumbsItem = ({ children, href, ...props }: BreadcrumbItemProps) => {
  return (
    <li {...props}>
      <Link href={href}> {children} </Link>
    </li>
  );
};

const BreadcrumbsContainer = ({
  children,
  separator = <Image src={arrow} width={16} height={16} alt="arrow" />,
}: BreadcrumbsContainerProps) => {
  return (
    <nav className="breadcrumb-section justify-start px-8">
      <ol className="flex items-center ">
        {Children.map(children, (child, index) => (
          <>
            {child}
            {index < Children.count(children) - 1 ? (
              <span className="px-1 ">{separator}</span>
            ) : null}
          </>
        ))}
      </ol>
    </nav>
  );
};

export const Breadcrumbs = ({
  children,
  withHome = false,
}: BreadcrumbsProps) => {
  const paths = usePathname();

  const [trailingPath, setTrailingPath] = useState("");
  const context = useMemo(
    () => ({
      trailingPath,
      setTrailingPath,
    }),
    [trailingPath]
  );

  const pathNames = paths.split("/").filter((path) => path);
  const pathItems = pathNames.map((path, index) => ({
    name: path.replace(/\b\w/g, (char) => char.toUpperCase()),
    path: pathNames.slice(0, index + 1).join("/"),
  }));

  if (
    context.trailingPath &&
    pathItems.length > 0 &&
    context.trailingPath !== pathItems[pathItems.length - 1].name
  ) {
    pathItems[pathItems.length - 1].name = context.trailingPath;
  }

  return (
    <>
      {paths !== "/" && (
        <BreadcrumbsContainer>
          {withHome && <BreadcrumbsItem href="/">Home</BreadcrumbsItem>}
          {pathItems.map((item) => {
            return (
              <BreadcrumbsItem key={item.path} href={`/${item.path}`}>
                {item.name}
              </BreadcrumbsItem>
            );
          })}
        </BreadcrumbsContainer>
      )}
      <BreadcrumbsContext.Provider value={context}>
        {children}
      </BreadcrumbsContext.Provider>
    </>
  );
};
