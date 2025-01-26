"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import notFoundImage from "@/public/404.jpeg";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col h-full w-full justify-center items-center">
      <Image src={notFoundImage} alt="Not found" width="300" height="300" />
      <h1 className="font-bold text-9xl py-8">404</h1>
      <h2 className="font-bold text-4xl py-8">
        Uh-oh! We could not find that page.
      </h2>
      <Link className={buttonVariants({ variant: "default" })} href="/">
        Go Home
      </Link>
    </div>
  );
}
