const C = window.LIBRARY_CONTENT;

function $(s, root=document){ return root.querySelector(s); }
function $$(s, root=document){ return [...root.querySelectorAll(s)]; }

function hydrateShop() {
  $$("[data-shop-name]").forEach(el => el.textContent = C.shop.name);
  $$("[data-address]").forEach(el => el.textContent = C.shop.address);
  $$("[data-phone]").forEach(el => el.textContent = C.shop.phoneDisplay);
  $$("[data-email]").forEach(el => el.textContent = C.shop.email);
  $$("[data-phone-link]").forEach(el => {
    if (C.shop.phoneLink) el.href = `tel:${C.shop.phoneLink}`;
    else el.style.display = "none";
  });
  $$("[data-email-link]").forEach(el => {
    if (C.shop.email) el.href = `mailto:${C.shop.email}`;
    else el.style.display = "none";
  });
  $$("[data-instagram]").forEach(el => { if (C.shop.instagram && C.shop.instagram !== "#") el.href = C.shop.instagram; });
  $$("[data-facebook]").forEach(el => { if (C.shop.facebook && C.shop.facebook !== "#") el.href = C.shop.facebook; });
  $("#mapLink").href = C.shop.mapUrl;
  const directionsBtn = $("#directionsBtn");
  if (directionsBtn) directionsBtn.href = C.shop.mapUrl;
  document.title = `${C.shop.name} — Librairie indépendante`;
}

function renderHours() {
  const day = new Date().getDay(); // 0 dimanche
  const mondayIndex = day === 0 ? 6 : day - 1;
  $("#hoursList").innerHTML = C.hours.map((h,i) =>
    `<div class="hour-row ${i===mondayIndex ? "today":""}"><span>${h[0]}</span><strong>${h[1]}</strong></div>`
  ).join("");
}

function renderCategories() {
  $("#categories").innerHTML = C.categories.map(c => `
    <article class="category" style="background:${c.color}" data-category="${c.name}">
      <span class="category__icon">${c.icon}</span>
      <div><h3>${c.name}</h3><p>${c.desc}</p></div>
      <span class="category__arrow">↗</span>
    </article>
  `).join("");
  $$(".category").forEach(el => el.addEventListener("click", () => {
    openSearch(el.dataset.category);
  }));
}


function renderSpaces() {
  const grid = $("#spacesGrid");
  if (!grid || !C.spaces) return;
  grid.innerHTML = C.spaces.map(s => `
    <article class="space-card" style="background:${s.color}">
      <div class="space-card__top">
        <span class="space-pill">${s.label}</span>
        <div class="space-card__icon">${s.icon}</div>
        <h3>${s.name}</h3>
        <p>${s.description}</p>
      </div>
      <div class="space-card__bottom">
        <ul>
          ${s.features.map(f => `<li>${f}</li>`).join("")}
        </ul>
      </div>
    </article>
  `).join("");
}


function renderHoursModal() {
  const grid = $("#hoursModalGrid");
  if (!grid || !C.hours) return;
  const day = new Date().getDay(); // 0 = dimanche
  const mondayIndex = day === 0 ? 6 : day - 1;
  grid.innerHTML = C.hours.map((h, i) => `
    <div class="hours-modal__row ${i === mondayIndex ? "is-today" : ""}">
      <strong>${h[0]}</strong>
      <span>${h[1]}</span>
    </div>
  `).join("");
}

function openHoursModal() {
  const modal = $("#hoursModal");
  if (!modal) return;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
}

function closeHoursModal() {
  const modal = $("#hoursModal");
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

function renderBooks() {
  $("#booksRow").innerHTML = C.books.map((b,i) => `
    <article class="book-card" data-book="${i}">
      <div class="book-card__visual">
        <span class="badge">${b.badge}</span>
        <div class="mini-cover" style="background:${b.color}">
          <span>${b.category}</span><strong>${b.title}</strong><small>${b.author}</small>
        </div>
      </div>
      <div class="book-card__meta">
        <small>${b.category}</small>
        <h3>${b.title}</h3>
        <div><span>${b.author}</span><strong>${b.price}</strong></div>
      </div>
    </article>
  `).join("");
  $$(".book-card").forEach(el => el.addEventListener("click", () => openBook(+el.dataset.book)));
}

function openBook(i) {
  const b = C.books[i];
  $("#modalContent").innerHTML = `
    <div class="modal-book">
      <div class="modal-cover" style="background:${b.color}">
        <span>${b.category}</span><strong>${b.title}</strong><small>${b.author}</small>
      </div>
      <div class="modal-copy">
        <span class="tag">${b.badge}</span>
        <h3>${b.title}</h3>
        <small>par ${b.author}</small>
        <p>${b.description}</p>
        <div class="modal-price">
          <strong>${b.price}</strong>
          <a class="btn btn--primary btn--small" href="#contact" data-modal-close>Voir en librairie →</a>
        </div>
      </div>
    </div>`;
  $("#bookModal").classList.add("open");
  $("#bookModal").setAttribute("aria-hidden","false");
  document.body.classList.add("no-scroll");
}

function closeBook() {
  $("#bookModal").classList.remove("open");
  $("#bookModal").setAttribute("aria-hidden","true");
  document.body.classList.remove("no-scroll");
}

function renderSearch(query="") {
  const q = query.trim().toLowerCase();
  const matches = C.books.map((b,i)=>({b,i})).filter(({b}) =>
    !q || `${b.title} ${b.author} ${b.category}`.toLowerCase().includes(q)
  );
  $("#searchResults").innerHTML = matches.length ? matches.map(({b,i}) => `
    <div class="search-result" data-search-book="${i}">
      <div class="search-result__left">
        <span class="result-cover" style="background:${b.color}"></span>
        <div><strong>${b.title}</strong><small>${b.author} · ${b.category}</small></div>
      </div>
      <strong>${b.price}</strong>
    </div>
  `).join("") : `<div class="empty-state">Aucun livre trouvé. Essayez un autre mot.</div>`;
  $$("[data-search-book]").forEach(el => el.addEventListener("click",()=>{
    closeSearch();
    setTimeout(()=>openBook(+el.dataset.searchBook),120);
  }));
}

function openSearch(seed="") {
  $("#searchOverlay").classList.add("open");
  $("#searchOverlay").setAttribute("aria-hidden","false");
  document.body.classList.add("no-scroll");
  $("#searchInput").value = seed;
  renderSearch(seed);
  setTimeout(()=>$("#searchInput").focus(),100);
}
function closeSearch() {
  $("#searchOverlay").classList.remove("open");
  $("#searchOverlay").setAttribute("aria-hidden","true");
  document.body.classList.remove("no-scroll");
}

function toast(msg) {
  const el=$("#toast"); el.textContent=msg; el.classList.add("show");
  clearTimeout(window.__toast); window.__toast=setTimeout(()=>el.classList.remove("show"),2700);
}

$("#year").textContent = new Date().getFullYear();
hydrateShop(); renderHours(); renderHoursModal(); renderCategories(); renderSpaces(); renderBooks(); renderSearch();

$("#booksNext").addEventListener("click",()=>$("#booksRow").scrollBy({left:560,behavior:"smooth"}));
$("#booksPrev").addEventListener("click",()=>$("#booksRow").scrollBy({left:-560,behavior:"smooth"}));
$("#searchOpen").addEventListener("click",()=>openSearch());
$("#searchClose").addEventListener("click",closeSearch);
$("#searchOverlay").addEventListener("click",e=>{ if(e.target===$("#searchOverlay")) closeSearch(); });
$("#searchInput").addEventListener("input",e=>renderSearch(e.target.value));
$$("[data-modal-close]").forEach(el=>el.addEventListener("click",closeBook));
document.addEventListener("keydown",e=>{ if(e.key==="Escape"){ closeSearch(); closeBook(); closeHoursModal(); closeLegalModal(); announcementItems.forEach(i => { i.classList.remove("is-open"); i.setAttribute("aria-expanded","false"); }); }});

$("#menuBtn").addEventListener("click",()=>$("#mobileNav").classList.toggle("open"));
$$(".mobile-nav a").forEach(a=>a.addEventListener("click",()=>$("#mobileNav").classList.remove("open")));

$("#newsletterForm").addEventListener("submit",e=>{
  e.preventDefault(); e.target.reset(); toast("Merci ! L’inscription est prête côté interface. Le service d’envoi doit encore être connecté.");
});

const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting){e.target.classList.add("visible"); observer.unobserve(e.target);} });
},{threshold:.12});
$$(".reveal").forEach(el=>observer.observe(el));


const heroHoursCard = $("#heroHoursCard");
if (heroHoursCard) heroHoursCard.addEventListener("click", openHoursModal);
$$("[data-hours-close]").forEach(el => el.addEventListener("click", closeHoursModal));
const hoursModal = $("#hoursModal");
if (hoursModal) {
  hoursModal.addEventListener("click", e => {
    if (e.target === hoursModal) closeHoursModal();
  });
}



function openLegalModal(tab = "mentions") {
  const modal = $("#legalModal");
  if (!modal) return;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  setLegalTab(tab);
}

function closeLegalModal() {
  const modal = $("#legalModal");
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

function setLegalTab(tab) {
  $$(".legal-tab").forEach(btn => {
    btn.classList.toggle("is-active", btn.dataset.legalTab === tab);
  });
  $$(".legal-panel").forEach(panel => {
    panel.classList.toggle("is-active", panel.dataset.legalPanel === tab);
  });
  const scroller = $(".legal-content");
  if (scroller) scroller.scrollTop = 0;
}

$$("[data-legal-open]").forEach(el => {
  el.addEventListener("click", () => openLegalModal(el.dataset.legalOpen || "mentions"));
});

$$("[data-legal-close]").forEach(el => {
  el.addEventListener("click", closeLegalModal);
});

$$(".legal-tab").forEach(el => {
  el.addEventListener("click", () => setLegalTab(el.dataset.legalTab));
});

const legalModal = $("#legalModal");
if (legalModal) {
  legalModal.addEventListener("click", e => {
    if (e.target === legalModal) closeLegalModal();
  });
}



const announcementItems = $$(".announcement-item");
announcementItems.forEach(item => {
  item.addEventListener("click", e => {
    const alreadyOpen = item.classList.contains("is-open");
    announcementItems.forEach(i => {
      i.classList.remove("is-open");
      i.setAttribute("aria-expanded", "false");
    });
    if (!alreadyOpen) {
      item.classList.add("is-open");
      item.setAttribute("aria-expanded", "true");
    }
    e.stopPropagation();
  });
});

document.addEventListener("click", e => {
  if (!e.target.closest(".announcement-item")) {
    announcementItems.forEach(i => {
      i.classList.remove("is-open");
      i.setAttribute("aria-expanded", "false");
    });
  }
});



function attachPremiumParallax(wrapperSelector, targetSelector, strength = 10) {
  const wrapper = $(wrapperSelector);
  const target = targetSelector ? wrapper?.querySelector(targetSelector) : wrapper;
  if (!wrapper || !target || !window.matchMedia("(pointer:fine)").matches) return;

  let raf = null;

  wrapper.addEventListener("mousemove", (e) => {
    const rect = wrapper.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      target.style.transform = `rotateY(${x * strength * 0.45}deg) rotateX(${y * -strength * 0.35}deg) translate3d(${x * 6}px, ${y * 6}px, 0)`;
    });
  });

  wrapper.addEventListener("mouseleave", () => {
    cancelAnimationFrame(raf);
    target.style.transform = "";
  });
}

attachPremiumParallax(".hero__visual", ".book-stage", 10);
attachPremiumParallax(".story-visual", ".story-frame", 5);



(function initPremiumMotion(){
  const finePointer = window.matchMedia("(pointer:fine)").matches;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!finePointer || reduced) return;

  const hoverables = $$(".book-card, .category, .space-card, .info-card");
  hoverables.forEach((el, index) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      const sign = index % 2 === 0 ? 1 : -1;
      el.style.transform = `translateY(-8px) rotateX(${py * -2.4}deg) rotateY(${px * 3.2 * sign}deg)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });
})();

