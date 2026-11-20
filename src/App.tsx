import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Loader } from "./components/Loader";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import Home from "./pages/Home";
import ThemePage from "./pages/ThemePage";
import Privacy from "./pages/Privacy";
import { ScrollTrigger, getLenis, initLenis } from "./motion/setup";

function ScrollManager() {
  const { pathname } = useLocation();
  useEffect(() => {
    const l = getLenis();
    if (l) l.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => window.clearTimeout(t);
  }, [pathname]);
  return null;
}

export default function App() {
  useEffect(() => {
    initLenis();
    (window as unknown as { __motionReady: boolean }).__motionReady = true;
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <BrowserRouter>
      <ScrollManager />
      <Loader />
      <Header />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terapia/:slug" element={<ThemePage />} />
          <Route path="/privacidade" element={<Privacy />} />
          <Route path="*" element={<Home notFound />} />
        </Routes>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </BrowserRouter>
  );
}
