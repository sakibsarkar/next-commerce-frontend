import Header from "@/components/shared/Header";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="w-full bg-[#f4f4f4]">
        <div className="layout_container">{children}</div>
      </main>
    </>
  );
};

export default layout;
