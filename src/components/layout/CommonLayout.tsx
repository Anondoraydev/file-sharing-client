import type { ReactNode } from "react";
import Footer from "./Footer";
import { Navbar } from "@/components/layout/Navbar";


interface IProps {
  children: ReactNode;
}


export default function CommonLayout({ children }: IProps) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
