const cards = document.querySelectorAll(".gallery-card");
const galleryGrid = document.querySelector(".gallery-grid");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    rootMargin: "0px 0px -10% 0px",
    threshold: 0.2,
  }
);

cards.forEach((card, index) => {
  // Calculate diagonal cascade delay based on row and column
  const getColumnCount = () => {
    const width = window.innerWidth;
    if (width >= 1200) return 4;
    if (width >= 900) return 3;
    if (width >= 600) return 2;
    return 1;
  };

  const cols = getColumnCount();
  const row = Math.floor(index / cols);
  const col = index % cols;
  const cascadeDelay = (row + col) * 80;

  card.style.setProperty("--cascade-delay", `${cascadeDelay}ms`);
  observer.observe(card);
});

const applyMasonryLayout = () => {
  if (!galleryGrid) return;
  const gridStyles = window.getComputedStyle(galleryGrid);
  const rowHeight = parseFloat(
    gridStyles.getPropertyValue("grid-auto-rows") || 10
  );
  const rowGap = parseFloat(
    gridStyles.getPropertyValue("row-gap") ||
      gridStyles.getPropertyValue("gap") ||
      0
  );

  cards.forEach((card) => {
    card.style.gridRowEnd = "span 1";
  });

  cards.forEach((card) => {
    const contentHeight = card.getBoundingClientRect().height;
    const span = Math.ceil((contentHeight + rowGap) / (rowHeight + rowGap));
    card.style.gridRowEnd = `span ${span}`;
  });
};

const debouncedMasonry = (() => {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(applyMasonryLayout, 150);
  };
})();

window.addEventListener("load", applyMasonryLayout);
window.addEventListener("resize", debouncedMasonry);

const galleryVideos = document.querySelectorAll(".gallery-card video");
const galleryImages = document.querySelectorAll(".gallery-card img");

const handleMediaLoad = () => {
  requestAnimationFrame(applyMasonryLayout);
};

galleryVideos.forEach((video) => {
  video.addEventListener("loadedmetadata", handleMediaLoad);
  video.addEventListener("loadeddata", handleMediaLoad);
});

galleryImages.forEach((image) => {
  if (image.complete) {
    handleMediaLoad();
    return;
  }
  image.addEventListener("load", handleMediaLoad);
  image.addEventListener("error", handleMediaLoad);
});

const letterModal = document.getElementById("letter-modal");
const letterTrigger = document.querySelector("[data-letter-trigger]");
const letterDismissControls = document.querySelectorAll(
  "[data-letter-dismiss]"
);
const audioModal = document.getElementById("audio-modal");
const audioTrigger = document.querySelector("[data-audio-trigger]");
const audioDismissControls = document.querySelectorAll("[data-audio-dismiss]");
const audioPlayers = document.querySelectorAll(".audio-player");
const videoModal = document.getElementById("video-modal");
const videoTrigger = document.querySelector("[data-video-trigger]");
const videoDismissControls = document.querySelectorAll("[data-video-dismiss]");
const videoPlayer = document.querySelector(".video-player");
const startMissionButton = document.querySelector("[data-start-mission]");

const openLetterModal = () => {
  if (!letterModal) return;
  letterModal.classList.add("active");
  letterModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

const closeLetterModal = () => {
  if (!letterModal) return;
  letterModal.classList.remove("active");
  letterModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

if (letterTrigger) {
  letterTrigger.addEventListener("click", openLetterModal);
}

letterDismissControls.forEach((control) =>
  control.addEventListener("click", closeLetterModal)
);

const openVideoModal = () => {
  if (!videoModal) return;
  videoModal.classList.add("active");
  videoModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  videoPlayer
    ?.play()
    .catch((error) => console.warn("Falha ao iniciar vídeo do modal", error));
};

const closeVideoModal = () => {
  if (!videoModal) return;
  videoModal.classList.remove("active");
  videoModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (videoPlayer) {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
  }
};

if (videoTrigger) {
  videoTrigger.addEventListener("click", openVideoModal);
}

videoDismissControls.forEach((control) =>
  control.addEventListener("click", closeVideoModal)
);

const openAudioModal = () => {
  if (!audioModal) return;
  audioModal.classList.add("active");
  audioModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

const closeAudioModal = () => {
  if (!audioModal) return;
  audioModal.classList.remove("active");
  audioModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  audioPlayers.forEach((player) => {
    player.pause();
    player.currentTime = 0;
  });
};

if (audioTrigger) {
  audioTrigger.addEventListener("click", openAudioModal);
}

audioDismissControls.forEach((control) =>
  control.addEventListener("click", closeAudioModal)
);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && letterModal?.classList.contains("active")) {
    closeLetterModal();
  }
  if (event.key === "Escape" && videoModal?.classList.contains("active")) {
    closeVideoModal();
  }
  if (event.key === "Escape" && audioModal?.classList.contains("active")) {
    closeAudioModal();
  }
});

startMissionButton?.addEventListener("click", () => {
  const phone = "5534998982511";
  const message = "Vamos iniciar nossa nova missão!";
  const whatsappURL = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(
    message
  )}`;
  window.open(whatsappURL, "_blank");
});

const footerYearValue = document.getElementById("footer-year");
if (footerYearValue) {
  footerYearValue.textContent = new Date().getFullYear();
}

// Loading screen
const loader = document.getElementById("loader");
const heroSection = document.getElementById("home");
window.addEventListener("load", () => {
  setTimeout(() => {
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "auto", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
    loader.classList.add("hidden");
  }, 4000);
});

// Timeline scroll reveal
const timelineItems = document.querySelectorAll(".timeline-item");
const timelineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        timelineObserver.unobserve(entry.target);
      }
    });
  },
  {
    rootMargin: "0px 0px -15% 0px",
    threshold: 0.3,
  }
);

timelineItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 150}ms`;
  timelineObserver.observe(item);
});

// Lightbox functionality
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxVideo = document.querySelector(".lightbox-video");
const lightboxCaption = document.querySelector(".lightbox-caption");
const lightboxCaptionLabel = document.querySelector(".lightbox-caption-label");
const lightboxMedia = document.querySelector(".lightbox-media");
const lightboxCaptionCard = document.querySelector(".lightbox-caption-card");
const closeBtn = document.querySelector(".lightbox-close");
const prevBtn = document.querySelector(".lightbox-prev");
const nextBtn = document.querySelector(".lightbox-next");
const galleryCards = document.querySelectorAll(".gallery-card[data-index]");
const timelineSection = document.getElementById("timeline");
const galleryFooter = document.querySelector(".gallery-footer");

let currentIndex = 0;
const totalItems = galleryCards.length;
let isTransitioning = false;

const triggerLightboxAnimation = (element) => {
  if (!element) return;
  element.classList.remove("is-animating");
  void element.offsetWidth;
  element.classList.add("is-animating");
};

const getMemoryLabel = (index) => {
  const card = galleryCards[index];
  if (!card) return "Memória";
  return (
    card.dataset.caption ||
    card.querySelector("figcaption")?.textContent?.trim() ||
    "Memória"
  );
};

const updateLightboxNavLabels = () => {
  if (nextBtn) {
    if (currentIndex === totalItems - 1) {
      nextBtn.setAttribute("aria-label", "Ir para a linha do tempo");
    } else {
      nextBtn.setAttribute(
        "aria-label",
        `Ver próxima memória: ${getMemoryLabel(currentIndex + 1)}`
      );
    }
  }

  if (prevBtn) {
    if (currentIndex === 0) {
      prevBtn.setAttribute("aria-label", "Voltar para última memória");
    } else {
      prevBtn.setAttribute(
        "aria-label",
        `Ver memória anterior: ${getMemoryLabel(currentIndex - 1)}`
      );
    }
  }
};

const openLightbox = (index) => {
  currentIndex = index;
  const card = galleryCards[index];
  const src = card.dataset.src;
  const caption =
    card.dataset.caption || card.querySelector("figcaption").textContent;
  const isVideo = card.dataset.type === "video";
  const labelText =
    card.querySelector("figcaption")?.textContent?.trim() || "Cena favorita";

  // Limpar mídia anterior antes de carregar nova
  lightboxVideo.pause();
  lightboxVideo.src = "";
  lightboxImage.src = "";
  lightboxVideo.classList.remove("active");
  lightboxImage.classList.remove("active");

  lightboxCaption.textContent = caption;
  if (lightboxCaptionLabel) {
    lightboxCaptionLabel.textContent = labelText;
  }

  if (isVideo) {
    lightboxVideo.src = src;
    lightboxVideo.classList.add("active");
    lightboxVideo
      .play()
      .catch((error) =>
        console.warn("Não foi possível reproduzir o vídeo", error)
      );
  } else {
    lightboxImage.src = src;
    lightboxImage.alt = caption;
    lightboxImage.classList.add("active");
  }

  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
  triggerLightboxAnimation(lightboxMedia);
  triggerLightboxAnimation(lightboxCaptionCard);
  updateLightboxNavLabels();
};

const closeLightbox = () => {
  isTransitioning = true;
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
  lightboxVideo.pause();
  lightboxVideo.src = "";
  lightboxImage.src = "";
  [lightboxMedia, lightboxCaptionCard].forEach((element) =>
    element?.classList.remove("is-animating")
  );
  setTimeout(() => {
    isTransitioning = false;
  }, 500);
};

const showNext = () => {
  if (isTransitioning) return;

  const isLastItem = currentIndex === totalItems - 1;
  if (isLastItem) {
    closeLightbox();
    setTimeout(() => {
      (galleryFooter || timelineSection)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
    return;
  }

  isTransitioning = true;
  currentIndex = Math.min(currentIndex + 1, totalItems - 1);
  openLightbox(currentIndex);
  setTimeout(() => {
    isTransitioning = false;
  }, 300);
};

const showPrev = () => {
  if (isTransitioning) return;

  isTransitioning = true;
  currentIndex = (currentIndex - 1 + totalItems) % totalItems;
  openLightbox(currentIndex);
  setTimeout(() => {
    isTransitioning = false;
  }, 300);
};

galleryCards.forEach((card, index) => {
  card.addEventListener("click", () => {
    if (isTransitioning) return;
    openLightbox(index);
  });
});

closeBtn.addEventListener("click", closeLightbox);
nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrev);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") showNext();
  if (e.key === "ArrowLeft") showPrev();
});

const whatsappForm = document.querySelector("[data-whatsapp-form]");

const formatDate = (value) => {
  if (!value) return "Data surpresa";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleDateString("pt-BR", { timeZone: "UTC" });
};

if (whatsappForm) {
  whatsappForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(whatsappForm);
    const date = formatDate(formData.get("date"));
    const place = (formData.get("place") || "").trim() || "Escolher juntos";
    const mood = formData.get("mood") || "Noite neon";

    const message = `Oi! Quero agendar nossa missão.\nData: ${date}\nLocal: ${place}\nMood: ${mood}`;
    const phone = "5534998982511";
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappURL, "_blank");
  });
}
