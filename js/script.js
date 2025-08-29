// Tahun footer (beranda & profil)
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* =========================
   Greeting "Hai Nama"
   ========================= */
(function greeting() {
  const namaEls = document.querySelectorAll('[data-bind="nama"]');
  if (!namaEls.length) return;

  const render = (v) =>
    namaEls.forEach((el) => (el.textContent = v || "Teman"));

  let nama = localStorage.getItem("namaPengguna");
  if (!nama) {
    nama = "Teman";
    localStorage.setItem("namaPengguna", nama);
  }
  render(nama);

  const btn = document.getElementById("btnUbahNama");
  if (btn) {
    btn.addEventListener("click", () => {
      const baru = prompt(
        "Masukkan/ubah nama Anda:",
        localStorage.getItem("namaPengguna") || ""
      );
      if (baru) {
        localStorage.setItem("namaPengguna", baru);
        render(baru);
      }
    });
  }
})();

/* =========================
   Validasi Form + Popup
   ========================= */
(function formHandler() {
  const form = document.getElementById("formKontak");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    // ambil data
    const nama = document.getElementById("namaInput").value.trim();
    const email = document.getElementById("emailInput").value.trim();
    const tel = document.getElementById("telInput").value.trim();
    const pesan = document.getElementById("pesanInput").value.trim();

    // tampilkan di ringkasan
    const kosong = document.getElementById("previewKosong");
    const data = document.getElementById("previewData");
    if (kosong && data) {
      kosong.classList.add("d-none");
      data.classList.remove("d-none");
      document.getElementById("pNama").textContent = nama;
      document.getElementById("pEmail").textContent = email;
      document.getElementById("pTelepon").textContent = tel;
      document.getElementById("pPesan").textContent = pesan;
    }

    // reset form
    form.reset();
    form.classList.remove("was-validated");

    // === POPUP: Bootstrap Toast (dibuat full via JS) ===
    const wrapper = document.createElement("div");
    wrapper.className = "position-fixed bottom-0 end-0 p-3";
    wrapper.style.zIndex = "1080";
    wrapper.innerHTML = `
      <div class="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            ✅ Pesan telah terkirim! Cek ringkasan di sebelah.
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>`;
    document.body.appendChild(wrapper);

    const toastEl = wrapper.querySelector(".toast");
    const toast = new bootstrap.Toast(toastEl, { delay: 2500 });
    toast.show();
    // Hapus dari DOM setelah menghilang
    toastEl.addEventListener("hidden.bs.toast", () => wrapper.remove());
  });
})();
