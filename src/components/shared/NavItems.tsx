"use client";
import { PRODUCT_CATEGORIES } from "@/constants";
import React, { useState } from "react";
import NavItem from "./NavItem";

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  const handleClose = () => {
    setActiveIndex(null);
  };

  return (
    <ul className="flex gap-4">
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
