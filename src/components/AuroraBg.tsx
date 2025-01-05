"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "motion/react";
import { ReactNode } from "react";

interface AuroraBackgroundProps {
  children: ReactNode;
}

export function AuroraBackgroundWrapper({ children }: AuroraBackgroundProps) {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col items-center justify-center gap-4 px-4"
      >
        {/* <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          Background lights are cool you know.
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          And this, is chemical burn.
        </div>
        <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
          Debug now
        </button> */}
        <div className="h-full w-full flex-grow">{children}</div>
      </motion.div>
    </AuroraBackground>
  );
}
