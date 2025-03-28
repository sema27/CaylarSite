document.addEventListener("DOMContentLoaded", function () {
    // **Hamburger Menü İşlevi**
    const hamburger = document.querySelector(".hamburger");
    const menu = document.querySelector(".menu");
    const menuLinks = document.querySelectorAll(".menu a");

    if (hamburger && menu) {
        hamburger.addEventListener("click", function () {
            menu.classList.toggle("active");
        });

        menuLinks.forEach(link => {
            link.addEventListener("click", function () {
                menu.classList.remove("active");
            });
        });

        document.addEventListener("click", function (event) {
            if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
                menu.classList.remove("active");
            }
        });
    }

    const newsContainer = document.querySelector(".news-container");
    const newsItems = document.querySelectorAll(".news-item");
    const prevPageBtn = document.getElementById("prevPage");
    const nextPageBtn = document.getElementById("nextPage");
    const pageButtons = document.querySelectorAll(".page-number");
    const desktopPrevBtn = document.getElementById("desktop-prev");
    const desktopNextBtn = document.getElementById("desktop-next");

    let currentIndex = 0;
    const itemsPerPage = window.innerWidth <= 768 ? 2 : 4; // Mobilde 2, masaüstünde 4
    const totalPages = Math.ceil(newsItems.length / itemsPerPage);

    function updateNewsVisibility() {
        newsItems.forEach((item, index) => {
            if (index >= currentIndex * itemsPerPage && index < (currentIndex + 1) * itemsPerPage) {
                item.style.display = "flex"; // Görünecek haberleri göster
            } else {
                item.style.display = "none"; // Diğerlerini gizle
            }
        });

        pageButtons.forEach((btn, index) => {
            btn.classList.toggle("active", index === currentIndex);
        });
    }

    function updateDesktopScroll(direction) {
        const scrollAmount = newsContainer.clientWidth / 4; // 4 haber kayacak şekilde ayarla
        newsContainer.scrollBy({ left: scrollAmount * direction, behavior: "smooth" });
    }

    nextPageBtn.addEventListener("click", function () {
        if (currentIndex < totalPages - 1) {
            currentIndex++;
            updateNewsVisibility();
        }
    });

    prevPageBtn.addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
            updateNewsVisibility();
        }
    });

    pageButtons.forEach(button => {
        button.addEventListener("click", function () {
            currentIndex = parseInt(this.getAttribute("data-index"));
            updateNewsVisibility();
        });
    });

    desktopNextBtn.addEventListener("click", function () {
        updateDesktopScroll(1);
    });

    desktopPrevBtn.addEventListener("click", function () {
        updateDesktopScroll(-1);
    });

    updateNewsVisibility(); // Başlangıç görünümünü ayarla

    // **Ekran boyutu değişince mobil/masaüstü uyumu sağla**
    window.addEventListener("resize", function () {
        if (window.innerWidth <= 768) {
            itemsPerPage = 2;
        } else {
            itemsPerPage = 4;
        }
        updateNewsVisibility();
    });
});
