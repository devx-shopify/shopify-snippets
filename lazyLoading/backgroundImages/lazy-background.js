(() => {
  const lazyBackgrounds = document.querySelectorAll(".lazy-bg-container");

  if (lazyBackgrounds.length === 0) return;

  function loadBackgroundImage(element) {
    if (!element?.dataset.src) {
      return;
    }
    const img = new Image();
    img.onload = () => {
      element.style.backgroundImage = `url('${element.dataset.src}')`;
      element.classList.add("lazy-bg-loaded");
    };
    img.onerror = () => {
      // Handle loading errors
      console.warn("Failed to load background image:", element.dataset.src);
      element.classList.add("lazy-bg-error");
    };
    img.src = element.dataset.src;
  }

  if ("IntersectionObserver" in window) {
    const lazyBackgroundObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }
          const lazyBackground = entry.target;
          loadBackgroundImage(lazyBackground);
          observer.unobserve(lazyBackground);
        });
      },
      {
        rootMargin: "200px 0px",
        threshold: 0.01,
      }
    );

    lazyBackgrounds.forEach(function (lazyBackground) {
      lazyBackgroundObserver.observe(lazyBackground);
    });
  } else {
    lazyBackgrounds.forEach(loadBackgroundImage);
  }

  setTimeout(() => {
    lazyBackgrounds.forEach((lazyBackground) => {
      if (!lazyBackground.classList.contains("lazy-bg-loaded")) {
        loadBackgroundImage(lazyBackground);
      }
    });
  }, 5000);

  document.addEventListener("DOMContentLoaded", () => {
    lazyBackgrounds.forEach((lazyBackground) => {
      if (
        !lazyBackground.classList.contains("lazy-bg-loaded") &&
        isElementInViewport(lazyBackground)
      ) {
        loadBackgroundImage(lazyBackground);
      }
    });
  });

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) + 200 &&
      rect.left <=
        (window.innerWidth || document.documentElement.clientWidth) &&
      rect.bottom >= -200 &&
      rect.right >= 0
    );
  }

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      lazyBackgrounds.forEach((lazyBackground) => {
        if (
          !lazyBackground.classList.contains("lazy-bg-loaded") &&
          isElementInViewport(lazyBackground)
        ) {
          loadBackgroundImage(lazyBackground);
        }
      });
    }
  });
})();
