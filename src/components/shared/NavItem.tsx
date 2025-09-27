"use client";
import React from "react";
import { Button } from "../ui/button";
import { ProductCategory } from "@/types";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

interface NavItemProps {
  category: ProductCategory;
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
}

const NavItem = ({ category, onOpen, onClose, isOpen }: NavItemProps) => {
  return (
    <li>
      <Button onClick={onOpen} variant={isOpen ? "secondary" : "ghost"}>
        {category.label}
        <ChevronDown
          className={cn("size-4 transition-all text-muted-foreground", {
            "-rotate-180": isOpen,
          })}
        />
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute inset-x-0 top-full text-sm text-muted-foreground"
            )}
          >
            <ol className="mx-auto max-w-7xl px-8 py-16 grid grid-cols-3 gap-x-8 bg-white">
              {category.featured.map((item) => {
                return (
                  <li key={item.name} className="group text-base sm:text-sm">
                    <div className="relative aspect-video overflow-hidden rounded-lg bg-zinc-100 group-hover:opacity-75">
                      <Image
                        src={item.imageSrc}
                        alt="product category image"
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                    <Link
                      href={item.href}
                      className="mt-5 block font-medium text-zinc-900"
                      onClick={onClose}
                    >
                      {item.name}
                    </Link>
                    <p className="mt-1" aria-hidden>
                      Shop Now
                    </p>
                  </li>
                );
              })}
            </ol>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

export default NavItem;
