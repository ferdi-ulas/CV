// Helper function to select elements
const select = (el, all = false) => {
  el = el.trim();
  return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
};

// Event listener function
const on = (type, el, listener, all = false) => {
  const selectEl = select(el, all);
  if (selectEl) {
    if (all) {
      selectEl.forEach((e) => e.addEventListener(type, listener));
    } else {
      selectEl.addEventListener(type, listener);
    }
  }
};

// Event listener for scroll
const onscroll = (el, listener) => {
  el.addEventListener("scroll", listener);
};

// Navbar links active state on scroll
const navbarlinksActive = () => {
  const position = window.scrollY + 200;
  const navbarlinks = select("#navbar .scrollto", true);
  navbarlinks.forEach((navbarlink) => {
    if (!navbarlink.hash) return;
    const section = select(navbarlink.hash);
    if (!section) return;
    const sectionOffsetTop = section.offsetTop;
    const sectionOffsetHeight = section.offsetHeight;
    if (
      position >= sectionOffsetTop &&
      position <= sectionOffsetTop + sectionOffsetHeight
    ) {
      navbarlink.classList.add("active");
    } else {
      navbarlink.classList.remove("active");
    }
  });
};
window.addEventListener("load", navbarlinksActive);
onscroll(document, navbarlinksActive);

// Scroll to an element with header offset
const scrollto = (el) => {
  const elementPos = select(el).offsetTop;
  window.scrollTo({
    top: elementPos,
    behavior: "smooth",
  });
};

// Back to top button
const backtotop = select(".back-to-top");
if (backtotop) {
  const toggleBacktotop = () => {
    backtotop.classList.toggle("active", window.scrollY > 100);
  };
  window.addEventListener("load", toggleBacktotop);
  onscroll(document, toggleBacktotop);
}

// Mobile nav toggle
on("click", ".mobile-nav-toggle", function (e) {
  select("body").classList.toggle("mobile-nav-active");
  this.classList.toggle("bi-list");
  this.classList.toggle("bi-x");
});

// Scroll with offset on links with class "scrollto"
on(
  "click",
  ".scrollto",
  function (e) {
    if (select(this.hash)) {
      e.preventDefault();
      const body = select("body");
      if (body.classList.contains("mobile-nav-active")) {
        body.classList.remove("mobile-nav-active");
        select(".mobile-nav-toggle").classList.toggle("bi-list");
        select(".mobile-nav-toggle").classList.toggle("bi-x");
      }
      scrollto(this.hash);
    }
  },
  true
);

// Scroll with offset on page load with hash links in the URL
window.addEventListener("load", () => {
  if (window.location.hash && select(window.location.hash)) {
    scrollto(window.location.hash);
  }
});

// Preloader
const preloader = select("#preloader");
if (preloader) {
  window.addEventListener("load", () => {
    preloader.remove();
  });
}

// Hero type effect
const typed = select(".typed");
if (typed) {
  const typedStrings = [
    "React js Developer",
    "UI/UX Developer",
    "Front End Developer",
  ];
  new Typed(".typed", {
    strings: typedStrings,
    loop: true,
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 2000,
  });
}

// Skills animation
const skilsContent = select(".skills-content");
if (skilsContent) {
  new Waypoint({
    element: skilsContent,
    offset: "80%",
    handler: function (direction) {
      select(".progress .progress-bar", true).forEach((el) => {
        el.style.width = el.getAttribute("aria-valuenow") + "%";
      });
    },
  });
}

// Portfolio isotope and filter
window.addEventListener("load", () => {
  const portfolioContainer = select(".portfolio-container");
  if (portfolioContainer) {
    const portfolioIsotope = new Isotope(portfolioContainer, {
      itemSelector: ".portfolio-item",
    });
    const portfolioFilters = select("#portfolio-flters li", true);

    on(
      "click",
      "#portfolio-flters li",
      function (e) {
        e.preventDefault();
        portfolioFilters.forEach((el) => {
          el.classList.remove("filter-active");
        });
        this.classList.add("filter-active");
        portfolioIsotope.arrange({
          filter: this.getAttribute("data-filter"),
        });
        portfolioIsotope.on("arrangeComplete", () => {
          AOS.refresh();
        });
      },
      true
    );
  }
});

// Initiate portfolio lightbox
GLightbox({
  selector: ".portfolio-lightbox",
});

// Initiate portfolio details lightbox
GLightbox({
  selector: ".portfolio-details-lightbox",
  width: "90%",
  height: "90vh",
});

// certification details slider
new Swiper(".portfolio-details-slider", {
  speed: 400,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },
});

// Animation on scroll
window.addEventListener("load", () => {
  AOS.init({
    duration: 500,
    easing: "ease-in-out",
    once: true,
    mirror: true,
  });
});
