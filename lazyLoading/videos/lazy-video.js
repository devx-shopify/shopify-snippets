const lazyVideos = Array.from(document.querySelectorAll("video.lazy-video"));

if ("IntersectionObserver" in window) {
  var lazyVideoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target;

      if (entry.isIntersecting) {
        if (video) {
          if (video.dataset.poster) {
            video.poster = video.dataset.poster;
          }

          const sources = video.querySelectorAll("source");
          sources.forEach((source) => {
            source.src = source.dataset.src;
          });

          video.load();
          video.play();

          video.classList.remove("lazy-video");
          lazyVideoObserver.unobserve(video);
        }
      } else if (video && !video.paused) {
        video.pause();
      }
    });
  });

  lazyVideos.forEach((lazyVideo) => {
    lazyVideoObserver.observe(lazyVideo);
  });
}
