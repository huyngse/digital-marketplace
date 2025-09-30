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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/shared/PasswordInput";

const formSchema = z
  .object({
    email: z.email(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long!")
      .max(24, "Password must be less than 24 characters long!"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long!")
      .max(24, "Password must be less than 24 characters long!"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match!",
    path: ["confirmPassword"],
  });

type FieldType = z.infer<typeof formSchema>;

const SignUpPage = () => {
  const form = useForm<FieldType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: FieldType) => {
    console.log(values);
  };

  return (
    <>
      <div className="container flex pt-20 flex-col items-center justify-center">
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
              <Button className="w-full">Sign Up</Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
