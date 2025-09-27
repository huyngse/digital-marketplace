"use client";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Cart = () => {
  const itemCount = 0;
  const fee = 0;
  return (
    <Sheet>
      <SheetTrigger className={buttonVariants({ variant: "ghost" })}>
        <ShoppingCart />
        <span className="text-sm font-medium">{itemCount}</span>
      </SheetTrigger>
      <SheetContent className="w-full lg:max-w-lg">
        <SheetHeader className="">
          <SheetTitle>Shopping Cart ({itemCount})</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <div className="px-5">
              <div className="flex flex-col gap-3">Cart items</div>
              <Separator className="my-4" />
              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <span>Shipping</span>
                  <span className="ml-auto">Free</span>
                </div>
                <div className="flex">
                  <span>Transaction Fee</span>
                  <span className="ml-auto">{formatPrice(fee)}</span>
                </div>
                <div className="flex">
                  <span>Total</span>
                  <span className="ml-auto">{formatPrice(fee)}</span>
                </div>
              </div>
            </div>
            <SheetFooter>
              <SheetTrigger asChild>
                <Link
                  href={"/cart"}
                  className={buttonVariants({ className: "w-full" })}
                >
                  Continue to Checkout
                </Link>
              </SheetTrigger>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-col h-full items-center justify-center gap-2">
            <div className="relative w-full max-w-[200px] aspect-square mb-4" aria-hidden="true">
              <Image src="/basket.png" alt="empty shopping cart" fill />
            </div>
            <p className="text-xl font-semibold text-muted-foreground">
              Your cart is empty
            </p>
            <SheetTrigger asChild>
              <Link
                href={"/producs"}
                className={buttonVariants({ variant: "link", size: "sm" })}
              >
                Add items to your cart to checkout
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
