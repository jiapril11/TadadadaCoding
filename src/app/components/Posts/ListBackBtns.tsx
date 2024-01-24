"use client";

import { useRouter } from "next/navigation";

export default function ListBackBtns() {
  const router = useRouter();
  return (
    <div className="flex justify-end items-center gap-2 mt-10 pt-20 border-t">
      <span className="text-gray-400">Go to</span>
      <button className="underline font-semibold" onClick={() => router.back()}>
        Back
      </button>
      <span className="text-gray-400">or</span>
      <button
        className="underline font-semibold"
        onClick={() => router.push("/posts")}
      >
        List
      </button>
      <span className="text-gray-400">?</span>
    </div>
  );
}
