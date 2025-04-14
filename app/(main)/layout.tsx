import NavigationSidebar from "@/components/navigations/navigation-sidebar";
import React from "react";

const serverLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-[72px] flex-col z-30 fixed inset-y-0 ">
        <NavigationSidebar />
      </div>
      <main className="md:pl-[72px] h-full ">{children}</main>
    </div>
  );
};

export default serverLayout;
