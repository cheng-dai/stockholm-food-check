"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  return (
    <div className="flex justify-between md:gap-10">
      <Link href="/">
        <h1 className="text-2xl text-green-600">Safe Savor</h1>
      </Link>
      <Link href={pathname === "/about" ? "/" : "/about"}>
        <h1 className="font-bold text-center text-white md:text-lg ">
          {pathname === "/about" ? "Search" : "About"}
        </h1>
      </Link>
    </div>
  );
}
