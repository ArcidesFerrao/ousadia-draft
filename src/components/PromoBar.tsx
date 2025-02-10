"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { NavLink } from "./Nav";

export const PromoBar = ({
  id,
  name,
  discountAmount,
}: {
  id: string;
  name: string;
  discountAmount: number | null;
}) =>
  // { message, link }
  {
    const pathname = usePathname();

    if (pathname.startsWith("/admin")) return null;

    return (
      <motion.div
        className="px-3 w-full flex max-w-96 justify-center"
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        {/* <a href={link}>
            {message}
        </a> */}
        <span>
          {discountAmount}% de desconto -{" "}
          <NavLink href={`/produtos/${id}`}>&quot;{name}&quot;</NavLink>
        </span>
      </motion.div>
    );
  };
