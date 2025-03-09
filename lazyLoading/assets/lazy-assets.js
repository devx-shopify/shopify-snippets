function loadScript(url) {
  const script = document.createElement("script");
  script.src = url;
  script.defer = true;
  document.head.appendChild(script);
}

function loadStylesheet(url) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  document.head.appendChild(link);
}

function loadAssets() {
  if (assetsLoaded) return;
  assetsLoaded = true;

  loadScript("{{ 'collapsible-content.js' | asset_url }}");

  loadStylesheet("{{ 'section-collapsible-content.css' | asset_url }}");
}

let assetsLoaded = false;
document.addEventListener("click", loadAssets, { once: true });
document.addEventListener("scroll", loadAssets, { once: true });
document.addEventListener("mousemove", loadAssets, { once: true });
