"use client";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { buttonVariants } from "../ui/button";

interface VerifyEmailProps {
  token: string;
}

const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const trpc = useTRPC();
  const verifyEmailOptions = trpc.auth.verifyEmail.mutationOptions();
  const verifyEmail = useMutation(verifyEmailOptions);

  useEffect(() => {
    if (token) {
      verifyEmail.mutate({ token });
    }
  }, [token]);

  if (verifyEmail.isPending) {
    return (
      <div className="flex flex-col gap-2 items-center text-center">
        <Loader2Icon className="size-24 animate-spin text-rose-500" />
        <h2 className="text-xl font-semibold mt-3">Verifying...</h2>
        <p className="text-muted-foreground text-sm">This won't take long</p>
      </div>
    );
  }

  if (verifyEmail.isError) {
    return (
      <div className="flex flex-col gap-2 items-center text-center">
        <XCircle className="size-24 text-red-600" />
        <h2 className="text-xl font-semibold mt-3">
          Oops! Verification failed
        </h2>
        <p className="text-muted-foreground text-sm">
          This token is not valid or might be expired. Please try again
        </p>
      </div>
    );
  }

  if (verifyEmail.isSuccess) {
    return (
      <div className="flex flex-col gap-2 items-center text-center">
        <Image
          src={"/email.png"}
          width={240}
          height={240}
          alt="Email sent image"
        />
        <h2 className="text-2xl font-semibold -mt-5">You're all set!</h2>
        <p className="text-muted-foreground text-sm">
          Thank you for verifying your email.
        </p>
        <Link href={"/sign-in"} className={buttonVariants({className: "mt-3"})}>
          Sign In
        </Link>
      </div>
    );
  }

  return null;
};

export default VerifyEmail;
