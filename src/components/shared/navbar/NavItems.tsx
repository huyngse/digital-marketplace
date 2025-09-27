"use client";
import { PRODUCT_CATEGORIES } from "@/constants";
import React, { useEffect, useRef, useState } from "react";
import NavItem from "./NavItem";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const navRef = useRef<HTMLUListElement>(null);

  const handleClose = () => {
    setActiveIndex(null);
  };

  useOnClickOutside<HTMLUListElement>(navRef, handleClose);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key == "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);

  return (
    <ul className="flex gap-4" ref={navRef}>
      {PRODUCT_CATEGORIES.map((category, i) => {
        const handleOpen = () => {
          if (activeIndex == i) {
            setActiveIndex(null);
          } else {
            setActiveIndex(i);
          }
        };

        return (
          <NavItem
            key={category.value}
            category={category}
            onOpen={handleOpen}
            onClose={handleClose}
            isOpen={i == activeIndex}
          />
        );
      })}
    </ul>
  );
};

export default NavItems;
