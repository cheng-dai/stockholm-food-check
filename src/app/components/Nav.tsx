"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  return (
    <div className="flex justify-between items-end md:justify-center md:gap-10">
      <Link href="/">
        <h1 className="text-2xl font-bold text-center my-10 ">
          Stockholm Food Check
        </h1>
      </Link>
      <Link href={pathname === "/about" ? "/" : "/about"}>
        <h1 className="font-bold text-center my-10 text-blue-500 md:text-lg ">
          {pathname === "/about" ? "Search" : "About"}
        </h1>
      </Link>
    </div>
  );
}
