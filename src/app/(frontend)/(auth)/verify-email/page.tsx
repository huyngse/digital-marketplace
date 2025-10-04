import VerifyEmail from "@/components/auth/VerifyEmail";
import Image from "next/image";
import React from "react";

type Props = {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

const VerifyEmailPage = async ({ searchParams }: Props) => {
  const sp = await searchParams;
  const token = sp?.token;
  const toEmail = sp?.to;

  return (
    <div className="container flex pt-20 flex-col items-center justify-center px-2">
      <div className="w-full sm:w-[350px] space-y-5">
        {token && typeof token === "string" ? (
          <div className="">
            <VerifyEmail token={token} />
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center gap-y-1">
            <Image
              src={"/email.png"}
              width={240}
              height={240}
              alt="Email sent image"
            />
            <h2 className="font-semibold text-2xl -mt-5">Check Your Email</h2>
            <p className="text-muted-foreground text-center">
              We've sent a verification link to{" "}
              {toEmail ? (
                <span className="font-semibold">{toEmail}</span>
              ) : (
                "your email"
              )}
              .
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
