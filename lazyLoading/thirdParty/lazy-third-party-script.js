document.addEventListener("DOMContentLoaded", () => {
  const thirdPartyScripts = [
    {
      id: "gorgias-chat-bundle",
      src: "https://config.gorgias.chat/gorgias-chat-bundle.js?rev=76e8001a&appKey=01JH2XWYD5NCMFWDQ24V9EBVFV",
      attributes: { "data-ot-ignore": "" },
      async: false,
    },
    {
      id: "klaviyo-script",
      src: "https://static.klaviyo.com/onsite/js/VEPku4/klaviyo.js?company_id=VEPku4",
      attributes: {},
      async: true,
    },
  ];
  function loadThirdPartyScripts() {
    ["scroll", "click", "mouseover"].forEach((eventType) => {
      document.removeEventListener(eventType, loadThirdPartyScripts);
    });
    thirdPartyScripts.forEach((scriptInfo) => {
      if (document.getElementById(scriptInfo.id)) {
        return;
      }
      const script = document.createElement("script");
      script.src = scriptInfo.src;
      script.id = scriptInfo.id;
      if (scriptInfo.async) {
        script.async = true;
      }

      Object.keys(scriptInfo.attributes).forEach((attr) => {
        script.setAttribute(attr, scriptInfo.attributes[attr]);
      });
      script.onerror = () => {
        console.error(`Failed to load ${scriptInfo.id}`);
      };
      document.body.appendChild(script);
    });
  }
  ["scroll", "click", "mouseover"].forEach((eventType) => {
    document.addEventListener(eventType, loadThirdPartyScripts, { once: true });
  });
});
