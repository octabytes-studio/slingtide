// Slingtide launch site — small, dependency-free enhancements.
// Content is fully readable with JavaScript disabled; this only adds polish.

(function () {
  "use strict";

  var reduceMotion = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : { matches: false };

  // Scroll reveals: only hide content when JS is running (html.js).
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window) || reduceMotion.matches) {
      items.forEach(function (item) {
        item.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  // Counters: the HTML already contains the final number, so no-JS is correct.
  function initCounters() {
    var counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;

    if (reduceMotion.matches) {
      counters.forEach(function (el) {
        el.textContent = el.getAttribute("data-count");
      });
      return;
    }

    var animate = function (el) {
      var target = parseInt(el.getAttribute("data-count"), 10);
      if (!isFinite(target)) return;
      var duration = 950;
      var start = null;

      function frame(now) {
        if (start === null) start = now;
        var progress = Math.min((now - start) / duration, 1);
        // easeOutCubic
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = String(Math.round(target * eased));
        if (progress < 1) {
          window.requestAnimationFrame(frame);
        } else {
          el.textContent = String(target);
        }
      }

      window.requestAnimationFrame(frame);
    };

    if (!("IntersectionObserver" in window)) {
      counters.forEach(function (el) {
        el.textContent = el.getAttribute("data-count");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          animate(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.4 }
    );

    counters.forEach(function (el) {
      observer.observe(el);
    });
  }

  // A gentle pointer tilt on screenshots; fine pointers only, never reduced motion.
  function initTilt() {
    if (reduceMotion.matches) return;
    if (!window.matchMedia || !window.matchMedia("(pointer: fine)").matches) return;

    document.querySelectorAll(".shot").forEach(function (shot) {
      var frame = shot.querySelector(".shot-frame");
      if (!frame) return;

      shot.addEventListener("pointermove", function (event) {
        var rect = shot.getBoundingClientRect();
        var x = (event.clientX - rect.left) / rect.width - 0.5;
        var y = (event.clientY - rect.top) / rect.height - 0.5;
        frame.style.setProperty("--ry", (x * 7).toFixed(2) + "deg");
        frame.style.setProperty("--rx", (-y * 5).toFixed(2) + "deg");
      });

      shot.addEventListener("pointerleave", function () {
        frame.style.setProperty("--ry", "0deg");
        frame.style.setProperty("--rx", "0deg");
      });
    });
  }

  // Native <details> mobile menu: close after a link, on Escape, or outside.
  function initMobileMenu() {
    var menu = document.querySelector(".mobile-menu");
    if (!menu) return;

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.removeAttribute("open");
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menu.hasAttribute("open")) {
        menu.removeAttribute("open");
        var summary = menu.querySelector("summary");
        if (summary) summary.focus();
      }
    });

    document.addEventListener("pointerdown", function (event) {
      if (!menu.hasAttribute("open")) return;
      if (menu.contains(event.target)) return;
      menu.removeAttribute("open");
    });
  }

  // Keep FAQ disclosures from trapping keyboard focus under the sticky header.
  function initFaq() {
    document.querySelectorAll(".faq details").forEach(function (details) {
      details.addEventListener("toggle", function () {
        if (!details.open) return;
        var summary = details.querySelector("summary");
        if (!summary) return;
        var top = summary.getBoundingClientRect().top;
        var header = document.querySelector(".site-header");
        var offset = header ? header.offsetHeight + 12 : 12;
        if (top < offset) {
          window.scrollBy({ top: top - offset, behavior: reduceMotion.matches ? "auto" : "smooth" });
        }
      });
    });
  }

  function init() {
    initReveal();
    initCounters();
    initTilt();
    initMobileMenu();
    initFaq();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
