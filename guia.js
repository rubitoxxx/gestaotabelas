(() => {
  const catalog = window.MENUS;
  const workflows = catalog?.telas || [];
  const modules = catalog?.modulos || [];
  const kinds = [
    ["", "Todos os tipos"],
    ["operacao", "Operação"],
    ["consulta", "Consulta"],
    ["relatorio", "Relatório"],
    ["cadastro", "Cadastro"],
    ["cancelamento", "Cancelamento"],
    ["configuracao", "Configuração"],
    ["utilitario", "Utilitário"],
  ];

  const $ = (id) => document.getElementById(id);
  const stateKey = "gestao-guia-progresso-v2";
  let category = "Todas";
  let kind = "";
  let selected = workflows[0]?.id || "";
  let done = {};
  try {
    const stored = JSON.parse(localStorage.getItem(stateKey) || "{}");
    done =
      stored && typeof stored === "object" && !Array.isArray(stored)
        ? stored
        : {};
  } catch {
    done = {};
  }

  const params = new URLSearchParams(location.search);
  const requested = params.get("tela");
  if (requested && workflows.some((w) => w.id === requested)) selected = requested;

  function updateProgress() {
    const total = workflows.reduce((sum, w) => sum + w.steps.length, 0);
    const checked = Object.values(done).filter(Boolean).length;
    const percent = total ? Math.round((checked / total) * 100) : 0;
    $("progressText").textContent = `${percent}%`;
    $("progressBar").style.width = `${percent}%`;
    $("progressDetail").textContent = `${checked} de ${total} etapas · ${workflows.length} telas do menu`;
    try {
      localStorage.setItem(stateKey, JSON.stringify(done));
    } catch {
      // O guia continua utilizável mesmo se o navegador bloquear armazenamento local.
    }
  }

  function renderFilters() {
    const moduleChips = ["Todas", ...modules]
      .map(
        (name) =>
          `<button type="button" class="filter-chip ${category === name ? "selected" : ""}" data-category="${name}" aria-pressed="${category === name}">${name}</button>`,
      )
      .join("");
    const kindChips = kinds
      .map(
        ([id, label]) =>
          `<button type="button" class="filter-chip ${kind === id ? "selected" : ""}" data-kind="${id}" aria-pressed="${kind === id}">${label}</button>`,
      )
      .join("");
    $("categoryFilters").innerHTML = moduleChips;
    $("kindFilters").innerHTML = kindChips;
  }

  function visibleWorkflows() {
    const query = $("guideSearch").value.trim().toLocaleLowerCase("pt-BR");
    return workflows.filter((w) => {
      const inCategory = category === "Todas" || w.module === category;
      const inKind = !kind || w.kind === kind;
      const haystack = [w.title, w.form, w.module, w.folder, w.kindLabel, w.path.join(" ")]
        .join(" ")
        .toLocaleLowerCase("pt-BR");
      return inCategory && inKind && (!query || haystack.includes(query));
    });
  }

  function renderList(updateDetail = true) {
    const visible = visibleWorkflows();
    $("emptyList").hidden = visible.length > 0;
    $("listCount").textContent = `${visible.length} tela${visible.length === 1 ? "" : "s"}`;
    let html = "";
    let lastGroup = "";
    for (const w of visible) {
      const group = w.path.slice(0, -1).join(" › ") || w.module;
      if (group !== lastGroup) {
        lastGroup = group;
        html += `<p class="group-label">${group}</p>`;
      }
      const checked = w.steps.filter((_, index) => done[`${w.id}:${index}`]).length;
      html += `<button type="button" class="workflow-item ${w.id === selected ? "active" : ""}" data-workflow="${w.id}"${w.id === selected ? ' aria-current="page"' : ""}><span class="workflow-icon">${w.icon}</span><span class="workflow-label"><strong>${w.title}</strong><small>${w.kindLabel} · ${checked}/${w.steps.length}</small></span><span class="workflow-arrow" aria-hidden="true">›</span></button>`;
    }
    $("workflowList").innerHTML = html;
    if (!visible.some((w) => w.id === selected) && visible.length)
      selected = visible[0].id;
    if (visible.length && updateDetail) renderDetail();
  }

  function referenceLinks(w) {
    const tables = window.DER?.tabelas || {};
    const seen = new Set();
    return w.refs
      .filter((name) => tables[name] && !seen.has(name) && seen.add(name))
      .map(
        (name) =>
          `<a class="table-link" href="index.html?table=${encodeURIComponent(name)}" target="_blank" rel="noopener">${name}<span aria-hidden="true">↗</span></a>`,
      )
      .join("");
  }

  function relatedScreens(w) {
    return workflows
      .filter((other) => other.folder === w.folder && other.module === w.module && other.id !== w.id)
      .slice(0, 8)
      .map(
        (other) =>
          `<button type="button" class="related-link" data-workflow="${other.id}">${other.title}</button>`,
      )
      .join("");
  }

  function renderDetail() {
    const w = workflows.find((item) => item.id === selected) || workflows[0];
    if (!w) return;
    const checked = w.steps.filter((_, index) => done[`${w.id}:${index}`]).length;
    const references = referenceLinks(w);
    const related = relatedScreens(w);
    const warning = w.warning
      ? `<aside class="callout callout-warning"><strong>Atenção</strong><span>${w.warning}</span></aside>`
      : "";
    const steps = w.steps
      .map(([title, body], index) => {
        const key = `${w.id}:${index}`;
        return `<label class="step-card ${done[key] ? "completed" : ""}"><input type="checkbox" data-step="${key}" ${done[key] ? "checked" : ""}><span class="step-number">${String(index + 1).padStart(2, "0")}</span><span class="step-copy"><strong>${title}</strong><span>${body}</span></span><span class="step-check" aria-hidden="true">✓</span></label>`;
      })
      .join("");
    const demo =
      w.demo === "precos" ? priceDemo() : w.demo === "recorrencia" ? recurrenceDemo() : "";
    const formNote =
      w.form && w.form !== w.title
        ? `<span class="form-chip" title="Nome interno da tela no menu">Tela interna: ${w.form}</span>`
        : "";
    $("workflowDetail").innerHTML = `<div class="detail-heading"><div><p class="eyebrow">${w.module.toUpperCase()} · ${w.kindLabel.toUpperCase()}</p><h2>${w.icon} ${w.title}</h2><p class="menu-path">${w.path.join(" → ")}</p><p class="detail-summary">${w.summary}</p><div class="meta-row">${formNote}<span class="kind-badge">${w.kindLabel}</span></div></div><span class="completion-pill">${checked}/${w.steps.length} concluídas</span></div>${warning}${demo}<div class="steps-heading"><div><h3>Como usar esta tela</h3><p>Siga a ordem no Gestão e marque cada etapa depois de conferir.</p></div></div><div class="steps">${steps}</div>${related ? `<section class="related"><div><h3>Outras telas do mesmo menu</h3><p>${w.folder}</p></div><div class="related-links">${related}</div></section>` : ""}<section class="references"><div><h3>Onde isso aparece no banco</h3><p>Tabelas mais próximas no mapa do Gestao.fdb — conferência estrutural, não é o nome do menu.</p></div><div class="table-links">${references || '<span class="muted">Nenhuma tabela correspondente identificada no arquivo de metadados.</span>'}</div></section>`;
    updatePriceDemo();
    const startInput = $("expenseStart");
    if (startInput) startInput.value = localDateValue(new Date());
    const url = new URL(location.href);
    url.searchParams.set("tela", w.id);
    history.replaceState(null, "", url);
  }

  function priceDemo() {
    return `<section class="demo-panel"><div class="demo-heading"><span class="demo-icon">％</span><div><h3>Simulador de preços</h3><p>Exemplo didático de markup sobre o custo. Não grava no ERP.</p></div></div><label class="demo-input">Custo do produto (R$)<input id="priceCost" type="number" min="0" step="0.01" value="100"></label><div id="priceResults" class="price-results"></div><p class="demo-footnote">Exemplo: preço = custo × (1 + markup). A margem real será menor após impostos, taxas e despesas.</p></section>`;
  }

  function recurrenceDemo() {
    return `<section class="demo-panel"><div class="demo-heading"><span class="demo-icon">◷</span><div><h3>Prévia de recorrência</h3><p>Calcula vencimentos mensais até 31/12/2028; nada é lançado no banco.</p></div></div><div class="demo-grid"><label class="demo-input">Valor por ocorrência (R$)<input id="expenseAmount" type="number" min="0" step="0.01" value="250"></label><label class="demo-input">Primeiro vencimento<input id="expenseStart" type="date"></label></div><button type="button" id="previewExpenses" class="button button-primary">Pré-visualizar vencimentos</button><div id="expenseResults" class="expense-results" aria-live="polite"></div></section>`;
  }

  function updatePriceDemo() {
    const input = $("priceCost");
    const result = $("priceResults");
    if (!input || !result) return;
    const cost = Math.max(0, Number(input.value) || 0);
    const tiers = [
      ["Econômico", 10],
      ["Padrão", 25],
      ["Especial", 40],
    ];
    result.innerHTML = tiers
      .map(
        ([name, rate]) =>
          `<div class="price-tier"><span>${name}<small>+${rate}%</small></span><strong>${(cost * (1 + rate / 100)).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong></div>`,
      )
      .join("");
  }

  function localDateValue(date) {
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 10);
  }

  function previewExpenses() {
    const amount = Number($("expenseAmount").value);
    const startValue = $("expenseStart").value;
    const output = $("expenseResults");
    if (!Number.isFinite(amount) || amount <= 0 || !startValue) {
      output.innerHTML = `<p class="validation-message">Informe um valor maior que zero e uma data inicial válida.</p>`;
      return;
    }
    const start = new Date(`${startValue}T12:00:00`);
    const end = new Date("2028-12-31T12:00:00");
    const occurrences = [];
    for (let offset = 0; occurrences.length < 100; offset += 1) {
      const year = start.getFullYear();
      const month = start.getMonth() + offset;
      const lastDay = new Date(year, month + 1, 0).getDate();
      const date = new Date(year, month, Math.min(start.getDate(), lastDay), 12);
      if (date > end) break;
      occurrences.push(date);
    }
    if (!occurrences.length) {
      output.innerHTML = `<p class="validation-message">A data inicial precisa ser até 31/12/2028.</p>`;
      return;
    }
    const total = amount * occurrences.length;
    output.innerHTML = `<p class="preview-total"><strong>${occurrences.length} vencimentos</strong><span>Total estimado: ${total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span></p><div class="date-chips">${occurrences.map((d) => `<span>${d.toLocaleDateString("pt-BR")}</span>`).join("")}</div><p class="demo-footnote">Prévia local, sem geração de faturas. Ajuste vencimentos em fins de semana/feriados conforme a regra do contrato.</p>`;
  }

  function selectWorkflow(id) {
    selected = id;
    renderList();
  }

  $("categoryFilters").onclick = (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    category = button.dataset.category;
    renderFilters();
    renderList();
  };
  $("kindFilters").onclick = (event) => {
    const button = event.target.closest("[data-kind]");
    if (!button) return;
    kind = button.dataset.kind;
    renderFilters();
    renderList();
  };
  $("workflowList").onclick = (event) => {
    const button = event.target.closest("[data-workflow]");
    if (!button) return;
    selectWorkflow(button.dataset.workflow);
  };
  $("guideSearch").addEventListener("input", renderList);
  $("workflowDetail").onchange = (event) => {
    const checkbox = event.target.closest("[data-step]");
    if (!checkbox) return;
    done[checkbox.dataset.step] = checkbox.checked;
    updateProgress();
    checkbox.closest(".step-card").classList.toggle("completed", checkbox.checked);
    const w = workflows.find((item) => item.id === selected);
    const count = w.steps.filter((_, index) => done[`${w.id}:${index}`]).length;
    $("workflowDetail").querySelector(".completion-pill").textContent =
      `${count}/${w.steps.length} concluídas`;
    renderList(false);
  };
  $("workflowDetail").oninput = (event) => {
    if (event.target.id === "priceCost") updatePriceDemo();
  };
  $("workflowDetail").onclick = (event) => {
    if (event.target.closest("#previewExpenses")) {
      previewExpenses();
      return;
    }
    const related = event.target.closest("[data-workflow]");
    if (related) selectWorkflow(related.dataset.workflow);
  };
  $("resetProgress").onclick = () => {
    if (!window.confirm("Apagar todas as marcações deste navegador?")) return;
    done = {};
    updateProgress();
    renderList();
    renderDetail();
  };
  $("printGuide").onclick = () => window.print();

  renderFilters();
  updateProgress();
  renderList();
  renderDetail();
  updatePriceDemo();
  const today = new Date();
  const startInput = $("expenseStart");
  if (startInput) startInput.value = localDateValue(today);
})();
