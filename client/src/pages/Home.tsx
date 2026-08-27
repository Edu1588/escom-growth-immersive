/*
 * ESCOM / GROWTH ENGINE — comic narrative page.
 * Ground truth: illustrated graphic-novel panels, ink, paper, ochre, vermilion.
 * The operator guides the user through a sequential business transformation.
 */
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Menu, X } from "lucide-react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { animate } from "animejs";

gsap.registerPlugin(ScrollToPlugin);

const panels = [
  { id: "intro", no: "01", image: "/manus-storage/escom-robot-reference_c1f99d1d.png", kicker: "IN A FRAGMENTED MARKET", title: "Uma operação\nsem sistema\nnão escala.", caption: "Em um território cheio de ruído, uma empresa procura uma rota que faça sentido.", bubble: "Por onde começamos?" },
  { id: "data", no: "02", image: "/manus-storage/escom-comic-data-tower_d4230697.png", kicker: "THE FIRST SIGNAL", title: "Toda decisão\ncomeça em\nnúmero.", caption: "A Escom encontra o sinal no meio do ruído: LTV, CAC, ROI, conversão e pipeline.", bubble: "Agora podemos enxergar." },
  { id: "automation", no: "03", image: "/manus-storage/escom-comic-automation_72d2f5ab.png", kicker: "THE MACHINE AWAKENS", title: "Tráfego entra.\nO sistema\nse move.", caption: "Leads qualificados percorrem uma operação conectada — da mídia ao CRM, sem perder energia no caminho.", bubble: "Rota confirmada." },
  { id: "core", no: "04", image: "/manus-storage/escom-comic-growth-core_a3e077b7.png", kicker: "THE GROWTH CORE", title: "Uma operação.\nUm sistema.", caption: "Branding, tráfego, automação e vendas deixam de ser peças soltas e passam a trabalhar como um único organismo.", bubble: "Tudo conectado." },
];

function Caption({ children }: { children: React.ReactNode }) { return <div className="comic-caption">{children}</div>; }
function Speech({ children }: { children: React.ReactNode }) { return <div className="speech-bubble">{children}<i /></div>; }
function SignalSVG() { return <svg className="signal-svg" viewBox="0 0 420 160" aria-hidden="true"><path d="M0 120 C80 22 130 140 205 70 S320 30 420 105" /><path d="M0 145 C85 82 115 125 190 104 S300 60 420 30" /><circle cx="205" cy="70" r="6" /><circle cx="320" cy="47" r="4" /></svg>; }

function WebGLField({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true }); } catch { return; }
    renderer.setPixelRatio(Math.min(1.75, window.devicePixelRatio || 1));
    renderer.setClearColor(0x000000, 0);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, innerWidth / innerHeight, .1, 100);
    camera.position.z = 8;
    const group = new THREE.Group();
    scene.add(group);
    const particleCount = 240;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      positions[i * 3] = (Math.random() - .5) * 13;
      positions[i * 3 + 1] = (Math.random() - .5) * 8;
      positions[i * 3 + 2] = (Math.random() - .5) * 4;
      colors[i * 3] = .72; colors[i * 3 + 1] = .08 + Math.random() * .12; colors[i * 3 + 2] = .05;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const particleMaterial = new THREE.PointsMaterial({ size: .035, vertexColors: true, transparent: true, opacity: .72, sizeAttenuation: true });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    group.add(particles);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xc9332b, transparent: true, opacity: .22 });
    const lineGroup = new THREE.Group();
    for (let i = 0; i < 18; i += 1) {
      const a = new THREE.Vector3((Math.random() - .5) * 10, (Math.random() - .5) * 6, (Math.random() - .5) * 2);
      const b = a.clone().add(new THREE.Vector3((Math.random() - .5) * 2.8, (Math.random() - .5) * 2.8, 0));
      const geometry = new THREE.BufferGeometry().setFromPoints([a, b]);
      lineGroup.add(new THREE.Line(geometry, lineMaterial));
    }
    group.add(lineGroup);
    const resize = () => { renderer.setSize(innerWidth, innerHeight, false); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); };
    resize(); window.addEventListener("resize", resize);
    try { animate(".signal-svg path", { strokeDashoffset: [520, 0], duration: 900, delay: 220, ease: "outQuad" }); } catch { /* mantém o fallback CSS caso Anime.js não esteja disponível */ }
    const start = performance.now(); let raf = 0;
    const render = (time: number) => {
      const elapsed = (time - start) * .001;
      const progress = progressRef.current;
      particles.rotation.y = elapsed * .035 + progress * .45;
      particles.rotation.x = Math.sin(elapsed * .18) * .05 + progress * .08;
      lineGroup.rotation.z = elapsed * -.018 - progress * .24;
      group.position.x = Math.sin(progress * Math.PI * 2) * .18;
      group.position.y = progress * -.3;
      camera.position.x += (Math.sin(progress * Math.PI) * .45 - camera.position.x) * .035;
      camera.position.y += (Math.cos(progress * Math.PI) * .25 - camera.position.y) * .035;
      renderer.render(scene, camera); raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); renderer.dispose(); particleGeometry.dispose(); particleMaterial.dispose(); lineMaterial.dispose(); };
  }, [progressRef]);
  return <canvas className="webgl-field" ref={ref} aria-hidden="true" />;
}

export default function Home() {
  const [active, setActive] = useState(0);
  const [menu, setMenu] = useState(false);
  const [expandedBox, setExpandedBox] = useState<number | null>(null);
  const progressRef = useRef(0);
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
      const total = Math.max(1, document.body.scrollHeight - viewport);
      progressRef.current = Math.max(0, Math.min(1, window.scrollY / total));
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

    <section className="comic-hero" id="panel-intro"><WebGLField progressRef={progressRef} /><div className="hero-ink" /><div className="hero-copy"><div className="panel-tag">ESCOM / GROWTH ENGINE</div><h1>Marketing,<br /><em>sem ruído.</em></h1><p>Construímos o sistema por trás do crescimento: dados, tráfego, automação, branding e vendas.</p><button className="comic-cta" onClick={() => { gsap.to(window, { duration: 1.15, scrollTo: "#panel-data", ease: "power3.inOut" }); }}>VIRAR A PÁGINA <ArrowDown size={16} /></button></div><div className="hero-frame"><img src="/manus-storage/escom-robot-reference_c1f99d1d.png" alt="Robô operador da Escom caminhando pelo sistema de crescimento" /><Caption>EM UM TERRITÓRIO CHEIO DE RUÍDO,<br />UMA FIGURA PROCURA O SINAL.</Caption></div></section>

    <div className="panel-story">{panels.slice(1).map((panel, index) => <section className={`comic-panel panel-${panel.id} ${active === index + 1 ? "is-active" : ""}`} id={`panel-${panel.id}`} key={panel.id}><div className="panel-art" style={{ backgroundImage: `url(${panel.image})` }} />{(panel.id === "core" || panel.id === "automation") && <img className="robot-protagonist" src="/manus-storage/escom-robot-reference_c1f99d1d.png" alt="Robô operador da Escom" />}{panel.id !== "intro" && <div className="panel-background-mark">{panel.no}</div>}<SignalSVG /><div className="panel-frames" aria-hidden="true"><span /><span /><span /></div><div className="panel-border panel-border--one" /><div className="panel-border panel-border--two" /><div className="panel-copy"><div className="panel-tag"><span>{panel.no}</span> // {panel.kicker}</div><h2>{panel.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h2><p>{panel.caption}</p></div><Speech>{panel.bubble}</Speech><Caption>{panel.no === "02" ? "DADOS QUE DECIDEM." : panel.no === "03" ? "AUTOMAÇÃO INTELIGENTE." : "DO PRIMEIRO CLIQUE À VENDA."}</Caption><div className="ink-streak" /></section>)}</div>

    <section className="results-page" id="results"><div className="page-topline"><span>// ISSUE 02 / PROOF</span><span>REAL SYSTEMS / REAL SIGNALS</span></div><div className="results-layout"><div><p className="panel-tag">O QUE ENCONTRAMOS NO CAMINHO</p><h2>Não vendemos<br /><em>presença.</em><br />Operamos resultado.</h2><p className="results-lead">Do primeiro clique ao fechamento da venda no CRM, cada etapa é supervisionada, integrada e mensurada.</p></div><div className="result-panels">{[["40h/sem", "recuperadas em automação", "Tempo devolvido para a operação comercial."], ["+240%", "aumento de conversão", "Um funil que aprende com cada interação."], ["0", "leads perdidos", "Rotas conectadas do primeiro contato ao CRM."]].map(([value, label, detail], i) => <button className={`result-box ${expandedBox === i ? "is-expanded" : ""}`} onClick={() => setExpandedBox(expandedBox === i ? null : i)} key={label}><span>CASE / 0{i + 1}</span><strong>{value}</strong><p>{label}</p><small>{detail}</small></button>)}</div></div></section>

    <section className="pillars-page" id="pillars"><div className="page-topline"><span>// THE PILLARS</span><span>FIVE LAYERS / ONE OPERATION</span></div><div className="pillar-grid">{[["01", "Diagnóstico & Dados", "LTV, CAC, ROI, conversão e pipeline. Antes de investir, entendemos o sistema."], ["02", "Estratégia & Marca", "Posicionamento, identidade e percepção de valor para tornar a marca mais forte."], ["03", "Construção", "Sites, landing pages, sistemas web e experiências digitais que sustentam o crescimento."], ["04", "Tráfego, Lançamento & Escala", "Mídia paga e distribuição com foco em aquisição, qualificação e escala."], ["05", "Engenharia", "Integrações, CRM, IA e automações para a operação rodar com menos atrito."]].map(([no, title, text]) => <article className="pillar-card" key={no}><span>{no}</span><h3>{title}</h3><p>{text}</p><i /></article>)}</div></section>

    <section className="process-page" id="process"><div className="page-topline"><span>// THE PROCESS</span><span>FROM SIGNAL TO SCALE</span></div><div className="process-grid">{[["01", "Diagnóstico", "Mapeamos gargalos, dados, canais e oportunidades."], ["02", "Arquitetura", "Desenhamos a estratégia e o sistema de crescimento."], ["03", "Construção", "Colocamos marca, mídia, site e automação em operação."], ["04", "Otimização", "Medimos o comportamento e melhoramos o que gera resultado."]].map(([no, title, text]) => <div className="process-step" key={no}><b>{no}</b><h3>{title}</h3><p>{text}</p><span className="process-arrow">↘</span></div>)}</div></section>

    <section className="plans-page" id="plans"><div className="page-topline"><span>// THE PLANS</span><span>CHOOSE YOUR ENTRY POINT</span></div><div className="plans-grid">{[["LANDING PAGE", "Para campanhas, lançamentos e ofertas que precisam converter agora.", "ESCOLHER LANDING PAGE"], ["SITE PROFISSIONAL", "Para empresas que precisam transformar presença digital em autoridade.", "ESCOLHER SITE PROFISSIONAL"], ["AUTOMAÇÃO", "Para operações comerciais que precisam crescer sem acumular ruído.", "ESCOLHER AUTOMAÇÃO"]].map(([title, text, cta], i) => <button className="plan-card" key={title} onClick={() => jump("contact")}><span>PLAN / 0{i + 1}</span><h3>{title}</h3><p>{text}</p><b>{cta} <ArrowUpRight size={15} /></b></button>)}</div></section>

    <section className="system-page" id="services"><div className="page-topline"><span>// THE SYSTEM</span><span>SEVEN DISCIPLINES / ONE ENGINE</span></div><div className="system-layout"><div><p className="panel-tag">O MAPA DA OPERAÇÃO</p><h2>Uma ideia<br /><em>em movimento.</em></h2></div><div className="service-stack">{["Dados & BI", "Branding & identidade", "Mídia paga & tráfego", "Sites & landing pages", "Automação & CRM", "Sistemas web & e-commerce"].map((service, i) => <button key={service} onClick={() => jump("contact")}><span>0{i + 1}</span><b>{service}</b><ArrowUpRight size={17} /></button>)}</div></div></section>

    <section className="faq-page" id="faq"><div className="page-topline"><span>// FREQUENTLY ASKED QUESTIONS</span><span>NOISE OUT / CLARITY IN</span></div><div className="faq-list">{[["A Escom é uma agência?", "Somos uma operação de crescimento que integra estratégia, criação, tecnologia, tráfego e automação."], ["Vocês trabalham apenas com tráfego?", "Não. O tráfego é uma parte do sistema. Também atuamos em dados, branding, sites, CRM, IA e engenharia."], ["Como começa um projeto?", "Começamos com um diagnóstico para entender a meta, o funil, os gargalos e a oportunidade real."], ["Vocês conseguem conectar com meu CRM?", "Sim. Desenhamos integrações e automações para que o lead siga uma rota clara até a venda."]].map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>

    <section className="partners-page"><div className="page-topline"><span>// TRUSTED SIGNALS</span><span>PARCEIROS & CLIENTES QUE CONFIAM NO SISTEMA</span></div><div className="partner-markline"><span>PARCEIROS</span><span>CLIENTES</span><span>TECNOLOGIA</span><span>OPERAÇÃO</span></div><p>O sistema é desenhado para trabalhar com as ferramentas e os times que sua operação já possui — conectando o que precisa funcionar melhor.</p></section>

    <section className="contact-page" id="contact"><div className="contact-paper"><div className="page-topline"><span>// LAST PAGE / CONTACT</span><span>THE NEXT CHAPTER IS YOURS</span></div><div className="contact-layout"><div><p className="panel-tag">FIM DO CAPÍTULO. INÍCIO DA OPERAÇÃO.</p><h2>Vamos desenhar<br /><em>o próximo sistema.</em></h2><p>Conte para nós qual é o seu principal gargalo. Nós retornamos com um diagnóstico estratégico.</p></div><form onSubmit={(event) => { event.preventDefault(); alert("Recebemos seu diagnóstico. A Escom retorna em breve."); }}><label>NOME / EMPRESA<input required placeholder="Seu nome ou empresa" /></label><label>E-MAIL<input required type="email" placeholder="voce@empresa.com" /></label><label>O GARGALO<textarea required placeholder="O que precisa mudar?" /></label><button className="comic-cta comic-cta--dark" type="submit">ENVIAR DIAGNÓSTICO <ArrowUpRight size={16} /></button></form></div></div></section>
    <footer className="comic-footer"><div className="comic-logo"><span className="comic-logo__mark">E</span><span>ESCOM<small>/ STUDIO</small></span></div><span>© 2026 / SÃO PAULO — BRASIL</span><span>ISSUE 01 / END</span></footer>
    {menu && <div className="comic-menu-overlay"><button className="overlay-close" onClick={() => setMenu(false)}><X size={18} /> FECHAR</button><div className="overlay-inner"><p className="panel-tag">ESCOM / INDEX</p><h2>Escolha<br /><em>seu quadro.</em></h2>{[{ id: "panel-intro", label: "ABERTURA" }, { id: "panel-data", label: "DADOS" }, { id: "panel-automation", label: "AUTOMAÇÃO" }, { id: "panel-core", label: "O SISTEMA" }, { id: "results", label: "RESULTADOS" }, { id: "contact", label: "CONTATO" }].map((item, i) => <button key={item.id} onClick={() => jump(item.id)}><span>0{i + 1}</span>{item.label}<ArrowUpRight size={16} /></button>)}</div></div>}
  </main>;
}
