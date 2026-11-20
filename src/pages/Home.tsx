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
import { Seo } from "../components/Seo";
import { clinic } from "../data/clinic";

// notFound: endereço que não existe. Mostra a mesma página, mas sem canonical e com noindex.
export default function Home({ notFound = false }: { notFound?: boolean }) {
  return (
    <>
      <Seo
        title={clinic.seo.homeTitle}
        description={clinic.seo.homeDescription}
        path={notFound ? null : "/"}
        noindex={notFound}
      />
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
