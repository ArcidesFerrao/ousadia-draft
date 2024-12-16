import { createContext, useContext, useEffect } from "react";

type Context = {
  trailingPath: string;
  setTrailingPath: (path: string) => void;
};

export const BreadcrumbsContext = createContext<Context>({
  trailingPath: "",
  setTrailingPath: () => {},
});

export const useBreadcrumbs = (trailingPath: string) => {
  const context = useContext(BreadcrumbsContext);

  useEffect(() => {
    context.setTrailingPath(trailingPath ? trailingPath : "loading");

    return () => context.setTrailingPath("");
  }, [trailingPath, context]);

  return <div>breadcrumbs-context</div>;
};
