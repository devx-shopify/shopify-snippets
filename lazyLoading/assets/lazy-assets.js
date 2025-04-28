window.lazyLoader = window.lazyLoader || {
  initialized: false,
  loaded: {},

  loadScript: function (url, id) {
    if (this.loaded[id]) return;
    this.loaded[id] = true;

    const script = document.createElement('script');
    script.src = url;
    script.defer = true;
    document.head.appendChild(script);
  },

  loadStylesheet: function (url, id) {
    if (this.loaded[id]) return;
    this.loaded[id] = true;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
  },

  init: function () {
    if (this.initialized) return;
    this.initialized = true;

    const loadHandler = () => {
      document.dispatchEvent(new CustomEvent('lazyLoad'));
    };

    document.addEventListener('click', loadHandler, { once: true });
    document.addEventListener('scroll', loadHandler, { once: true });
    document.addEventListener('mousemove', loadHandler, { once: true });
  }
};

window.lazyLoader.init();