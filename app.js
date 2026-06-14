const STORAGE_KEY = "finance-dashboard-transactions";
const BUDGET_STORAGE_KEY = "finance-dashboard-budgets";
const DATA_VERSION_KEY = "finance-dashboard-version";
const CUSTOM_CATEGORIES_KEY = "finance-dashboard-custom-categories";
const SETTINGS_KEY = "finance-dashboard-settings";
const GOALS_KEY = "finance-dashboard-goals";
const ACCOUNTS_KEY = "finance-dashboard-accounts";
const RECURRING_KEY = "finance-dashboard-recurring";
const ONBOARDING_KEY = "finance-dashboard-onboarding-done";
const CURRENT_DATA_VERSION = 3;

const VIEW_TITLES = {
  overview: ["Genel Bakış", "Finansal durumunuzun özeti"],
  transactions: ["İşlemler", "Kayıt ekle, düzenle ve filtrele"],
  analytics: ["Analitik", "Grafikler, bütçe ve sağlık skoru"],
  planning: ["Planlama", "Hedefler, tekrarlayan işlemler ve hesaplar"],
  settings: ["Ayarlar", "Görünüm, kategoriler ve veri yönetimi"],
};

const ACCOUNT_TYPE_LABELS = { bank: "Banka", cash: "Nakit", investment: "Yatırım", credit: "Kredi" };
const CUSTOM_CATEGORY_VALUE = "__custom__";

const categories = {
  income: ["Maaş", "Freelance", "Yatırım", "Satış", "Diğer Gelir"],
  expense: ["Kira", "Market", "Ulaşım", "Faturalar", "Eğlence", "Sağlık", "Eğitim", "Diğer Gider"],
};

const colors = ["#216c4f", "#5d8f68", "#d29d3f", "#c2493b", "#477ca8", "#7c6a9c", "#d17952", "#609a90"];

const sampleTransactions = [
  ["income", "Maaş", 48000, "2026-01-03", "Ocak maaşı"],
  ["expense", "Kira", 14500, "2026-01-05", "Ev kirası"],
  ["expense", "Market", 5200, "2026-01-12", "Aylık alışveriş"],
  ["expense", "Faturalar", 2300, "2026-01-18", "Elektrik ve internet"],
  ["income", "Freelance", 8500, "2026-02-09", "Tasarım işi"],
  ["expense", "Ulaşım", 1650, "2026-02-14", "Toplu taşıma"],
  ["expense", "Eğlence", 2700, "2026-02-21", "Konser ve yemek"],
  ["income", "Yatırım", 4200, "2026-03-02", "Temettü"],
  ["expense", "Sağlık", 1850, "2026-03-08", "Kontrol"],
  ["expense", "Eğitim", 3100, "2026-03-20", "Online kurs"],
  ["income", "Maaş", 50000, "2026-04-03", "Nisan maaşı"],
  ["expense", "Market", 6100, "2026-04-10", "Market"],
  ["expense", "Kira", 14500, "2026-04-05", "Ev kirası"],
  ["income", "Satış", 6200, "2026-05-16", "İkinci el satış"],
  ["expense", "Faturalar", 2600, "2026-05-18", "Faturalar"],
  ["expense", "Ulaşım", 2100, "2026-05-25", "Yakıt"],
  ["income", "Maaş", 52000, "2026-06-03", "Haziran maaşı"],
  ["expense", "Market", 5800, "2026-06-07", "Haftalık alışveriş"],
  ["expense", "Eğlence", 1900, "2026-06-11", "Sinema"],
].map(([type, category, amount, date, note], index) => ({
  id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + index),
  type,
  category,
  amount,
  date,
  note,
}));

const defaultBudgets = {
  Kira: { amount: 16000, manual: true },
  Market: { amount: 9000, manual: true },
  Ulaşım: { amount: 3500, manual: true },
  Faturalar: { amount: 3500, manual: true },
  Eğlence: { amount: 4000, manual: true },
};

const budgetWeights = {
  Kira: 0.28,
  Market: 0.14,
  Ulaşım: 0.06,
  Faturalar: 0.07,
  Eğlence: 0.07,
  Sağlık: 0.05,
  Eğitim: 0.06,
  "Diğer Gider": 0.05,
};

const EMPTY_HINT = "Veri girin";
const EMPTY_LIST_HTML = `<p class="empty-state visible empty-card">Henüz veri yok. Sol panelden işlem ekleyin veya örnek veri yükleyin.</p>`;

const metricValues = {};
const LIST_ANIM_MS = 320;

const elements = {
  form: document.querySelector("#transactionForm"),
  type: document.querySelector("#type"),
  category: document.querySelector("#category"),
  customCategoryWrap: document.querySelector("#customCategoryWrap"),
  customCategory: document.querySelector("#customCategory"),
  amount: document.querySelector("#amount"),
  date: document.querySelector("#date"),
  note: document.querySelector("#note"),
  budgetForm: document.querySelector("#budgetForm"),
  budgetCategory: document.querySelector("#budgetCategory"),
  budgetAmount: document.querySelector("#budgetAmount"),
  datePreset: document.querySelector("#datePreset"),
  periodFilter: document.querySelector("#periodFilter"),
  typeFilter: document.querySelector("#typeFilter"),
  categoryFilter: document.querySelector("#categoryFilter"),
  searchInput: document.querySelector("#searchInput"),
  startDate: document.querySelector("#startDate"),
  endDate: document.querySelector("#endDate"),
  incomeTotal: document.querySelector("#incomeTotal"),
  expenseTotal: document.querySelector("#expenseTotal"),
  balanceTotal: document.querySelector("#balanceTotal"),
  savingRate: document.querySelector("#savingRate"),
  incomeShare: document.querySelector("#incomeShare"),
  expenseShare: document.querySelector("#expenseShare"),
  balanceStatus: document.querySelector("#balanceStatus"),
  savingStatus: document.querySelector("#savingStatus"),
  accountSummary: document.querySelector("#accountSummary"),
  nextPayment: document.querySelector("#nextPayment"),
  goalSummary: document.querySelector("#goalSummary"),
  periodTrend: document.querySelector("#periodTrend"),
  budgetRows: document.querySelector("#budgetRows"),
  budgetSummary: document.querySelector("#budgetSummary"),
  budgetBasisTitle: document.querySelector("#budgetBasisTitle"),
  budgetBasisText: document.querySelector("#budgetBasisText"),
  advisorList: document.querySelector("#advisorList"),
  healthScore: document.querySelector("#healthScore"),
  heroHealth: document.querySelector("#heroHealth"),
  goalRows: document.querySelector("#goalRows"),
  goalCount: document.querySelector("#goalCount"),
  upcomingRows: document.querySelector("#upcomingRows"),
  upcomingCount: document.querySelector("#upcomingCount"),
  categoryPie: document.querySelector("#categoryPie"),
  cashflowLine: document.querySelector("#cashflowLine"),
  categoryLegend: document.querySelector("#categoryLegend"),
  categoryInsight: document.querySelector("#categoryInsight"),
  categoryInsightText: document.querySelector("#categoryInsightText"),
  cashflowInsight: document.querySelector("#cashflowInsight"),
  cashflowInsightText: document.querySelector("#cashflowInsightText"),
  transactionRows: document.querySelector("#transactionRows"),
  reportPanel: document.querySelector(".table-wrap"),
  reportCount: document.querySelector("#reportCount"),
  topExpense: document.querySelector("#topExpense"),
  topCategory: document.querySelector("#topCategory"),
  averageTransaction: document.querySelector("#averageTransaction"),
  latestTransaction: document.querySelector("#latestTransaction"),
  pieHint: document.querySelector("#pieHint"),
  lineHint: document.querySelector("#lineHint"),
  exportBtn: document.querySelector("#exportBtn"),
  exportJsonBtn: document.querySelector("#exportJsonBtn"),
  importBtn: document.querySelector("#importBtn"),
  importFile: document.querySelector("#importFile"),
  toastContainer: document.querySelector("#toastContainer"),
  confirmDialog: document.querySelector("#confirmDialog"),
  confirmMessage: document.querySelector("#confirmMessage"),
  confirmDetail: document.querySelector("#confirmDetail"),
  confirmOk: document.querySelector("#confirmOk"),
  confirmCancel: document.querySelector("#confirmCancel"),
  editModal: document.querySelector("#editModal"),
  editForm: document.querySelector("#editForm"),
  editType: document.querySelector("#editType"),
  editCategory: document.querySelector("#editCategory"),
  editCustomCategoryWrap: document.querySelector("#editCustomCategoryWrap"),
  editCustomCategory: document.querySelector("#editCustomCategory"),
  editAmount: document.querySelector("#editAmount"),
  editDate: document.querySelector("#editDate"),
  editNote: document.querySelector("#editNote"),
  editCancel: document.querySelector("#editCancel"),
  splashScreen: document.querySelector("#splashScreen"),
  skipSplashBtn: document.querySelector("#skipSplashBtn"),
  loadSampleBtn: document.querySelector("#loadSampleBtn"),
  clearBtn: document.querySelector("#clearBtn"),
  // Navigation & theme
  sidebar: document.querySelector("#sidebar"),
  sidebarToggleBtn: document.querySelector("#sidebarToggleBtn"),
  sidebarCloseBtn: document.querySelector("#sidebarCloseBtn"),
  sidebarOverlay: document.querySelector("#sidebarOverlay"),
  viewTitle: document.querySelector("#viewTitle"),
  viewSubtitle: document.querySelector("#viewSubtitle"),
  themeToggleBtn: document.querySelector("#themeToggleBtn"),
  sidebarHealthScore: document.querySelector("#sidebarHealthScore"),
  navItems: document.querySelectorAll(".nav-item"),
  viewPanels: document.querySelectorAll(".view-panel"),
  fabBtn: document.querySelector("#fabBtn"),
  quickAddBtn: document.querySelector("#quickAddBtn"),
  // Widgets
  incomeTrend: document.querySelector("#incomeTrend"),
  expenseTrend: document.querySelector("#expenseTrend"),
  balanceTrend: document.querySelector("#balanceTrend"),
  incomeSparkline: document.querySelector("#incomeSparkline"),
  expenseSparkline: document.querySelector("#expenseSparkline"),
  momComparison: document.querySelector("#momComparison"),
  savingsStreak: document.querySelector("#savingsStreak"),
  streakCount: document.querySelector("#streakCount"),
  topCategoriesWidget: document.querySelector("#topCategoriesWidget"),
  netWorthTotal: document.querySelector("#netWorthTotal"),
  netWorthDetail: document.querySelector("#netWorthDetail"),
  // Analytics extras
  budgetRings: document.querySelector("#budgetRings"),
  healthExpandBtn: document.querySelector("#healthExpandBtn"),
  healthBreakdown: document.querySelector("#healthBreakdown"),
  weeklyHeatmap: document.querySelector("#weeklyHeatmap"),
  weeklyHint: document.querySelector("#weeklyHint"),
  // Planning
  addGoalBtn: document.querySelector("#addGoalBtn"),
  addRecurringBtn: document.querySelector("#addRecurringBtn"),
  addAccountBtn: document.querySelector("#addAccountBtn"),
  recurringRows: document.querySelector("#recurringRows"),
  accountRows: document.querySelector("#accountRows"),
  accountSelect: document.querySelector("#accountSelect"),
  editAccount: document.querySelector("#editAccount"),
  // Settings
  themeSetting: document.querySelector("#themeSetting"),
  currencySetting: document.querySelector("#currencySetting"),
  dateFormatSetting: document.querySelector("#dateFormatSetting"),
  categoryManager: document.querySelector("#categoryManager"),
  // Modals
  quickAddModal: document.querySelector("#quickAddModal"),
  quickAddForm: document.querySelector("#quickAddForm"),
  quickType: document.querySelector("#quickType"),
  quickCategory: document.querySelector("#quickCategory"),
  quickAmount: document.querySelector("#quickAmount"),
  quickNote: document.querySelector("#quickNote"),
  quickAddCancel: document.querySelector("#quickAddCancel"),
  goalModal: document.querySelector("#goalModal"),
  goalForm: document.querySelector("#goalForm"),
  goalModalTitle: document.querySelector("#goalModalTitle"),
  goalName: document.querySelector("#goalName"),
  goalTarget: document.querySelector("#goalTarget"),
  goalCurrent: document.querySelector("#goalCurrent"),
  goalDeadline: document.querySelector("#goalDeadline"),
  goalCancel: document.querySelector("#goalCancel"),
  accountModal: document.querySelector("#accountModal"),
  accountForm: document.querySelector("#accountForm"),
  accountModalTitle: document.querySelector("#accountModalTitle"),
  accountName: document.querySelector("#accountName"),
  accountBalance: document.querySelector("#accountBalance"),
  accountType: document.querySelector("#accountType"),
  accountCancel: document.querySelector("#accountCancel"),
  recurringModal: document.querySelector("#recurringModal"),
  recurringForm: document.querySelector("#recurringForm"),
  recurringType: document.querySelector("#recurringType"),
  recurringCategory: document.querySelector("#recurringCategory"),
  recurringAmount: document.querySelector("#recurringAmount"),
  recurringFrequency: document.querySelector("#recurringFrequency"),
  recurringNextDate: document.querySelector("#recurringNextDate"),
  recurringNote: document.querySelector("#recurringNote"),
  recurringCancel: document.querySelector("#recurringCancel"),
  // Onboarding
  onboardingSampleBtn: document.querySelector("#onboardingSampleBtn"),
  onboardingStartBtn: document.querySelector("#onboardingStartBtn"),
  onboardingSteps: document.querySelectorAll(".onboarding-step"),
  onboardingDots: document.querySelectorAll(".onboarding-dots span"),
};

let transactions = loadTransactions();
let budgets = loadBudgets();
let settings = loadSettings();
let goals = loadGoals();
let accounts = loadAccounts();
let recurring = loadRecurring();
let editingTransactionId = null;
let editingGoalId = null;
let editingAccountId = null;
let currentView = "overview";
let onboardingStep = 0;
let healthExpanded = false;

function getChartColors() {
  const isDark = document.documentElement.dataset.theme === "dark";
  return {
    text: isDark ? "#94a3b8" : "#64748b",
    grid: isDark ? "rgba(51,65,85,0.8)" : "rgba(203,213,225,0.6)",
    bg: isDark ? "#1e293b" : "#ffffff",
    centerText: isDark ? "#f1f5f9" : "#0f172a",
  };
}

function loadSettings() {
  const saved = localStorage.getItem(SETTINGS_KEY);
  const defaults = { theme: "dark", currency: "TRY", dateFormat: "tr-TR" };
  if (!saved) return defaults;
  try {
    return { ...defaults, ...JSON.parse(saved) };
  } catch {
    return defaults;
  }
}

function persistSettings() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

function loadGoals() {
  const saved = localStorage.getItem(GOALS_KEY);
  if (!saved) return [];
  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistGoals() {
  localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
}

function loadAccounts() {
  const saved = localStorage.getItem(ACCOUNTS_KEY);
  if (!saved) {
    return [{ id: "default", name: "Ana Hesap", balance: 0, type: "bank" }];
  }
  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.length ? parsed : [{ id: "default", name: "Ana Hesap", balance: 0, type: "bank" }];
  } catch {
    return [{ id: "default", name: "Ana Hesap", balance: 0, type: "bank" }];
  }
}

function persistAccounts() {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

function loadRecurring() {
  const saved = localStorage.getItem(RECURRING_KEY);
  if (!saved) return [];
  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistRecurring() {
  localStorage.setItem(RECURRING_KEY, JSON.stringify(recurring));
}

function applyTheme(theme = settings.theme) {
  const resolved = theme === "system"
    ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    : theme;
  document.documentElement.dataset.theme = resolved;
  const lightIcon = elements.themeToggleBtn?.querySelector(".theme-icon-light");
  const darkIcon = elements.themeToggleBtn?.querySelector(".theme-icon-dark");
  if (lightIcon && darkIcon) {
    lightIcon.classList.toggle("hidden", resolved === "dark");
    darkIcon.classList.toggle("hidden", resolved !== "dark");
  }
}

function switchView(view) {
  currentView = view;
  elements.navItems?.forEach((btn) => btn.classList.toggle("is-active", btn.dataset.view === view));
  elements.viewPanels?.forEach((panel) => {
    const active = panel.dataset.view === view;
    panel.classList.toggle("is-active", active);
    panel.hidden = !active;
  });
  const [title, subtitle] = VIEW_TITLES[view] || VIEW_TITLES.overview;
  if (elements.viewTitle) elements.viewTitle.textContent = title;
  if (elements.viewSubtitle) elements.viewSubtitle.textContent = subtitle;
  elements.sidebar?.classList.remove("is-open");
  if (elements.sidebarOverlay) elements.sidebarOverlay.hidden = true;
  refreshIcons();
}

function toggleSidebar(open) {
  const shouldOpen = open ?? !elements.sidebar?.classList.contains("is-open");
  elements.sidebar?.classList.toggle("is-open", shouldOpen);
  if (elements.sidebarOverlay) elements.sidebarOverlay.hidden = !shouldOpen;
}

function openQuickAddModal() {
  if (!elements.quickAddModal) return;
  elements.quickType.value = "expense";
  updateQuickCategorySelect();
  elements.quickAmount.value = "";
  elements.quickNote.value = "";
  elements.quickAddModal.showModal();
  elements.quickAmount.focus();
  refreshIcons();
}

function addDays(dateStr, days) {
  const d = new Date(`${dateStr}T12:00:00`);
  d.setDate(d.getDate() + days);
  return toInputDate(d);
}

function addMonths(dateStr, months) {
  const d = new Date(`${dateStr}T12:00:00`);
  d.setMonth(d.getMonth() + months);
  return toInputDate(d);
}

function processRecurringTransactions() {
  const today = toInputDate(new Date());
  let generated = 0;
  recurring.forEach((item) => {
    if (!item.active) return;
    let next = item.nextDate;
    while (next && next <= today) {
      transactions.unshift({
        id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
        type: item.type,
        category: item.category,
        amount: Number(item.amount),
        date: next,
        note: item.note || `Tekrarlayan: ${item.category}`,
        accountId: item.accountId || accounts[0]?.id,
        recurringId: item.id,
      });
      generated += 1;
      next = item.frequency === "weekly" ? addDays(next, 7) : addMonths(next, 1);
    }
    item.nextDate = next;
  });
  if (generated) {
    persist();
    persistRecurring();
    showToast(`${generated} tekrarlayan işlem oluşturuldu.`);
  }
}

function getAccountName(accountId) {
  const account = accounts.find((a) => a.id === accountId);
  return account?.name || "Ana Hesap";
}

function updateAccountSelects() {
  const options = accounts.map((a) => `<option value="${escapeHtml(a.id)}">${escapeHtml(a.name)}</option>`).join("");
  if (elements.accountSelect) elements.accountSelect.innerHTML = options;
  if (elements.editAccount) elements.editAccount.innerHTML = options;
}

function updateQuickCategorySelect() {
  if (!elements.quickCategory) return;
  elements.quickCategory.innerHTML = getCategoriesForType(elements.quickType.value)
    .map((c) => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`)
    .join("");
}

function updateRecurringCategorySelect() {
  if (!elements.recurringCategory) return;
  elements.recurringCategory.innerHTML = getCategoriesForType(elements.recurringType.value)
    .map((c) => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`)
    .join("");
}

function computeNetWorth(periodNet) {
  const accountTotal = accounts.reduce((sum, a) => sum + Number(a.balance || 0), 0);
  const { net: allTimeNet } = allTimeMetrics();
  return accountTotal + (hasUserData() ? allTimeNet : periodNet);
}

function computeSavingsStreak() {
  if (!transactions.length) return 0;
  const byDate = transactions.reduce((acc, t) => {
    acc[t.date] ||= { income: 0, expense: 0 };
    acc[t.date][t.type] += Number(t.amount);
    return acc;
  }, {});
  const dates = Object.keys(byDate).sort((a, b) => b.localeCompare(a));
  let streak = 0;
  for (const date of dates) {
    const net = byDate[date].income - byDate[date].expense;
    if (net >= 0) streak += 1;
    else break;
  }
  return streak;
}

function getMonthComparison(rows) {
  const now = new Date();
  const thisKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const prevKey = `${prev.getFullYear()}-${String(prev.getMonth() + 1).padStart(2, "0")}`;
  const sum = (key, type) =>
    rows.filter((r) => periodKey(r.date, "monthly") === key && r.type === type).reduce((s, r) => s + Number(r.amount), 0);
  const thisIncome = sum(thisKey, "income");
  const thisExpense = sum(thisKey, "expense");
  const prevIncome = sum(prevKey, "income");
  const prevExpense = sum(prevKey, "expense");
  return { thisIncome, thisExpense, prevIncome, prevExpense, thisNet: thisIncome - thisExpense, prevNet: prevIncome - prevExpense };
}

function formatTrend(current, previous) {
  if (!previous && !current) return { text: "—", cls: "" };
  if (!previous) return { text: "Yeni", cls: "up" };
  const pct = Math.round(((current - previous) / previous) * 100);
  return { text: `${pct >= 0 ? "+" : ""}${pct}%`, cls: pct >= 0 ? "up" : "down" };
}

function drawSparkline(canvas, values, color) {
  if (!canvas) return;
  const ratio = window.devicePixelRatio || 1;
  const width = canvas.clientWidth || 200;
  const height = canvas.clientHeight || 32;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  const ctx = canvas.getContext("2d");
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.clearRect(0, 0, width, height);
  if (!values.length) return;
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const range = max - min || 1;
  const step = values.length > 1 ? width / (values.length - 1) : width;
  ctx.beginPath();
  values.forEach((v, i) => {
    const x = i * step;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.stroke();
}

function renderWidgets(rows, balance) {
  const mom = getMonthComparison(transactions);
  if (elements.momComparison) {
    elements.momComparison.innerHTML = `
      <div class="mom-row">
        <div class="mom-item"><span>Bu ay gelir</span><em>${currency(mom.thisIncome)}</em></div>
        <div class="mom-item"><span>Geçen ay gelir</span><em>${currency(mom.prevIncome)}</em></div>
        <div class="mom-item"><span>Bu ay gider</span><em>${currency(mom.thisExpense)}</em></div>
        <div class="mom-item"><span>Net değişim</span><em style="color:${mom.thisNet >= mom.prevNet ? "var(--positive)" : "var(--negative)"}">${mom.thisNet >= mom.prevNet ? "+" : ""}${currency(mom.thisNet - mom.prevNet)}</em></div>
      </div>`;
  }
  const streak = computeSavingsStreak();
  if (elements.streakCount) elements.streakCount.textContent = String(streak);
  const expenseTotals = expenseTotalsByCategory(rows);
  const topCats = Object.entries(expenseTotals).sort((a, b) => b[1] - a[1]).slice(0, 4);
  const maxCat = topCats[0]?.[1] || 1;
  if (elements.topCategoriesWidget) {
    elements.topCategoriesWidget.innerHTML = topCats.length
      ? topCats.map(([cat, val]) => `<li><span>${escapeHtml(cat)}</span><div class="bar-track"><div class="bar-fill" style="width:${Math.round((val / maxCat) * 100)}%"></div></div><strong>${currency(val)}</strong></li>`).join("")
      : `<li><span>Veri yok</span></li>`;
  }
  const netWorth = computeNetWorth(balance);
  animateCurrency(elements.netWorthTotal, netWorth);
  if (elements.netWorthDetail) {
    elements.netWorthDetail.textContent = `${accounts.length} hesap · ${currency(accounts.reduce((s, a) => s + Number(a.balance), 0))} bakiye`;
  }
  const monthlyIncome = rows.filter((r) => r.type === "income").reduce((acc, r) => {
    const k = periodKey(r.date, "monthly");
    acc[k] = (acc[k] || 0) + Number(r.amount);
    return acc;
  }, {});
  const monthlyExpense = rows.filter((r) => r.type === "expense").reduce((acc, r) => {
    const k = periodKey(r.date, "monthly");
    acc[k] = (acc[k] || 0) + Number(r.amount);
    return acc;
  }, {});
  const incomeVals = Object.values(monthlyIncome);
  const expenseVals = Object.values(monthlyExpense);
  drawSparkline(elements.incomeSparkline, incomeVals, "#059669");
  drawSparkline(elements.expenseSparkline, expenseVals, "#dc2626");
  const incomeTrend = formatTrend(mom.thisIncome, mom.prevIncome);
  const expenseTrend = formatTrend(mom.thisExpense, mom.prevExpense);
  const balanceTrend = formatTrend(mom.thisNet, mom.prevNet);
  [elements.incomeTrend, elements.expenseTrend, elements.balanceTrend].forEach((el, i) => {
    const t = [incomeTrend, expenseTrend, balanceTrend][i];
    if (!el) return;
    el.textContent = t.text;
    el.className = `trend-badge ${t.cls}`;
  });
}

function renderBudgetRings(rows) {
  if (!elements.budgetRings) return;
  if (!hasUserData()) {
    elements.budgetRings.innerHTML = "";
    return;
  }
  const expenseTotals = expenseTotalsByCategory(rows);
  const entries = computedBudgets(rows).sort((a, b) => (expenseTotals[b.category] || 0) - (expenseTotals[a.category] || 0)).slice(0, 6);
  elements.budgetRings.innerHTML = entries.map(({ category, amount: limit }) => {
    const spent = expenseTotals[category] || 0;
    const pct = limit ? Math.min(Math.round((spent / limit) * 100), 100) : 0;
    const color = pct >= 100 ? "var(--negative)" : pct >= 80 ? "var(--warning)" : "var(--primary)";
    const circumference = 2 * Math.PI * 28;
    const offset = circumference - (pct / 100) * circumference;
    return `<div class="budget-ring"><svg viewBox="0 0 72 72"><circle cx="36" cy="36" r="28" fill="none" stroke="var(--line)" stroke-width="6"/><circle cx="36" cy="36" r="28" fill="none" stroke="${color}" stroke-width="6" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}" stroke-linecap="round" transform="rotate(-90 36 36)"/><text x="36" y="40" text-anchor="middle" font-size="13" font-weight="800" fill="var(--text)">%${pct}</text></svg><span class="ring-label">${escapeHtml(category)}</span><span class="ring-value">${currency(spent)}</span></div>`;
  }).join("");
}

function renderHealthBreakdown(rows, income, expense, savingRate) {
  if (!elements.healthBreakdown) return;
  const expenseTotals = expenseTotalsByCategory(rows);
  const overBudget = computedBudgets(rows).filter((b) => (expenseTotals[b.category] || 0) > b.amount).length;
  const budgetScore = Math.max(0, 40 - overBudget * 10);
  const savingsScore = Math.max(0, Math.min(35, Math.round(savingRate * 0.35)));
  const diversityScore = Math.min(25, new Set(rows.map((r) => r.category)).size * 3);
  const components = [
    { label: "Tasarruf oranı", score: savingsScore, max: 35 },
    { label: "Bütçe disiplini", score: budgetScore, max: 40 },
    { label: "Kategori çeşitliliği", score: diversityScore, max: 25 },
  ];
  elements.healthBreakdown.innerHTML = components.map((c) => {
    const pct = Math.round((c.score / c.max) * 100);
    return `<div class="health-component"><span>${c.label}</span><strong>${c.score}/${c.max}</strong><div class="health-component-bar"><div class="health-component-fill" style="width:${pct}%"></div></div></div>`;
  }).join("");
}

function drawWeeklyHeatmap(rows) {
  if (!elements.weeklyHeatmap) return;
  const { ctx, width, height } = setupCanvas(elements.weeklyHeatmap);
  const cc = getChartColors();
  const weekly = {};
  rows.filter((r) => r.type === "expense").forEach((r) => {
    const k = periodKey(r.date, "weekly");
    weekly[k] = (weekly[k] || 0) + Number(r.amount);
  });
  const keys = Object.keys(weekly).sort().slice(-8);
  if (!keys.length) {
    drawEmptyState(ctx, width, height, "Haftalık veri yok");
    return;
  }
  ctx.clearRect(0, 0, width, height);
  const max = Math.max(...keys.map((k) => weekly[k]), 1);
  const barW = (width - 60) / keys.length - 8;
  keys.forEach((k, i) => {
    const val = weekly[k];
    const barH = (val / max) * (height - 50);
    const x = 40 + i * (barW + 8);
    const y = height - 30 - barH;
    const grad = ctx.createLinearGradient(0, y, 0, height - 30);
    grad.addColorStop(0, "#0d9488");
    grad.addColorStop(1, "rgba(13,148,136,0.3)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(x, y, barW, barH, 4);
    ctx.fill();
    ctx.fillStyle = cc.text;
    ctx.font = "600 10px system-ui";
    ctx.textAlign = "center";
    ctx.fillText(k.split("-W")[1] || k.slice(-2), x + barW / 2, height - 10);
  });
  if (elements.weeklyHint) elements.weeklyHint.textContent = `Son ${keys.length} hafta`;
}

function renderUserGoals() {
  setAnimatedText(elements.goalCount, goals.length ? `${goals.length} hedef` : "0 hedef");
  if (!goals.length) {
    showEmptyList(elements.goalRows, `<p class="empty-state visible empty-card">Henüz hedef yok. "Hedef ekle" ile birikim hedefi tanımlayın.</p>`);
    return;
  }
  renderAnimatedList(elements.goalRows, goals, {
    getKey: (g) => g.id,
    className: "goal-card",
    tag: "article",
    renderHtml: (goal) => {
      const ratio = goal.target ? Math.round((goal.current / goal.target) * 100) : 0;
      const fillClass = ratio >= 100 ? "danger" : ratio >= 80 ? "warning" : "";
      return `<header><div><strong>${escapeHtml(goal.name)}</strong><span>${formatDate(goal.deadline)} · ${currency(goal.current)} / ${currency(goal.target)}</span></div><em>%${ratio}</em><div class="card-actions"><button class="card-action" type="button" data-edit-goal="${goal.id}">Düzenle</button><button class="card-action danger" type="button" data-delete-goal="${goal.id}">Sil</button></div></header><div class="progress-track"><div class="progress-fill ${fillClass}" style="width:${Math.min(ratio, 100)}%"></div></div>`;
    },
  });
}

function renderRecurring() {
  if (!elements.recurringRows) return;
  if (!recurring.length) {
    showEmptyList(elements.recurringRows, `<p class="empty-state visible empty-card">Tekrarlayan işlem yok. Maaş, kira gibi düzenli ödemeler ekleyin.</p>`);
    return;
  }
  renderAnimatedList(elements.recurringRows, recurring, {
    getKey: (r) => r.id,
    className: "recurring-card",
    tag: "article",
    renderHtml: (r) => `<div><strong>${escapeHtml(r.note || r.category)}</strong><span>${r.frequency === "weekly" ? "Haftalık" : "Aylık"} · ${formatDate(r.nextDate)} · ${escapeHtml(r.category)}</span></div><div><em>${currency(Number(r.amount))}</em><div class="card-actions"><button class="card-action danger" type="button" data-delete-recurring="${r.id}">Sil</button></div></div>`,
  });
}

function renderAccounts() {
  if (!elements.accountRows) return;
  renderAnimatedList(elements.accountRows, accounts, {
    getKey: (a) => a.id,
    className: "account-card",
    tag: "article",
    renderHtml: (a) => `<div><strong>${escapeHtml(a.name)}</strong><span class="account-type">${ACCOUNT_TYPE_LABELS[a.type] || a.type}</span></div><div><em>${currency(Number(a.balance))}</em><div class="card-actions"><button class="card-action" type="button" data-edit-account="${a.id}">Düzenle</button><button class="card-action danger" type="button" data-delete-account="${a.id}"${a.id === "default" ? " disabled" : ""}>Sil</button></div></div>`,
  });
}

function renderCategoryManager() {
  if (!elements.categoryManager) return;
  const custom = loadCustomCategories();
  const renderGroup = (type, label) => {
    const defaults = categories[type];
    const customs = custom[type];
    const tags = [
      ...defaults.map((c) => `<span class="category-tag is-default">${escapeHtml(c)}</span>`),
      ...customs.map((c) => `<span class="category-tag">${escapeHtml(c)}<button type="button" data-rename-cat="${type}:${escapeHtml(c)}" title="Yeniden adlandır">✎</button><button type="button" data-delete-cat="${type}:${escapeHtml(c)}" title="Sil">×</button></span>`),
    ].join("");
    return `<div class="category-group"><h3>${label}</h3><div class="category-tags">${tags}</div></div>`;
  };
  elements.categoryManager.innerHTML = renderGroup("income", "Gelir kategorileri") + renderGroup("expense", "Gider kategorileri");
}

function advanceOnboarding() {
  onboardingStep = Math.min(onboardingStep + 1, 2);
  elements.onboardingSteps?.forEach((s) => s.classList.toggle("is-active", Number(s.dataset.step) === onboardingStep));
  elements.onboardingDots?.forEach((d, i) => d.classList.toggle("is-active", i === onboardingStep));
  refreshIcons();
}

function finishOnboarding() {
  localStorage.setItem(ONBOARDING_KEY, "1");
  closeSplash();
}

function hasUserData() {
  return transactions.length > 0;
}

function showEmptyList(container, message = EMPTY_LIST_HTML) {
  if (!container) return;
  container.innerHTML = message;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function waitForAnimation(element, fallbackMs = LIST_ANIM_MS) {
  if (!element || prefersReducedMotion()) return wait(fallbackMs);
  return new Promise((resolve) => {
    const done = () => resolve();
    element.addEventListener("animationend", done, { once: true });
    setTimeout(done, fallbackMs + 40);
  });
}

function animateCurrency(element, nextValue, formatter = currency) {
  if (!element) return;
  const key = element.id || element;
  const previous = metricValues[key] ?? nextValue;
  metricValues[key] = nextValue;

  if (prefersReducedMotion() || previous === nextValue) {
    element.textContent = formatter(nextValue);
    return;
  }

  const start = performance.now();
  const duration = 520;
  const delta = nextValue - previous;

  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - (1 - progress) ** 3;
    element.textContent = formatter(previous + delta * eased);
    if (progress < 1) {
      requestAnimationFrame(frame);
    } else {
      element.classList.remove("value-updating");
    }
  }

  element.classList.add("value-updating");
  requestAnimationFrame(frame);
}

function setAnimatedText(element, nextText) {
  if (!element || element.textContent === nextText) return;
  if (prefersReducedMotion()) {
    element.textContent = nextText;
    return;
  }
  element.classList.remove("text-swap");
  void element.offsetWidth;
  element.classList.add("text-swap");
  element.textContent = nextText;
}

function setAnimatedStyle(element, property, value) {
  if (!element || element.style[property] === value) return;
  element.style[property] = value;
  element.classList.add("value-updating");
  window.setTimeout(() => element.classList.remove("value-updating"), 520);
}

function setMetricFill(element, value) {
  const metric = element?.closest(".metric-card, .metric");
  if (!metric) return;
  metric.style.setProperty("--metric-fill", `${value}%`);
}

function flashChart(canvas) {
  if (!canvas || prefersReducedMotion()) return;
  canvas.classList.remove("chart-updating");
  void canvas.offsetWidth;
  canvas.classList.add("chart-updating");
}

function renderAnimatedList(container, items, { getKey, renderHtml, tag = "div", className = "" }) {
  if (!container) return;

  if (items.length) {
    [...container.children].forEach((node) => {
      if (!node.dataset.listKey) node.remove();
    });
  }

  const existing = new Map(
    [...container.querySelectorAll(`[data-list-key]`)]
      .filter((node) => node.parentElement === container)
      .map((node) => [node.dataset.listKey, node]),
  );
  const nextKeys = new Set(items.map(getKey));

  existing.forEach((node, key) => {
    if (nextKeys.has(key)) return;
    node.classList.add("is-exiting");
    node.addEventListener(
      "animationend",
      () => {
        if (node.classList.contains("is-exiting")) node.remove();
      },
      { once: true },
    );
    existing.delete(key);
  });

  items.forEach((item, index) => {
    const key = getKey(item);
    let node = existing.get(key);

    if (!node) {
      node = document.createElement(tag);
      node.dataset.listKey = key;
      node.className = className;
      node.classList.add("is-entering");
      node.style.setProperty("--stagger-index", index);
      container.appendChild(node);
    } else {
      node.style.setProperty("--stagger-index", index);
      node.classList.remove("is-exiting");
    }

    node.innerHTML = renderHtml(item, index);
  });

  if (!items.length && container.dataset.emptyHtml) {
    container.innerHTML = container.dataset.emptyHtml;
  }
}

function allTimeMetrics() {
  const income = transactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + Number(item.amount), 0);
  const expense = transactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + Number(item.amount), 0);
  return { income, expense, net: income - expense };
}

function getDynamicAccountSummary() {
  if (!hasUserData()) {
    return { label: EMPTY_HINT, count: 0, totalBalance: 0 };
  }
  const { net } = allTimeMetrics();
  return {
    count: transactions.length,
    totalBalance: net,
    label: `${transactions.length} işlem · ${currency(net)} net`,
  };
}

function getDynamicGoals(periodNet) {
  if (goals.length) {
    return goals.map((g) => ({ name: g.name, current: Number(g.current), target: Number(g.target), deadline: g.deadline }));
  }
  if (!hasUserData()) return [];
  const { income, net: allTimeNet } = allTimeMetrics();
  if (!income) return [];
  const yearEnd = `${new Date().getFullYear()}-12-31`;
  const monthlyIncome = income / Math.max(1, new Set(transactions.filter((t) => t.type === "income").map((t) => periodKey(t.date, "monthly"))).size);
  const autoGoals = [];
  if (allTimeNet > 0) {
    autoGoals.push({ name: "Net birikim", current: allTimeNet, target: Math.max(allTimeNet, Math.round(monthlyIncome * 3)), deadline: yearEnd });
  }
  autoGoals.push({ name: "Dönem tasarrufu", current: Math.max(0, periodNet), target: Math.max(Math.round(monthlyIncome * 0.2), 1), deadline: yearEnd });
  return autoGoals.filter((g) => g.target > 0).slice(0, 3);
}

function getDynamicUpcoming() {
  if (!hasUserData()) return [];

  const today = toInputDate(new Date());
  return transactions
    .filter((item) => item.type === "expense" && item.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 6)
    .map((item) => ({
      id: item.id,
      name: item.note?.trim() || `${item.category} ödemesi`,
      category: item.category,
      amount: Number(item.amount),
      date: item.date,
    }));
}

function resetMetricAnimations() {
  Object.keys(metricValues).forEach((key) => delete metricValues[key]);
}

function pulseFormSuccess(form) {
  const button = form?.querySelector("button[type='submit']");
  if (!button || prefersReducedMotion()) return;
  button.classList.add("is-success");
  window.setTimeout(() => button.classList.remove("is-success"), 700);
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function showToast(message, type = "success") {
  if (!elements.toastContainer) return;
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  elements.toastContainer.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("is-visible"));
  window.setTimeout(() => {
    toast.classList.remove("is-visible");
    toast.addEventListener("transitionend", () => toast.remove(), { once: true });
    window.setTimeout(() => toast.remove(), 400);
  }, 3200);
}

function confirmAction(message, detail = "", { danger = true } = {}) {
  return new Promise((resolve) => {
    if (!elements.confirmDialog) {
      resolve(window.confirm(detail ? `${message}\n\n${detail}` : message));
      return;
    }

    elements.confirmMessage.textContent = message;
    elements.confirmDetail.textContent = detail;
    elements.confirmDetail.hidden = !detail;
    elements.confirmOk.classList.toggle("danger-button", danger);

    const finish = (result) => {
      elements.confirmOk.removeEventListener("click", onConfirm);
      elements.confirmCancel.removeEventListener("click", onCancel);
      elements.confirmDialog.removeEventListener("cancel", onCancel);
      elements.confirmDialog.close();
      resolve(result);
    };

    const onConfirm = () => finish(true);
    const onCancel = () => finish(false);

    elements.confirmOk.addEventListener("click", onConfirm);
    elements.confirmCancel.addEventListener("click", onCancel);
    elements.confirmDialog.addEventListener("cancel", onCancel, { once: true });
    elements.confirmDialog.showModal();
    refreshIcons();
  });
}

function loadCustomCategories() {
  const saved = localStorage.getItem(CUSTOM_CATEGORIES_KEY);
  if (!saved) return { income: [], expense: [] };

  try {
    const parsed = JSON.parse(saved);
    return {
      income: Array.isArray(parsed.income) ? parsed.income.filter(Boolean) : [],
      expense: Array.isArray(parsed.expense) ? parsed.expense.filter(Boolean) : [],
    };
  } catch {
    return { income: [], expense: [] };
  }
}

function persistCustomCategories(customCategories) {
  localStorage.setItem(CUSTOM_CATEGORIES_KEY, JSON.stringify(customCategories));
}

function getCategoriesForType(type) {
  const custom = loadCustomCategories();
  return [...new Set([...categories[type], ...custom[type]])].sort((a, b) => a.localeCompare(b, "tr"));
}

function getAllCategories() {
  return [...new Set([...getCategoriesForType("income"), ...getCategoriesForType("expense")])].sort((a, b) =>
    a.localeCompare(b, "tr"),
  );
}

function normalizeTransaction(raw) {
  if (!raw || typeof raw !== "object") return null;

  const type = raw.type === "income" || raw.type === "expense" ? raw.type : null;
  if (!type) return null;

  const amount = Number(raw.amount);
  if (!Number.isFinite(amount) || amount <= 0) return null;

  const date = /^\d{4}-\d{2}-\d{2}$/.test(String(raw.date)) ? String(raw.date) : toInputDate(new Date());
  const fallbackCategory = type === "income" ? "Diğer Gelir" : "Diğer Gider";

  return {
    id: raw.id || (crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random())),
    type,
    category: String(raw.category || fallbackCategory).slice(0, 48),
    amount,
    date,
    note: String(raw.note || "").slice(0, 48),
    accountId: raw.accountId || accounts[0]?.id || "default",
  };
}

function syncCustomCategoriesFromTransactions() {
  const custom = loadCustomCategories();
  let changed = false;

  transactions.forEach((item) => {
    if (!item.category || categories[item.type].includes(item.category) || custom[item.type].includes(item.category)) {
      return;
    }
    custom[item.type].push(item.category);
    changed = true;
  });

  if (changed) persistCustomCategories(custom);
}

function migrateData() {
  const version = Number(localStorage.getItem(DATA_VERSION_KEY) || 0);
  transactions = transactions.map(normalizeTransaction).filter(Boolean);
  budgets = normalizeBudgets(budgets);
  syncCustomCategoriesFromTransactions();
  if (!localStorage.getItem(ACCOUNTS_KEY)) persistAccounts();
  processRecurringTransactions();

  if (version >= CURRENT_DATA_VERSION) {
    persist();
    persistBudgets();
    return;
  }

  persist();
  persistBudgets();
  localStorage.setItem(DATA_VERSION_KEY, String(CURRENT_DATA_VERSION));
}

function toggleCustomCategoryField(selectElement, wrapElement, inputElement) {
  if (!selectElement || !wrapElement) return;
  const isCustom = selectElement.value === CUSTOM_CATEGORY_VALUE;
  wrapElement.classList.toggle("hidden", !isCustom);
  if (inputElement) {
    inputElement.required = isCustom;
    if (!isCustom) inputElement.value = "";
  }
}

function resolveCategory(type, selectValue, customValue) {
  if (selectValue !== CUSTOM_CATEGORY_VALUE) return selectValue;

  const name = customValue.trim();
  if (!name) return null;

  const custom = loadCustomCategories();
  if (!getCategoriesForType(type).includes(name)) {
    custom[type].push(name);
    persistCustomCategories(custom);
  }
  return name;
}

function buildCategoryOptions(type, selected = "") {
  const list = getCategoriesForType(type);
  const options = list.map(
    (category) =>
      `<option value="${escapeHtml(category)}"${category === selected ? " selected" : ""}>${escapeHtml(category)}</option>`,
  );
  options.push(`<option value="${CUSTOM_CATEGORY_VALUE}"${selected && !list.includes(selected) ? " selected" : ""}>+ Özel kategori</option>`);
  return options.join("");
}

function loadTransactions() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return [];
  }

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed.map(normalizeTransaction).filter(Boolean) : [];
  } catch {
    return [];
  }
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

function loadBudgets() {
  const saved = localStorage.getItem(BUDGET_STORAGE_KEY);
  if (!saved) {
    return {};
  }

  try {
    return normalizeBudgets(JSON.parse(saved));
  } catch {
    return {};
  }
}

function normalizeBudgets(rawBudgets) {
  return Object.fromEntries(
    Object.entries(rawBudgets).map(([category, value]) => [
      category,
      typeof value === "number" ? { amount: value, manual: true } : { amount: Number(value.amount) || 0, manual: value.manual !== false },
    ]),
  );
}

function persistBudgets() {
  localStorage.setItem(BUDGET_STORAGE_KEY, JSON.stringify(budgets));
}

function currency(value) {
  return new Intl.NumberFormat(settings.dateFormat === "en-US" ? "en-US" : "tr-TR", {
    style: "currency",
    currency: settings.currency || "TRY",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(date) {
  return new Intl.DateTimeFormat(settings.dateFormat || "tr-TR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

function formatNote(note) {
  if (!note) return "-";
  if (note.startsWith("#")) return `<span class="note-tag">${escapeHtml(note)}</span>`;
  return escapeHtml(note);
}

function updateCategorySelect() {
  const selected = elements.category.value;
  elements.category.innerHTML = buildCategoryOptions(elements.type.value, selected);
  if (selected && selected !== CUSTOM_CATEGORY_VALUE) {
    elements.category.value = getCategoriesForType(elements.type.value).includes(selected) ? selected : elements.category.value;
  }
  toggleCustomCategoryField(elements.category, elements.customCategoryWrap, elements.customCategory);
}

function updateBudgetCategorySelect() {
  const selected = elements.budgetCategory.value;
  elements.budgetCategory.innerHTML = getCategoriesForType("expense")
    .map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`)
    .join("");
  const expenseCategories = getCategoriesForType("expense");
  elements.budgetCategory.value = expenseCategories.includes(selected) ? selected : expenseCategories[0];
}

function updateEditCategorySelect(selected = "") {
  elements.editCategory.innerHTML = buildCategoryOptions(elements.editType.value, selected);
  if (selected && getCategoriesForType(elements.editType.value).includes(selected)) {
    elements.editCategory.value = selected;
  } else if (selected) {
    elements.editCategory.value = CUSTOM_CATEGORY_VALUE;
    elements.editCustomCategory.value = selected;
  }
  toggleCustomCategoryField(elements.editCategory, elements.editCustomCategoryWrap, elements.editCustomCategory);
}

function updateCategoryFilter() {
  const selected = elements.categoryFilter.value;
  const typeFilter = elements.typeFilter.value;
  let availableCategories;

  if (typeFilter === "all") {
    availableCategories = getAllCategories();
    transactions.forEach((item) => {
      if (!availableCategories.includes(item.category)) availableCategories.push(item.category);
    });
    availableCategories.sort((a, b) => a.localeCompare(b, "tr"));
  } else {
    availableCategories = getCategoriesForType(typeFilter);
    transactions
      .filter((item) => item.type === typeFilter)
      .forEach((item) => {
        if (!availableCategories.includes(item.category)) availableCategories.push(item.category);
      });
    availableCategories.sort((a, b) => a.localeCompare(b, "tr"));
  }

  elements.categoryFilter.innerHTML = [
    `<option value="all">Tüm kategoriler</option>`,
    ...availableCategories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`),
  ].join("");
  elements.categoryFilter.value = availableCategories.includes(selected) ? selected : "all";
}

function filteredTransactions() {
  const query = elements.searchInput.value.trim().toLocaleLowerCase("tr-TR");
  return transactions
    .filter((item) => elements.typeFilter.value === "all" || item.type === elements.typeFilter.value)
    .filter((item) => elements.categoryFilter.value === "all" || item.category === elements.categoryFilter.value)
    .filter((item) => !elements.startDate.value || item.date >= elements.startDate.value)
    .filter((item) => !elements.endDate.value || item.date <= elements.endDate.value)
    .filter((item) => {
      if (!query) return true;
      return [item.date, item.type === "income" ? "gelir" : "gider", item.category, item.note, String(item.amount)]
        .join(" ")
        .toLocaleLowerCase("tr-TR")
        .includes(query);
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

function setDatePreset(value) {
  if (value === "all") {
    elements.startDate.value = "";
    elements.endDate.value = "";
    return;
  }

  const today = new Date();
  const end = new Date(today);
  const start = new Date(today);

  if (value === "thisMonth") {
    start.setDate(1);
  } else if (value === "last30") {
    start.setDate(today.getDate() - 30);
  } else if (value === "quarter") {
    start.setMonth(today.getMonth() - 3);
  }

  elements.startDate.value = toInputDate(start);
  elements.endDate.value = toInputDate(end);
}

function toInputDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function periodKey(dateValue, period) {
  const date = new Date(`${dateValue}T12:00:00`);
  if (period === "weekly") {
    const firstDay = new Date(date);
    firstDay.setDate(date.getDate() - ((date.getDay() + 6) % 7));
    return `${firstDay.getFullYear()}-W${String(getWeekNumber(firstDay)).padStart(2, "0")}`;
  }
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function getWeekNumber(date) {
  const target = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNumber = target.getUTCDay() || 7;
  target.setUTCDate(target.getUTCDate() + 4 - dayNumber);
  const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
  return Math.ceil(((target - yearStart) / 86400000 + 1) / 7);
}

function drawEmptyState(ctx, width, height, message) {
  const cc = getChartColors();
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = cc.text;
  ctx.font = "600 14px system-ui";
  ctx.textAlign = "center";
  ctx.fillText(message, width / 2, height / 2);
}

function setupCanvas(canvas) {
  const ratio = window.devicePixelRatio || 1;
  const width = canvas.clientWidth || canvas.width;
  const height = canvas.clientHeight || canvas.height;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  const ctx = canvas.getContext("2d");
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  return { ctx, width, height };
}

function drawPie(data) {
  const { ctx, width, height } = setupCanvas(elements.categoryPie);
  const total = data.reduce((sum, item) => sum + item.value, 0);
  elements.categoryLegend.innerHTML = "";

  if (!total) {
    drawEmptyState(ctx, width, height, "Dağılım için veri yok");
    setAnimatedText(elements.categoryInsight, "Dağılım için veri yok");
    setAnimatedText(elements.categoryInsightText, "Filtreleri genişletin veya yeni işlem ekleyin.");
    elements.categoryLegend.innerHTML = "";
    return;
  }

  const radius = Math.min(width, height) / 2 - 22;
  const centerX = width / 2;
  const centerY = height / 2;
  let start = -Math.PI / 2;

  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.shadowColor = "rgba(15, 118, 110, 0.18)";
  ctx.shadowBlur = 22;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius + 8, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(15, 118, 110, 0.08)";
  ctx.lineWidth = 16;
  ctx.stroke();
  ctx.restore();

  data.forEach((item, index) => {
    const slice = (item.value / total) * Math.PI * 2;
    const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.25, centerX, centerY, radius);
    gradient.addColorStop(0, colors[index % colors.length]);
    gradient.addColorStop(1, shadeColor(colors[index % colors.length], -18));
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, start, start + slice);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;
    ctx.stroke();
    start += slice;
  });

  const cc = getChartColors();
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * 0.58, 0, Math.PI * 2);
  ctx.fillStyle = cc.bg;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * 0.58, 0, Math.PI * 2);
  ctx.strokeStyle = cc.grid;
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = cc.centerText;
  ctx.font = "800 17px Plus Jakarta Sans, system-ui";
  ctx.textAlign = "center";
  ctx.fillText(currency(total), centerX, centerY - 2);
  ctx.fillStyle = cc.text;
  ctx.font = "700 10px Inter, system-ui";
  ctx.fillText("TOPLAM", centerX, centerY + 18);

  const top = data[0];
  setAnimatedText(elements.categoryInsight, `${top.label} baskın kategori`);
  setAnimatedText(
    elements.categoryInsightText,
    `${currency(top.value)} ile dağılımın %${Math.round((top.value / total) * 100)} payını oluşturuyor.`,
  );

  renderAnimatedList(elements.categoryLegend, data, {
    getKey: (item) => item.label,
    tag: "li",
    renderHtml: (item, index) => `
      <span class="swatch" style="background:${colors[index % colors.length]}"></span>
      <span>${item.label}</span>
      <strong>${currency(item.value)} · %${Math.round((item.value / total) * 100)}</strong>
    `,
  });
}

function shadeColor(color, percent) {
  const numeric = parseInt(color.replace("#", ""), 16);
  const amount = Math.round(2.55 * percent);
  const red = Math.max(0, Math.min(255, (numeric >> 16) + amount));
  const green = Math.max(0, Math.min(255, ((numeric >> 8) & 0x00ff) + amount));
  const blue = Math.max(0, Math.min(255, (numeric & 0x0000ff) + amount));
  return `#${(0x1000000 + red * 0x10000 + green * 0x100 + blue).toString(16).slice(1)}`;
}

function drawLine(rows) {
  const { ctx, width, height } = setupCanvas(elements.cashflowLine);
  if (!rows.length) {
    drawEmptyState(ctx, width, height, "Nakit akışı için veri yok");
    setAnimatedText(elements.cashflowInsight, "Nakit akışı için veri yok");
    setAnimatedText(elements.cashflowInsightText, "Filtreleri genişletin veya yeni işlem ekleyin.");
    return;
  }

  ctx.clearRect(0, 0, width, height);
  const padding = { top: 28, right: 28, bottom: 48, left: 70 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const maxValue = Math.max(...rows.flatMap((row) => [row.income, row.expense, Math.abs(row.income - row.expense)]), 1);
  const xStep = rows.length > 1 ? plotWidth / (rows.length - 1) : plotWidth;

  const cc = getChartColors();
  ctx.strokeStyle = cc.grid;
  ctx.lineWidth = 1;
  ctx.fillStyle = cc.text;
  ctx.font = "600 12px system-ui";
  ctx.textAlign = "right";

  for (let i = 0; i <= 4; i += 1) {
    const y = padding.top + (plotHeight / 4) * i;
    const value = maxValue - (maxValue / 4) * i;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();
    ctx.fillText(currency(value), padding.left - 10, y + 4);
  }

  function point(row, index, key) {
    const x = padding.left + xStep * index;
    const value = key === "net" ? Math.max(row.income - row.expense, 0) : row[key];
    const y = padding.top + plotHeight - (value / maxValue) * plotHeight;
    return { x, y };
  }

  function drawSmoothPath(points) {
    ctx.beginPath();
    points.forEach((current, index) => {
      if (index === 0) {
        ctx.moveTo(current.x, current.y);
        return;
      }
      const previous = points[index - 1];
      const midX = (previous.x + current.x) / 2;
      ctx.bezierCurveTo(midX, previous.y, midX, current.y, current.x, current.y);
    });
  }

  function drawSeries(key, color, fillColor, widthLine = 3) {
    const points = rows.map((row, index) => point(row, index, key));
    drawSmoothPath(points);
    if (fillColor) {
      ctx.lineTo(points.at(-1).x, padding.top + plotHeight);
      ctx.lineTo(points[0].x, padding.top + plotHeight);
      ctx.closePath();
      const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + plotHeight);
      gradient.addColorStop(0, fillColor);
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    drawSmoothPath(points);
    ctx.strokeStyle = color;
    ctx.lineWidth = widthLine;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();

    rows.forEach((row, index) => {
      const { x, y } = point(row, index, key);
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }

  drawSeries("income", "#13835f", "rgba(19, 131, 95, 0.16)", 3.5);
  drawSeries("expense", "#bd3f32", "rgba(189, 63, 50, 0.11)", 3.5);
  drawSeries("net", "#1f5f99", null, 2.5);

  ctx.fillStyle = cc.text;
  ctx.textAlign = "center";
  rows.forEach((row, index) => {
    const x = padding.left + xStep * index;
    ctx.fillText(row.label, x, height - 18);
  });

  ctx.textAlign = "left";
  ctx.fillStyle = "#059669";
  ctx.fillText("Gelir", padding.left, 18);
  ctx.fillStyle = "#dc2626";
  ctx.fillText("Gider", padding.left + 58, 18);
  ctx.fillStyle = "#2563eb";
  ctx.fillText("Net", padding.left + 116, 18);

  const firstNet = rows[0].income - rows[0].expense;
  const lastNet = rows.at(-1).income - rows.at(-1).expense;
  const diff = lastNet - firstNet;
  setAnimatedText(elements.cashflowInsight, diff >= 0 ? "Net akış güçleniyor" : "Net akış zayıflıyor");
  setAnimatedText(
    elements.cashflowInsightText,
    `${rows[0].label} ile ${rows.at(-1).label} arasında net değişim ${diff >= 0 ? "+" : ""}${currency(diff)}.`,
  );
}

function biggestExpense(rows) {
  const expenseRows = rows.filter((item) => item.type === "expense");
  if (!expenseRows.length) return "-";
  const top = expenseRows.reduce((highest, item) => (Number(item.amount) > Number(highest.amount) ? item : highest));
  return `${top.category} ${currency(Number(top.amount))}`;
}

function mostActiveCategory(rows) {
  if (!rows.length) return "-";
  const totals = rows.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});
  const [category, count] = Object.entries(totals).sort((a, b) => b[1] - a[1])[0];
  return `${category} (${count})`;
}

function expenseTotalsByCategory(rows) {
  return rows
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + Number(item.amount);
      return acc;
    }, {});
}

function monthlyIncomeBase(rows) {
  const incomeMonths = rows
    .filter((item) => item.type === "income")
    .reduce((acc, item) => {
      const key = periodKey(item.date, "monthly");
      acc[key] = (acc[key] || 0) + Number(item.amount);
      return acc;
    }, {});
  const values = Object.values(incomeMonths);
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
}

function expenseShareByCategory(rows) {
  const totals = expenseTotalsByCategory(rows);
  const totalExpense = Object.values(totals).reduce((sum, value) => sum + value, 0);
  return Object.fromEntries(
    getCategoriesForType("expense").map((category) => [category, totalExpense ? (totals[category] || 0) / totalExpense : 0]),
  );
}

function computedBudgets(rows) {
  const incomeBase = monthlyIncomeBase(rows);
  const shares = expenseShareByCategory(rows);
  return getCategoriesForType("expense").map((category) => {
    const saved = budgets[category];
    const manualAmount = saved?.manual ? Number(saved.amount) : 0;
    const suggestedRatio = Math.max(budgetWeights[category] || 0.04, (shares[category] || 0) * 0.72);
    const suggestedAmount = incomeBase ? Math.round(incomeBase * suggestedRatio) : Math.round((saved?.amount || 0) * 1.05);
    return {
      category,
      amount: manualAmount || suggestedAmount,
      manual: Boolean(manualAmount),
      suggestedAmount,
      suggestedRatio,
      share: shares[category] || 0,
    };
  });
}

function renderBudgets(rows) {
  if (!hasUserData()) {
    setAnimatedText(elements.budgetSummary, "0 limit");
    setAnimatedText(elements.budgetBasisTitle, EMPTY_HINT);
    setAnimatedText(elements.budgetBasisText, "Bütçe analizi için önce işlem kaydı ekleyin.");
    showEmptyList(elements.budgetRows);
    return;
  }

  const expenseTotals = expenseTotalsByCategory(rows);
  const entries = computedBudgets(rows).sort((a, b) => a.category.localeCompare(b.category, "tr"));
  const manualCount = entries.filter((item) => item.manual).length;
  const incomeBase = monthlyIncomeBase(rows);
  setAnimatedText(elements.budgetSummary, `${manualCount} manuel · ${entries.length - manualCount} öneri`);
  setAnimatedText(
    elements.budgetBasisTitle,
    incomeBase ? `${currency(incomeBase)} ortalama aylık gelir baz alındı` : "Gelir yoksa kayıtlı limitler baz alınır",
  );
  setAnimatedText(
    elements.budgetBasisText,
    "Manuel limit girilen kategoriler aynen korunur. Diğer kategoriler ortalama aylık gelir, geçmiş gider payı ve kategori ağırlıklarıyla önerilir.",
  );

  if (!entries.length) {
    elements.budgetRows.dataset.emptyHtml = `<p class="empty-state visible">Henüz bütçe limiti yok.</p>`;
    elements.budgetRows.innerHTML = elements.budgetRows.dataset.emptyHtml;
    return;
  }

  delete elements.budgetRows.dataset.emptyHtml;
  renderAnimatedList(elements.budgetRows, entries, {
    getKey: (entry) => entry.category,
    className: "budget-row",
    renderHtml: ({ category, amount: limit, manual, suggestedAmount, share }) => {
      const spent = expenseTotals[category] || 0;
      const ratio = limit ? Math.round((spent / limit) * 100) : 0;
      const fillClass = ratio >= 100 ? "danger" : ratio >= 80 ? "warning" : "";
      const status = ratio >= 100 ? "Aşım" : ratio >= 80 ? "Yakın" : "Kontrol altında";
      return `
        <header>
          <strong>${category}</strong>
          <span>${currency(spent)} / ${currency(limit)} · %${ratio}</span>
        </header>
        <div class="progress-track">
          <div class="progress-fill ${fillClass}" style="width:${Math.min(ratio, 100)}%"></div>
        </div>
        <div class="budget-meta">
          <span class="budget-chip ${manual ? "manual" : ""}">${manual ? "Manuel limit" : `Öneri: ${currency(suggestedAmount)}`}</span>
          <span class="budget-chip">Gider payı %${Math.round(share * 100)}</span>
          <span class="budget-chip ${fillClass}">${status}</span>
        </div>
      `;
    },
  });
}

function buildAdvisorItems(rows, income, expense, savingRate) {
  if (!rows.length) {
    return [["Veri bekleniyor", "Filtreleri genişletin veya yeni işlem ekleyin."]];
  }

  const expenseTotals = expenseTotalsByCategory(rows);
  const topExpense = Object.entries(expenseTotals).sort((a, b) => b[1] - a[1])[0];
  const overBudget = computedBudgets(rows).filter((budget) => (expenseTotals[budget.category] || 0) > budget.amount);
  const items = [];

  if (savingRate >= 50) {
    items.push(["Tasarruf güçlü", "Gelir-gider dengesi sağlıklı görünüyor. Bu dönem yatırım veya birikim hedefi eklenebilir."]);
  } else if (income && savingRate >= 0) {
    items.push(["Tasarruf alanı sınırlı", "Gider oranı yükseliyor. Değişken gider kategorilerini yakından izlemek iyi olur."]);
  } else {
    items.push(["Nakit açığı riski", "Seçili dönemde giderler gelirleri aşıyor. Zorunlu olmayan harcamalar ayrıştırılmalı."]);
  }

  if (topExpense) {
    items.push(["Baskın gider kategorisi", `${topExpense[0]} kategorisi ${currency(topExpense[1])} ile giderlerin merkezinde.`]);
  }

  if (overBudget.length) {
    items.unshift([
      "Bütçe limiti aşıldı",
      `${overBudget.map((budget) => budget.category).join(", ")} kategorilerinde harcama limiti aşılmış. Acil kontrol önerilir.`,
    ]);
  } else if (computedBudgets(rows).length) {
    items.push(["Limitler kontrol altında", "Tanımlı kategori limitlerinde aşım görünmüyor."]);
  }

  return items.slice(0, 4);
}

function renderAdvisor(rows, income, expense, savingRate) {
  const advisorItems = buildAdvisorItems(rows, income, expense, savingRate);

  if (!hasUserData() || !rows.length) {
    setAnimatedText(elements.healthScore, "Skor: -");
    setAnimatedText(elements.heroHealth, "Veri bekleniyor");
    renderAnimatedList(elements.advisorList, advisorItems, {
      getKey: (item) => item[0],
      tag: "li",
      renderHtml: ([title, body]) => `<strong>${title}</strong><span>${body}</span>`,
    });
    return;
  }

  const budgetPenalty = computedBudgets(rows).reduce((penalty, budget) => {
    const spent = expenseTotalsByCategory(rows)[budget.category] || 0;
    return spent > budget.amount ? penalty + 10 : penalty;
  }, 0);
  const score = Math.max(0, Math.min(100, 50 + savingRate - budgetPenalty));
  animateCurrency(elements.healthScore, score, (value) => `Skor: ${Math.round(value)}/100`);
  if (elements.sidebarHealthScore) elements.sidebarHealthScore.textContent = `${Math.round(score)}/100`;
  renderHealthBreakdown(rows, income, expense, savingRate);
  setAnimatedText(
    elements.heroHealth,
    getOverBudgetCategories(rows).length
      ? "Bütçe limitleri aşıldı"
      : score >= 85
        ? "Finansal görünüm güçlü"
        : score >= 60
          ? "Finansal görünüm dengeli"
          : "Riskler yakından izlenmeli",
  );
  renderAnimatedList(elements.advisorList, advisorItems, {
    getKey: (item) => item[0],
    tag: "li",
    renderHtml: ([title, body]) => `<strong>${title}</strong><span>${body}</span>`,
  });
}

function renderOverview(rows, periodNet) {
  if (!hasUserData()) {
    setAnimatedText(elements.accountSummary, EMPTY_HINT);
    setAnimatedText(elements.nextPayment, "-");
    setAnimatedText(elements.goalSummary, "-");
    setAnimatedText(elements.periodTrend, "-");
    return;
  }

  const accountSummary = getDynamicAccountSummary();
  const dynamicGoals = getDynamicGoals(periodNet);
  const upcoming = getDynamicUpcoming();
  const today = toInputDate(new Date());
  const next = upcoming.find((payment) => payment.date >= today) || upcoming[0];
  const totalGoalCurrent = dynamicGoals.reduce((sum, goal) => sum + goal.current, 0);
  const totalGoalTarget = dynamicGoals.reduce((sum, goal) => sum + goal.target, 0);
  const goalRate = totalGoalTarget ? Math.round((totalGoalCurrent / totalGoalTarget) * 100) : 0;
  const periodRows = Object.entries(
    rows.reduce((acc, item) => {
      const key = periodKey(item.date, "monthly");
      acc[key] ||= { income: 0, expense: 0 };
      acc[key][item.type] += Number(item.amount);
      return acc;
    }, {}),
  )
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, value]) => value);
  const firstNet = periodRows[0] ? periodRows[0].income - periodRows[0].expense : 0;
  const lastNet = periodRows.at(-1) ? periodRows.at(-1).income - periodRows.at(-1).expense : 0;
  const trend = lastNet - firstNet;

  setAnimatedText(elements.accountSummary, accountSummary.label);
  setAnimatedText(elements.nextPayment, next ? `${next.name} · ${currency(next.amount)}` : "Yaklaşan ödeme yok");
  setAnimatedText(elements.goalSummary, dynamicGoals.length ? `%${goalRate} tamamlandı` : "-");
  setAnimatedText(
    elements.periodTrend,
    periodRows.length >= 2 ? (trend >= 0 ? `+${currency(trend)}` : currency(trend)) : "Trend için veri yok",
  );
}

function renderGoals(periodNet) {
  if (goals.length) {
    renderUserGoals();
    return;
  }
  const dynamicGoals = getDynamicGoals(periodNet);
  setAnimatedText(elements.goalCount, dynamicGoals.length ? `${dynamicGoals.length} hedef` : "0 hedef");
  if (!dynamicGoals.length) {
    showEmptyList(elements.goalRows);
    return;
  }
  renderAnimatedList(elements.goalRows, dynamicGoals, {
    getKey: (goal) => goal.name,
    className: "goal-card",
    tag: "article",
    renderHtml: (goal) => {
      const ratio = Math.round((goal.current / goal.target) * 100);
      return `<header><div><strong>${goal.name}</strong><span>${formatDate(goal.deadline)} · ${currency(goal.current)} / ${currency(goal.target)}</span></div><em>%${ratio}</em></header><div class="progress-track"><div class="progress-fill" style="width:${Math.min(ratio, 100)}%"></div></div>`;
    },
  });
}

function renderUpcoming() {
  const upcoming = getDynamicUpcoming();
  setAnimatedText(elements.upcomingCount, upcoming.length ? `${upcoming.length} işlem` : "0 işlem");

  if (!upcoming.length) {
    showEmptyList(
      elements.upcomingRows,
      `<p class="empty-state visible empty-card">Yaklaşan gider yok. Gelecek tarihli gider ekleyin.</p>`,
    );
    return;
  }

  renderAnimatedList(elements.upcomingRows, upcoming, {
    getKey: (item) => item.id,
    className: "upcoming-card",
    tag: "article",
    renderHtml: (item) => `
      <div>
        <strong>${item.name}</strong>
        <span>${formatDate(item.date)} · ${item.category}</span>
      </div>
      <em>${currency(item.amount)}</em>
    `,
  });
}

function savingMessage(rate, income) {
  if (!income) return "Gelir verisi bekleniyor";
  if (rate >= 50) return "Güçlü tasarruf performansı";
  if (rate >= 20) return "Kontrollü bütçe seviyesi";
  if (rate >= 0) return "Gider baskısı izlenmeli";
  return "Bütçe açığı oluştu";
}

function exportCsv() {
  const rows = filteredTransactions();
  const header = ["Tarih", "Tür", "Kategori", "Not", "Tutar"];
  const body = rows.map((item) => [
    item.date,
    item.type === "income" ? "Gelir" : "Gider",
    item.category,
    item.note || "",
    Number(item.amount).toFixed(2),
  ]);
  const csv = [header, ...body]
    .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([`\ufeff${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "finans-raporu.csv";
  link.click();
  URL.revokeObjectURL(url);
  showToast(`${rows.length} kayıt CSV olarak indirildi.`);
}

function exportJsonBackup() {
  const payload = {
    version: CURRENT_DATA_VERSION,
    exportedAt: new Date().toISOString(),
    transactions,
    budgets,
    customCategories: loadCustomCategories(),
    settings,
    goals,
    accounts,
    recurring,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `finsight-yedek-${toInputDate(new Date())}.json`;
  link.click();
  URL.revokeObjectURL(url);
  showToast("JSON yedeği indirildi.");
}

function importJsonBackup(file) {
  const reader = new FileReader();
  reader.onload = async () => {
    try {
      const payload = JSON.parse(String(reader.result));
      const nextTransactions = Array.isArray(payload.transactions)
        ? payload.transactions.map(normalizeTransaction).filter(Boolean)
        : [];
      const nextBudgets = payload.budgets ? normalizeBudgets(payload.budgets) : {};

      if (!nextTransactions.length && !Object.keys(nextBudgets).length) {
        showToast("Yedek dosyasında geçerli veri bulunamadı.", "error");
        return;
      }

      const confirmed = await confirmAction(
        "Yedek dosyası yüklensin mi?",
        `Mevcut ${transactions.length} işlem ve ${Object.keys(budgets).length} limit kaydı değiştirilecek.`,
        { danger: true },
      );
      if (!confirmed) return;

      transactions = nextTransactions;
      budgets = nextBudgets;
      if (payload.settings) settings = { ...loadSettings(), ...payload.settings };
      if (Array.isArray(payload.goals)) goals = payload.goals;
      if (Array.isArray(payload.accounts) && payload.accounts.length) accounts = payload.accounts;
      if (Array.isArray(payload.recurring)) recurring = payload.recurring;

      if (payload.customCategories) {
        persistCustomCategories({
          income: Array.isArray(payload.customCategories.income) ? payload.customCategories.income : [],
          expense: Array.isArray(payload.customCategories.expense) ? payload.customCategories.expense : [],
        });
      }

      syncCustomCategoriesFromTransactions();
      resetFilters();
      resetMetricAnimations();
      persist();
      persistBudgets();
      persistSettings();
      persistGoals();
      persistAccounts();
      persistRecurring();
      applyTheme();
      if (elements.themeSetting) elements.themeSetting.value = settings.theme;
      if (elements.currencySetting) elements.currencySetting.value = settings.currency;
      if (elements.dateFormatSetting) elements.dateFormatSetting.value = settings.dateFormat;
      localStorage.setItem(DATA_VERSION_KEY, String(CURRENT_DATA_VERSION));
      updateCategorySelect();
      updateBudgetCategorySelect();
      updateAccountSelects();
      render();
      showToast(`${transactions.length} işlem başarıyla yüklendi.`);
    } catch {
      showToast("Yedek dosyası okunamadı. Geçerli bir JSON dosyası seçin.", "error");
    } finally {
      elements.importFile.value = "";
    }
  };
  reader.readAsText(file);
}

function getOverBudgetCategories(rows) {
  const expenseTotals = expenseTotalsByCategory(rows);
  return computedBudgets(rows).filter((budget) => (expenseTotals[budget.category] || 0) > budget.amount);
}

function openEditModal(transactionId) {
  const item = transactions.find((entry) => entry.id === transactionId);
  if (!item || !elements.editModal) return;

  editingTransactionId = transactionId;
  elements.editType.value = item.type;
  updateEditCategorySelect(item.category);
  elements.editAmount.value = String(item.amount);
  elements.editDate.value = item.date;
  elements.editNote.value = item.note || "";
  if (elements.editAccount) elements.editAccount.value = item.accountId || accounts[0]?.id;
  elements.editModal.showModal();
  refreshIcons();
}

function closeEditModal() {
  editingTransactionId = null;
  elements.editForm?.reset();
  elements.editModal?.close();
}

function resetFilters() {
  elements.datePreset.value = "all";
  elements.periodFilter.value = "monthly";
  elements.typeFilter.value = "all";
  elements.categoryFilter.value = "all";
  elements.searchInput.value = "";
  elements.startDate.value = "";
  elements.endDate.value = "";
}

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function initScrollReveal() {
  const revealTargets = document.querySelectorAll("[data-reveal]");
  if (!revealTargets.length) return;

  if (prefersReducedMotion()) {
    revealTargets.forEach((element) => element.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -36px 0px" },
  );

  revealTargets.forEach((element, index) => {
    element.style.setProperty("--reveal-index", index % 8);
    observer.observe(element);
  });
}

function closeSplash() {
  elements.splashScreen?.classList.add("is-hidden");
  document.body.classList.remove("splash-active");
}

function render() {
  updateCategoryFilter();
  const rows = filteredTransactions();
  const income = rows.filter((item) => item.type === "income").reduce((sum, item) => sum + Number(item.amount), 0);
  const expense = rows.filter((item) => item.type === "expense").reduce((sum, item) => sum + Number(item.amount), 0);
  const balance = income - expense;
  const savingRate = income ? Math.round((balance / income) * 100) : 0;
  const totalVolume = rows.reduce((sum, item) => sum + Number(item.amount), 0);
  const incomeShare = totalVolume ? Math.round((income / totalVolume) * 100) : 0;
  const expenseShare = totalVolume ? Math.round((expense / totalVolume) * 100) : 0;
  const balanceStrength = income ? Math.max(0, Math.min(100, Math.round((balance / income) * 100))) : 0;

  animateCurrency(elements.incomeTotal, income);
  animateCurrency(elements.expenseTotal, expense);
  animateCurrency(elements.balanceTotal, balance);
  setAnimatedStyle(elements.balanceTotal, "color", balance >= 0 ? "#1f7a4f" : "#c2493b");
  animateCurrency(elements.savingRate, savingRate, (value) => `%${Math.round(value)}`);
  setAnimatedStyle(elements.savingRate, "color", savingRate >= 0 ? "#1f7a4f" : "#c2493b");
  setAnimatedText(elements.incomeShare, `Hacim payı %${incomeShare}`);
  setAnimatedText(elements.expenseShare, `Hacim payı %${expenseShare}`);
  setAnimatedText(elements.balanceStatus, !hasUserData() ? "Veri bekleniyor" : balance >= 0 ? "Pozitif nakit akışı" : "Negatif nakit akışı");
  setAnimatedText(elements.savingStatus, !hasUserData() ? "Veri bekleniyor" : savingMessage(savingRate, income));
  setMetricFill(elements.incomeTotal, incomeShare);
  setMetricFill(elements.expenseTotal, expenseShare);
  setMetricFill(elements.balanceTotal, balanceStrength);
  setMetricFill(elements.savingRate, Math.max(0, Math.min(100, savingRate)));
  setAnimatedText(elements.reportCount, `${rows.length} kayıt`);
  setAnimatedText(elements.topExpense, biggestExpense(rows));
  setAnimatedText(elements.topCategory, mostActiveCategory(rows));
  animateCurrency(elements.averageTransaction, rows.length ? totalVolume / rows.length : 0);
  setAnimatedText(elements.latestTransaction, rows.length ? formatDate(rows[0].date) : "-");
  setAnimatedText(elements.pieHint, elements.typeFilter.value === "income" ? "Gelir kategorileri" : "Gider kategorileri");
  setAnimatedText(elements.lineHint, elements.periodFilter.value === "weekly" ? "Haftalık görünüm" : "Aylık görünüm");
  renderOverview(rows, balance);
  renderWidgets(rows, balance);
  renderBudgets(rows);
  renderBudgetRings(rows);
  renderAdvisor(rows, income, expense, savingRate);
  renderGoals(balance);
  renderUpcoming();
  renderRecurring();
  renderAccounts();
  renderCategoryManager();

  const pieSourceType = elements.typeFilter.value === "income" ? "income" : "expense";
  const categoryTotals = rows
    .filter((item) => item.type === pieSourceType)
    .reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + Number(item.amount);
      return acc;
    }, {});
  flashChart(elements.categoryPie);
  drawPie(
    Object.entries(categoryTotals)
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value),
  );

  const periodTotals = rows.reduce((acc, item) => {
    const key = periodKey(item.date, elements.periodFilter.value);
    acc[key] ||= { label: key, income: 0, expense: 0 };
    acc[key][item.type] += Number(item.amount);
    return acc;
  }, {});
  flashChart(elements.cashflowLine);
  drawLine(Object.values(periodTotals).sort((a, b) => a.label.localeCompare(b.label)));
  drawWeeklyHeatmap(rows);

  renderAnimatedList(elements.transactionRows, rows, {
    getKey: (item) => item.id,
    tag: "tr",
    renderHtml: (item) => `
      <td>${formatDate(item.date)}</td>
      <td><span class="type-pill ${item.type}">${item.type === "income" ? "Gelir" : "Gider"}</span></td>
      <td>${escapeHtml(item.category)}</td>
      <td>${formatNote(item.note || "")}</td>
      <td>${escapeHtml(getAccountName(item.accountId))}</td>
      <td>${currency(Number(item.amount))}</td>
      <td>
        <div class="row-actions">
          <button class="row-action edit-action" type="button" data-edit-id="${item.id}" aria-label="Düzenle">
            <i data-lucide="pencil"></i>Düzenle
          </button>
          <button class="row-action delete-action" type="button" data-delete-id="${item.id}" aria-label="Sil">
            <i data-lucide="x"></i>Sil
          </button>
        </div>
      </td>
    `,
  });
  elements.reportPanel.classList.toggle("empty", rows.length === 0);
  refreshIcons();
}

elements.type.addEventListener("change", () => {
  updateCategorySelect();
});
elements.category.addEventListener("change", () => {
  toggleCustomCategoryField(elements.category, elements.customCategoryWrap, elements.customCategory);
});
elements.editType.addEventListener("change", () => {
  updateEditCategorySelect();
});
elements.editCategory.addEventListener("change", () => {
  toggleCustomCategoryField(elements.editCategory, elements.editCustomCategoryWrap, elements.editCustomCategory);
});
elements.typeFilter.addEventListener("change", () => {
  updateCategoryFilter();
  render();
});
elements.form.addEventListener("submit", (event) => {
  event.preventDefault();
  const category = resolveCategory(elements.type.value, elements.category.value, elements.customCategory.value);
  const amount = Number(elements.amount.value);

  if (!category) {
    showToast("Özel kategori adı girin.", "error");
    return;
  }
  if (!Number.isFinite(amount) || amount <= 0) {
    showToast("Geçerli bir tutar girin.", "error");
    return;
  }

  transactions.unshift({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    type: elements.type.value,
    category,
    amount,
    date: elements.date.value,
    note: elements.note.value.trim(),
    accountId: elements.accountSelect?.value || accounts[0]?.id,
  });
  persist();
  elements.form.reset();
  elements.type.value = "income";
  elements.date.valueAsDate = new Date();
  updateCategorySelect();
  pulseFormSuccess(elements.form);
  showToast("İşlem kaydedildi.");
  render();
});

elements.budgetForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const amount = Number(elements.budgetAmount.value);
  if (!Number.isFinite(amount) || amount <= 0) {
    showToast("Geçerli bir limit tutarı girin.", "error");
    return;
  }
  budgets[elements.budgetCategory.value] = { amount, manual: true };
  persistBudgets();
  elements.budgetAmount.value = "";
  pulseFormSuccess(elements.budgetForm);
  showToast(`${elements.budgetCategory.value} limiti kaydedildi.`);
  render();
});

elements.transactionRows.addEventListener("click", async (event) => {
  const editButton = event.target.closest("[data-edit-id]");
  if (editButton) {
    openEditModal(editButton.dataset.editId);
    return;
  }

  const button = event.target.closest("[data-delete-id]");
  if (!button) return;

  const deleteId = button.dataset.deleteId;
  const item = transactions.find((entry) => entry.id === deleteId);
  const confirmed = await confirmAction(
    "Bu işlem silinsin mi?",
    item ? `${item.category} · ${currency(Number(item.amount))} · ${formatDate(item.date)}` : "",
    { danger: true },
  );
  if (!confirmed) return;

  const row = button.closest("tr");
  if (row) {
    row.classList.add("is-exiting");
    await waitForAnimation(row);
    row.remove();
  }
  transactions = transactions.filter((entry) => entry.id !== deleteId);
  persist();
  showToast("İşlem silindi.");
  render();
});

elements.editForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!editingTransactionId) return;

  const category = resolveCategory(
    elements.editType.value,
    elements.editCategory.value,
    elements.editCustomCategory.value,
  );
  const amount = Number(elements.editAmount.value);

  if (!category) {
    showToast("Özel kategori adı girin.", "error");
    return;
  }
  if (!Number.isFinite(amount) || amount <= 0) {
    showToast("Geçerli bir tutar girin.", "error");
    return;
  }

  const index = transactions.findIndex((entry) => entry.id === editingTransactionId);
  if (index === -1) {
    closeEditModal();
    return;
  }

  transactions[index] = {
    ...transactions[index],
    type: elements.editType.value,
    category,
    amount,
    date: elements.editDate.value,
    note: elements.editNote.value.trim(),
    accountId: elements.editAccount?.value || accounts[0]?.id,
  };
  persist();
  closeEditModal();
  updateCategorySelect();
  updateBudgetCategorySelect();
  showToast("İşlem güncellendi.");
  render();
});

elements.editCancel.addEventListener("click", closeEditModal);

[elements.periodFilter, elements.categoryFilter, elements.startDate, elements.endDate].forEach((control) => {
  control.addEventListener("change", render);
});

elements.datePreset.addEventListener("change", () => {
  setDatePreset(elements.datePreset.value);
  render();
});

elements.startDate.addEventListener("change", () => {
  elements.datePreset.value = "all";
});

elements.endDate.addEventListener("change", () => {
  elements.datePreset.value = "all";
});

elements.searchInput.addEventListener("input", render);
elements.exportBtn.addEventListener("click", exportCsv);
elements.exportJsonBtn.addEventListener("click", exportJsonBackup);
elements.importBtn.addEventListener("click", () => elements.importFile.click());
elements.importFile.addEventListener("change", () => {
  const file = elements.importFile.files?.[0];
  if (file) importJsonBackup(file);
});
elements.skipSplashBtn.addEventListener("click", finishOnboarding);
elements.onboardingStartBtn?.addEventListener("click", finishOnboarding);
elements.onboardingSampleBtn?.addEventListener("click", async () => {
  transactions = [...sampleTransactions];
  budgets = { ...defaultBudgets };
  persist();
  persistBudgets();
  showToast("Örnek veri yüklendi.");
  finishOnboarding();
  render();
});

elements.navItems?.forEach((btn) => {
  btn.addEventListener("click", () => switchView(btn.dataset.view));
});
elements.sidebarToggleBtn?.addEventListener("click", (e) => { e.stopPropagation(); toggleSidebar(true); });
elements.sidebarCloseBtn?.addEventListener("click", (e) => { e.stopPropagation(); toggleSidebar(false); });
elements.sidebarOverlay?.addEventListener("click", (e) => { e.stopPropagation(); toggleSidebar(false); });

elements.themeToggleBtn?.addEventListener("click", () => {
  settings.theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  if (elements.themeSetting) elements.themeSetting.value = settings.theme;
  persistSettings();
  applyTheme();
  render();
});

elements.themeSetting?.addEventListener("change", () => {
  settings.theme = elements.themeSetting.value;
  persistSettings();
  applyTheme();
  render();
});
elements.currencySetting?.addEventListener("change", () => {
  settings.currency = elements.currencySetting.value;
  persistSettings();
  render();
});
elements.dateFormatSetting?.addEventListener("change", () => {
  settings.dateFormat = elements.dateFormatSetting.value;
  persistSettings();
  render();
});

elements.fabBtn?.addEventListener("click", openQuickAddModal);
elements.quickAddBtn?.addEventListener("click", openQuickAddModal);
elements.quickAddCancel?.addEventListener("click", () => elements.quickAddModal?.close());
elements.quickType?.addEventListener("change", updateQuickCategorySelect);
elements.quickAddForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const amount = Number(elements.quickAmount.value);
  if (!Number.isFinite(amount) || amount <= 0) {
    showToast("Geçerli bir tutar girin.", "error");
    return;
  }
  transactions.unshift({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    type: elements.quickType.value,
    category: elements.quickCategory.value,
    amount,
    date: toInputDate(new Date()),
    note: elements.quickNote.value.trim(),
    accountId: accounts[0]?.id,
  });
  persist();
  elements.quickAddModal.close();
  showToast("İşlem kaydedildi.");
  render();
});

elements.healthExpandBtn?.addEventListener("click", () => {
  healthExpanded = !healthExpanded;
  elements.healthBreakdown?.classList.toggle("hidden", !healthExpanded);
  elements.healthExpandBtn?.querySelector("i")?.setAttribute("data-lucide", healthExpanded ? "chevron-up" : "chevron-down");
  refreshIcons();
});

elements.addGoalBtn?.addEventListener("click", () => {
  editingGoalId = null;
  elements.goalModalTitle.innerHTML = '<i data-lucide="flag"></i>Hedef ekle';
  elements.goalForm.reset();
  elements.goalDeadline.value = `${new Date().getFullYear()}-12-31`;
  elements.goalModal.showModal();
  refreshIcons();
});
elements.goalCancel?.addEventListener("click", () => elements.goalModal?.close());
elements.goalForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = {
    id: editingGoalId || (crypto.randomUUID ? crypto.randomUUID() : String(Date.now())),
    name: elements.goalName.value.trim(),
    target: Number(elements.goalTarget.value),
    current: Number(elements.goalCurrent.value) || 0,
    deadline: elements.goalDeadline.value,
  };
  if (editingGoalId) {
    const idx = goals.findIndex((g) => g.id === editingGoalId);
    if (idx >= 0) goals[idx] = data;
  } else {
    goals.push(data);
  }
  persistGoals();
  elements.goalModal.close();
  editingGoalId = null;
  showToast("Hedef kaydedildi.");
  render();
});

elements.goalRows?.addEventListener("click", async (event) => {
  const editBtn = event.target.closest("[data-edit-goal]");
  const deleteBtn = event.target.closest("[data-delete-goal]");
  if (editBtn) {
    const goal = goals.find((g) => g.id === editBtn.dataset.editGoal);
    if (!goal) return;
    editingGoalId = goal.id;
    elements.goalModalTitle.innerHTML = '<i data-lucide="flag"></i>Hedefi düzenle';
    elements.goalName.value = goal.name;
    elements.goalTarget.value = goal.target;
    elements.goalCurrent.value = goal.current;
    elements.goalDeadline.value = goal.deadline;
    elements.goalModal.showModal();
    refreshIcons();
    return;
  }
  if (deleteBtn) {
    const confirmed = await confirmAction("Bu hedef silinsin mi?", "", { danger: true });
    if (!confirmed) return;
    goals = goals.filter((g) => g.id !== deleteBtn.dataset.deleteGoal);
    persistGoals();
    showToast("Hedef silindi.");
    render();
  }
});

elements.addAccountBtn?.addEventListener("click", () => {
  editingAccountId = null;
  elements.accountModalTitle.innerHTML = '<i data-lucide="wallet"></i>Hesap ekle';
  elements.accountForm.reset();
  elements.accountBalance.value = "0";
  elements.accountModal.showModal();
  refreshIcons();
});
elements.accountCancel?.addEventListener("click", () => elements.accountModal?.close());
elements.accountForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = {
    id: editingAccountId || (crypto.randomUUID ? crypto.randomUUID() : String(Date.now())),
    name: elements.accountName.value.trim(),
    balance: Number(elements.accountBalance.value) || 0,
    type: elements.accountType.value,
  };
  if (editingAccountId) {
    const idx = accounts.findIndex((a) => a.id === editingAccountId);
    if (idx >= 0) accounts[idx] = { ...accounts[idx], ...data };
  } else {
    accounts.push(data);
  }
  persistAccounts();
  updateAccountSelects();
  elements.accountModal.close();
  editingAccountId = null;
  showToast("Hesap kaydedildi.");
  render();
});

elements.accountRows?.addEventListener("click", async (event) => {
  const editBtn = event.target.closest("[data-edit-account]");
  const deleteBtn = event.target.closest("[data-delete-account]");
  if (editBtn) {
    const account = accounts.find((a) => a.id === editBtn.dataset.editAccount);
    if (!account) return;
    editingAccountId = account.id;
    elements.accountModalTitle.innerHTML = '<i data-lucide="wallet"></i>Hesabı düzenle';
    elements.accountName.value = account.name;
    elements.accountBalance.value = account.balance;
    elements.accountType.value = account.type;
    elements.accountModal.showModal();
    refreshIcons();
    return;
  }
  if (deleteBtn && !deleteBtn.disabled) {
    const confirmed = await confirmAction("Bu hesap silinsin mi?", "", { danger: true });
    if (!confirmed) return;
    accounts = accounts.filter((a) => a.id !== deleteBtn.dataset.deleteAccount);
    persistAccounts();
    updateAccountSelects();
    showToast("Hesap silindi.");
    render();
  }
});

elements.addRecurringBtn?.addEventListener("click", () => {
  elements.recurringForm.reset();
  elements.recurringType.value = "expense";
  updateRecurringCategorySelect();
  elements.recurringNextDate.valueAsDate = new Date();
  elements.recurringModal.showModal();
  refreshIcons();
});
elements.recurringCancel?.addEventListener("click", () => elements.recurringModal?.close());
elements.recurringType?.addEventListener("change", updateRecurringCategorySelect);
elements.recurringForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  recurring.push({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    type: elements.recurringType.value,
    category: elements.recurringCategory.value,
    amount: Number(elements.recurringAmount.value),
    frequency: elements.recurringFrequency.value,
    nextDate: elements.recurringNextDate.value,
    note: elements.recurringNote.value.trim(),
    active: true,
    accountId: accounts[0]?.id,
  });
  persistRecurring();
  elements.recurringModal.close();
  showToast("Tekrarlayan işlem eklendi.");
  render();
});

elements.recurringRows?.addEventListener("click", async (event) => {
  const deleteBtn = event.target.closest("[data-delete-recurring]");
  if (!deleteBtn) return;
  const confirmed = await confirmAction("Tekrarlayan işlem silinsin mi?", "", { danger: true });
  if (!confirmed) return;
  recurring = recurring.filter((r) => r.id !== deleteBtn.dataset.deleteRecurring);
  persistRecurring();
  showToast("Tekrarlayan işlem silindi.");
  render();
});

elements.categoryManager?.addEventListener("click", async (event) => {
  const deleteBtn = event.target.closest("[data-delete-cat]");
  const renameBtn = event.target.closest("[data-rename-cat]");
  if (deleteBtn) {
    const [type, name] = deleteBtn.dataset.deleteCat.split(":");
    const confirmed = await confirmAction(`"${name}" kategorisi silinsin mi?`, "Bu kategorideki işlemler korunur.", { danger: true });
    if (!confirmed) return;
    const custom = loadCustomCategories();
    custom[type] = custom[type].filter((c) => c !== name);
    persistCustomCategories(custom);
    showToast("Kategori silindi.");
    render();
  }
  if (renameBtn) {
    const [type, name] = renameBtn.dataset.renameCat.split(":");
    const newName = window.prompt("Yeni kategori adı:", name);
    if (!newName || newName.trim() === name) return;
    const trimmed = newName.trim().slice(0, 24);
    const custom = loadCustomCategories();
    const idx = custom[type].indexOf(name);
    if (idx >= 0) custom[type][idx] = trimmed;
    persistCustomCategories(custom);
    transactions.forEach((t) => {
      if (t.type === type && t.category === name) t.category = trimmed;
    });
    persist();
    showToast("Kategori güncellendi.");
    render();
  }
});

document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "n") {
    event.preventDefault();
    openQuickAddModal();
  }
});

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
  if (settings.theme === "system") applyTheme();
});

elements.loadSampleBtn.addEventListener("click", async () => {
  const confirmed = await confirmAction(
    "Örnek veri yüklensin mi?",
    "Mevcut işlemler ve limitler örnek veriyle değiştirilecek.",
    { danger: true },
  );
  if (!confirmed) return;

  transactions = [...sampleTransactions];
  budgets = { ...defaultBudgets };
  resetFilters();
  resetMetricAnimations();
  persist();
  persistBudgets();
  localStorage.setItem(DATA_VERSION_KEY, String(CURRENT_DATA_VERSION));
  showToast("Örnek veri yüklendi.");
  render();
});

elements.clearBtn.addEventListener("click", async () => {
  const confirmed = await confirmAction(
    "Tüm veriler temizlensin mi?",
    `${transactions.length} işlem ve ${Object.keys(budgets).length} limit kaydı kalıcı olarak silinecek.`,
    { danger: true },
  );
  if (!confirmed) return;

  transactions = [];
  budgets = {};
  resetMetricAnimations();
  persist();
  persistBudgets();
  showToast("Tüm veriler temizlendi.");
  render();
});

window.addEventListener("resize", render);

function closeSplash() {
  elements.splashScreen?.classList.add("is-hidden");
  document.body.classList.remove("splash-active");
}

function initOnboarding() {
  const progressBar = document.querySelector(".splash-progress span");
  if (progressBar) {
    progressBar.style.animation = "none";
    progressBar.style.width = "0%";
    void progressBar.offsetWidth; // Trigger reflow
    progressBar.style.transition = "width 1.0s cubic-bezier(0.16, 1, 0.3, 1)";
    progressBar.style.width = "100%";
  }
  setTimeout(closeSplash, 1000);
}

migrateData();
applyTheme();
if (elements.themeSetting) elements.themeSetting.value = settings.theme;
if (elements.currencySetting) elements.currencySetting.value = settings.currency;
if (elements.dateFormatSetting) elements.dateFormatSetting.value = settings.dateFormat;
switchView("overview");
elements.date.valueAsDate = new Date();
updateCategorySelect();
updateBudgetCategorySelect();
updateAccountSelects();
updateQuickCategorySelect();
updateRecurringCategorySelect();
initScrollReveal();
render();
initOnboarding();
