// السنة في الفوتر
document.getElementById("year").textContent = new Date().getFullYear();

// رقم واتساب (بدون 0، مع +212)
const WHATSAPP_NUMBER = "212676377412";

// فلترة بالكاتيغوري
const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");
const searchInput = document.getElementById("searchInput");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // active style
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.getAttribute("data-category");
    filterProducts(category, searchInput.value.trim());
  });
});

// بحث بالاسم
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const activeBtn = document.querySelector(".filter-btn.active");
    const category = activeBtn ? activeBtn.getAttribute("data-category") : "all";
    filterProducts(category, searchInput.value.trim());
  });
}

function filterProducts(category, searchTerm) {
  const term = searchTerm.toLowerCase();

  productCards.forEach((card) => {
    const cardCategory = card.getAttribute("data-category");
    const name = (card.getAttribute("data-name") || "").toLowerCase();
    const matchesCategory = category === "all" || category === cardCategory;
    const matchesSearch = !term || name.includes(term);

    if (matchesCategory && matchesSearch) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}

// زر واتساب لكل منتج
const whatsappButtons = document.querySelectorAll(".btn-whatsapp");

whatsappButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".product-card");
    if (!card) return;

    const productName = card.getAttribute("data-name") || "منتج";
    const price = card.getAttribute("data-price") || "";
    const message = `سلام، بغيت نستفسر/نطلب هذا المنتج:\n\n` +
      `المنتج: ${productName}\n` +
      (price ? `الثمن: ${price} درهم\n` : "") +
      `\nواش متوفر فالمخزون؟ وشنو الألوان والمقاسات المتوفرة؟`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  });
});
