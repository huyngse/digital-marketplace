import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Link from "next/link";
import NavItems from "./NavItems";
import { buttonVariants } from "@/components/ui/button";
import Cart from "../cart/Cart";

const Navbar = () => {
  const user = null;
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

          <div className="ml-auto flex items-center gap-3">
            {user ? (
              <>
                <span className="h-6 w-px bg-zinc-200" aria-hidden="true" />
              </>
            ) : (
              <>
                <Link
                  href={"/sign-in"}
                  className={buttonVariants({ variant: "ghost" })}
                >
                  Sign In
                </Link>
                <span className="h-6 w-px bg-zinc-200" aria-hidden="true" />
                <Link
                  href={"/sign-up"}
                  className={buttonVariants({ variant: "ghost" })}
                >
                  Sign Up
                </Link>
                <span className="h-6 w-px bg-zinc-200" aria-hidden="true" />
              </>
            )}
            <div>
              <Cart />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
