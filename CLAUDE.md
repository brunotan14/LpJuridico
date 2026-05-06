# LP Jurídico — Briefing do Sistema para Claude Code

## Visão Geral

Sistema web dedicado de gestão de escritório de advocacia criminal para o Dr. Leandro Pedrosa. Single-tenant no MVP (apenas o escritório do Dr. Leandro), com arquitetura multi-usuário pronta para expansão.

**Problema central:** advogados criminalistas perdem prazos fatais por gerenciar processos em planilhas, agendas físicas e WhatsApp. Sistemas genéricos do mercado (Astrea, Projuris, ADVBOX) não modelam particularidades do criminal.

**Diferencial:** modelagem explícita do fluxo penal — distinção entre cliente contratante e réu/investigado, fases do rito penal, honorários de êxito, criticidade absoluta de prazos.

---

## Stack Técnico

| Camada | Tecnologia |
|---|---|
| Frontend | Next.js 14 (App Router) + React 18 |
| UI | Tailwind CSS + shadcn/ui |
| Linguagem | TypeScript 5 (strict mode obrigatório) |
| Backend/API | Next.js Server Actions + Route Handlers |
| Banco + Auth | Supabase (PostgreSQL + RLS + Auth) |
| Storage | Supabase Storage (criptografia em repouso) |
| E-mail | Resend (alertas de prazo, convites) |
| Notificações Push | Web Push API + Service Worker |
| Drag-and-drop | @dnd-kit |
| Gráficos | Recharts |
| Calendário | react-big-calendar ou FullCalendar |
| Validação | Zod |
| Datas | date-fns + date-fns-tz (fuso horário Brasil) |
| Deploy | Vercel (app) + Supabase (banco/storage) |
| Versionamento | Git + GitHub |

**Não usar:** Stripe (não é SaaS comercial).

---

## Identidade Visual

**Paleta obrigatória:**
- Primária (institucional): Preto profundo `#0A0A0A`
- Acento (dourado): `#C9A961` a `#B8924A` — usar com parcimônia
- Sucesso: Verde sóbrio `#15803D`
- Atenção (D-3 a D-7): Âmbar `#D97706`
- Crítico (D-1, perdido): Vermelho `#DC2626`
- Superfícies: off-white `#FAFAF9` (Stone/Zinc do Tailwind)

**Tipografia:**
- Títulos institucionais: `Cormorant Garamond` ou `Playfair Display` (serifa)
- UI funcional: `Inter` ou `Geist` (sans-serif)
- Nunca misturar serifa em botões ou labels

**Componentes-chave:**
- Sidebar fixa preta com logo "LP" dourado no topo
- Cards do Kanban com borda esquerda colorida por criticidade do próximo prazo
- Cards de prazo crítico com tarja vertical vermelha + timer de horas restantes
- Modais de confirmação com peso visual alto

**Evitar absolutamente:**
- Azul-índigo estilo SaaS genérico
- Brasões, balanças e martelos como ícones de marca
- Gradientes vibrantes, glassmorphism colorido

---

## Arquitetura de Dados — Conceitos Críticos

### RLS desde o dia 1
Toda tabela deve ter RLS escopado por `office_id`. Mesmo sendo single-tenant no MVP, a arquitetura deve suportar multi-escritório sem refactor.

### Separação cliente contratante ≠ réu
Uma mãe pode contratar pelo filho preso. O sistema modela isso explicitamente — `client_id` e `defendant_id` são entidades distintas na tabela de processos.

### Uma pessoa, múltiplos papéis
A mesma pessoa pode ser cliente em um processo e testemunha em outro. Modelar como entidade `parties` com papel (role) por vínculo ao processo, não como tabelas separadas.

### Campos reservados para v2 (criar, não implementar)
- `processos.ai_indexed_at` — reservado para integração futura com IA
- `andamentos.source` — valores: `manual`, `pje`, `projudi`, `eproc`, `esaj` — abstrair fonte desde o início

---

## Módulos e Ordem de Desenvolvimento

### Milestones (ordem de prioridade)

1. **Setup** — Next.js + Supabase + shadcn/ui + identidade visual base
2. **Autenticação** — login, sessão via middleware, RLS por `office_id`
3. **Cadastro de Partes** — Clientes, Réus, Vítimas, Testemunhas, Autoridades
4. **Cadastro de Processos** — validação CNJ, vínculo de partes, fase, sigilo
5. **Agenda de Prazos e Audiências** — calendário + alertas + dupla confirmação *(módulo crítico)*
6. **Pipeline Kanban** — drag-and-drop (@dnd-kit) + persistência + registro de transição
7. **Timeline de Andamentos** — cronológico por processo, anotações confidenciais
8. **Gestão de Documentos** — upload, versionamento, log de acesso
9. **Módulo Financeiro** — contratos, parcelas, êxito, despesas, inadimplência
10. **Dashboard Executivo** — consolidação
11. **Permissões e Roles** — ativar Associado/Secretária/Estagiário
12. **Notificações Push Mobile** — service worker
13. *(v2)* Integração tribunais — PJe Push, parser de PDF

---

## Regras de Negócio Críticas

### Prazos (tolerância zero)
- Alertas redundantes em D-7, D-3, D-1 e manhã do dia (push + email via Resend)
- Status: `pendente`, `cumprido`, `perdido` (perdido exige justificativa obrigatória)
- **Dupla confirmação obrigatória** para marcar prazo como cumprido: clique + modal com resumo do que foi protocolado
- Prazos sem ação até D-1 escalam visualmente (vermelho pulsante no dashboard)

### Fases do Kanban (colunas fixas, nesta ordem)
1. Pré-processual
2. Inquérito Policial
3. Denúncia/Recebimento
4. Instrução
5. Memoriais
6. Sentença
7. Recursos (apelação, REsp, RE, HC)
8. Execução Penal
9. Arquivado/Baixado

Drag-and-drop entre fases deve persistir a mudança e registrar automaticamente no histórico do processo.

### Numeração CNJ
Campo `numero_cnj` deve ter máscara e validação de formato: `NNNNNNN-NN.NNNN.N.NN.NNNN`.

### Situação prisional do réu
Valores controlados: `solto`, `preso_preventivo`, `preso_definitivo`, `foragido`.

### Sigilo do processo
Níveis: `publico`, `segredo_de_justica`, `urgente_sigiloso`. Log de acesso obrigatório para processos em segredo de justiça (LGPD + sigilo profissional).

---

## Roles e Permissões (preparar desde o MVP)

| Role | Permissões |
|---|---|
| Titular | Tudo |
| Associado | Processos próprios + delegados, sem financeiro de terceiros |
| Secretária | Cadastros + agenda, sem financeiro sensível, sem peças sigilosas |
| Estagiário | Leitura ampla, escrita em minutas, sem finalizar prazos |

MVP ativa apenas o role Titular (Dr. Leandro). Os demais roles existem no schema mas ficam inativos.

---

## Módulo Financeiro — Tipos

- **Contratuais**: valor fixo parcelado (parcelas com vencimento, forma de pagamento, status)
- **Êxito**: % sobre resultado — gatilho configurável (absolvição, desclassificação, redução de pena)
- **Pro bono / Dativo**: sem cobrança
- **Despesas reembolsáveis**: custas, perícias, deslocamento, cópias — com comprovante anexável

---

## Diretrizes de Desenvolvimento

- TypeScript strict sempre — sem `any`, sem `as unknown`
- Zod para validação em toda boundary de entrada (Server Actions, Route Handlers, formulários)
- Server Actions para mutações, Route Handlers apenas para webhooks e APIs externas
- RLS no Supabase é a última linha de defesa — não confiar apenas no frontend
- Documentos no Supabase Storage com criptografia em repouso habilitada
- Log de acesso a documentos sigilosos: quem visualizou, baixou, editou e quando
- date-fns-tz para todas as operações de data/hora (fuso horário America/Fortaleza por padrão)
- Responsivo obrigatório — o Dr. Leandro usa notebook no escritório e celular em audiência

---

## Usuário Principal

**Dr. Leandro Pedrosa — Advogado Titular**
- Advocacia criminal de médio/alto envolvimento, Paraíba e adjacências
- Precisa de visão consolidada: audiências da semana, prazos correndo, inadimplência
- Usa notebook no escritório e celular em fórum/audiência
- Tolerância zero a perda de prazo

---

## O que NÃO está no escopo (MVP)

- Integração com tribunais (PJe, Projudi, eproc, ESAJ) — v2
- Geração de documentos por template — fase posterior
- IA para resumos e peças — v2 (`ai_indexed_at` reservado, não implementar)
- Multi-escritório SaaS — arquitetar para, não implementar agora
- Stripe / pagamentos online — fora do escopo
