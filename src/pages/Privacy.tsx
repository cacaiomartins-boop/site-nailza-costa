import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { clinic } from "../data/clinic";

export default function Privacy() {
  const h = "mt-10 font-display text-[1.7rem] text-ink";
  return (
    <section className="bg-cream pb-24 pt-36 sm:pt-44">
      <Seo title={clinic.seo.privacyTitle} description={clinic.seo.privacyDescription} path="/privacidade" />
      <div className="container-site max-w-[46rem]">
        <p className="text-[.75rem] font-medium uppercase tracking-[.3em] text-bronze">Privacidade</p>
        <h1 className="mt-4 text-[clamp(2.4rem,5vw,3.8rem)]">Política de privacidade</h1>
        <p className="mt-6">
          Esta página explica, de forma simples, como os dados são tratados neste site, de acordo com a Lei Geral de
          Proteção de Dados (LGPD, Lei nº 13.709/2018).
        </p>
        <h2 className={h}>Quais dados são coletados</h2>
        <p className="mt-3">
          O site não tem cadastro nem armazena dados em servidor próprio. O formulário de contato apenas monta uma
          mensagem de WhatsApp com o nome e as preferências que você digitar. Essa mensagem só é enviada se você
          decidir enviar pelo próprio WhatsApp. Não peço informações sobre a sua saúde por aqui.
        </p>
        <h2 className={h}>Para que servem</h2>
        <p className="mt-3">Os dados informados servem apenas para que eu possa retornar o seu contato e combinar o atendimento.</p>
        <h2 className={h}>Cookies e medição</h2>
        <p className="mt-3">
          O site pode usar ferramentas de medição de acesso (como o Google Analytics) para entender, de forma agregada,
          como as pessoas chegam e navegam. Você pode limitar ou bloquear cookies nas configurações do seu navegador.
        </p>
        <h2 className={h}>Serviços de terceiros</h2>
        <p className="mt-3">
          Ao clicar nos botões de WhatsApp ou no link do Doctoralia, você sai deste site e passa a ser regido pelas
          políticas dessas plataformas. As fontes são servidas pelo próprio site.
        </p>
        <h2 className={h}>Sigilo profissional</h2>
        <p className="mt-3">
          O que é conversado durante o atendimento psicológico é protegido pelo sigilo profissional, conforme o Código
          de Ética Profissional do Psicólogo.
        </p>
        <h2 className={h}>Seus direitos</h2>
        <p className="mt-3">
          Você pode pedir acesso, correção ou exclusão dos dados que tenha me enviado, pelo WhatsApp{" "}
          {clinic.whatsappDisplay}.
        </p>
        <p className="mt-10">
          <Link to="/" className="link-underline font-medium text-wine">Voltar ao início</Link>
        </p>
        {/* TODO: revisar este texto com a Nailza (e incluir o canal de e-mail, se ela tiver um) */}
      </div>
    </section>
  );
}
