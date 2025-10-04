"use client";
import { PasswordInput } from "@/components/shared/PasswordInput";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignInInput } from "@/lib/schemas";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { TRPCClientError } from "@trpc/client";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SignInPage = () => {
  const form = useForm<SignInInput>();
  // const searchParams = useSearchParams();
  const trpc = useTRPC();

  const router = useRouter();
  // const isSeller = searchParams.get("as") === "seller";
  // const origin = searchParams.get("origin");

  const signInOptions = trpc.auth.signIn.mutationOptions();
  const signIn = useMutation(signInOptions);

  const onSubmit = async (values: SignInInput) => {
    try {
      await signIn.mutateAsync({
        email: values.email,
        password: values.password,
      });
      form.reset();
      toast.success("Sign in successfully!");
      router.push("/");
    } catch (error) {
      let message = "Sign in failed. Please try again.";
      if (error instanceof TRPCClientError) {
        const status = error.data.httpStatus;

        if (status === 400) {
          message = "Incorrect email or password.";
        } else if (status == 500) {
          message = "Server error. Please try again later.";
        }
      }
      toast.error(message);
    }
  };

  return (
    <div className="container flex py-20 flex-col items-center justify-center px-2">
      <div className="w-full flex flex-col justify-center space-y-5 sm:w-[350px]">
        <div className="space-y-2 text-center">
          <img src="/rose.png" alt="" className="size-20 mx-auto" />
          <h1 className="text-2xl font-bold">Sign in to your account</h1>
          <Link
            href={"/sign-up"}
            className={buttonVariants({ variant: "link" })}
          >
            Don't have an account? Sign up
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" disabled={false}>
              Sign In
            </Button>
          </form>
        </Form>

        <div
          className="flex items-center justify-center gap-2"
          aria-hidden="true"
        >
          <span className="border-b flex-1 border-zinc-300"></span>
          <span className="uppercase text-muted-foreground text-xs">or</span>
          <span className="border-b flex-1 border-zinc-300"></span>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
