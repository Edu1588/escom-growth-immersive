/*
 * ESCOM / GROWTH ENGINE — comic narrative page.
 * Ground truth: illustrated graphic-novel panels, ink, paper, ochre, vermilion.
 * The operator guides the user through a sequential business transformation.
 */
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Menu, X } from "lucide-react";

const panels = [
  { id: "intro", no: "01", image: "/manus-storage/escom-comic-hero_ef49c847.png", kicker: "IN A FRAGMENTED MARKET", title: "Uma operação\nsem sistema\nnão escala.", caption: "Em um território cheio de ruído, uma empresa procura uma rota que faça sentido.", bubble: "Por onde começamos?" },
  { id: "data", no: "02", image: "/manus-storage/escom-comic-data-tower_d4230697.png", kicker: "THE FIRST SIGNAL", title: "Toda decisão\ncomeça em\nnúmero.", caption: "A Escom encontra o sinal no meio do ruído: LTV, CAC, ROI, conversão e pipeline.", bubble: "Agora podemos enxergar." },
  { id: "automation", no: "03", image: "/manus-storage/escom-comic-automation_72d2f5ab.png", kicker: "THE MACHINE AWAKENS", title: "Tráfego entra.\nO sistema\nse move.", caption: "Leads qualificados percorrem uma operação conectada — da mídia ao CRM, sem perder energia no caminho.", bubble: "Rota confirmada." },
  { id: "core", no: "04", image: "/manus-storage/escom-comic-growth-core_a3e077b7.png", kicker: "THE GROWTH CORE", title: "Uma operação.\nUm sistema.", caption: "Branding, tráfego, automação e vendas deixam de ser peças soltas e passam a trabalhar como um único organismo.", bubble: "Tudo conectado." },
];

function Caption({ children }: { children: React.ReactNode }) { return <div className="comic-caption">{children}</div>; }
function Speech({ children }: { children: React.ReactNode }) { return <div className="speech-bubble">{children}<i /></div>; }

export default function Home() {
  const [active, setActive] = useState(0);
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    let frame = 0;
    const updateTimeline = () => {
      const viewport = window.innerHeight;
      let closest = 0;
      let closestDistance = Infinity;
      panels.forEach((panel, index) => {
        const node = document.getElementById(`panel-${panel.id}`);
        if (!node) return;
        const start = node.offsetTop;
        const travel = Math.max(viewport * .72, node.offsetHeight - viewport * .28);
        const local = Math.max(0, Math.min(1, (window.scrollY - start + viewport * .18) / travel));
        node.style.setProperty('--panel-progress', local.toFixed(3));
        const distance = Math.abs(node.getBoundingClientRect().top - viewport * .14);
        if (distance < closestDistance) { closest = index; closestDistance = distance; }
      });
      setActive(closest);
      frame = 0;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(updateTimeline); };
    updateTimeline();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);
  const jump = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  return <main className="comic-site">
    <header className="comic-nav"><button className="comic-logo" onClick={() => jump("panel-intro")}><span className="comic-logo__mark">E</span><span>ESCOM<small>/ STUDIO</small></span></button><div className="comic-nav__status"><b /> ISSUE 01 / GROWTH ENGINE</div><button className="comic-menu" onClick={() => setMenu(true)}><Menu size={19} /> INDEX</button></header>
    <div className="issue-progress"><span>{String(active + 1).padStart(2, "0")}</span><i><b style={{ height: `${((active + 1) / panels.length) * 100}%` }} /></i><span>04</span></div>

    <section className="comic-hero" id="panel-intro"><div className="hero-ink" /><div className="hero-copy"><div className="panel-tag">ESCOM / GROWTH ENGINE</div><h1>Marketing,<br /><em>sem ruído.</em></h1><p>Construímos o sistema por trás do crescimento: dados, tráfego, automação, branding e vendas.</p><button className="comic-cta" onClick={() => jump("panel-data")}>VIRAR A PÁGINA <ArrowDown size={16} /></button></div><div className="hero-frame"><img src="/manus-storage/escom-comic-character_71abfa06.png" alt="Operador da Escom caminhando pelo sistema de crescimento" /><Caption>EM UM TERRITÓRIO CHEIO DE RUÍDO,<br />UMA FIGURA PROCURA O SINAL.</Caption></div></section>

    <div className="panel-story">{panels.slice(1).map((panel, index) => <section className={`comic-panel panel-${panel.id} ${active === index + 1 ? "is-active" : ""}`} id={`panel-${panel.id}`} key={panel.id}><div className="panel-art" style={{ backgroundImage: `url(${panel.image})` }} /><div className="panel-border panel-border--one" /><div className="panel-border panel-border--two" /><div className="panel-copy"><div className="panel-tag"><span>{panel.no}</span> // {panel.kicker}</div><h2>{panel.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h2><p>{panel.caption}</p></div><Speech>{panel.bubble}</Speech><Caption>{panel.no === "02" ? "DADOS QUE DECIDEM." : panel.no === "03" ? "AUTOMAÇÃO INTELIGENTE." : "DO PRIMEIRO CLIQUE À VENDA."}</Caption><div className="ink-streak" /></section>)}</div>

    <section className="results-page" id="results"><div className="page-topline"><span>// ISSUE 02 / PROOF</span><span>REAL SYSTEMS / REAL SIGNALS</span></div><div className="results-layout"><div><p className="panel-tag">O QUE ENCONTRAMOS NO CAMINHO</p><h2>Não vendemos<br /><em>presença.</em><br />Operamos resultado.</h2><p className="results-lead">Do primeiro clique ao fechamento da venda no CRM, cada etapa é supervisionada, integrada e mensurada.</p></div><div className="result-panels">{[["40h/sem", "recuperadas em automação"], ["+240%", "aumento de conversão"], ["0", "leads perdidos"]].map(([value, label], i) => <div className="result-box" key={label}><span>CASE / 0{i + 1}</span><strong>{value}</strong><p>{label}</p></div>)}</div></div></section>

    <section className="system-page" id="services"><div className="page-topline"><span>// THE SYSTEM</span><span>SEVEN DISCIPLINES / ONE ENGINE</span></div><div className="system-layout"><div><p className="panel-tag">O MAPA DA OPERAÇÃO</p><h2>Uma ideia<br /><em>em movimento.</em></h2></div><div className="service-stack">{["Dados & BI", "Branding & identidade", "Mídia paga & tráfego", "Sites & landing pages", "Automação & CRM", "Sistemas web & e-commerce"].map((service, i) => <button key={service} onClick={() => jump("contact")}><span>0{i + 1}</span><b>{service}</b><ArrowUpRight size={17} /></button>)}</div></div></section>

    <section className="contact-page" id="contact"><div className="contact-paper"><div className="page-topline"><span>// LAST PAGE / CONTACT</span><span>THE NEXT CHAPTER IS YOURS</span></div><div className="contact-layout"><div><p className="panel-tag">FIM DO CAPÍTULO. INÍCIO DA OPERAÇÃO.</p><h2>Vamos desenhar<br /><em>o próximo sistema.</em></h2><p>Conte para nós qual é o seu principal gargalo. Nós retornamos com um diagnóstico estratégico.</p></div><form onSubmit={(event) => { event.preventDefault(); alert("Recebemos seu diagnóstico. A Escom retorna em breve."); }}><label>NOME / EMPRESA<input required placeholder="Seu nome ou empresa" /></label><label>E-MAIL<input required type="email" placeholder="voce@empresa.com" /></label><label>O GARGALO<textarea required placeholder="O que precisa mudar?" /></label><button className="comic-cta comic-cta--dark" type="submit">ENVIAR DIAGNÓSTICO <ArrowUpRight size={16} /></button></form></div></div></section>
    <footer className="comic-footer"><div className="comic-logo"><span className="comic-logo__mark">E</span><span>ESCOM<small>/ STUDIO</small></span></div><span>© 2026 / SÃO PAULO — BRASIL</span><span>ISSUE 01 / END</span></footer>
    {menu && <div className="comic-menu-overlay"><button className="overlay-close" onClick={() => setMenu(false)}><X size={18} /> FECHAR</button><div className="overlay-inner"><p className="panel-tag">ESCOM / INDEX</p><h2>Escolha<br /><em>seu quadro.</em></h2>{[{ id: "panel-intro", label: "ABERTURA" }, { id: "panel-data", label: "DADOS" }, { id: "panel-automation", label: "AUTOMAÇÃO" }, { id: "panel-core", label: "O SISTEMA" }, { id: "results", label: "RESULTADOS" }, { id: "contact", label: "CONTATO" }].map((item, i) => <button key={item.id} onClick={() => jump(item.id)}><span>0{i + 1}</span>{item.label}<ArrowUpRight size={16} /></button>)}</div></div>}
  </main>;
}
