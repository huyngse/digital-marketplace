import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowDownToLine, ShieldCheck, Star } from "lucide-react";
import Link from "next/link";
import React from "react";

const perks = [
  {
    name: "Instant Delivery",
    icon: ArrowDownToLine,
    description:
      "Get your assets delivered to your email in seconds and download them right away.",
  },
  {
    name: "Top Quality",
    icon: Star,
    description:
      "All assets are hand-picked and high-quality, so you get only the best content!",
  },
  {
    name: "Secure Payments",
    icon: ShieldCheck,
    description:
      "Your transactions are fully protected with industry-standard encryption.",
  },
];

const Home = () => {
  return (
    <>
      <MaxWidthWrapper className="py-20 text-center flex flex-col items-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl max-w-5xl">
          Your marketplace for high-quality{" "}
          <span className="text-primary">digital assets</span>.
        </h1>
        <p className="mt-5 text-lg max-w-prose text-muted-foreground">
          Welcome to Digital Marketplace. Every asset on our platform is
          verified by our team to ensure highest quality standards.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-5">
          <Link href={"/products"} className={buttonVariants()}>
            Browse Trending
          </Link>
          <Button variant={"ghost"} aria-label="Read more about our quality promise">Our quality promise →</Button>
        </div>
      </MaxWidthWrapper>
      <section className="border-t border-zinc-200 bg-gray-50">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => {
              return (
                <div
                  key={perk.name}
                  className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
                >
                  <div className="flex justify-center" aria-hidden>
                    <div className="size-16 flex justify-center items-center rounded-full bg-rose-100 text-primary">
                      {<perk.icon />}
                    </div>
                  </div>
                  <div className="mt-5 md:ml-3 md:mt-0 lg:ml-0 lg:mt-5">
                    <h2>{perk.name}</h2>
                    <p className="mt-3 text-sm text-muted-foreground">
                      {perk.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
};

export default Home;
