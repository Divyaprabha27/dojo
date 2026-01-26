const toggleBtn = document.getElementById("themeToggle");

// Load saved theme (start light by default)
// if (localStorage.getItem("theme") === "dark") {
//   document.body.classList.add("dark-mode");
//   if (toggleBtn) {
//     toggleBtn.innerHTML = "☀️";
//   }
// }

// Toggle theme
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      toggleBtn.innerHTML = "☀️";
    } else {
      localStorage.setItem("theme", "light");
      toggleBtn.innerHTML = "🌙";
    }
  });
}

const scrollBtn = document.getElementById("scrollTopBtn");

if (scrollBtn) {
  // Show button on scroll
  window.onscroll = function () {
    if (document.documentElement.scrollTop > 300) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }
  };

  // Scroll to top on click
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}