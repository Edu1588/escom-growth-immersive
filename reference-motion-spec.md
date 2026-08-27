# Especificação de movimento da referência

Fonte analisada: `/home/ubuntu/upload/2026-08-2719-25-51.mp4`, gravação do site https://santionispirits.com/

A gravação mostra uma experiência de scrollytelling com smooth scroll controlado, em que o scroll funciona como playhead de uma timeline. Grandes seções ficam pinadas na viewport enquanto painéis, textos e câmeras se movem dentro delas.

O fluxo é predominantemente vertical, mas usa deslocamentos horizontais de containers em viewport inteira. Quadros entram lateralmente e de baixo para cima. O cenário e o personagem se movem em velocidades diferentes para formar parallax 2.5D.

As ilustrações são reveladas por máscaras CSS/SVG e as transições usam ruído/glitch para esconder a troca de assets. Há zoom dramático em detalhes do personagem, controlando escala e opacidade com o scroll.

A gravação mostra um portal vermelho por volta de 00:41 no qual o fluxo muda para uma interação de hold-and-move: o scroll é interrompido e o movimento do cursor produz ondulações/distorção na superfície, sugerindo WebGL com displacement map.

As caixas de diálogo entram atrasadas em relação à arte, com stagger e easing suave. Textos grandes mudam tracking/kerning e sofrem distorções de acordo com a velocidade do scroll.

No final, os boxes de HQ colapsam/dissolvem para dar lugar a uma interface mais limpa. Elementos de produto usam hover com rotação/brilho possivelmente via sprites ou sequência de imagens.

Especificação para a Escom: usar ScrollTrigger/pinning, smooth scroll, timeline contínua, containers horizontais dentro do scroll vertical, parallax por camadas, clipPath/masks, glitch/noise transitions, portal de interação por cursor, SVG draw-on, texto staggered, frames que entram/saem e boxes que colapsam. O protagonista será um robô com estados de caminhada, leitura de dados, conexão de módulos e ativação do Growth Core.
