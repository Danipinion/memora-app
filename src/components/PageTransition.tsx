"use client";
import React from "react";
import { motion } from "framer-motion";

export const PageTransitionWhite = ({
  color = "white",
}: { color?: string } = {}) => {
  return (
    <motion.div
      className={`slide-in absolute top-0 left-0 w-full h-screen bg-white origin-bottom z-10`}
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0 }}
      transition={{ duration: 0.5, ease: "linear" }}
    ></motion.div>
  );
};
export const PageTransitionBlue = ({
  color = "white",
}: { color?: string } = {}) => {
  return (
    <motion.div
      className={`slide-in absolute top-0 left-0 w-full h-screen bg-[#6C63FF] origin-bottom z-10`}
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0 }}
      transition={{ duration: 0.5, ease: "linear" }}
    ></motion.div>
  );
};
