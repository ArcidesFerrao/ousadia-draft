"use client";

import React from "react";
import { motion } from "framer-motion";

export const PromoBar = () =>
  // { message, link }
  {
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
        Get 10% off...
      </motion.div>
    );
  };
