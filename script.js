/* ==========================================
   KOLLER & TABOR V3
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

    ["waarom-koller-tabor.html", "Waarom Koller & Tabor"],

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

  const header = document.getElementById("site-header");

  if (header) {

    header.innerHTML = `

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

  }


  /* ========================================
     FOOTER AUTOMATISCH TOEVOEGEN
  ======================================== */

  const footer = document.getElementById("site-footer");

  if (footer) {

    footer.innerHTML = `

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

  }


  /* ========================================
     MOBIEL MENU
  ======================================== */

  const toggle = document.getElementById(
    "menu-toggle"
  );

  const menu = document.getElementById(
    "menu"
  );


  if (toggle && menu) {

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


    /* MENU SLUITEN NA KLIKKEN */

    menu.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        menu.classList.remove("open");

        toggle.setAttribute(
          "aria-expanded",
          "false"
        );

        toggle.setAttribute(
          "aria-label",
          "Menu openen"
        );

        toggle.textContent = "☰";

      });

    });


    /* MENU SLUITEN MET ESCAPE */

    document.addEventListener("keydown", event => {

      if (event.key === "Escape") {

        menu.classList.remove("open");

        toggle.setAttribute(
          "aria-expanded",
          "false"
        );

        toggle.setAttribute(
          "aria-label",
          "Menu openen"
        );

        toggle.textContent = "☰";

      }

    });

  }


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

      item.classList.add("visible");

    });

  }


})();
