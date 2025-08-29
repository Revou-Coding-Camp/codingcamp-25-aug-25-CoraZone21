// ====== MOBILE NAV ======
const hamb = document.getElementById("hamb");
const links = document.getElementById("navLinks");
hamb.addEventListener("click", () => links.classList.toggle("open"));
links
  .querySelectorAll("a")
  .forEach((a) =>
    a.addEventListener("click", () => links.classList.remove("open"))
  );

// ====== ACTIVE LINK ON SCROLL ======
const sections = [...document.querySelectorAll("section, header.hero")];
const navA = [...document.querySelectorAll(".links a")];

function setActive() {
  const fromTop = window.scrollY + 80;
  navA.forEach((a) => a.classList.remove("active"));
  for (const sec of sections) {
    const id = sec.getAttribute("id") || "home";
    if (
      sec.offsetTop <= fromTop &&
      sec.offsetTop + sec.offsetHeight > fromTop
    ) {
      const found = navA.find((x) => x.getAttribute("href") === `#${id}`);
      if (found) found.classList.add("active");
      break;
    }
  }
}
window.addEventListener("scroll", setActive);
setActive();

// ====== SCROLL REVEAL ======
const io = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => e.target.classList.toggle("show", e.isIntersecting)),
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// ====== BACK TO TOP ======
const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => {
  toTop.classList.toggle("show", window.scrollY > 500);
});
toTop.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);

// ====== THEME TOGGLER (dark <-> darker) ======
const toggle = document.getElementById("toggleTheme");
let alt = false;
toggle.addEventListener("click", () => {
  document.documentElement.style.setProperty(
    "--bg",
    alt ? "#0b1020" : "#0a0f1d"
  );
  document.documentElement.style.setProperty(
    "--surface",
    alt ? "#121832" : "#0f1730"
  );
  alt = !alt;
});

// ====== FORM VALIDATION ======
const f = document.getElementById("formKontak");
const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

f.addEventListener("submit", (e) => {
  e.preventDefault();
  const nama = f.nama.value.trim();
  const email = f.email.value.trim();
  const pesan = f.pesan.value.trim();

  let ok = true;
  const setErr = (id, msg) => {
    const el = document.getElementById(id);
    el.textContent = msg;
  };
  setErr("err-nama", "");
  setErr("err-email", "");
  setErr("err-pesan", "");

  if (nama.length < 3) {
    setErr("err-nama", "Nama minimal 3 karakter");
    ok = false;
  }
  if (!validEmail(email)) {
    setErr("err-email", "Format email tidak valid");
    ok = false;
  }
  if (pesan.length < 10) {
    setErr("err-pesan", "Pesan minimal 10 karakter");
    ok = false;
  }

  if (ok) {
    alert("Terima kasih! Pesan Anda sudah terkirim.");
    f.reset();
  }
});

// Footer year
document.getElementById("y").textContent = new Date().getFullYear();
