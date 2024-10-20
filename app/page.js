import Image from "next/image";
import Navbar from "./_components/Navbar";
import Hero from "./_components/Hero";
import About from "./_components/About";
import FAQ from "./_components/FAQ";
import PaymentOptions from "./_components/PaymentOptions";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <PaymentOptions />
        <FAQ />
      </main>
    </>
  );
}
