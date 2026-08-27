/*
 * ESCOM / GROWTH ENGINE — immersive page.
 * Design: brutalismo digital editorial; charcoal, bone, signal red.
 * Motion: scroll-driven scene transitions, restrained telemetry, reduced-motion aware.
 */
import { useEffect, useMemo, useState } from "react";
import { ArrowDownRight, ArrowUpRight, ChevronDown, Crosshair, Menu, MoveRight, Play, X } from "lucide-react";

const scenes = [
  { id: "boot", index: "00", kicker: "ESCOM / STUDIO", title: "Sistema de\nCrescimento & Growth.", body: "Nós operamos o crescimento completo da sua empresa — dados, tráfego, automação, branding e vendas.", image: "/manus-storage/escom-world-reference_05d4d419.png", tag: "SYSTEM ONLINE" },
  { id: "noise", index: "01", kicker: "DIAGNOSTIC INTERFACE", title: "O caos\nnão escala.", body: "Ferramentas desconectadas criam dados incompletos, leads perdidos e decisões lentas.", image: "/manus-storage/escom-automation-chamber_bc1ddc76.png", tag: "STACK DISCONNECTED" },
  { id: "data", index: "02", kicker: "DATA CORE", title: "Dados que\ndecidem.", body: "Toda decisão começa em número. LTV, CAC, ROI, conversão e pipeline no mesmo campo de visão.", image: "/manus-storage/escom-data-tower_2fa28528.png", tag: "SIGNAL DETECTED" },
  { id: "flow", index: "03", kicker: "ACQUISITION ENGINE", title: "Tráfego que\nconverte.", body: "Não trazemos visitantes. Trazemos leads qualificados dentro do seu CAC alvo.", image: "/manus-storage/escom-world-reference_05d4d419.png", tag: "QUALITY FILTER ACTIVE" },
  { id: "automation", index: "04", kicker: "AUTOMATION CORE", title: "A operação\nacorda antes de você.", body: "Leads triados por IA, automações em WhatsApp e e-mail, CRM e integrações trabalhando 24/7.", image: "/manus-storage/escom-automation-chamber_bc1ddc76.png", tag: "AUTOMATION RUNNING" },
  { id: "brand", index: "05", kicker: "PERCEPTION LAYER", title: "Branding que\nvende.", body: "Identidade, posicionamento e experiência construídos para elevar percepção e ticket médio.", image: "/manus-storage/escom-growth-core_f2b0808b.png", tag: "VALUE INCREASING" },
  { id: "core", index: "06", kicker: "CLOSED ECOSYSTEM", title: "Uma operação.\nUm sistema.", body: "Tráfego → site → lead → CRM → automação → venda → dashboard.", image: "/manus-storage/escom-growth-core_f2b0808b.png", tag: "GROWTH ENGINE STABLE" },
  { id: "proof", index: "07", kicker: "LIVE OUTPUT", title: "Resultados\ntangíveis.", body: "Crescimento não é sensação. É um sistema de métricas que mostra o que funciona.", image: "/manus-storage/escom-data-tower_2fa28528.png", tag: "TELEMETRY LINK LIVE" },
];

const metrics = [
  ["40h/sem", "automação de pipeline"],
  ["+240%", "aumento de conversão"],
  ["0", "leads perdidos na operação"],
  ["100/100", "performance Lighthouse"],
];

function Operator({ active }: { active: string }) {
  return (
    <div className={`operator operator--${active}`} aria-label="Personagem abstrato da Escom">
      <div className="operator__halo" />
      <div className="operator__head"><span /></div>
      <div className="operator__body"><i /><b /></div>
      <div className="operator__core" />
      <div className="operator__beam" />
    </div>
  );
}

function DataReadout({ index, tag }: { index: string; tag: string }) {
  return (
    <div className="readout" aria-hidden="true">
      <div><span>SEQ</span><strong>{index} / 08</strong></div>
      <div><span>STATUS</span><strong className="readout__live">{tag}</strong></div>
      <div><span>FRAME</span><strong>60 FPS</strong></div>
    </div>
  );
}

export default function Home() {
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [audioOn, setAudioOn] = useState(false);
  const activeScene = scenes[active];

  useEffect(() => {
    const observers = scenes.map((scene, index) => {
      const element = document.getElementById(`scene-${scene.id}`);
      if (!element) return null;
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActive(index);
      }, { threshold: 0.55 });
      observer.observe(element);
      return observer;
    });
    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  const progress = useMemo(() => `${((active + 1) / scenes.length) * 100}%`, [active]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="experience">
      <header className="topbar">
        <button className="brandmark" onClick={() => scrollTo("scene-boot")} aria-label="Voltar ao início">
          <span className="brandmark__symbol">E</span><span className="brandmark__word">ESCOM<span>/STUDIO</span></span>
        </button>
        <div className="topbar__center"><span className="pulse" /> TELEMETRY LINK — LIVE</div>
        <div className="topbar__right">
          <button className="audio" onClick={() => setAudioOn(!audioOn)} aria-label="Alternar áudio"><span className={audioOn ? "audio__bars is-on" : "audio__bars"}><i /><i /><i /><i /></span> {audioOn ? "AUDIO ON" : "AUDIO OFF"}</button>
          <button className="menuButton" onClick={() => setMenuOpen(true)} aria-label="Abrir menu"><Menu size={18} /><span>INDEX</span></button>
        </div>
      </header>

      <aside className="chapterRail" aria-label="Navegação por cenas">
        <span className="chapterRail__label">SCROLL TO OPERATE</span>
        <div className="chapterRail__line"><span style={{ height: progress }} /></div>
        <div className="chapterRail__count"><b>{String(active + 1).padStart(2, "0")}</b><span>/ 08</span></div>
      </aside>

      <div className="stage" aria-live="polite">
        <div className="stage__media" style={{ backgroundImage: `url(${activeScene.image})` }} />
        <div className="stage__wash" />
        <div className="stage__noise" />
        <Operator active={activeScene.id} />
        <DataReadout index={activeScene.index} tag={activeScene.tag} />
        <div className="stage__coordinates">{activeScene.index}° 31' 12.4" S<br />046° 38' 03.1" W</div>
        <div className="stage__crosshair"><Crosshair size={34} strokeWidth={1} /></div>
        <div className="stage__machine" aria-hidden="true"><div className="machine__ring machine__ring--outer" /><div className="machine__ring machine__ring--inner" /><div className="machine__hub"><span>G</span></div><i className="machine__node node--one" /><i className="machine__node node--two" /><i className="machine__node node--three" /><div className="machine__orbit" /></div>
      </div>

      <div className="sceneStack">
        {scenes.map((scene, index) => (
          <section className="scene" id={`scene-${scene.id}`} key={scene.id}>
            <div className="scene__copy">
              <div className="scene__meta"><span>{scene.index}</span><span>// {scene.kicker}</span></div>
              <h1>{scene.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
              <p>{scene.body}</p>
              {index > 0 && index < 7 && <div className="scene__signal"><span /><span /><span /><small>{scene.tag}</small></div>}
              {index === 0 && <button className="actionButton" onClick={() => scrollTo("scene-noise")}>OPERAR O SISTEMA <ArrowDownRight size={16} /></button>}
              {index === 6 && <div className="flowLine"><span>TRÁFEGO</span><i>→</i><span>CRM</span><i>→</i><span>VENDA</span></div>}
              {index === 7 && <button className="actionButton actionButton--solid" onClick={() => scrollTo("contact")}>SOLICITAR DIAGNÓSTICO <ArrowUpRight size={16} /></button>}
            </div>
            <div className="scene__ghost">{String(index + 1).padStart(2, "0")}</div>
          </section>
        ))}
      </div>

      <section className="metrics" id="results">
        <div className="sectionLabel"><span>// 08 / OUTPUT</span><span>MEASURABLE GROWTH</span></div>
        <div className="metrics__intro"><p className="eyebrow">O QUE BEM FAZEMOS</p><h2>Não vendemos presença.<br /><em>Operamos resultado.</em></h2><p>Do primeiro clique ao fechamento da venda no seu CRM — cada etapa é supervisionada, integrada e mensurada.</p></div>
        <div className="metrics__grid">{metrics.map(([value, label]) => <div className="metric" key={label}><strong>{value}</strong><span>{label}</span><div className="metric__bar"><i /></div></div>)}</div>
      </section>

      <section className="services" id="services">
        <div className="sectionLabel"><span>// THE SYSTEM</span><span>SEVEN DISCIPLINES / ONE ENGINE</span></div>
        <div className="services__head"><h2>O sistema<br /><em>por trás.</em></h2><p>Estratégia, criação e infraestrutura operando como um único organismo. Sem ferramentas desconectadas. Sem custos invisíveis.</p></div>
        <div className="serviceList">{["ANÁLISE DE DADOS & BI", "BRANDING & IDENTIDADE", "MÍDIA PAGA & TRÁFEGO", "SITES & LANDING PAGES", "AUTOMAÇÃO & CRM", "SISTEMAS WEB & E-COMMERCE", "ENGENHARIA"].map((service, i) => <button key={service} onClick={() => scrollTo("contact")}><span>0{i + 1}</span><b>{service}</b><MoveRight size={18} /></button>)}</div>
      </section>

      <section className="contact" id="contact">
        <div className="contact__orb" />
        <div className="sectionLabel"><span>// 09 / CONTACT</span><span>START A CONVERSATION</span></div>
        <div className="contact__grid"><div><p className="eyebrow">O PRÓXIMO SISTEMA PODE SER O SEU.</p><h2>Iniciar<br /><em>revolução.</em></h2><p>Conte para nós qual é a sua meta de leads ou vendas. Nossa equipe retorna com um diagnóstico estratégico do seu cenário.</p></div><form onSubmit={(event) => { event.preventDefault(); alert("Obrigado. Vamos entrar em contato com seu diagnóstico."); }}><label>NOME / EMPRESA<input required placeholder="Seu nome ou empresa" /></label><label>E-MAIL<input required type="email" placeholder="voce@empresa.com" /></label><label>META / PRINCIPAL GARGALO<textarea required placeholder="O que você deseja destravar?" /></label><button className="actionButton actionButton--solid" type="submit">ENVIAR DIAGNÓSTICO <ArrowUpRight size={16} /></button></form></div>
      </section>

      <footer className="footer"><div className="brandmark"><span className="brandmark__symbol">E</span><span className="brandmark__word">ESCOM<span>/STUDIO</span></span></div><p>Ecossistemas digitais blindados.<br />São Paulo — Brasil</p><span>© 2026 ESCOM</span></footer>

      {menuOpen && <div className="menuOverlay"><button className="menuOverlay__close" onClick={() => setMenuOpen(false)}><X /> CLOSE</button><div className="menuOverlay__inner"><p className="eyebrow">ESCOM / INDEX</p><h2>Explore<br /><em>o sistema.</em></h2>{[{ id: "scene-boot", label: "INÍCIO" }, { id: "scene-data", label: "O SISTEMA" }, { id: "results", label: "RESULTADOS" }, { id: "services", label: "SOLUÇÕES" }, { id: "contact", label: "CONTATO" }].map((item, i) => <button key={item.id} onClick={() => scrollTo(item.id)}><span>0{i + 1}</span>{item.label}<ArrowUpRight size={16} /></button>)}</div></div>}
    </main>
  );
}
