"use client";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { XCircle } from "lucide-react";
import React, { useEffect } from "react";

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
    return <div className="text-center py-10">Verifying your email...</div>;
  }

  if (verifyEmail.isError) {
    return (
      <div className="flex flex-col gap-2 items-center text-center">
        <XCircle className="size-8 text-red-600" />
        <h2 className="text-xl font-semibold">Oops! Verification failed</h2>
        <p className="text-muted-foreground text-sm">
          This token is not valid or might be expired. Please try again
        </p>
      </div>
    );
  }

  if (verifyEmail.isSuccess) {
    return (
      <div className="text-center py-10 text-green-600">
        Your email has been verified successfully! You can now log in
      </div>
    );
  }

  return null;
};

export default VerifyEmail;
