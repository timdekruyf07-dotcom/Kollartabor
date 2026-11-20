/* ==========================================
   KOLLER & TABOR V2
   JAVASCRIPT
========================================== */

(() => {

  "use strict";

  /* ========================================
     PAGINA'S
  ======================================== */

  const links = [

    ["index.html", "Home"],

    ["diensten.html", "Diensten"],

    ["woning.html", "Interactieve woning"],

    ["waarom.html", "Over ons"],

    ["projecten.html", "Projecten"],

    ["team.html", "Ons team"],

    ["tarieven.html", "Tarieven"],

    ["contact.html", "Contact"]

  ];

  /* ========================================
     HUIDIGE PAGINA BEPALEN
  ======================================== */

  const file =
    location.pathname.split("/").pop() ||
    "index.html";

  /* ========================================
     HEADER AUTOMATISCH TOEVOEGEN
  ======================================== */

  document.getElementById("site-header").innerHTML = `

    <div class="strip"></div>

    <div class="site-header">

      <div class="container nav">

        <a
          class="brand"
          href="index.html"
          aria-label="Koller en Tabor — Home"
        >

          <img
            src="images/logo.png"
            alt="Koller & Tabor Installatietechniek"
          >

        </a>

        <button
          class="menu-toggle"
          id="menu-toggle"
          aria-controls="menu"
          aria-expanded="false"
          aria-label="Menu openen"
        >

          ☰

        </button>

        <nav
          class="menu"
          id="menu"
          aria-label="Hoofdnavigatie"
        >

          ${links.map(([href, label]) => `

            <a
              href="${href}"
              class="${
                file === href ? "current" : ""
              } ${
                href === "contact.html" ? "nav-cta" : ""
              }"

              ${
                file === href
                  ? 'aria-current="page"'
                  : ""
              }
            >

              ${label}

            </a>

          `).join("")}

        </nav>

      </div>

    </div>

  `;

  /* ========================================
     FOOTER AUTOMATISCH TOEVOEGEN
  ======================================== */

  document.getElementById("site-footer").innerHTML = `

    <div class="footer">

      <div class="container">

        <div class="footer-grid">

          <div>

            <div class="footer-logo">
              Koller &amp; Tabor
            </div>

            <p>
              Installatietechniek · Loenen
            </p>

          </div>

          <nav
            class="footer-nav"
            aria-label="Footernavigatie"
          >

            ${links.map(([href, label]) => `

              <a href="${href}">
                ${label}
              </a>

            `).join("")}

          </nav>

        </div>

        <div class="footnote">

          © ${new Date().getFullYear()}
          Koller &amp; Tabor ·

          Onafhankelijk ontwerpconcept.
          Bedrijfsinformatie controleren
          vóór publicatie.

        </div>

      </div>

    </div>

  `;

  /* ========================================
     MOBIEL MENU
  ======================================== */

  const toggle = document.getElementById(
    "menu-toggle"
  );

  const menu = document.getElementById(
    "menu"
  );

  toggle.addEventListener("click", () => {

    const open = menu.classList.toggle(
      "open"
    );

    toggle.setAttribute(
      "aria-expanded",
      String(open)
    );

    toggle.setAttribute(
      "aria-label",
      open ? "Menu sluiten" : "Menu openen"
    );

    toggle.textContent = open ? "✕" : "☰";

  });

  /* ========================================
     SCROLLANIMATIES
  ======================================== */

  const items = document.querySelectorAll(
    ".reveal"
  );

  if (

    "IntersectionObserver" in window &&

    !matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

  ) {

    const observer = new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },

      {
        threshold: 0.06
      }

    );

    items.forEach(item => {

      observer.observe(item);

    });

  } else {

    items.forEach(item => {

      item.classList.add(
        "visible"
      );

    });

  }

  /* ========================================
     INFORMATIE INTERACTIEVE WONING
  ======================================== */

  const data = {

    verwarming: [

      "Verwarming",

      "Verwarming en warmteverdeling zorgen " +
      "voor comfort in het gebouw. " +
      "Deze tekening is schematisch en geen " +
      "technisch installatieplan."

    ],

    warmtepomp: [

      "Warmtepomp",

      "Een warmtepomp kan warmte uit de " +
      "omgeving gebruiken om een gebouw " +
      "te verwarmen. De toepasbaarheid " +
      "verschilt per gebouw."

    ],

    sanitair: [

      "Sanitair",

      "Waterleidingen en sanitaire voorzieningen " +
      "zijn essentieel voor het dagelijks gebruik " +
      "van woningen en gebouwen."

    ],

    onderhoud: [

      "Onderhoud & service",

      "Onderhoud is belangrijk voor een " +
      "betrouwbare werking van installaties " +
      "en het tijdig herkennen van problemen."

    ]

  };

  /* ========================================
     SYSTEEM SELECTEREN
  ======================================== */

  function select(name) {

    if (!data[name]) {
      return;
    }

    /* ====================================
       WONINGTEKENING AANPASSEN
    ==================================== */

    document.querySelectorAll(
      "[data-system]"
    ).forEach(node => {

      const active =
        node.dataset.system === name;

      node.classList.toggle(
        "active",
        active
      );

    });

    /* ====================================
       KNOPPEN AANPASSEN
    ==================================== */

    document.querySelectorAll(
      "[data-select]"
    ).forEach(button => {

      const active =
        button.dataset.select === name;

      button.classList.toggle(
        "active",
        active
      );

      button.setAttribute(
        "aria-pressed",
        String(active)
      );

    });

    /* ====================================
       UITLEG AANPASSEN
    ==================================== */

    const title = document.getElementById(
      "system-title"
    );

    const info = document.getElementById(
      "system-description"
    );

    if (title) {

      title.textContent = data[name][0];

    }

    if (info) {

      info.textContent = data[name][1];

    }

  }

  /* ========================================
     BEDIENINGSKNOPPEN
  ======================================== */

  document.querySelectorAll(
    "[data-select]"
  ).forEach(button => {

    button.addEventListener(
      "click",
      () => {

        select(
          button.dataset.select
        );

      }
    );

  });

  /* ========================================
     KLIKKEN OP DE WONING
  ======================================== */

  document.querySelectorAll(
    "[data-system]"
  ).forEach(node => {

    node.addEventListener(
      "click",
      () => {

        select(
          node.dataset.system
        );

      }
    );

    /* ====================================
       TOETSENBORDONDERSTEUNING
    ==================================== */

    node.addEventListener(
      "keydown",
      event => {

        if (

          event.key === "Enter" ||

          event.key === " "

        ) {

          event.preventDefault();

          select(
            node.dataset.system
          );

        }

      }
    );

  });

  /* ========================================
     STANDAARDSELECTIE
  ======================================== */

  if (

    document.querySelector(
      "[data-select]"
    )

  ) {

    select("verwarming");

  }

})();
