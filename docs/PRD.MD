# PROJECT ARCHITECTURE: LP Jurídico — Sistema de Gestão para Advocacia Criminal

## 1. CONTEXT & PROBLEM

Advogados criminalistas operam sob pressão de prazos processuais fatais, múltiplas audiências simultâneas, dezenas de processos em fases diferentes e clientes em situações de alta vulnerabilidade (presos, indiciados, familiares). A gestão típica desse universo acontece em planilhas, agendas físicas, pastas no Drive e mensagens de WhatsApp espalhadas — modelo que desmorona quando um prazo é perdido, um documento é extraviado ou um cliente liga pedindo posicionamento sobre o caso.

Sistemas jurídicos genéricos do mercado (Astrea, Projuris, ADVBOX, CPJ-3C) atendem advocacia geral mas não modelam particularidades do criminal: distinção entre cliente contratante e réu/investigado, partes do processo (vítima, testemunhas, autoridades), fases específicas do rito penal (inquérito → denúncia → instrução → sentença → recursos → execução), honorários estruturados em contrato + êxito + despesas, e a criticidade absoluta dos prazos em matéria criminal (perder prazo de recurso pode significar cliente preso indevidamente).

O Dr. Leandro Pedrosa precisa de um sistema dedicado ao seu escritório, modelado sobre o fluxo real da advocacia criminal, com arquitetura preparada para crescer (sócios, secretária, estagiários) sem refactor pesado.

## 2. PROPOSED SOLUTION

Construir o **LP Jurídico** — sistema web dedicado de gestão de escritório de advocacia criminal, single-tenant inicialmente (apenas o escritório do Dr. Leandro), com arquitetura multi-usuário pronta para expansão futura. A solução incluirá:

- Cadastro completo de **partes** (clientes contratantes, réus/investigados, vítimas, testemunhas, autoridades) com relacionamento entre elas e os processos
- Cadastro de **processos/casos** com numeração CNJ, vara, comarca, fase processual, tipo penal, situação do cliente (solto, preso preventivo, foragido)
- **Pipeline Kanban** de processos por fase processual (Pré-processual → Inquérito → Denúncia/Recebimento → Instrução → Sentença → Recursos → Execução → Arquivado)
- **Agenda de prazos e audiências** com alertas redundantes (D-7, D-3, D-1, no dia) e dupla confirmação para marcar prazo como cumprido
- **Timeline do processo**: andamentos manuais, peças produzidas, despachos, decisões, comunicações com cliente
- **Gestão de documentos** vinculados ao processo (procurações, peças, decisões, provas) com controle de versão e log de acesso
- **Módulo financeiro intermediário**: honorários contratuais (parcelas), honorários de êxito (% sobre resultado), despesas reembolsáveis (custas, perícias, viagens), status de pagamento por lançamento
- **Dashboard executivo**: processos por fase, audiências da semana, prazos críticos (próximos 7 dias), inadimplência, faturamento do mês
- **Roles internos** preparados: Advogado Titular, Advogado Associado, Secretária, Estagiário (com permissões diferenciadas)
- **Sigilo profissional como requisito**: log de acesso a processos, criptografia em repouso para documentos sensíveis, isolamento por escritório (RLS desde o dia 1, mesmo single-tenant)

## 3. FUNCTIONAL REQUIREMENTS

- Login e Autenticação (single sign-on por escritório)
- Cadastro de Partes (Clientes, Réus, Vítimas, Testemunhas, Autoridades)
- Cadastro de Processos (numeração CNJ, vara, comarca, fase, tipo penal)
- Pipeline Kanban de Processos por Fase Processual
- Agenda de Prazos e Audiências com Alertas
- Timeline de Andamentos do Processo
- Gestão de Documentos do Processo
- Módulo Financeiro (Contratos, Parcelas, Êxito, Despesas)
- Dashboard Executivo
- Multi-usuário com Roles (Titular, Associado, Secretária, Estagiário)
- Permissões e Log de Acesso (sigilo)
- Busca e Filtros (por cliente, número CNJ, fase, comarca, tipo penal)
- Onboarding inicial do escritório

## 4. USER PERSONAS

**Dr. Leandro Pedrosa — Advogado Titular (usuário primário, MVP)**
- Atende criminal de médio/alto envolvimento, atua em comarcas da Paraíba e adjacências
- Precisa de visão consolidada da carteira: o que tem audiência essa semana, o que tem prazo correndo, quem está inadimplente
- Trabalha de notebook no escritório e celular em fórum/audiência — sistema precisa ser responsivo
- Tolerância zero a perda de prazo

**Secretária (persona futura — v1.x)**
- Lança audiências e prazos a partir de intimações que chegam
- Atualiza dados cadastrais de clientes
- Não acessa módulo financeiro sensível nem peças sigilosas

**Advogado Associado (persona futura — v1.x)**
- Trabalha em processos delegados, tem acesso aos seus processos
- Pode produzir peças e atualizar andamentos
- Não acessa financeiro nem processos de outros associados sem permissão

**Estagiário (persona futura — v1.x)**
- Acompanha andamentos, prepara minutas, acesso de leitura ampla
- Sem permissão para finalizar peças, marcar prazo cumprido ou ver financeiro

---

### Detalhamento dos Módulos

**Gestão de Partes (Pessoas envolvidas em processos)**
- Tipos: Cliente Contratante, Réu/Investigado, Vítima, Testemunha, Autoridade (delegado, promotor, juiz)
- Uma pessoa pode ter mais de um papel em processos diferentes (cliente em um, testemunha em outro)
- Cliente contratante pode ser ≠ do réu (mãe contrata pelo filho preso) — o sistema modela isso explicitamente
- Campos: nome completo, CPF, RG, data de nascimento, contatos, endereço, observações
- Para réu: situação prisional (solto, preso preventivo, preso definitivo, foragido), unidade prisional, data da prisão

**Gestão de Processos**
- Identificação: número CNJ (com máscara e validação), número interno do escritório, alcunha do caso
- Localização: tribunal, comarca, vara, juiz titular
- Tipificação: tipo penal principal e secundários (referência ao Código Penal/Leis especiais)
- Fase processual atual (campo controlado, alimenta o Kanban)
- Vínculos: cliente contratante, réu (se diferente), demais partes
- Responsável interno (Titular ou Associado delegado)
- Sigilo: nível (público, segredo de justiça, urgente sigiloso)
- Situação geral: ativo, suspenso, arquivado, baixado

**Pipeline Kanban Processual**
- Colunas: Pré-processual (consulta inicial / antes de inquérito), Inquérito Policial, Denúncia/Recebimento, Instrução, Memoriais, Sentença, Recursos (apelação, RESp, RE, HC), Execução Penal, Arquivado/Baixado
- Cards: alcunha do caso, cliente, réu (se diferente), comarca, próximo prazo/audiência, badge de criticidade
- Drag-and-drop entre fases com persistência e registro automático no histórico do processo
- Filtros: responsável, cliente, comarca, tipo penal, urgência

**Agenda de Prazos e Audiências (módulo crítico)**
- Tipos de evento: prazo processual (com marco inicial e final), audiência, reunião com cliente, visita ao preso, diligência externa
- Vínculo obrigatório a um processo (exceto reunião com cliente sem processo aberto)
- Alertas redundantes: D-7, D-3, D-1, manhã do dia (push + email)
- Status: pendente, cumprido, perdido (com justificativa obrigatória se perdido)
- **Dupla confirmação para marcar como cumprido**: clique inicial + modal de confirmação com resumo do que foi protocolado/realizado
- Visualização: calendário mensal, lista semanal, lista do dia
- Prazos sem ação até D-1 escalam visualmente (vermelho pulsante no dashboard)

**Timeline / Andamentos do Processo**
- Tipos: andamento oficial (despacho, decisão, intimação), peça produzida pelo escritório, comunicação com cliente, anotação interna, evento de audiência
- Cada entrada: autor, data, tipo, descrição, anexos opcionais
- Ordem cronológica reversa, com filtros por tipo
- Anotações internas marcáveis como "confidencial" (visível só ao titular)

**Gestão de Documentos**
- Vínculo: documento sempre pertence a um processo (ou a uma parte, se cadastral)
- Categorias: procuração, contrato de honorários, peça inicial, contestação/resposta, recurso, decisão judicial, prova documental, laudo pericial, mídia (áudio/vídeo de audiência)
- Versionamento: novo upload do mesmo documento gera versão, mantém histórico
- Log de acesso: quem visualizou, baixou, editou, quando
- Criptografia em repouso (Supabase Storage com chaves gerenciadas)
- Geração de documentos a partir de templates (procuração, contrato) com merge de dados do cliente — fase posterior

**Módulo Financeiro (escopo médio)**
- **Contratos de Honorários** vinculados a processo + cliente
  - Tipo: contratuais (valor fixo parcelado), êxito (% sobre resultado), pro bono, dativo
  - Parcelas: valor, vencimento, forma de pagamento, status (em aberto, pago, atrasado, cancelado)
  - Honorários de êxito: gatilho (absolvição, desclassificação, redução de pena), % acordado, valor estimado, valor efetivo
- **Despesas Reembolsáveis**: custas processuais, perícias, deslocamento, cópias, honorários periciais — vinculadas ao processo, com comprovante anexável e status de reembolso pelo cliente
- **Status financeiro do processo**: total contratado, total recebido, total a receber, despesas a reembolsar
- **Inadimplência**: lista de clientes com parcelas atrasadas, dias de atraso
- **Faturamento mensal**: recebido no mês, projeção de recebimento, comparativo mês anterior

**Dashboard Executivo**
- **Cards superiores**: processos ativos, audiências esta semana, prazos próximos 7 dias, inadimplência total
- **Próximas audiências** (lista com data, hora, comarca, vara, processo, cliente)
- **Prazos críticos** (lista ordenada por proximidade, com escalada visual)
- **Distribuição por fase** (gráfico horizontal — quantos processos em cada fase)
- **Faturamento do mês** (card com valor + comparativo)
- **Atalho rápido**: novo processo, novo prazo, novo cliente

**Multi-usuário e Permissões (preparado, ativável)**
- MVP: apenas o Dr. Leandro como usuário (role Titular)
- v1.x: convite de usuários internos do escritório (Associado, Secretária, Estagiário)
- Matriz de permissões por role:
  - **Titular**: tudo
  - **Associado**: processos próprios + processos delegados, sem financeiro de terceiros
  - **Secretária**: cadastros, agenda, sem financeiro sensível, sem peças sigilosas
  - **Estagiário**: leitura ampla, escrita em minutas, sem finalização de prazos
- Log de acesso a processos sigilosos (LGPD + sigilo profissional)
- RLS no Supabase desde o dia 1, escopado por `office_id` (preparado para futura expansão multi-escritório)

**Busca e Filtros Globais**
- Busca unificada: número CNJ, nome de cliente/réu, alcunha, comarca
- Filtros nas listagens: fase, responsável, comarca, tipo penal, situação, período

**Onboarding Inicial**
- Cadastro do escritório (nome, OAB, endereço, logo)
- Cadastro do primeiro usuário (Dr. Leandro)
- Tour rápido pelo Kanban e Agenda
- Sem fricção comercial: sem planos, sem upsell, sem trial

## 5. TECHNICAL STACK

| Camada | Tecnologia |
|---|---|
| Frontend | Next.js 14 (App Router) + React 18 |
| UI | Tailwind CSS + shadcn/ui |
| Linguagem | TypeScript 5 (strict) |
| Backend/API | Next.js Server Actions + Route Handlers |
| Banco + Auth | Supabase (PostgreSQL + RLS + Auth) |
| Storage de Documentos | Supabase Storage (criptografia em repouso) |
| E-mail transacional | Resend (alertas de prazo, convites de usuário) |
| Notificações Push | Web Push API + Service Worker |
| Drag-and-drop | @dnd-kit |
| Gráficos | Recharts |
| Calendário | react-big-calendar ou FullCalendar |
| Validação | Zod |
| Datas | date-fns + date-fns-tz (fuso Brasil) |
| Deploy | Vercel (app) + Supabase (banco/storage) |
| Versionamento | Git + GitHub |

**Removido do stack original:** Stripe (sistema dedicado, não SaaS comercial).

**Reservado para v2 (arquitetar pensando, não implementar agora):**
- Integração com tribunais via PJe Push, Projudi, eproc, ESAJ — abstrair fonte de andamentos como `andamento_source` (manual, pje, projudi, etc.)
- Importação de PDF de andamento processual com parser
- IA para auxílio em peças e resumos (deixar tabela `processos.ai_indexed_at` reservada, sem implementar)

## 6. DESIGN LANGUAGE

**Identidade Visual base** — derivada da logomarca "Leandro Pedrosa - Consultoria e Assessoria Jurídica" (preto + dourado, monograma "LP" em serifa clássica).

**Princípios:**
- Sofisticação institucional sem cair no "site jurídico anos 2000" (fundo bege, brasão exagerado, Times New Roman pesado)
- Densidade informacional alta — advogado precisa ver muita coisa de relance (prazos, audiências, inadimplência)
- Hierarquia tipográfica clara: serifa para títulos institucionais, sans-serif para UI funcional
- Estado crítico (prazo perdendo) deve ser inconfundível — vermelho saturado, sem ambiguidade

**Paleta:**
- **Primária (institucional)**: Preto profundo `#0A0A0A`
- **Acento (dourado)**: `#C9A961` a `#B8924A` — usar com parcimônia, é assinatura, não decoração
- **Sucesso**: Verde sóbrio `#15803D`
- **Atenção**: Âmbar `#D97706` (prazo D-3 a D-7)
- **Crítico**: Vermelho `#DC2626` (prazo D-1, perdido)
- **Neutros**: Stone/Zinc do Tailwind (off-white `#FAFAF9` para superfícies)

**Tipografia:**
- **Títulos institucionais e logo**: serifa (`Cormorant Garamond` ou `Playfair Display`)
- **UI funcional**: sans-serif (`Inter` ou `Geist`)
- Não misturar serifa em botões ou labels

**Componentes-chave:**
- Sidebar fixa preta com logo "LP" dourado no topo
- Cards do Kanban com borda esquerda colorida indicando criticidade do próximo prazo
- Calendário de prazos com chips coloridos por tipo
- Cards de prazo crítico com tarja vertical vermelha + timer de horas restantes
- Modais de confirmação (especialmente prazo cumprido) com peso visual alto

**Evitar:**
- Azul-índigo SaaS (estética PipeFlow original)
- Brasões, balanças e martelos como ícones de marca (clichê)
- Gradientes vibrantes, glassmorphism colorido

## 7. PROCESS

- Quebrar a construção em milestones entregáveis e testáveis
- Priorizar o núcleo crítico (cadastros + prazos + agenda) antes de financeiro e dashboards
- Validar cada milestone com o Dr. Leandro usando dados reais de 2-3 processos
- Manter arquitetura preparada para v2 sem implementar prematuramente

### Ordem de Desenvolvimento (Milestones)

1. **Setup do projeto** — Next.js + Supabase + shadcn/ui + identidade visual base
2. **Autenticação** — login do escritório, sessão via middleware, RLS escopado por `office_id`
3. **Cadastro de Partes** — Clientes, Réus, Vítimas, Testemunhas, Autoridades
4. **Cadastro de Processos** — Validação CNJ, vínculo de partes, fase, sigilo
5. **Agenda de Prazos e Audiências** — calendário + alertas redundantes + dupla confirmação (módulo crítico)
6. **Pipeline Kanban Processual** — drag-and-drop + persistência + registro de transição
7. **Timeline de Andamentos** — cronológico por processo, anotações confidenciais
8. **Gestão de Documentos** — upload, versionamento, log de acesso, criptografia
9. **Módulo Financeiro** — contratos, parcelas, êxito, despesas, inadimplência
10. **Dashboard Executivo** — consolidação de tudo
11. **Permissões e Roles** — ativar Associado/Secretária/Estagiário
12. **Notificações Push Mobile** — service worker para alertas no celular
13. **(v2) Integração com tribunais** — PJe Push e parser de PDF

---

> Adaptado a partir do framework NoCodeStartup — customizado para advocacia criminal