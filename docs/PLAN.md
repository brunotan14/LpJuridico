# LP Jurídico — Plano de Execução

> Estratégia: interface primeiro, backend depois. Cada milestone entrega uma fatia vertical funcional e visualmente completa antes de conectar ao banco.

---

## Identidade Visual — Dark Theme Institucional

O LP Jurídico adota dark mode como tema padrão, derivado da logomarca "Leandro Pedrosa — Consultoria e Assessoria Jurídica" (preto + dourado, monograma "LP" em serifa). A paleta prioriza sofisticação institucional, contraste acessível e destaque inequívoco para prazos críticos.

**Backgrounds (camadas):**

| Camada | Token Tailwind | Hex |
|---|---|---|
| Base (mais funda) | `neutral-950` | `#0a0a0a` |
| Superfície (cards, modais) | `neutral-900` | `#171717` |
| Elevado (dropdowns, tooltips) | `neutral-800` | `#262626` |
| Borda | `neutral-700` | `#404040` |

**Tipografia:**

| Uso | Token Tailwind | Hex |
|---|---|---|
| Título institucional (serifa) | `neutral-50` | `#fafafa` |
| Corpo / label | `neutral-200` | `#e5e5e5` |
| Texto secundário | `neutral-400` | `#a3a3a3` |
| Placeholder | `neutral-500` | `#737373` |

**Cores funcionais:**

| Papel | Token customizado | Hex |
|---|---|---|
| Acento institucional (logo, badges premium) | `gold-500` | `#c9a961` |
| Acento hover / brilho | `gold-400` | `#d4b97a` |
| Acento sombra (gradiente) | `gold-600` | `#b8924a` |
| Sucesso / prazo cumprido / processo ganho | `emerald-500` | `#10b981` |
| Crítico / prazo D-1 / perdido | `red-500` | `#ef4444` |
| Atenção / prazo D-3 a D-7 | `amber-500` | `#f59e0b` |
| Sigiloso / confidencial | `purple-500` | `#a855f7` |
| Neutro / tag | `neutral-700` | `#404040` |

**Tipografia (fontes):**

- **Serifa institucional**: `Cormorant Garamond` (logo, títulos hero, login) — via `next/font/google`
- **Sans-serif funcional**: `Inter` (UI: tabelas, formulários, cards, navegação) — via `next/font/google`
- Nunca misturar serifa em botões ou labels

**Aplicação por componente:**

- **Sidebar:** fundo `neutral-950`, links ativos com fundo `neutral-800` + texto `neutral-50` + borda esquerda `gold-500`. Logo "LP" em dourado no topo
- **Cards do Kanban:** fundo `neutral-900`, borda `neutral-800`, **borda esquerda colorida** (verde/âmbar/vermelho/cinza) indicando criticidade do próximo prazo, hover eleva para `neutral-800` com sombra sutil
- **Cards de prazo crítico:** tarja vertical vermelha à esquerda + tipografia maior + timer de horas restantes
- **Calendário:** chips por tipo (audiência `neutral-50`, prazo `amber-500`, visita ao preso `purple-500`, reunião `gold-500`)
- **Modais e drawers:** fundo `neutral-900`, overlay `neutral-950/80` com blur. Modais de **confirmação de prazo cumprido** com peso visual extra (sombra forte, dois botões destacados)
- **Inputs e selects:** fundo `neutral-800`, borda `neutral-700`, focus com anel `gold-500`
- **Botão primário:** fundo `gold-500`, hover `gold-400`, texto `neutral-950` (contraste alto)
- **Botão ghost/outline:** borda `neutral-700`, hover fundo `neutral-800`
- **Badge de valor honorário (R$):** fundo `emerald-950`, texto `emerald-400`
- **Badge de prazo D-1:** fundo `red-950`, texto `red-400`, com `animate-pulse`
- **Badge sigiloso:** fundo `purple-950`, texto `purple-400`, ícone de cadeado

**Configuração no Tailwind (`tailwind.config.ts`):**

```ts
darkMode: 'class',
theme: {
  extend: {
    colors: {
      gold: {
        400: '#d4b97a',
        500: '#c9a961',
        600: '#b8924a',
      },
    },
    fontFamily: {
      serif: ['var(--font-cormorant)', 'serif'],
      sans: ['var(--font-inter)', 'sans-serif'],
    },
  },
},
```

Adicionar `class="dark"` no `<html>` por padrão — dark é o tema principal, não alternativo.

**O que evitar:**
- Azul-índigo SaaS
- Brasões, balanças, martelos como ícones de marca (clichê jurídico)
- Gradientes vibrantes, glassmorphism colorido
- Beges, marrons amadeirados ("estilo cartório")

---

## M0 — Setup & Infraestrutura

**Branch:** `setup/project-foundation`
**Objetivo:** Projeto rodando localmente com toda a stack configurada e estrutura de pastas no lugar.

- [ ] Inicializar projeto com `create-next-app` (TypeScript, App Router, Tailwind)
- [ ] Configurar `tsconfig.json` com strict mode
- [ ] Instalar e inicializar shadcn/ui (modo `dark` como padrão)
- [ ] Criar estrutura de pastas conforme CLAUDE.md (`app/`, `components/`, `lib/`, `types/`)
- [ ] Configurar variáveis de ambiente (`.env.local` + `.env.example`)
- [ ] Conectar projeto ao Supabase (criar projeto, copiar URL e anon key)
- [ ] Instalar dependências: `@supabase/ssr`, `@dnd-kit/core`, `recharts`, `resend`, `zod`, `date-fns`, `date-fns-tz`, `react-big-calendar`, `web-push`
- [ ] Configurar `next/font` com `Cormorant Garamond` (serifa) e `Inter` (sans)
- [ ] Configurar tokens de cor customizados no `tailwind.config.ts` (paleta dourado + neutros)
- [ ] Configurar `lib/supabase/client.ts` e `lib/supabase/server.ts`
- [ ] Configurar `middleware.ts` para proteção de rotas
- [ ] Configurar ESLint + Prettier
- [ ] Subir projeto no GitHub

**Commit final:** `chore: project setup with Next.js 14, Supabase, shadcn/ui and brand identity`

---

## M1 — Shell Visual da Aplicação

**Branch:** `feat/app-shell`
**Objetivo:** Layout autenticado completo com sidebar, header e navegação — sem dados reais, tudo estático.

- [ ] Criar layout base `app/(app)/layout.tsx`
- [ ] Criar componente `Sidebar` com links de navegação (Dashboard, Partes, Processos, Pipeline, Agenda, Financeiro, Configurações)
- [ ] Logo "LP" em dourado no topo da sidebar (componente SVG inline reutilizável)
- [ ] Adicionar avatar do usuário + menu de conta na sidebar (estático, mockado)
- [ ] Criar `Header` com título da página, breadcrumb e slot para ações (botão "Novo X" contextual)
- [ ] Criar páginas vazias (placeholder) para `/dashboard`, `/partes`, `/processos`, `/pipeline`, `/agenda`, `/financeiro`, `/configuracoes`
- [ ] Aplicar paleta institucional: dourado primário, preto profundo na sidebar, neutral-900 nas superfícies
- [ ] Garantir responsividade básica (sidebar colapsável em mobile via Sheet/drawer)
- [ ] Criar `app/(auth)/layout.tsx` com layout centralizado para telas de auth (logo grande em serifa)
- [ ] Componente `Logo` com variantes (full | mark) para reuso

**Commit final:** `feat: app shell with sidebar, navigation and brand-aligned base layout`

---

## M2 — Autenticação (UI → Backend)

**Branch:** `feat/authentication`
**Objetivo:** Fluxo completo de login e recuperação de senha funcionando com Supabase Auth.

> **Nota:** Como é sistema dedicado (single-tenant), **não há registro público**. Usuários são criados pelo Titular via convite ou seed inicial.

**Interface primeiro:**
- [ ] Criar página `/login` com formulário (e-mail + senha) usando shadcn/ui `Form`
- [ ] Criar página `/forgot-password` com formulário de e-mail
- [ ] Criar página `/reset-password` para redefinição via link
- [ ] Adicionar validação client-side com Zod + react-hook-form
- [ ] Adicionar estados de loading, erro e sucesso nos formulários
- [ ] Tela de login com identidade visual forte: logo grande em serifa, fundo preto, formulário em card neutral-900

**Backend:**
- [ ] Criar Server Actions em `lib/auth/actions.ts` (signIn, signOut, resetPassword)
- [ ] Configurar callback de auth em `app/auth/callback/route.ts`
- [ ] Proteger rotas `(app)/` no `middleware.ts` — redirecionar para `/login` se sem sessão
- [ ] Redirecionar usuário autenticado para `/dashboard` após login
- [ ] Implementar logout no menu de conta da sidebar
- [ ] Seed inicial: criar escritório do Dr. Leandro + usuário Titular via script (`scripts/seed.ts`)

**Commit final:** `feat: authentication with Supabase Auth, login and password reset`

---

## M3 — Cadastro de Partes (UI → Backend)

**Branch:** `feat/partes`
**Objetivo:** CRUD completo de partes (clientes, réus, vítimas, testemunhas, autoridades) com listagem, busca, filtros e página de detalhe.

**Interface primeiro:**
- [ ] Criar página `/partes` com tabela (nome, CPF, papel principal, telefone, processos vinculados)
- [ ] Tabs/filtros por tipo: Todos | Clientes | Réus | Vítimas | Testemunhas | Autoridades
- [ ] Barra de busca (nome, CPF)
- [ ] Filtros adicionais: situação prisional (para réus), comarca de atuação (para autoridades)
- [ ] Criar drawer/modal "Nova Parte" com formulário dinâmico:
  - Campos comuns: nome, CPF (com máscara e validação), RG, data de nascimento, contatos, endereço
  - Campos condicionais por tipo de parte (ex: situação prisional só aparece se for Réu)
- [ ] Criar página `/partes/[id]` com perfil completo:
  - Aba Dados Pessoais
  - Aba Processos Vinculados (com papel em cada um)
  - Aba Observações (notas livres)
- [ ] Estados vazios (empty state) para listagem sem partes
- [ ] Paginação na listagem
- [ ] Indicador visual para parte com mais de um papel (ex: cliente em um processo, testemunha em outro)

**Banco de dados:**
- [ ] Migration: tabela `partes` com RLS por `office_id`
- [ ] Migration: tabela `parte_papeis_processo` (junction com papel)
- [ ] Migration: tabela `reus_situacao` (situação prisional vinculada a réu+processo)

**Backend:**
- [ ] Server Actions: criar, editar, arquivar parte
- [ ] Server Component para listar partes com filtros via searchParams
- [ ] Validação Zod em todos os campos (CPF com dígito verificador, telefone, etc.)
- [ ] Validação de duplicidade por CPF (alerta, não bloqueia)

**Commit final:** `feat: parties management with multi-role support (clients, defendants, witnesses, authorities)`

---

## M4 — Cadastro de Processos (UI → Backend)

**Branch:** `feat/processos`
**Objetivo:** CRUD de processos com validação CNJ, vínculo de partes, fase processual e nível de sigilo.

**Interface primeiro:**
- [ ] Criar página `/processos` com tabela (CNJ, alcunha, cliente, réu, fase, comarca, responsável, situação)
- [ ] Barra de busca unificada (CNJ, alcunha, cliente, réu)
- [ ] Filtros: fase processual, comarca, responsável, situação, tipo penal, sigilo
- [ ] Criar drawer/modal "Novo Processo" multi-step:
  - Step 1: Identificação (CNJ com máscara e validação, número interno, alcunha)
  - Step 2: Localização (tribunal, comarca, vara, juiz)
  - Step 3: Tipificação (tipos penais — múltiplos, com principal)
  - Step 4: Vínculo de Partes (cliente contratante + réu — podem ser a mesma pessoa ou não — vítimas, testemunhas)
  - Step 5: Configuração (fase atual, sigilo, responsável interno)
- [ ] Criar página `/processos/[id]` com layout em abas:
  - Aba Resumo (dados do processo + partes + situação atual)
  - Aba Timeline (placeholder para M7)
  - Aba Documentos (placeholder para M8)
  - Aba Financeiro (placeholder para M9)
  - Aba Prazos (placeholder para M5 — já vinculável depois)
- [ ] Badge de sigilo visível no header da página de detalhe
- [ ] Indicador da situação prisional do réu no header (se aplicável)

**Banco de dados:**
- [ ] Migration: tabela `processos` com RLS por `office_id`
- [ ] Migration: tabela `processos_tipos_penais`
- [ ] Reservar coluna `andamento_source` (manual | pje | projudi) para v2
- [ ] Reservar coluna `ai_indexed_at` para v2

**Backend:**
- [ ] Validador de CNJ com dígito verificador em `lib/cnj/validator.ts`
- [ ] Server Actions: criar, editar, arquivar processo (sem delete — soft delete via `situacao`)
- [ ] Trigger de auditoria em mudanças de fase, sigilo, responsável

**Commit final:** `feat: case management with CNJ validation, multi-party linking and confidentiality levels`

---

## M5 — Agenda de Prazos e Audiências (UI → Backend) ⚠️ CRÍTICO

**Branch:** `feat/agenda`
**Objetivo:** Módulo central do sistema. Agenda de prazos e audiências com alertas redundantes e dupla confirmação para marcar prazo como cumprido. Validar exaustivamente.

**Interface primeiro:**
- [ ] Criar página `/agenda` com 3 visualizações alternáveis:
  - Calendário mensal (`react-big-calendar` em modo dark)
  - Lista semanal (agrupada por dia)
  - Lista do dia (foco)
- [ ] Chips coloridos por tipo de evento: prazo (âmbar), audiência (neutro com borda dourada), visita ao preso (roxo), reunião (dourado), diligência (verde)
- [ ] Criar drawer/modal "Novo Evento" com formulário condicional por tipo:
  - Prazo: marco inicial, marco final, processo vinculado, descrição
  - Audiência: data, hora, local (comarca/vara), processo, partes presentes esperadas
  - Visita ao preso: data, hora, unidade prisional, parte (réu)
  - Reunião com cliente: data, hora, local, parte (cliente) — único tipo que pode existir sem processo
  - Diligência: data, descrição, local, processo
- [ ] Página de detalhe do evento com botão "Marcar como Cumprido" (que dispara modal de dupla confirmação)
- [ ] **Modal de confirmação de cumprimento** com peso visual alto:
  - Resumo do evento (tipo, data, processo, descrição)
  - Campo obrigatório "O que foi feito?" (mín. 10 caracteres)
  - Dois botões claros: "Cancelar" (neutro) e "Confirmar Cumprimento" (dourado, destacado)
- [ ] Botão "Marcar como Perdido" separado, com cor crítica:
  - Modal exige justificativa textual (mín. 20 caracteres)
  - Aviso explícito de que essa ação será notificada ao Titular
- [ ] Indicador visual de criticidade temporal:
  - Verde: > 7 dias
  - Âmbar: 3-7 dias (D-7 a D-3)
  - Vermelho: < 3 dias (D-1)
  - Vermelho pulsante: vencendo hoje
  - Cinza com tarja vermelha: perdido
- [ ] Widget "Prazos Críticos" no dashboard (preview, conexão real em M10)

**Banco de dados:**
- [ ] Migration: tabela `prazos` com RLS por `office_id`
- [ ] Migration: tabela `prazos_alertas` (alertas D-7, D-3, D-1, dia)
- [ ] Migration: tabela `audit_log` (será usada por todo o sistema, instituir aqui)
- [ ] Trigger PostgreSQL para registrar mudanças de status de prazo no `audit_log`

**Backend:**
- [ ] Server Actions: criar, editar prazo
- [ ] Server Action: marcar cumprido (recebe `descricao_cumprimento`, valida, registra auditoria)
- [ ] Server Action: marcar perdido (recebe `justificativa`, valida mínimo, registra auditoria, envia notificação ao Titular via Resend)
- [ ] Cron job (`app/api/cron/prazos-alertas/route.ts`) que roda diariamente às 6h:
  - Calcula prazos D-7, D-3, D-1 e do dia
  - Insere registros em `prazos_alertas`
  - Dispara emails via Resend (push em M11)
- [ ] Validação: prazo com `data_fim` no passado não pode ser criado como pendente
- [ ] **Testes manuais obrigatórios** com 5 cenários reais antes do merge

**Commit final:** `feat: deadline & hearing scheduler with redundant alerts and double-confirmation (CRITICAL MODULE)`

---

## M6 — Pipeline Kanban Processual (UI → Backend)

**Branch:** `feat/pipeline`
**Objetivo:** Pipeline visual com drag-and-drop entre fases processuais, persistindo a transição com auditoria.

**Interface primeiro:**
- [ ] Criar página `/pipeline` com layout horizontal de colunas (scroll horizontal em mobile)
- [ ] Colunas: Pré-processual → Inquérito → Denúncia/Recebimento → Instrução → Memoriais → Sentença → Recursos → Execução → Arquivado
- [ ] Criar componente `FaseColuna` com header (nome + contador de processos)
- [ ] Criar componente `ProcessoCard`:
  - Alcunha do caso (em destaque, serifa pequena)
  - Cliente (nome) + réu (se diferente)
  - Comarca + vara
  - **Borda esquerda colorida** indicando criticidade do próximo prazo (verde/âmbar/vermelho)
  - Próximo prazo/audiência (data + tipo)
  - Avatar do responsável
  - Badge de sigilo se aplicável
- [ ] Implementar drag-and-drop entre colunas com `@dnd-kit`
- [ ] **Modal de confirmação ao mover** entre fases (mudança de fase é evento auditado):
  - "Mover [alcunha] de [fase atual] para [nova fase]?"
  - Campo opcional: "Observação sobre a transição"
  - Confirma ou cancela
- [ ] Filtros laterais: responsável, comarca, tipo penal, urgência, sigilo
- [ ] Indicador visual de coluna ativa durante drag
- [ ] Click no card abre o processo em `/processos/[id]`

**Backend:**
- [ ] Server Action `mudarFaseProcesso(processoId, novaFase, observacao?)`:
  - Atualiza `processos.fase_processual`
  - Insere registro em `andamentos` (tipo=`oficial`, descricao=`Fase alterada de X para Y`)
  - Insere registro em `audit_log`
- [ ] Carregar processos agrupados por fase via Server Component
- [ ] Real-time opcional: outros usuários veem mudanças sem refresh

**Commit final:** `feat: kanban pipeline with phase transitions and audit logging`

---

## M7 — Timeline de Andamentos (UI → Backend)

**Branch:** `feat/andamentos`
**Objetivo:** Timeline cronológica do processo com andamentos, peças produzidas, comunicações e anotações internas (com flag de confidencialidade).

**Interface primeiro:**
- [ ] Implementar aba "Timeline" em `/processos/[id]`
- [ ] Componente `Timeline` com itens cronológicos (mais recente primeiro)
- [ ] Ícone + cor por tipo:
  - 📋 Andamento oficial (despacho, decisão, intimação) — neutro
  - ✍️ Peça produzida (petição, memoriais) — dourado
  - 💬 Comunicação com cliente — verde
  - 🔒 Anotação interna — roxo (badge "confidencial" se marcada)
  - 🎤 Evento de audiência — âmbar
- [ ] Formulário inline "Registrar andamento" com:
  - Tipo (select)
  - Data (default: hoje, editável)
  - Descrição (textarea)
  - Checkbox "Marcar como confidencial" (só aparece para tipo `anotacao_interna`)
  - Anexos opcionais (upload — preparar, integração completa em M8)
- [ ] Exibir autor + data relativa ("há 2 dias") em cada item
- [ ] Filtros por tipo (chips toggleáveis no topo da timeline)
- [ ] Estado vazio com CTA para registrar primeiro andamento
- [ ] Anotações confidenciais visíveis apenas ao Titular (mesmo no MVP single-user, deixar lógica pronta)

**Banco de dados:**
- [ ] Migration: tabela `andamentos` com RLS por `office_id`
- [ ] Coluna `confidencial` boolean
- [ ] Coluna `andamento_source` (default `manual`, reservada para v2)

**Backend:**
- [ ] Server Action: criar andamento
- [ ] Carregar timeline do processo via Server Component, ordenação `data DESC`
- [ ] RLS adicional: andamento confidencial só visível se `auth.uid()` é Titular do escritório

**Commit final:** `feat: process timeline with multiple entry types and confidential notes`

---

## M8 — Gestão de Documentos (UI → Backend)

**Branch:** `feat/documentos`
**Objetivo:** Upload, versionamento e log de acesso de documentos por processo, com criptografia em repouso.

**Interface primeiro:**
- [ ] Implementar aba "Documentos" em `/processos/[id]`
- [ ] Tabela de documentos: título, categoria, versão atual, sigiloso, último acesso, ações
- [ ] Categorias: procuração, contrato de honorários, peça inicial, contestação, recurso, decisão judicial, prova documental, laudo pericial, mídia
- [ ] Drag-and-drop para upload (`react-dropzone`)
- [ ] Modal "Adicionar documento" com:
  - Arquivo
  - Título
  - Categoria
  - Checkbox "Documento sigiloso"
- [ ] Visualizador inline para PDFs (link/iframe)
- [ ] Botão "Nova versão" abre upload preservando metadados, incrementa `versao`
- [ ] Aba "Histórico de versões" por documento
- [ ] Aba "Log de acesso" por documento (quem viu, baixou, editou e quando) — visível apenas ao Titular
- [ ] Badge de sigilo destacado em documentos sensíveis

**Banco de dados:**
- [ ] Migration: tabela `documentos` com RLS por `office_id`
- [ ] Migration: tabela `documentos_acesso_log`
- [ ] Configurar bucket `documentos` no Supabase Storage com criptografia em repouso
- [ ] RLS no Storage: acesso apenas via signed URLs gerados server-side

**Backend:**
- [ ] Server Action: upload de documento (gera signed URL, registra metadados, registra acesso `upload`)
- [ ] Server Action: download (gera signed URL temporária, registra acesso `view`/`download`)
- [ ] Server Action: nova versão (preserva histórico)
- [ ] Trigger automático de log de acesso a cada operação
- [ ] Validação de tamanho máximo (50MB) e tipos permitidos (PDF, DOC/DOCX, JPG, PNG, MP3, MP4)

**Commit final:** `feat: document management with versioning, encrypted storage and access log`

---

## M9 — Módulo Financeiro (UI → Backend)

**Branch:** `feat/financeiro`
**Objetivo:** Honorários contratuais (parcelas), honorários de êxito, despesas reembolsáveis e visão de inadimplência.

**Interface primeiro:**
- [ ] Implementar aba "Financeiro" em `/processos/[id]`
- [ ] Card resumo do processo: total contratado, total recebido, total a receber, despesas a reembolsar
- [ ] Seção "Contratos de Honorários":
  - Botão "Novo Contrato" abre modal:
    - Tipo: contratual | êxito | pro bono | dativo
    - Parte contratante (select de partes vinculadas ao processo)
    - Valor total
    - Se contratual: parcelamento (qtd, primeira parcela, intervalo)
    - Se êxito: gatilho (absolvição, desclassificação, redução de pena), %, valor estimado
  - Listagem de contratos com expansão para ver parcelas
- [ ] Seção "Parcelas" (gerada do contrato): número, valor, vencimento, status, ações (marcar pago)
- [ ] Modal "Marcar parcela como paga": data do pagamento, forma (PIX, transferência, dinheiro, boleto), observações
- [ ] Seção "Despesas Reembolsáveis":
  - Botão "Nova Despesa": categoria (custas, perícia, deslocamento, cópias, honorários periciais), descrição, valor, data, comprovante (upload)
  - Status de reembolso: pendente | reembolsado
- [ ] Criar página `/financeiro` (visão consolidada do escritório):
  - Card "Inadimplência": total + lista de clientes com parcelas atrasadas (com dias de atraso)
  - Card "Faturamento do Mês": valor recebido + comparativo mês anterior
  - Card "A Receber (próximos 30 dias)"
  - Tabela de todas as parcelas com filtros (status, vencimento, cliente)

**Banco de dados:**
- [ ] Migration: tabelas `contratos_honorarios`, `parcelas`, `honorarios_exito`, `despesas`
- [ ] RLS por `office_id`
- [ ] Trigger: ao mudar status de parcela para `pago`, registrar em `audit_log`
- [ ] Cron diário para mover parcelas vencidas (`em_aberto` + vencimento < hoje) para `atrasado`

**Backend:**
- [ ] Server Actions: criar contrato (gera parcelas em transação), marcar parcela paga, lançar despesa, marcar despesa reembolsada
- [ ] Queries agregadas para a página `/financeiro`
- [ ] Validações Zod em valores monetários (positivo, 2 casas decimais)

**Commit final:** `feat: financial module with contracts, installments, success fees and reimbursable expenses`

---

## M10 — Dashboard Executivo (UI → Backend)

**Branch:** `feat/dashboard`
**Objetivo:** Dashboard com visão consolidada da carteira: prazos críticos, audiências da semana, distribuição por fase e faturamento.

**Interface primeiro:**
- [ ] Criar página `/dashboard` com grid responsivo
- [ ] **Cards superiores (KPIs):**
  - Processos ativos
  - Audiências esta semana
  - Prazos próximos 7 dias (com destaque vermelho se houver D-1)
  - Inadimplência total (R$)
- [ ] **Seção "Próximas Audiências"** (lista com data, hora, comarca, vara, processo, cliente)
- [ ] **Seção "Prazos Críticos"** ordenada por proximidade, com escalada visual:
  - Vermelho pulsante para hoje
  - Vermelho para D-1
  - Âmbar para D-3 a D-7
- [ ] **Distribuição por Fase** — gráfico de barras horizontais (Recharts) com total de processos por fase
- [ ] **Faturamento do Mês** — card com valor + comparativo mês anterior + sparkline opcional
- [ ] **Atalhos rápidos** no topo: + Novo Processo, + Novo Prazo, + Nova Parte
- [ ] Skeleton loading para todos os cards
- [ ] Saudação personalizada com nome do usuário ("Bom dia, Dr. Leandro")
- [ ] Tipografia da saudação em serifa para reforçar identidade

**Backend:**
- [ ] Queries agregadas via Supabase para cada KPI (escopadas por `office_id` via RLS)
- [ ] Carregar seções em Server Component com Suspense por bloco
- [ ] Cache curto (60s) para queries pesadas

**Commit final:** `feat: executive dashboard with KPIs, deadlines, hearings and phase distribution`

---

## M11 — Notificações Push Mobile (UI → Backend)

**Branch:** `feat/push-notifications`
**Objetivo:** Alertas de prazo no celular via Web Push API + Service Worker. Crítico para o Dr. Leandro que trabalha fora do escritório.

**Interface primeiro:**
- [ ] Criar Service Worker em `public/sw.js`
- [ ] Componente `PushPermissionPrompt` (banner discreto pedindo permissão na primeira visita)
- [ ] Aba "Notificações" em `/configuracoes`:
  - Status atual (ativadas/desativadas)
  - Toggle por tipo: prazo D-7, D-3, D-1, do dia, audiências, mudanças de status
  - Botão "Testar notificação" (envia push de teste)
- [ ] Tela de permissão amigável explicando importância (prazos processuais)

**Backend:**
- [ ] Migration: tabela `push_subscriptions` (`user_id`, `endpoint`, `keys`, `created_at`)
- [ ] Server Action: salvar subscription ao usuário aceitar
- [ ] Integrar `web-push` no cron de alertas (M5):
  - Para cada alerta gerado, buscar subscriptions do responsável
  - Disparar push em paralelo a email
- [ ] Configurar VAPID keys em variáveis de ambiente
- [ ] Tratamento de subscription inválida (remover automaticamente)

**Commit final:** `feat: web push notifications for deadline alerts`

---

## M12 — Roles e Permissões Ativas (UI → Backend)

**Branch:** `feat/roles-permissions`
**Objetivo:** Ativar os roles Associado, Secretária e Estagiário. Estrutura já existe (RLS, audit_log) — milestone consolida UI de gestão e enforcement das permissões.

> **Nota:** No MVP, apenas Dr. Leandro como Titular. Esse milestone só é executado quando o escritório efetivamente crescer. RLS já está escopada desde M2.

**Interface primeiro:**
- [ ] Aba "Equipe" em `/configuracoes`:
  - Listagem de membros do escritório com role atual
  - Botão "Convidar membro" → modal (email + role)
  - Ações: editar role, remover membro
- [ ] Página `/invite/[token]` para aceite de convite (define senha, ativa conta)
- [ ] Indicadores visuais nas telas:
  - Botões/seções desabilitados com tooltip explicando permissão necessária
  - Ex: estagiário vê botão "Marcar Cumprido" desabilitado com tooltip "Apenas Titular ou Associado"

**Banco de dados:**
- [ ] Migration: tabela `office_members` (já existe desde M2, agora com convites pendentes)
- [ ] Migration: tabela `invites` (`token`, `email`, `role`, `expires_at`, `accepted_at`)
- [ ] Atualizar policies RLS por role onde necessário (ex: `documentos` confidenciais só para Titular)

**Backend:**
- [ ] `lib/permissions/can.ts` — função utilitária `can(user, action, resource)` consultada server-side
- [ ] Server Actions: criar convite, aceitar convite, alterar role, remover membro
- [ ] Integrar Resend para email de convite
- [ ] Enforcement em todas as Server Actions sensíveis (não confiar só na UI)
- [ ] Atualizar dashboard: Associado vê só seus processos, Secretária vê tudo exceto sigiloso/financeiro

**Commit final:** `feat: role-based access control for associates, secretaries and interns`

---

## M13 — Site Institucional (Opcional)

**Branch:** `feat/landing-page`
**Objetivo:** Página pública institucional do escritório do Dr. Leandro Pedrosa (apresentação + captação de contato).

> **Nota:** Opcional. Este sistema é dedicado, mas pode haver interesse em ter uma landing page institucional em `leandropedrosa.adv.br` que use a mesma identidade visual. Avaliar com o cliente antes de executar.

- [ ] Criar `app/page.tsx` como landing institucional
- [ ] Seção Hero: nome em serifa grande, subtítulo "Advocacia Criminal", CTA "Agendar consulta"
- [ ] Seção Áreas de Atuação: cards com áreas do criminal (Tribunal do Júri, Crimes Patrimoniais, Tráfico, Crimes Cibernéticos, etc.)
- [ ] Seção Sobre: foto/bio do Dr. Leandro, OAB, formação
- [ ] Seção Diferenciais: atendimento, sigilo, dedicação
- [ ] Formulário de contato (envia email via Resend para o escritório, não cria nada no CRM ainda)
- [ ] Footer com contato, OAB, redes sociais, endereço
- [ ] Navbar minimalista com logo + botão "Área Restrita" (link para `/login` do CRM)
- [ ] Responsiva para mobile e tablet
- [ ] Metatags e Open Graph para SEO básico (Google "advogado criminalista [cidade]")
- [ ] Animações com respeito a `prefers-reduced-motion`

**Commit final:** `feat: institutional landing page with practice areas and contact form`

---

## M14 — Deploy & Produção

**Branch:** `feat/production-deploy`
**Objetivo:** Aplicação em produção na Vercel com Supabase configurado, domínio próprio e variáveis de ambiente.

- [ ] Criar projeto na Vercel e conectar repositório GitHub
- [ ] Configurar variáveis de ambiente na Vercel (todas do `.env.example`, exceto Stripe)
- [ ] Configurar domínio customizado (`crm.leandropedrosa.adv.br` ou similar)
- [ ] Rodar todas as migrations no banco de produção do Supabase
- [ ] Ativar RLS e verificar todas as policies em produção (audit completo)
- [ ] Configurar Resend com domínio de e-mail verificado (`@leandropedrosa.adv.br`)
- [ ] Configurar VAPID keys de produção para push
- [ ] Configurar cron jobs na Vercel (`vercel.json` com schedule do alerta de prazos)
- [ ] Backup automático configurado no Supabase (daily, retention 30 dias)
- [ ] Testar fluxo completo em produção:
  - Login do Titular
  - Criar parte (cliente + réu)
  - Criar processo com CNJ válido
  - Lançar prazo e receber alerta D-1
  - Mover processo no Kanban
  - Lançar honorário e marcar parcela paga
  - Upload de documento sigiloso
- [ ] Configurar `NEXT_PUBLIC_APP_URL` com URL de produção
- [ ] Revisão final de segurança:
  - Variáveis sensíveis nunca expostas no client
  - RLS em todas as tabelas
  - Signed URLs para Storage
  - Audit log funcionando
  - LGPD: política de privacidade e termo de uso publicados

**Commit final:** `chore: production deployment with secure configuration and audit-ready setup`

---

## Resumo dos Milestones

| # | Branch | Entrega |
|---|---|---|
| M0 | `setup/project-foundation` | Stack configurada, identidade visual no Tailwind, projeto no GitHub |
| M1 | `feat/app-shell` | Layout com sidebar institucional e navegação |
| M2 | `feat/authentication` | Login, recuperação de senha, seed do Titular |
| M3 | `feat/partes` | CRUD de partes com múltiplos papéis |
| M4 | `feat/processos` | CRUD de processos com validação CNJ e sigilo |
| M5 | `feat/agenda` | **⚠️ Agenda de prazos (módulo crítico)** |
| M6 | `feat/pipeline` | Kanban processual com transições auditadas |
| M7 | `feat/andamentos` | Timeline com anotações confidenciais |
| M8 | `feat/documentos` | Documentos com versionamento e log de acesso |
| M9 | `feat/financeiro` | Contratos, parcelas, êxito, despesas |
| M10 | `feat/dashboard` | Dashboard executivo |
| M11 | `feat/push-notifications` | Alertas push no mobile |
| M12 | `feat/roles-permissions` | Roles ativos (Associado, Secretária, Estagiário) |
| M13 | `feat/landing-page` | Site institucional (opcional) |
| M14 | `feat/production-deploy` | Deploy em produção na Vercel |

---

## Observações Estratégicas

- **M5 é o coração do sistema.** Não avance para outros milestones se a agenda de prazos não estiver robusta. Teste com 5 cenários reais antes do merge.
- **M12 só é executado quando o escritório crescer.** Se for só o Dr. Leandro, dá pra entregar o sistema em produção logo após M11.
- **M13 é opcional** — se ele já tem site institucional ou não quer, pula direto para M14.
- **Validação contínua:** ao final de cada milestone, fazer demo de 15 min com o Dr. Leandro usando dados reais de 2-3 processos antes de avançar.
- **v2 (não está nesse plano):** integração com PJe Push, Projudi, eproc, ESAJ + parser de PDF de andamento. Arquitetura preparada (`andamento_source`), implementação posterior.