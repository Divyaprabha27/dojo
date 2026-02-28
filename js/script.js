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

// Dashboard Sidebar Logic - Consolidated
document.addEventListener('DOMContentLoaded', function () {
  const dashboardSidebar = document.getElementById('dashboardSidebar');
  const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
  const closeSidebarUserBtn = document.getElementById('closeSidebar'); // User added button
  const sidebarBackdrop = document.getElementById('sidebarBackdrop');
  const sidebarLinks = document.querySelectorAll('.sidebar-mobile a');
  const navbarToggler = document.querySelector('.navbar-toggler');

  if (dashboardSidebar) {
    // 1. Initialize Bootstrap Collapse
    const bsCollapse = bootstrap.Collapse.getOrCreateInstance(dashboardSidebar, { toggle: false });

    // 2. Handle Toggler Click (Manual Override if needed, but Bootstrap usually handles this via data-bs-toggle)
    // We added this to ensure thePARENT sidebar gets the class
    dashboardSidebar.addEventListener('show.bs.collapse', () => {
      dashboardSidebar.closest('.sidebar').classList.add('show');
      if (sidebarBackdrop) sidebarBackdrop.classList.add('show');
      document.body.style.overflow = 'hidden';
    });

    dashboardSidebar.addEventListener('hide.bs.collapse', () => {
      dashboardSidebar.closest('.sidebar').classList.remove('show');
      if (sidebarBackdrop) sidebarBackdrop.classList.remove('show');
      document.body.style.overflow = '';
    });

    // 3. Close Buttons
    const closeMenu = () => {
      bsCollapse.hide();
    };

    if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', closeMenu);
    if (closeSidebarUserBtn) closeSidebarUserBtn.addEventListener('click', closeMenu);
    if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeMenu);

    // 4. Auto-close on link click (Mobile)
    sidebarLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 1025) {
          bsCollapse.hide();
        }
      });
    });

    // 5. Handle Resize
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1025) {
        dashboardSidebar.closest('.sidebar').classList.remove('show');
        if (sidebarBackdrop) sidebarBackdrop.classList.remove('show');
        document.body.style.overflow = '';
        bsCollapse.hide();
      }
    });
  }
});

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

// Mobile Menu Transitions Fix
const navbarCollapse = document.getElementById('navbarNav');
if (navbarCollapse) {
  navbarCollapse.addEventListener('show.bs.collapse', function () {
    document.body.classList.add('mobile-menu-open');
  });

  navbarCollapse.addEventListener('hide.bs.collapse', function () {
    document.body.classList.remove('mobile-menu-open');
    document.body.classList.add('mobile-menu-closing');
  });

  navbarCollapse.addEventListener('hidden.bs.collapse', function () {
    document.body.classList.remove('mobile-menu-closing');
  });
}

// Logout functionality
const logoutBtn = document.querySelector('a[href="login.html"].logout-btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', function (e) {
    e.preventDefault();
    // Clear any session data if needed
    localStorage.removeItem('user'); // Remove user data if stored
    sessionStorage.clear(); // Clear session storage
    // Redirect to home page
    window.location.href = 'index.html';
  });
}

// Dashboard content switching
document.addEventListener('DOMContentLoaded', function () {
  // Handle sidebar navigation
  const sidebarLinks = document.querySelectorAll('.sidebar a[data-content]');
  const contentSections = document.querySelectorAll('.content-section');

  sidebarLinks.forEach(link => {
    link.addEventListener('click', function (e) {
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