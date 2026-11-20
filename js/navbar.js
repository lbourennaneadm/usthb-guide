function initSharedNavbar() {
  const navContainer = document.getElementById("shared-navbar");
  if (!navContainer) return;

  // قراءة اللغة من الرابط أو من الذاكرة المحلية
  const urlParams = new URLSearchParams(window.location.search);
  const savedLang = urlParams.get("lang") || localStorage.getItem("usthb_lang") || "ar";
  localStorage.setItem("usthb_lang", savedLang);

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  // نصوص القائمة باللغات الثلاث لضمان ظهورها باللغة الصحيحة فوراً
  const navTexts = {
    ar: {
      navTitle: "روابط الرقمية لحاضنة USTHB-TECHINNOV",
      menuLabel: "القائمة",
      navHome: "الرئيسية (FAQ)",
      navServices: "المرافق والهيئات",
      navGuide: "دليل الحاضنة 1275"
    },
    fr: {
      navTitle: "Liens numériques de l'incubateur USTHB-TECHINNOV",
      menuLabel: "Menu",
      navHome: "Accueil (FAQ)",
      navServices: "Services & Dispositifs",
      navGuide: "Guide Incubateur 1275"
    },
    en: {
      navTitle: "Digital Links of USTHB-TECHINNOV Incubator",
      menuLabel: "Menu",
      navHome: "Home (FAQ)",
      navServices: "Services & Entities",
      navGuide: "Incubator Guide 1275"
    }
  };

  const t = navTexts[savedLang] || navTexts.ar;

  const getLinkClass = (pageName) => {
    const isActive = currentPage === pageName;
    return isActive
      ? "block px-3.5 py-2.5 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30 font-bold"
      : "block px-3.5 py-2.5 rounded-xl hover:bg-white/10 transition-colors";
  };

  // دالة تضيف اللغة المختارة للرابط عند الانتقال
  const buildUrl = (page) => `${page}?lang=${localStorage.getItem("usthb_lang") || savedLang}`;

  navContainer.innerHTML = `
    <nav class="relative bg-slate-900 border-b border-white/15 text-white z-50 shadow-lg">
      <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        <!-- زر القائمة -->
        <button id="mobile-menu-btn" aria-label="Menu" class="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer focus:outline-none">
          <svg id="menu-icon-open" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg id="menu-icon-close" class="w-5 h-5 hidden" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span data-i18n="menuLabel">${t.menuLabel}</span>
        </button>

        <!-- رابط الروابط الرقمية للحاضنة -->
        <a href="https://www.digitalagencey.com/techinnov" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 font-bold text-xs sm:text-sm text-amber-400 hover:text-amber-300 transition-colors">
          <i data-lucide="globe" class="w-4 h-4 shrink-0"></i>
          <span data-i18n="navTitle">${t.navTitle}</span>
          <i data-lucide="external-link" class="w-3.5 h-3.5 opacity-80 shrink-0"></i>
        </a>

      </div>

      <!-- القائمة المنسدلة -->
      <div id="mobile-menu-dropdown" class="hidden absolute top-full inset-x-0 md:inset-x-auto md:start-4 md:w-72 md:mt-2 md:rounded-2xl bg-slate-900 border border-slate-700 px-3 py-3 space-y-1.5 text-xs font-semibold shadow-2xl z-50">
        <a href="${buildUrl('index.html')}" data-nav-page="index.html" data-i18n="navHome" class="${getLinkClass('index.html')}">${t.navHome}</a>
        <a href="${buildUrl('services.html')}" data-nav-page="services.html" data-i18n="navServices" class="${getLinkClass('services.html')}">${t.navServices}</a>
        <a href="${buildUrl('guide.html')}" data-nav-page="guide.html" data-i18n="navGuide" class="${getLinkClass('guide.html')}">${t.navGuide}</a>
      </div>
    </nav>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  // تحديث الروابط تلقائياً إذا غيّر المستخدم اللغة داخل الصفحة قبل الانتقال
  navContainer.querySelectorAll("a[data-nav-page]").forEach(link => {
    link.addEventListener("click", () => {
      const latestLang = localStorage.getItem("usthb_lang") || "ar";
      link.href = `${link.getAttribute("data-nav-page")}?lang=${latestLang}`;
    });
  });

  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu-dropdown");
  const iconOpen = document.getElementById("menu-icon-open");
  const iconClose = document.getElementById("menu-icon-close");

  const toggleMenu = () => {
    menu.classList.toggle("hidden");
    iconOpen.classList.toggle("hidden");
    iconClose.classList.toggle("hidden");
  };

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !btn.contains(e.target) && !menu.classList.contains("hidden")) {
      toggleMenu();
    }
  });
}

initSharedNavbar();