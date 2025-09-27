import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import NavItems from "./NavItems";

const Navbar = () => {
  return (
    <nav className="bg-white sticky z-50 top-0 inset-x-0">
      <MaxWidthWrapper className="border-b border-zinc-200">
        <div className="flex h-16 items-center">
          <div className="ml-4 flex lg:ml-0">
            <Link href={"/"}>
              <img src="/rose.png" alt="" className="size-10" />
            </Link>
          </div>

          <div className="hidden lg:ml-8 lg:block">
            <NavItems />
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
