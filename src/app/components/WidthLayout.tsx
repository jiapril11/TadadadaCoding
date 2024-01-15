import React from "react";

export default function WidthLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="w-full flex justify-center">
      <div
        className={`w-full min-w-[360px] max-w-[1200px] px-3 box-border ${
          className ? className : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}
