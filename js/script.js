/**
 * 最大幅に基づいてviewport設定を切り替える関数。
 * @function
 * @param {number} maxWidth - viewportを固定する際の最大幅
 */
const switchViewport = (maxWidth) => {
  const viewport = document.querySelector('meta[name="viewport"]');
  const value =
    window.outerWidth > maxWidth
      ? "width=device-width,initial-scale=1"
      : `width=${maxWidth}`;
  if (viewport.getAttribute("content") !== value) {
    viewport.setAttribute("content", value);
  }
};
addEventListener("resize", () => switchViewport(375));
switchViewport(375);

// =======================================
// fade in
// =======================================
window.addEventListener("load", function () {
  gsap.registerPlugin(ScrollTrigger);

  const fadeInItems = document.querySelectorAll(".animated__fadeIn");

  fadeInItems.forEach((item) => {
    ScrollTrigger.create({
      trigger: item,
      start: "top 70%", // 要素が上部から70%の位置で発火
      // markers: false,
      onEnter: () => {
        // 要素内に入ったら、js-showクラスをつける
        item.classList.add("js-show");
      },
    });
  });
});

// =======================================
// 揺れるアニメーション
// =======================================

const elements = document.querySelectorAll(".yurayura-parent");

const callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(callback);
elements.forEach((element) => {
  observer.observe(element);
});
