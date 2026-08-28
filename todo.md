# Revisão de fidelidade visual — HQ ilustrada

- [ ] Substituir a linguagem de dashboard/telemetria por composição de história em quadrinhos.
- [ ] Usar pintura digital com linhas de tinta, hachuras, papel/textura e paleta limitada preto, creme, vermelho e ocre.
- [ ] Criar personagem provisório recorrente em silhueta/ilustração para conduzir a narrativa.
- [ ] Criar painéis assimétricos com bordas pretas e cortes cinematográficos.
- [ ] Adicionar caixas de narração e balões de diálogo com copy da Escom.
- [ ] Implementar transições de entrada/saída entre painéis controladas por scroll.
- [ ] Reorganizar hero e cenas para parecer uma página de HQ, não um dashboard.
- [ ] Preservar CTA, serviços, métricas e formulário, mas integrá-los ao universo narrativo.
- [ ] Validar desktop e mobile após a reconstrução.

## Correção de movimento baseada na referência

- [ ] Acessar a referência e observar o scroll em estados sucessivos.
- [ ] Registrar diferença entre scroll físico, progresso de timeline e troca de cena.
- [ ] Implementar um controlador de progresso contínuo em vez de apenas IntersectionObserver.
- [ ] Animar parallax, escala, posição, máscara, quadros e texto conforme o progresso.
- [ ] Validar a sensação de continuidade entre painéis no desktop e no mobile.

## Reconstrução interativa avançada

- [ ] Criar uma camada de progresso global baseada em scroll para alimentar todas as animações.
- [ ] Adicionar canvas WebGL com partículas, ruído e linhas de telemetria.
- [ ] Implementar parallax independente para fundo, cenário, personagem e molduras.
- [ ] Fazer boxes/painéis expandirem e colapsarem conforme o progresso da cena.
- [ ] Animar SVGs e paths de conexão com stroke-dashoffset.
- [ ] Criar frames sobrepostos que entram, saem, giram e mudam de escala.
- [ ] Implementar máscaras/clip-path para transições entre cenas.
- [ ] Validar fallback para reduced motion e mobile.

## Transparência sobre fidelidade da referência

- [ ] Separar evidências confirmadas no bundle de hipóteses sobre o runtime HydraX.
- [ ] Explicar que o navegador disponível redirecionou a referência para `/unsupported`.
- [ ] Explicar que identificar tecnologias não revela automaticamente timelines, assets e autoria visual.
- [ ] Definir os dados e testes necessários para uma reconstrução fiel do movimento.

## Reconstrução com stack de animação dedicada

- [ ] Adicionar Three.js, GSAP e Anime.js ao frontend.
- [ ] Substituir o canvas 2D/WebGL mínimo por uma cena Three.js persistente.
- [ ] Criar câmera, partículas, planos de cenários, profundidade e parallax por camada.
- [ ] Criar timeline GSAP ligada a um scroll virtual contínuo.
- [ ] Usar Anime.js para microanimações de SVG, boxes e textos.
- [ ] Implementar transições com clip-path/máscaras e frames sequenciais.
- [ ] Validar fallback de WebGL, reduced motion e mobile.

## Copy completa da Escom

- [ ] Reabrir e inventariar o conteúdo atual da Escom Studio.
- [ ] Comparar headline, proposta, pilares, serviços, processo, planos, métricas, cases, FAQ e contato.
- [ ] Recolocar na experiência os conteúdos omitidos, usando capítulos e painéis secundários.
- [ ] Manter a leitura cinematográfica sem reduzir a informação comercial.
- [ ] Validar links, menu, CTA e formulário após a expansão de conteúdo.

## Gravação da referência e robô Escom

- [ ] Analisar o vídeo enviado quadro a quadro e registrar estados do scroll.
- [ ] Identificar duração, direção e easing das transições entre cenas.
- [ ] Mapear comportamento de boxes, SVGs, frames, parallax e WebGL observado.
- [ ] Definir o robô como protagonista recorrente da narrativa Escom.
- [ ] Gerar/ajustar assets do robô e cenários para as poses e cenas necessárias.
- [ ] Implementar o comportamento observado com timeline contínua e câmera.
- [ ] Validar desktop, mobile, fallback de WebGL e reduced motion.

## Comparativo de cobertura e interação

- [ ] Reabrir o site atual da Escom e listar todas as seções e CTAs.
- [ ] Mapear cada seção equivalente na versão construída.
- [ ] Verificar quais textos foram completos, adaptados ou omitidos.
- [ ] Verificar se as bordas dos boxes têm animação real ou apenas hover/transição.
- [ ] Verificar quais elementos respondem ao mouse e quais respondem apenas ao scroll.
- [ ] Entregar matriz de cobertura com lacunas técnicas e de conteúdo.

## Conteúdo completo + animações faltantes

- [ ] Integrar a copy completa auditada: boot, hero, pilares, faixa de processo, O que bem fazemos, sistema, custo invisível, planos, processo, métricas, cases, parceiros, inteligência, FAQ, contato e rodapé.
- [ ] Preservar preços, benefícios, métricas, cases, perguntas e respostas conforme conteúdo auditado.
- [ ] Adicionar eventos pointermove/mousemove para câmera, quadros, robô, SVG e elementos WebGL.
- [ ] Implementar tilt 3D e parallax de mouse nos painéis.
- [ ] Implementar bordas SVG com stroke-dashoffset e brilho/ruído por progresso.
- [ ] Implementar máscaras clip-path para entrada e saída de cenas.
- [ ] Melhorar boxes expansíveis com borda desenhada e conteúdo completo.
- [ ] Validar acessibilidade, reduced motion, mobile, build e runtime.

## Diagnóstico de fidelidade estrutural

- [ ] Contar e localizar caixas de diálogo atuais versus necessidade narrativa por capítulo.
- [ ] Verificar se as bordas usam apenas transform/transition ou se têm uma timeline de desenho perceptível.
- [ ] Comparar O que bem fazemos, O sistema e Métricas com a composição de painéis e cenas da referência.
- [ ] Registrar quais seções precisam virar cenas pinadas ou caixas expansíveis.
- [ ] Definir uma correção que preserve a copy completa sem voltar ao layout de dashboard.

## Ritmo visual clean + denso

- [ ] Criar cena clean de entrada com robô centralizado e balão de contexto.
- [ ] Criar cena clean de pausa após os pilares com apenas robô, luz e uma frase.
- [ ] Criar cena clean antes do CTA final com robô e convite ao diagnóstico.
- [ ] Reduzir elementos decorativos nas cenas clean e manter foco/escala cinematográfica.
- [ ] Alternar cenas clean com capítulos densos sem perder a copy completa.
