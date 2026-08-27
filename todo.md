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
