"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/shared/PasswordInput";
import { SignUpInput, signUpSchema } from "@/lib/schemas";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const SignUpPage = () => {
  const trpc = useTRPC();
  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const registerOptions = trpc.auth.createPayloadUser.mutationOptions();
  const register = useMutation(registerOptions);

  const onSubmit = async (values: SignUpInput) => {
    try {
      await register.mutateAsync({
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });
      form.reset();
      toast.success(`Account created successfully! You can now sign in.`);
    } catch (error: any) {
      toast.error(`Registration failed: ${error.message}`);
    }
  };

  return (
    <>
      <div className="container flex py-20 flex-col items-center justify-center px-2">
        <div className="w-full flex flex-col justify-center space-y-5 sm:w-[350px]">
          <div className="space-y-2 text-center">
            <img src="/rose.png" alt="" className="size-20 mx-auto" />
            <h1 className="text-2xl font-bold">Create an account</h1>
            <Link
              href={"/sign-in"}
              className={buttonVariants({ variant: "link" })}
            >
              Already have an account? Sign in
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" disabled={register.isPending}>
                {register.isPending ? "Signing up..." : "Sign Up"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
