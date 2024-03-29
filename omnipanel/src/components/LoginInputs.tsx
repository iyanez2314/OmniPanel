"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Icons } from "./icons";
import { signIn } from "next-auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function LoginInputs({
  className,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessag] = React.useState<string>("");

  async function onSubmit(
    event: React.FormEvent<HTMLFormElement>,
    provider: string,
  ) {
    console.log("provider", provider);
    event.preventDefault();

    console.log("here before submit");

    // Sign in Request
    console.log("here in conditional sign in");
    setIsLoading(true);
    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;

    const signUserIn = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!signUserIn) {
      console.log("error singin in");
      setIsLoading(false);
      setError(true);
      setErrorMessag("Something went wrong. Please Try Again Later.");
      return;
    }

    console.log("signUserIn", signUserIn);
    setIsLoading(false);
    return;

    // Sign up Request
    // const email = event.currentTarget.email.value;
    // const password = event.currentTarget.password.value;

    // setIsLoading(true);
    // const request = await fetch("api/user", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ email, password }),
    // });

    // if (request.status !== 200) {
    //   console.log("error", request);
    //   setIsLoading(false);
    //   setError(true);
    //   setErrorMessag("Something went wrong. Please Try Again Later.");
    // }

    // console.log("request", request.json());
    // setIsLoading(false);
    // return;
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Tabs defaultValue="account" className="h-full w-full ">
        <TabsList className="w-full bg-black ">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign up</TabsTrigger>
        </TabsList>
        {/* Form to sign in */}
        <TabsContent value="signin" className="">
          <div className="flex flex-col gap-3 p-10">
            <form onSubmit={(e) => onSubmit(e, "singin")}>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <Label className="sr-only" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                  />
                  <Label className="sr-only" htmlFor="email">
                    Password
                  </Label>
                  <Input
                    id="password"
                    placeholder="Password"
                    type="password"
                    disabled={isLoading}
                  />
                </div>
                <Button disabled={isLoading}>
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Sign In with Email
                </Button>
              </div>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="text-muted-foreground bg-black px-2">
                  Or continue with
                </span>
              </div>
            </div>
            <Button
              onClick={() => signIn("discord")}
              variant="outline"
              type="button"
              disabled={isLoading}
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.discord className="mr-2 h-4 w-4" />
              )}{" "}
              Discord
            </Button>
            <Button
              onClick={() => signIn("google")}
              type="button"
              disabled={isLoading}
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.google className="mr-2 h-4 w-4" />
              )}{" "}
              Google
            </Button>
          </div>
        </TabsContent>
        {/* Signup Form */}
        <TabsContent value="signup" className="">
          <div className="flex flex-col gap-3 p-10">
            <form onSubmit={(e) => onSubmit(e, "signup")}>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <Label className="sr-only" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                  />
                </div>
                <div className="grid gap-1">
                  <Label className="sr-only" htmlFor="email">
                    Password
                  </Label>
                  <Input
                    id="password"
                    placeholder="Password"
                    type="password"
                    disabled={isLoading}
                  />
                </div>
                <div className="grid gap-1">
                  <Label className="sr-only" htmlFor="email">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirm-password"
                    placeholder="Confirm Password"
                    type="password"
                    disabled={isLoading}
                  />
                </div>
                <Button disabled={isLoading}>
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Sign up with Email
                </Button>
              </div>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="text-muted-foreground bg-black px-2">
                  Or continue with
                </span>
              </div>
            </div>
            <Button
              onClick={() => signIn("discord")}
              variant="outline"
              type="button"
              disabled={isLoading}
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.discord className="mr-2 h-4 w-4" />
              )}{" "}
              Discord
            </Button>
            <Button
              onClick={() => signIn("google")}
              type="button"
              disabled={isLoading}
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.google className="mr-2 h-4 w-4" />
              )}{" "}
              Google
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
