const siteConfig = {
  storageKey: "raisa-tarot-modal-state",
  gallerySelector: "[data-gallery]",
  ringSelector: "[data-gallery-ring]",
  tarotMessages: [
    "Сегодня карта советует не торопиться с выводами. В непростой ситуации важно увидеть скрытый мотив и только потом действовать.",
    "Эта карта говорит о знаке или разговоре, который поможет понять дальнейшее направление. Лучше сохранять спокойствие и внимательность к деталям.",
    "Сейчас особенно важно беречь личные границы и не принимать решение на фоне напряжения. Полная картина откроется через честный разбор."
  ],
  revealDelayMs: 32000,
  revealScrollRatio: 0.42
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setupOrbitGallery() {
  const gallery = document.querySelector(siteConfig.gallerySelector);
  const ring = document.querySelector(siteConfig.ringSelector);
  if (!gallery || !ring) return;

  const cards = [...ring.querySelectorAll(".orbit-card")];
  if (!cards.length) return;

  const applyLayout = () => {
    const width = window.innerWidth;
    let radius = 180;
    let cardWidth = 160;
    let cardHeight = 238;

    if (width >= 980) {
      radius = 300;
      cardWidth = 210;
      cardHeight = 314;
    } else if (width >= 720) {
      radius = 244;
      cardWidth = 190;
      cardHeight = 282;
    }

    ring.style.width = `${cardWidth}px`;
    ring.style.height = `${cardHeight}px`;

    cards.forEach((card, index) => {
      card.style.transform = `rotateY(${index * (360 / cards.length)}deg) translateZ(${radius}px)`;
    });
  };

  applyLayout();
  window.addEventListener("resize", applyLayout, { passive: true });

  if (prefersReducedMotion) return;

  const galleryObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        ring.classList.toggle("is-active", entry.isIntersecting);
      });
    },
    {
      threshold: 0.2
    }
  );

  galleryObserver.observe(gallery);
}

function setupLightbox() {
  const lightbox = document.querySelector("[data-lightbox]");
  const target = document.querySelector("[data-lightbox-target]");
  const closeButton = document.querySelector("[data-lightbox-close]");
  if (!lightbox || !target || !closeButton) return;

  const closeLightbox = () => {
    lightbox.hidden = true;
    target.removeAttribute("src");
  };

  document.querySelectorAll("[data-lightbox-image]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      target.src = trigger.getAttribute("data-lightbox-image") || "";
      lightbox.hidden = false;
    });
  });

  closeButton.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
  });
}

function setupTarotModal() {
  const modal = document.querySelector("[data-tarot-modal]");
  const result = document.querySelector("[data-tarot-result]");
  const message = document.querySelector("[data-tarot-message]");
  const closeControls = document.querySelectorAll("[data-tarot-close]");
  const cards = document.querySelectorAll(".tarot-pick");

  if (!modal || !result || !message || !cards.length) return;

  let timerId = null;
  let isShown = false;

  const markClosed = () => {
    sessionStorage.setItem(siteConfig.storageKey, "closed");
  };

  const shouldSkip = () => sessionStorage.getItem(siteConfig.storageKey) === "closed";

  const closeModal = () => {
    modal.hidden = true;
    markClosed();
  };

  const openModal = () => {
    if (shouldSkip() || isShown) return;
    isShown = true;
    modal.hidden = false;
  };

  timerId = window.setTimeout(openModal, siteConfig.revealDelayMs);

  const scrollHandler = () => {
    if (shouldSkip() || isShown) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return;
    if (window.scrollY / scrollable >= siteConfig.revealScrollRatio) {
      window.clearTimeout(timerId);
      openModal();
      window.removeEventListener("scroll", scrollHandler);
    }
  };

  window.addEventListener("scroll", scrollHandler, { passive: true });

  closeControls.forEach((control) => control.addEventListener("click", closeModal));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeModal();
  });

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      cards.forEach((item) => {
        if (item !== card) item.disabled = true;
      });
      card.classList.add("is-revealed");
      result.hidden = false;
      const index = Number(card.getAttribute("data-card-index") || 0);
      message.textContent = siteConfig.tarotMessages[index] || siteConfig.tarotMessages[0];
      markClosed();
    });
  });
}

function setupRevealEffects() {
  if (prefersReducedMotion) return;

  const targets = document.querySelectorAll(
    ".section-heading, .hero-copy, .hero-frame, .question-card, .method-step, .service-panel, .orbit-gallery, .video-card, .reason-card, .certificate-card, .review-card, .faq-item, .final-card"
  );

  targets.forEach((target) => target.classList.add("reveal-ready"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -6% 0px"
    }
  );

  targets.forEach((target) => observer.observe(target));
}

setupOrbitGallery();
setupLightbox();
setupTarotModal();
setupRevealEffects();
