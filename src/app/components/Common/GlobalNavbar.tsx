"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function GlobalNavbar() {
  const currentRoute = usePathname();
  const linkNames = ["about", "posts", "projects"];

  return (
    <nav>
      <ul className="flex gap-5 text-lg">
        {linkNames.map((name) => (
          <li key={name}>
            <Link
              href={`/${name}`}
              className={`capitalize ${
                currentRoute.includes("/" + name) &&
                `underline decoration-sky-500 underline-offset-4`
              }`}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
