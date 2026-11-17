import { useEffect } from "react";
import { Hero } from "../components/Hero";
import { Mirror } from "../components/Mirror";
import { Manifesto } from "../components/Manifesto";
import { Themes } from "../components/Themes";
import { About } from "../components/About";
import { Process } from "../components/Process";
import { Online } from "../components/Online";
import { Reviews } from "../components/Reviews";
import { Faq } from "../components/Faq";
import { Contact } from "../components/Contact";

export const HOME_TITLE = "Psicóloga online | Psicanálise para adultos no Brasil e exterior · Nailza Costa";

export default function Home() {
  useEffect(() => {
    document.title = HOME_TITLE;
  }, []);
  return (
    <>
      <Hero />
      <Mirror />
      <Manifesto />
      <Themes />
      <About />
      <Process />
      <Online />
      <Reviews />
      <Faq />
      <Contact />
    </>
  );
}
