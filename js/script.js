const toggleBtn = document.getElementById("themeToggle");
const toggleBtnDesktop = document.getElementById("themeToggleDesktop");

// Function to handle theme toggle
function handleThemeToggle() {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    if (toggleBtn) toggleBtn.innerHTML = "☀️";
    if (toggleBtnDesktop) toggleBtnDesktop.innerHTML = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    if (toggleBtn) toggleBtn.innerHTML = "🌙";
    if (toggleBtnDesktop) toggleBtnDesktop.innerHTML = "🌙";
  }
}

// Load saved theme (start light by default)
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  if (toggleBtn) toggleBtn.innerHTML = "☀️";
  if (toggleBtnDesktop) toggleBtnDesktop.innerHTML = "☀️";
}

// Toggle theme for both buttons
if (toggleBtn) {
  toggleBtn.addEventListener("click", handleThemeToggle);
}

if (toggleBtnDesktop) {
  toggleBtnDesktop.addEventListener("click", handleThemeToggle);
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

// Logout functionality
const logoutBtn = document.querySelector('a[href="login.html"]');
if (logoutBtn) {
  logoutBtn.addEventListener('click', function(e) {
    e.preventDefault();
    // Clear any session data if needed
    localStorage.removeItem('user'); // Remove user data if stored
    sessionStorage.clear(); // Clear session storage
    // Redirect to home page
    window.location.href = 'index.html';
  });
}

// Dashboard content switching
document.addEventListener('DOMContentLoaded', function() {
  // Handle sidebar navigation
  const sidebarLinks = document.querySelectorAll('.sidebar a[data-content]');
  const contentSections = document.querySelectorAll('.content-section');
  
  sidebarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetContent = this.getAttribute('data-content');
      
      // Handle logout
      if (targetContent === 'logout') {
        if (confirm('Are you sure you want to logout?')) {
          localStorage.removeItem('user');
          sessionStorage.clear();
          window.location.href = 'index.html';
        }
        return;
      }
      
      // Remove active class from all links and sections
      sidebarLinks.forEach(l => l.classList.remove('active'));
      contentSections.forEach(section => section.classList.remove('active'));
      
      // Add active class to clicked link and corresponding section
      this.classList.add('active');
      const targetSection = document.getElementById(targetContent + '-content');
      if (targetSection) {
        targetSection.classList.add('active');
      }
    });
  });
});