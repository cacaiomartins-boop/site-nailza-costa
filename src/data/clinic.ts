// =====================================================================
// TODOS OS TEXTOS, LINKS E DADOS DO SITE FICAM AQUI.
// Palavras entre *asteriscos* viram itálico colorido nos títulos.
// Itens marcados com TODO precisam ser confirmados com a Nailza.
// =====================================================================

export const clinic = {
  name: "Nailza Costa",
  first: "Nailza",
  role: "Psicóloga",
  // TODO confirmar: o Doctoralia mostra "CRP RJ 26271" (CRP-05 = Rio de Janeiro)
  crp: "CRP 05/26271",
  crpUrl: "https://cadastro.cfp.org.br/",
  // TODO confirmar: é o telefone público do Doctoralia, (21) 99599-3581. Trocar se o WhatsApp for outro.
  whatsapp: "5521995993581",
  whatsappDisplay: "(21) 99599-3581",
  doctoralia: "https://www.doctoralia.com.br/perfil/nailza-costa",
  // TODO: domínio ainda não definido (ex.: nailzacosta.com.br). Preencher para ativar canonical/OG.
  siteUrl: "",
  // TODO: Instagram @psinailzacosta existe mas ela não alimenta; fica de fora até ela decidir.
  instagram: "",
  photoHero: "/img/nailza.webp",
  photoAbout: "/img/nailza-online.webp",
  emergency: "Em situação de emergência, ligue 188 (CVV) ou 192 (SAMU).",
  hero: {
    eyebrow: ["Psicanálise", "Adultos", "Online"],
    h1a: "Tem coisa que pesa mais",
    h1b: "quando se carrega em silêncio.",
    lead: "Psicoterapia online para adultos, no Brasil e no exterior. Uma escuta psicanalítica, acolhedora e sem julgamentos, para você compreender o que se repete e encontrar outros caminhos.",
    cta: "Começar meu processo",
    cue: "Role para conhecer",
  },
  mirror: {
    title: "Talvez você se reconheça *em algumas destas frases.*",
    lines: [
      "Estou longe de casa e, mesmo com gente por perto, sinto solidão.",
      "Minha cabeça não desliga e o peito vive apertado.",
      "Perdi alguém ou algo importante e sigo dizendo que está tudo bem.",
      "Repito o mesmo tipo de relação e acabo me machucando de novo.",
      "Cuido de todo mundo, mas de mim nunca sobra tempo.",
      "Um diagnóstico ou uma doença virou o centro da minha vida.",
    ],
    closing:
      "Se alguma dessas frases soou familiar, não há nada de errado com você. Existe uma história que merece ser escutada, sem pressa.",
    cta: "Quero conversar sobre isso",
  },
  manifesto: {
    left: "MANIFESTO",
    right: "NAILZA COSTA",
    text: "Cada pessoa carrega uma história que só faz sentido quando é escutada sem pressa, sem julgamento e sem receita pronta.",
    quote: "Escutar também é uma forma de cuidar.",
    values: ["Escutar", "Acolher", "Compreender", "Cuidar"],
  },
  themesIntro: {
    title: "Um espaço para compreender o que se repete *e construir outros caminhos.*",
    text: "Atendo adultos em psicoterapia online. Estes são alguns dos temas que mais chegam ao consultório virtual.",
    notFound: "Não encontrou o seu tema aqui?",
    notFoundText: "Cada história é única. Me conte em poucas palavras o que você vive e conversamos sobre como posso ajudar.",
  },
  about: {
    title: "Prazer, *eu sou a Nailza.*",
    paragraphs: [
      "Sou psicóloga e atendo adultos de forma 100% online, para quem mora em qualquer cidade do Brasil e também para brasileiros que vivem no exterior.",
      "Minha formação passa pela Psicanálise, pela Psicologia Médica (HUPE/UERJ) e pelo estudo dos transtornos alimentares. Isso me ajuda a olhar para a pessoa inteira: a história, as emoções e também o corpo e a saúde.",
      "Na terapia, o ritmo é o seu. Eu escuto com atenção, sem julgamentos, e construímos em conjunto um caminho sob medida para o que você está vivendo agora.",
    ],
    quote: "Escutar também é uma forma de cuidar.",
    signature: "NAILZA COSTA · PSICÓLOGA",
    stat: { value: 10, label: "avaliações verificadas no Doctoralia", note: "nota 5,0 de 5" },
    // TODO: não há anos de carreira confirmados. Se ela passar, trocar o cartão de número.
    sheet: [
      { k: "Formação", v: "Graduação em Psicologia · Especialização em Psicanálise · Especialização em Psicologia Médica (HUPE/UERJ) · Especialização em Transtornos alimentares" },
      // TODO confirmar o nome exato e a data de conclusão (ela disse: termina em março, no Einstein, em São Paulo)
      { k: "Em formação", v: "Neuropsicologia · Hospital Israelita Albert Einstein (conclusão prevista para março)" },
      { k: "Atendimento", v: "Psicoterapia online para adultos · Brasil e exterior" },
    ],
    registerLabel: "Registro profissional",
    cta: "Agendar minha primeira sessão",
  },
  process: {
    title: "Começar pode ser *mais simples do que parece.*",
    text: "Sem burocracia e sem pressão. Você escolhe o ritmo e eu explico cada passo.",
    steps: [
      { t: "Uma mensagem", d: "Você me chama no WhatsApp e combinamos dia, horário e o formato da conversa. Quem mora fora do Brasil combina o horário já considerando o fuso." },
      { t: "A primeira sessão", d: "Sem pressa e sem julgamentos. É um encontro para você contar o que a trouxe até aqui e para nos conhecermos." },
      { t: "Um caminho sob medida", d: "A partir da sua história, pensamos em conjunto no que faz sentido trabalhar e em que ritmo." },
      { t: "Sessões regulares", d: "Combinamos a frequência que cabe na sua rotina e seguimos, com espaço para ajustar quando for preciso." },
    ],
    cta: "Dar o primeiro passo",
    closing: "Você decide, a cada passo, se e como quer seguir.",
  },
  online: {
    eyebrow: "ONLINE",
    title: "Um espaço de cuidado *onde você estiver.*",
    text: "O consultório da Nailza é 100% online. Você só precisa de um lugar reservado, uma conexão estável e fones de ouvido.",
    cardTitle: "Terapia online",
    cardText: "As sessões acontecem por videochamada, em uma plataforma segura, com o mesmo cuidado e sigilo de um atendimento presencial.",
    items: [
      "Videochamada em plataforma segura, com horário marcado",
      "Basta um lugar reservado e fones de ouvido",
      "Atendimento para todo o Brasil, conforme as normas do Conselho Federal de Psicologia",
    ],
    chips: ["Hora marcada", "Sem deslocamento", "Sigilo profissional"],
    abroadTitle: "Terapia online para brasileiros no exterior",
    abroadText: "Terapia em português, com horários combinados conforme o seu fuso, para quem sente saudade, solidão ou o peso de recomeçar longe de casa.",
    abroadCta: "Quero atendimento no exterior",
    cta: "Agendar terapia online",
    seal: "TERAPIA ONLINE · BRASIL E EXTERIOR · ",
  },
  reviews: {
    title: "O cuidado, *nas palavras de quem já passou por aqui.*",
    rating: "5,0",
    count: 10,
    countLabel: "avaliações no Doctoralia",
    note: "Trechos de avaliações públicas e verificadas no Doctoralia. Para preservar o sigilo, mostro apenas as iniciais.",
    pause: "Pausar o movimento das avaliações",
    play: "Retomar o movimento das avaliações",
    items: [
      { q: "Uma profissional incrível e muito atenciosa, estou gostando muito do tratamento.", who: "A." },
      { q: "A Doutora é uma querida, boas explicações e muito profissional.", who: "K." },
      { q: "Sempre me prestou suporte quando precisei, uma das melhores profissionais que já tive me atendendo.", who: "C. K." },
      { q: "Escolher iniciar a terapia foi uma das melhores escolhas que eu já fiz por mim.", who: "J." },
      { q: "Maravilhosa. Já faço acompanhamento desde 2021 e sou hoje outra pessoa.", who: "B. C." },
      { q: "Profissional atenciosa e que conduz o atendimento de forma leve e sensível.", who: "C. N." },
      { q: "Ela é uma profissional muito atenciosa, ética e competente.", who: "I. P. F. B." },
      { q: "Ótimo atendimento, e está sendo muito eficaz, não tenho uma terapeuta e sim uma amiga.", who: "R. F." },
      { q: "Profissional muito competente! Além do conhecimento técnico é muito acolhedora.", who: "C." },
    ],
  },
  faqIntro: {
    title: "Antes de começar, *talvez você se pergunte…*",
    text: "Reuni aqui as dúvidas mais comuns. Se a sua não estiver na lista, é só me chamar.",
    cta: "Ainda tenho uma dúvida",
  },
  faq: [
    { q: "Como é a primeira sessão?", a: "É uma conversa sem pressa. Você conta o que a trouxe até aqui, eu faço perguntas para entender o seu momento e explico como o trabalho acontece. Não existe resposta certa nem errada, e você decide se quer seguir." },
    { q: "A terapia online funciona de verdade?", a: "Sim. As sessões por videochamada permitem o mesmo vínculo, a mesma escuta e o mesmo sigilo de um consultório. Para muita gente, a praticidade ajuda a manter a regularidade, que é o que mais faz diferença." },
    { q: "Moro fora do Brasil. Posso fazer terapia com você?", a: "Posso, sim. Atendo brasileiros que vivem no exterior, em português, e combinamos os horários considerando o seu fuso. Você só precisa de uma conexão estável e de um lugar reservado." },
    { q: "Quanto custa e quais são as formas de pagamento?", a: "Os valores e as formas de pagamento são informados pelo WhatsApp, de forma reservada. Também emito recibo, que você pode usar para pedir reembolso ao seu plano de saúde, se ele oferecer esse benefício." },
    { q: "Como funciona o sigilo?", a: "O sigilo é parte essencial do trabalho e é regulado pelo Código de Ética do Psicólogo. O que é conversado nas sessões fica entre nós." },
    { q: "Preciso estar em crise para começar?", a: "Não. Muitas pessoas procuram a terapia para se conhecer melhor, atravessar uma fase difícil ou entender padrões que se repetem. Você pode começar a qualquer momento." },
    { q: "Qual é a frequência e a duração das sessões?", a: "Combinamos em conjunto, de acordo com o seu momento e a sua rotina. Costuma ser um encontro por semana, mas isso pode ser ajustado ao longo do processo." },
    { q: "Quanto tempo dura o processo?", a: "Não existe um prazo único: cada história tem o seu tempo. Vamos avaliando em conjunto, ao longo das sessões, o que você precisa e como se sente." },
    { q: "Qual é a sua abordagem?", a: "Meu trabalho parte da escuta psicanalítica, que dá atenção ao que você sente, ao que repete e ao que ainda não conseguiu colocar em palavras, e conta com a minha formação em Psicologia Médica para acolher também as questões ligadas à saúde." },
  ],
  contact: {
    title: "Dar o primeiro passo *pode ser só uma mensagem.*",
    text: "Me conte, em poucas palavras, o que você está vivendo. Respondo assim que terminar os atendimentos.",
    cta: "Enviar uma mensagem",
    line: "WhatsApp (21) 99599-3581 · Online para todo o Brasil e exterior",
    cardTitle: "Prefere que eu te chame?",
    cardText: "Deixe seu nome e as suas preferências. Ao enviar, o WhatsApp abre com a mensagem pronta.",
    seal: "Online para todo o Brasil",
    privacy: "Não peço informações sobre a sua saúde por aqui. Seus dados servem apenas para o retorno do contato.",
  },
  footer: {
    tagline: "Mais escuta. *Mais leveza. Mais você.*",
  },
};

export const waLink = (text: string) =>
  `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(text)}`;

const hi = `Olá, ${clinic.first}! Vim pelo site e `;
export const msg = {
  header: hi + "gostaria de agendar uma conversa.",
  general: hi + "gostaria de agendar um horário para terapia.",
  online: hi + "gostaria de saber como funciona a terapia online.",
  abroad: hi + "moro no exterior e gostaria de saber como funciona a terapia online.",
  doubt: hi + "tenho uma dúvida antes de agendar:",
  mirror: hi + "me reconheci em algumas daquelas frases e gostaria de conversar.",
  about: hi + "gostaria de agendar minha primeira sessão.",
  hero: hi + "gostaria de começar meu processo de terapia.",
  step: hi + "gostaria de dar o primeiro passo e agendar uma conversa.",
  contact: hi + "gostaria de enviar uma mensagem.",
  other: hi + "gostaria de conversar sobre um tema que não encontrei no site.",
  theme: (t: string) => hi + `me identifiquei com o tema ${t}. Gostaria de agendar um horário.`,
};

export type ThemeIcon =
  | "globe" | "wind" | "cloud" | "feather" | "heart" | "steth" | "utensils" | "users";

export type Theme = {
  slug: string;
  n: string;
  label: string;
  icon: ThemeIcon;
  title: string; // card
  short: string;
  cta: string;
  pageH1a: string;
  pageH1b: string;
  lead: string;
  mirror: string[];
  paths: { t: string; d: string }[];
  approach: string;
  faq: { q: string; a: string }[];
};

export const themes: Theme[] = [
  {
    slug: "brasileiros-no-exterior",
    n: "01",
    label: "Brasileiros no exterior",
    icon: "globe",
    title: "Morar fora trouxe *saudade, solidão ou cansaço?*",
    short: "Terapia online em português, com horários combinados conforme o seu fuso, para quem vive longe do Brasil.",
    cta: "Conversar sobre isso",
    pageH1a: "Longe de casa,",
    pageH1b: "perto de si.",
    lead: "Recomeçar em outro país mexe com a identidade, com os vínculos e com o corpo. Aqui você encontra um espaço em português para falar do que não cabe em outra língua.",
    mirror: [
      "Tenho uma vida organizada por fora e uma saudade que não passa por dentro.",
      "Falo outra língua o dia todo, mas só em português consigo dizer o que sinto.",
      "Não sei mais onde é a minha casa.",
      "Sinto culpa por estar longe de quem eu amo.",
    ],
    paths: [
      { t: "Falar na sua língua", d: "Nomear emoções em português costuma abrir caminhos que a segunda língua não alcança." },
      { t: "Atravessar a mudança", d: "Entender as perdas e os ganhos de ter partido, sem apressar nenhuma decisão." },
      { t: "Cuidar dos vínculos à distância", d: "Pensar como se relacionar com a família, os amigos e a vida que ficou no Brasil." },
    ],
    approach: "Os encontros são online, em horários combinados conforme o seu fuso horário. O trabalho parte da escuta psicanalítica: no seu ritmo, a gente investiga o que a mudança despertou e o que ela repete da sua história.",
    faq: [
      { q: "Como combinamos o horário morando em outro fuso?", a: "Pelo WhatsApp, vemos a janela que funciona para os dois lados e fixamos um dia e horário regulares." },
      { q: "A terapia é em português?", a: "Sim. Todo o atendimento é em português." },
    ],
  },
  {
    slug: "ansiedade-e-angustia",
    n: "02",
    label: "Ansiedade e angústia",
    icon: "wind",
    title: "A cabeça não desliga *e o corpo sente?*",
    short: "Preocupação constante, aperto no peito, medo sem motivo claro: um espaço para entender o que a ansiedade quer dizer.",
    cta: "Quero cuidar de mim",
    pageH1a: "A cabeça não para.",
    pageH1b: "E o corpo avisa.",
    lead: "A ansiedade costuma chegar como cansaço, aperto, insônia e pensamentos em loop. Em terapia, você aprende a escutar o que ela está tentando comunicar.",
    mirror: [
      "Vivo me preparando para o pior.",
      "Sinto o coração disparar e não sei explicar por quê.",
      "Não consigo descansar nem quando tudo está bem.",
      "Tenho medo de decepcionar e de errar.",
    ],
    paths: [
      { t: "Entender o que dispara", d: "Reconhecer as situações, os pensamentos e as histórias por trás da ansiedade." },
      { t: "Dar nome ao que se sente", d: "Transformar o aperto em palavras tira parte do peso que ele tem." },
      { t: "Construir mais respiro", d: "Encontrar, no seu ritmo, outras formas de lidar com a pressão do dia a dia." },
    ],
    approach: "Escuto a ansiedade como um sintoma com sentido, e não só como algo a ser eliminado. Se for necessário, converso com você sobre a importância de acompanhamento médico em paralelo.",
    faq: [
      { q: "Ansiedade tem cura?", a: "Não prometo cura. O que a terapia oferece é compreensão e recursos para que a ansiedade deixe de comandar a sua vida." },
      { q: "A terapia substitui o remédio?", a: "Não. A decisão sobre medicação é do médico. A terapia caminha junto, quando for o caso." },
    ],
  },
  {
    slug: "depressao-e-humor",
    n: "03",
    label: "Depressão e humor",
    icon: "cloud",
    title: "Tudo ficou *mais pesado e sem cor?*",
    short: "Tristeza que não passa, desânimo e oscilações de humor merecem escuta e cuidado, sem julgamento.",
    cta: "Conversar sobre isso",
    pageH1a: "Quando tudo parece",
    pageH1b: "mais pesado e sem cor.",
    lead: "A tristeza profunda e as oscilações de humor não são fraqueza nem falta de vontade. São sinais de que algo precisa de cuidado e de companhia.",
    mirror: [
      "Perdi o interesse até pelo que eu gostava.",
      "Acordo cansado(a) e sigo no automático.",
      "Tenho dias de muita energia e dias em que não consigo levantar.",
      "Sinto que sou um peso para os outros.",
    ],
    paths: [
      { t: "Ser escutado(a) sem pressa", d: "Um lugar onde você pode dizer o que sente sem ter de se justificar." },
      { t: "Compreender a história", d: "Ligar o que sente de agora com perdas, expectativas e experiências anteriores." },
      { t: "Reconstruir passos pequenos", d: "Recuperar, aos poucos, o contato com o que dá sentido ao seu dia." },
    ],
    approach: "O trabalho é conduzido com acolhimento e atenção ao seu ritmo. Quando necessário, converso com você sobre o cuidado conjunto com psiquiatra. Se você pensa em se machucar, procure ajuda imediata: ligue 188 (CVV) ou 192 (SAMU).",
    faq: [
      { q: "Preciso de psiquiatra além da terapia?", a: "Depende de cada caso. Quando isso fizer sentido, conversamos sobre a importância de uma avaliação médica." },
      { q: "E se eu estiver muito mal?", a: "Em situação de emergência, ligue 188 (CVV) ou 192 (SAMU). A terapia não substitui o atendimento de urgência." },
    ],
  },
  {
    slug: "luto-e-perdas",
    n: "04",
    label: "Luto e perdas",
    icon: "feather",
    title: "Como seguir *depois de uma perda?*",
    short: "Perder alguém, uma relação ou uma fase da vida pede tempo e companhia. O luto não precisa ser vivido sozinho.",
    cta: "Quero ser escutado(a)",
    pageH1a: "O luto tem tempo próprio.",
    pageH1b: "E não precisa ser solitário.",
    lead: "Há perdas que ninguém vê: de um vínculo, de um sonho, de uma versão de si. A terapia oferece um lugar para elas serem reconhecidas.",
    mirror: [
      "Todo mundo espera que eu já esteja bem.",
      "Tenho medo de esquecer quem se foi.",
      "Choro sem aviso e depois me sinto culpado(a).",
      "Perdi algo que ninguém entende como perda.",
    ],
    paths: [
      { t: "Dar lugar à dor", d: "Reconhecer o que foi perdido e o que isso significa para você." },
      { t: "Respeitar o seu tempo", d: "O luto não segue calendário. Aqui não há pressa para passar." },
      { t: "Reencontrar a vida", d: "Aos poucos, abrir espaço para lembranças sem que elas paralisem." },
    ],
    approach: "Minha formação em Psicologia Médica e a experiência com adoecimento e fim de vida me aproximam do tema. Acolho o luto por morte e também por separações, mudanças e outras perdas.",
    faq: [
      { q: "Existe um tempo certo para o luto?", a: "Não. Cada pessoa vive o luto de um jeito. Na terapia, o ritmo é o seu." },
      { q: "Atende luto por perdas que não são de morte?", a: "Sim. Separações, mudanças, perdas de saúde e de projetos também pedem elaboração." },
    ],
  },
  {
    slug: "relacionamentos-e-autoestima",
    n: "05",
    label: "Relacionamentos e autoestima",
    icon: "heart",
    title: "Por que as relações *repetem a mesma dor?*",
    short: "Dependência afetiva, términos, conflitos e baixa autoestima: entender o que se repete é o primeiro passo para mudar.",
    cta: "Quero compreender isso",
    pageH1a: "Muda a pessoa, muda o cenário.",
    pageH1b: "E a história parece a mesma.",
    lead: "Muitas vezes o sofrimento nos vínculos aponta para algo mais antigo. Em terapia, você pode olhar para esse padrão com cuidado e sem culpa.",
    mirror: [
      "Me anulo para não perder a pessoa.",
      "Não consigo terminar, mesmo sofrendo.",
      "Sinto que nunca sou suficiente.",
      "Já me vi em relações que me machucavam e demorei a perceber.",
    ],
    paths: [
      { t: "Reconhecer o padrão", d: "Identificar o que se repete e de onde isso vem." },
      { t: "Fortalecer a autoestima", d: "Construir uma relação mais gentil com quem você é." },
      { t: "Estabelecer limites", d: "Aprender a dizer não e a escolher vínculos mais saudáveis." },
    ],
    approach: "O trabalho parte da sua história e dos modos como você aprendeu a se relacionar. Em situações de relacionamento abusivo, o cuidado com a sua segurança vem em primeiro lugar.",
    faq: [
      { q: "Atende casais?", a: "O meu atendimento é individual, para adultos. Pelo WhatsApp conversamos sobre o que faz mais sentido para o seu caso." },
      { q: "Estou em um relacionamento abusivo. Por onde começar?", a: "Por uma conversa acolhedora, no seu tempo. Se houver risco, procure a rede de proteção: ligue 180 (Central de Atendimento à Mulher) ou 190." },
    ],
  },
  {
    slug: "saude-e-adoecimento",
    n: "06",
    label: "Saúde e adoecimento",
    icon: "steth",
    title: "Quando a saúde *vira o centro da vida?*",
    short: "Diagnósticos, tratamentos e doenças físicas mexem com a emoção. Um espaço para quem adoece e para quem cuida.",
    cta: "Conversar sobre isso",
    pageH1a: "Quando o corpo adoece,",
    pageH1b: "a vida inteira sente.",
    lead: "Receber um diagnóstico ou atravessar um tratamento mobiliza medo, perdas e dúvidas. A psicologia ajuda a atravessar esse momento com mais apoio.",
    mirror: [
      "Desde o diagnóstico, não me reconheço.",
      "Tenho medo do que vem pela frente.",
      "Cuido de alguém doente e esqueço de mim.",
      "Meu corpo reage ao que eu sinto.",
    ],
    paths: [
      { t: "Acolher o impacto", d: "Dar espaço ao medo, à raiva e à tristeza que acompanham o adoecimento." },
      { t: "Olhar para o corpo e a emoção", d: "Entender como o que se vive aparece também no corpo." },
      { t: "Cuidar de quem cuida", d: "Um lugar para cuidadores e familiares também serem escutados." },
    ],
    approach: "Minha especialização em Psicologia Médica (HUPE/UERJ) sustenta este trabalho. A terapia complementa o tratamento médico e não o substitui.",
    faq: [
      { q: "Atende pacientes oncológicos e em cuidados paliativos?", a: "Sim, com sensibilidade e respeito ao seu momento. A terapia acompanha o tratamento médico, sem substituí-lo." },
      { q: "Familiares e cuidadores também podem buscar atendimento?", a: "Sim. Cuidar de alguém doente também desgasta e merece cuidado." },
    ],
  },
  {
    slug: "comida-corpo-e-emocao",
    n: "07",
    label: "Comida, corpo e emoção",
    icon: "utensils",
    title: "A relação com a comida *virou uma batalha?*",
    short: "Compulsão, restrição, culpa e preocupação com o corpo: um espaço para olhar o que a comida vem tentando dizer.",
    cta: "Quero cuidar de mim",
    pageH1a: "Comida, corpo e emoção.",
    pageH1b: "Tudo se mistura.",
    lead: "Para muita gente, comer deixou de ser simples. Em terapia, você pode olhar para a culpa, a vergonha e as emoções que estão por trás dessa relação.",
    mirror: [
      "Como escondido(a) e depois me sinto péssimo(a).",
      "Vivo contando calorias e pensando no corpo.",
      "Me comparo o tempo todo.",
      "Já tentei de tudo e nada se sustenta.",
    ],
    paths: [
      { t: "Sem culpa e sem pressa", d: "Falar do assunto, finalmente, sem ser julgado(a)." },
      { t: "Entender o que a comida cobre", d: "Reconhecer as emoções e as histórias ligadas ao comer." },
      { t: "Cuidar em rede", d: "Quando necessário, pensamos em conjunto na importância de médico e nutricionista." },
    ],
    approach: "Tenho especialização em transtornos alimentares. O trabalho é conduzido com respeito e sem foco em peso ou dieta, e muitas vezes se integra a uma equipe de saúde.",
    faq: [
      { q: "A terapia indica dietas?", a: "Não. Dieta é papel de nutricionista. A terapia olha para a relação emocional com a comida e com o corpo." },
      { q: "Atende obesidade e compulsão?", a: "Sim, com foco na relação emocional com o comer, em conjunto com o acompanhamento médico quando necessário." },
    ],
  },
  {
    slug: "familia-e-maternidade",
    n: "08",
    label: "Família e maternidade",
    icon: "users",
    title: "As fases da família *também pedem cuidado?*",
    short: "Pós-parto, ninho vazio, conflitos com os filhos: momentos de transição que mexem com quem somos.",
    cta: "Conversar sobre isso",
    pageH1a: "Cada fase da família",
    pageH1b: "também é uma transição.",
    lead: "Ter um filho, vê-lo sair de casa ou viver conflitos com ele mexe com a identidade. Esses momentos merecem espaço de escuta.",
    mirror: [
      "Depois que o bebê nasceu, não me reconheço.",
      "A casa ficou vazia e eu também.",
      "Não sei mais como me aproximar do meu filho.",
      "Cobro muito de mim como mãe ou pai.",
    ],
    paths: [
      { t: "Acolher a travessia", d: "Dar nome às emoções ambivalentes de cada fase." },
      { t: "Repensar o papel", d: "Reencontrar quem você é além do papel que exerce." },
      { t: "Cuidar do vínculo", d: "Entender o que atravessa a relação com os filhos e a família." },
    ],
    approach: "Acompanho a mulher e o homem adultos nesses momentos de transição, com atenção às emoções do pós-parto, da síndrome do ninho vazio e dos conflitos familiares.",
    faq: [
      { q: "Atende depressão pós-parto?", a: "Acolho o sofrimento do pós-parto. Quando necessário, conversamos sobre a importância do acompanhamento médico em conjunto." },
      { q: "Atende adolescentes?", a: "O meu atendimento é voltado a adultos. Pelo WhatsApp conversamos sobre o seu caso." },
    ],
  },
];
