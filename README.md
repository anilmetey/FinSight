# FinSight — Finans ve Bütçe Takip Dashboard'u / Finance & Budget Dashboard

[Türkçe](#türkçe) | [English](#english)

---

## Türkçe

**FinSight**, kişisel finansınızı yönetmeniz, gelir-gider dengenizi kurumsal kalitede izlemeniz ve finansal hedeflerinize ulaşmanız için tasarlanmış **yerel-öncelikli (local-first) bir finans paneli** uygulamasıdır. Verileriniz tamamen tarayıcınızda (`localStorage`) saklanır; üçüncü taraf sunuculara veya veritabanlarına gönderilmez.

Apple ve Stripe arayüzlerinden esinlenen premium koyu tema tasarımı, metalik ışık geçişleri (shimmer efekti) ve yumuşak geçişli mikro etkileşimleriyle modern finansal teknoloji (fintech) standartlarında bir kullanıcı deneyimi sunar.

### 🌟 Öne Çıkan Özellikler

*   **Premium & Akıcı Tasarım:** Canlı gradyanlar, cam morfolojisi (glassmorphism), yavaş akışlı metalik parıltı (shimmer) efektleri ve Apple tarzı kıvrımlı köşelerle zenginleştirilmiş dark-theme kullanıcı arayüzü.
*   **Finansal Sağlık Skoru:** Gelir/gider oranınıza ve birikim alışkanlıklarınıza göre anlık güncellenen dinamik skor ve bütçe danışmanlığı önerileri.
*   **Kategori Limitleri:** Gider kategorilerine özel aylık limit belirleme ve harcama oranına göre otomatik renk değiştiren bütçe halkaları.
*   **Çoklu Hesap ve Net Değer Takibi:** Nakit, kart veya yatırım hesaplarınızı ayrı ayrı yönetin; net değerinizi (net worth) tek bir ekrandan izleyin.
*   **Gelişmiş Analitik ve Grafikler:** 
    *   *Nakit Akışı:* Gelir-gider karşılaştırmasını gösteren aylık çizgi grafiği.
    *   *Kategori Dağılımı:* Giderlerinizin payını gösteren pasta grafik.
    *   *Haftalık Harcama:* Son 8 haftanın trendlerini gösteren sütun grafiği.
*   **Esnek Filtreleme:** Tarih aralığı, işlem türü veya kategoriye göre anında arama ve raporlama.
*   **Veri Yönetimi:** İşlem geçmişinizi kolayca CSV veya JSON formatında indirin, başka bir cihazda geri yükleyin.

### 🛠️ Kullanılan Teknolojiler

*   **Frontend:** HTML5 (Semantik Yapı), Vanilla CSS3 (Grid, Flexbox, Custom Properties, Spring Keyframes), Modern Javascript (ES6+, LocalStorage, JSON-First data architecture)
*   **Grafik Kütüphanesi:** Chart.js
*   **İkon Seti:** Lucide Icons

### 🚀 Yerel Çalıştırma

Projeyi yerel makinenizde herhangi bir sunucu kurmadan doğrudan çift tıklayarak veya yerel bir HTTP sunucusu yardımıyla çalıştırabilirsiniz:

```bash
# Python 3 ile yerel sunucu başlatma
python3 -m http.server 4173
```
Ardından tarayıcınızda `http://localhost:4173` adresine giderek uygulamayı kullanmaya başlayabilirsiniz.

---

## English

**FinSight** is a **local-first personal finance and budget tracking dashboard** designed to manage your financial health, track income-expense balances, and help you reach your saving goals. Your data is stored 100% locally in your browser (`localStorage`) without being sent to third-party databases.

Inspired by premium fintech UI designs like Stripe and Apple, it offers a state-of-the-art user experience with ambient mesh backgrounds, flowing text shimmer animations, and smooth spring-based micro-interactions.

### 🌟 Key Features

*   **Premium UI/UX Design:** Dark mode first layout with sophisticated color palettes, glassmorphism, slow-motion metallic text shimmer effects, and Apple-style squircle curves.
*   **Financial Health Score:** Real-time dynamic scoring and automated budget advisory tips based on your savings rate and transaction frequencies.
*   **Category Spending Limits:** Set monthly budget caps for individual expense categories with dynamic ring charts that color-shift dynamically.
*   **Multi-Account & Net Worth Management:** Manage cash, credit cards, or investment accounts independently and track your cumulative net worth.
*   **Rich Interactive Visualization:** 
    *   *Cash Flow:* Monthly line chart visualizing trends of income vs. expenses.
    *   *Category Distribution:* Clean doughnut/pie chart showing proportional expense shares.
    *   *Weekly Spending:* Bar chart summarizing weekly outflows for the past 8 weeks.
*   **Dynamic Query Filters:** Instantly filter transactions by date presets, type, or specific categories.
*   **Data Portability:** Export your entire transaction history to CSV/JSON or import data to easily migrate between devices.

### 🛠️ Tech Stack

*   **Frontend Core:** Semantic HTML5, Vanilla CSS3 (CSS Variables, Keyframes, Custom Scrollbars), Modern JavaScript (ES6+, Browser API Integration)
*   **Visualization:** Chart.js
*   **Iconography:** Lucide Icons

### 🚀 Running Locally

You can launch the dashboard by opening `index.html` directly or running a simple local web server:

```bash
# Run a local web server using Python
python3 -m http.server 4173
```
Now, navigate to `http://localhost:4173` in your browser.
