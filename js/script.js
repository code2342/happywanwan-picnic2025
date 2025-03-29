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

const elements = document.querySelectorAll(".yurayura__parent");

const callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // 時間遅延を追加
      setTimeout(() => {
        entry.target.classList.add("animate");
        entry.target.classList.add("animate-before");
      }, 300); // 300ミリ秒の遅延

      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(callback, {
  threshold: 0.3, // 発火タイミングを遅くするためにthresholdを追加
  rootMargin: "0px", // rootMarginを追加
});

elements.forEach((element) => {
  observer.observe(element);
});
// =======================================
// 横から出現アニメーション
// =======================================
document.addEventListener("DOMContentLoaded", function () {
  // 監視対象の要素を取得
  const cardBottoms = document.querySelectorAll(
    ".contents__card .contents__card-bottom, .access__container, .contents__card .contents__card-image, .ticket__dog"
  );

  // Intersection Observerの設定
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            // アニメーションクラスを追加
            entry.target.classList.add("animate-before");
          }, 300); // 300ミリ秒の遅延
          // 一度だけ発火させるため監視解除
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.8,
      rootMargin: "0px", // rootMarginを追加
    }
  );

  // 各要素の監視を開始
  cardBottoms.forEach((card) => {
    observer.observe(card);
  });
});

// =======================================
// ドロワー
// =======================================
jQuery("#js-drawer-icon").on("click", function (e) {
  e.preventDefault();
  jQuery("#js-drawer-icon").toggleClass("is-checked");
  jQuery("#js-drawer-content").toggleClass("is-checked");

  // body要素のスクロールを制御
  if (jQuery("#js-drawer-icon").hasClass("is-checked")) {
    // ドロワーが開いた時
    jQuery("body").css("overflow", "hidden");
  } else {
    // ドロワーが閉じた時
    jQuery("body").css("overflow", "auto");
  }
});

// 既存のコード（メニュー項目のクリック処理）
jQuery(".drawer-content__link").on("click", function () {
  // ドロワーを閉じる
  jQuery("#js-drawer-icon").removeClass("is-checked");
  jQuery("#js-drawer-content").removeClass("is-checked");

  // ボディのスクロールを戻す
  jQuery("body").css("overflow", "auto");
});

// チケット購入ボタンのクリック処理
jQuery(".drawer__button").on("click", function (e) {
  // デフォルトの動作を一旦防止
  e.preventDefault();

  // ドロワーを閉じる
  jQuery("#js-drawer-icon").removeClass("is-checked");
  jQuery("#js-drawer-content").removeClass("is-checked");

  // ボディのスクロールを戻す
  jQuery("body").css("overflow", "auto");

  // 明示的にページトップへスクロール
  window.scrollTo({
    top: 0,
    behavior: "smooth", // スムーズスクロールを指定
  });
});
// =======================================
// アコーディオンパネル
// =======================================
jQuery(function ($) {
  function setupAccordion() {
    const windowWidth = $(window).width();

    if (windowWidth <= 768) {
      if (!$(".js-accordion").data("bound")) {
        $(".js-accordion")
          .data("bound", true)
          .on("click", function (e) {
            e.preventDefault();
            const $parent = $(this).parent(); // .faq__box
            const $body = $(this).next(); // .faq-box__body
            if ($parent.hasClass("is-open")) {
              $parent.removeClass("is-open");
              $body.slideUp();
            } else {
              $parent.addClass("is-open");
              $body.slideDown();
            }
          });
        const $firstFaq = $(".faq__box").first();
        $firstFaq.addClass("is-open");
        $firstFaq.find(".faq-box__body").slideDown();
      }
    } else {
      $(".js-accordion").off("click").removeData("bound");
      $(".faq__box").removeClass("is-open");
      $(".faq-box__body").removeAttr("style");
    }
  }

  // 初回設定
  setupAccordion();
  // 画面リサイズ時にも実行
  $(window).on("resize", function () {
    setupAccordion();
  });
});
// =======================================
// swiper
// =======================================
const swiper = new Swiper("#js-gallery-swiper", {
  spaceBetween: 82,
  // Optional parameters
  loop: true,

  // If we need pagination
  pagination: {
    el: "#js-gallery-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: "#js-gallery-prev",
    prevEl: "#js-gallery-next",
  },
});

// =======================================
// モーダル
// =======================================
document.addEventListener("DOMContentLoaded", function () {
  const isMobile = () => window.innerWidth <= 768;
  let modalInitialized = false;

  const openButtons = document.querySelectorAll(".modal__img");
  const closeButtons = document.querySelectorAll(".modal__close-btn");
  const dialogs = document.querySelectorAll("dialog");

  const handleOpen = (event) => {
    const dialogId = event.currentTarget.getAttribute("data-dialog");
    const dialog = document.getElementById(dialogId);
    if (dialog) {
      dialog.showModal();
      dialog.classList.add("js-show");
    }
  };

  const handleClose = (event) => {
    const dialog = event.currentTarget.closest("dialog");
    if (dialog) {
      dialog.classList.remove("js-show");
      dialog.close();
      document.activeElement.blur();
    }
  };

  const handleBackdropClick = (event) => {
    const dialog = event.currentTarget;
    if (!event.target.closest(".modal__inner")) {
      dialog.classList.remove("js-show");
      dialog.close();
    }
  };

  const setupModalEvents = () => {
    openButtons.forEach((btn) => btn.addEventListener("click", handleOpen));
    closeButtons.forEach((btn) => btn.addEventListener("click", handleClose));
    dialogs.forEach((dialog) =>
      dialog.addEventListener("click", handleBackdropClick)
    );
    modalInitialized = true;
  };

  const removeModalEvents = () => {
    openButtons.forEach((btn) => btn.removeEventListener("click", handleOpen));
    closeButtons.forEach((btn) =>
      btn.removeEventListener("click", handleClose)
    );
    dialogs.forEach((dialog) =>
      dialog.removeEventListener("click", handleBackdropClick)
    );
    modalInitialized = false;
  };

  const checkAndUpdateModal = () => {
    if (isMobile() && !modalInitialized) {
      setupModalEvents();
    } else if (!isMobile() && modalInitialized) {
      removeModalEvents();
    }
  };

  checkAndUpdateModal();
  window.addEventListener("resize", checkAndUpdateModal);
});
// =======================================
// スムーススクロール
// =======================================

// jQuery('a[href^="#"]').on("click", function (e) {
//   const speed = 1000;
//   const id = jQuery(this).attr("href");
//   const target = jQuery("#" === id ? "html" : id);
//   const position = jQuery(target).offset().top;

//   jQuery("html,body").animate(
//     {
//       scrollTop: position,
//     },
//     speed,
//     "swing" //swing or linear
//   );
// });

// jQuery(window).on("scroll", function () {
//   if (100 < jQuery(window).scrollTop()) {
//     jQuery("#js-pagetop").addClass("is-show");
//   } else {
//     jQuery("#js-pagetop").removeClass("is-show");
//   }
// });

jQuery('a[href^="#"]').on("click", function (e) {
  const speed = 1000;
  const id = jQuery(this).attr("href");
  const target = jQuery("#" === id ? "html" : id);
  const position = jQuery(target).offset().top - 50; // Subtracted 50px from the position

  jQuery("html,body").animate(
    {
      scrollTop: position,
    },
    speed,
    "swing" //swing or linear
  );
});

jQuery(window).on("scroll", function () {
  if (100 < jQuery(window).scrollTop()) {
    jQuery("#js-pagetop").addClass("is-show");
  } else {
    jQuery("#js-pagetop").removeClass("is-show");
  }
});
// =======================================
// タイピングアニメーション
// =======================================
document.addEventListener("DOMContentLoaded", function () {
  const typingText = document.getElementById("typingText");

  // 表示するテキスト
  const message =
    "これらの注意事項を守り、みなさまが楽しく安全に過ごせるようご協力をお願いいたします。";
  let index = 0;

  // タイピングアニメーション関数
  function typeText() {
    if (index < message.length) {
      typingText.textContent += message[index];
      index++;
      setTimeout(typeText, 100); // 100ミリ秒ごとに一文字追加
    }
  }

  // Intersection Observerを作成
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // 要素が画面内に入ったとき
        if (entry.isIntersecting) {
          // タイピングアニメーションを開始
          typeText();
          // 一度発火したら監視を解除
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1, // 要素の10%が見えたときに発火
      rootMargin: "0px", // rootMarginを追加
    }
  );

  // 監視対象に追加
  observer.observe(typingText);
});

// =======================================
// 走るわんちゃん
// =======================================
document.addEventListener("DOMContentLoaded", function () {
  gsap.to(".dog-wrapper", {
    x: "-120vw",
    duration: 7,
    ease: "linear",
    repeat: -1,
  });

  // 画像を交互に切り替える
  let dogImages = document.querySelectorAll(".dog-wrapper img");
  let currentIndex = 0;

  setInterval(() => {
    dogImages.forEach((img) => img.classList.remove("active"));
    currentIndex = (currentIndex + 1) % dogImages.length;
    dogImages[currentIndex].classList.add("active");
  }, 500);

  // 芝生の背景を左から右へ動かす
  gsap.to(".shop", {
    backgroundPositionX: "100vw",
    duration: 20,
    ease: "linear",
    repeat: -1,
  });
});

// =======================================
// mochiko
// =======================================
// jQuery(function ($) {
//   const mochicoButton = $("#page-top");

//   // すぐに実行されるCSS対策（CSSでデフォルト非表示にしていない場合の保険）
//   mochicoButton.css({
//     opacity: "0",
//     visibility: "hidden",
//     "pointer-events": "none",
//   });

//   // ブレイクポイントに応じたオフセット値を取得する関数
//   function getOffsetAdjustment() {
//     const windowWidth = $(window).width();
//     if (windowWidth >= 1200) return 100;
//     else if (windowWidth >= 768) return 160;
//     else return 130;
//   }

//   // スクロール位置に基づいてボタンの表示/非表示を制御する関数
//   function updateButtonVisibility() {
//     // FVセクションの高さを取得
//     const fvSection = $(".fv");
//     const contentsSection = $(".contents");

//     if (fvSection.length === 0 || contentsSection.length === 0) return;

//     const fvHeight = fvSection.outerHeight();
//     const scrollTop = $(window).scrollTop();
//     const windowHeight = $(window).height();
//     const scrollBottom = scrollTop + windowHeight;

//     // 明確な条件: FVの高さを完全に超えた場合のみ表示
//     const shouldShowButton = scrollTop > fvHeight;

//     // 表示/非表示の切り替え
//     if (shouldShowButton) {
//       if (!mochicoButton.hasClass("is-visible")) {
//         mochicoButton.addClass("is-visible").css({
//           opacity: "1",
//           visibility: "visible",
//           "pointer-events": "auto",
//         });
//       }

//       // フッター調整の処理
//       const footerOffset = $("footer").offset().top;
//       const distanceToFooter = footerOffset - scrollBottom;
//       const offsetAdjustment = getOffsetAdjustment();

//       if (distanceToFooter < 0) {
//         const moveAmount = Math.abs(distanceToFooter) - offsetAdjustment;
//         const finalMove = Math.max(0, moveAmount);
//         mochicoButton.css("transform", `translateY(-${finalMove}px)`);
//       } else {
//         mochicoButton.css("transform", "translateY(0)");
//       }
//     } else {
//       if (mochicoButton.hasClass("is-visible")) {
//         mochicoButton.removeClass("is-visible").css({
//           opacity: "0",
//           visibility: "hidden",
//           "pointer-events": "none",
//         });
//       }
//     }
//   }

//   // スクロールイベント
//   $(window).on("scroll", updateButtonVisibility);

//   // 安全のためにDOMContentLoadedでも強制的に非表示
//   $(document).ready(function () {
//     mochicoButton.css({
//       opacity: "0",
//       visibility: "hidden",
//       "pointer-events": "none",
//     });
//   });

//   // ページ読み込み完了後、ボタンの状態を初期化
//   $(window).on("load", function () {
//     // 最初は非表示を保証
//     mochicoButton
//       .css({
//         opacity: "0",
//         visibility: "hidden",
//         "pointer-events": "none",
//       })
//       .removeClass("is-visible");

//     // 少し遅延させてから現在のスクロール位置をチェック
//     setTimeout(updateButtonVisibility, 300);
//   });

//   // リサイズ時
//   $(window).on("resize", updateButtonVisibility);
// });

jQuery(function ($) {
  const mochicoButton = $("#page-top");

  // すぐに実行されるCSS対策（CSSでデフォルト非表示にしていない場合の保険）
  mochicoButton.css({
    opacity: "0",
    visibility: "hidden",
    "pointer-events": "none",
  });

  // 通常時の位置を画面下部に設定する関数
  function setButtonNormalPosition() {
    // 画面下部からの距離をピクセルで指定（値を大きくするとより上に配置）
    const bottomMargin = 10; // 例えば20px（小さくすると下に、大きくすると上に）

    mochicoButton.css({
      bottom: `${bottomMargin}px`,
      position: "fixed",
      transform: "translateY(0)",
    });
  }

  // ブレイクポイントに応じたオフセット値を取得する関数
  function getOffsetAdjustment() {
    const windowWidth = $(window).width();
    if (windowWidth >= 1200) return 100;
    else if (windowWidth >= 768) return 160;
    else return 130;
  }

  // フッター近くでの位置調整を行う関数
  function updateButtonPosition() {
    const scrollTop = $(window).scrollTop();
    const windowHeight = $(window).height();
    const scrollBottom = scrollTop + windowHeight;
    const footerOffset = $("footer").offset().top;
    const distanceToFooter = footerOffset - scrollBottom;
    const offsetAdjustment = getOffsetAdjustment();

    if (distanceToFooter < 0) {
      const moveAmount = Math.abs(distanceToFooter) - offsetAdjustment;
      const finalMove = Math.max(0, moveAmount);
      mochicoButton.css("transform", `translateY(-${finalMove}px)`);
    } else {
      // 通常の位置に戻す
      mochicoButton.css("transform", "translateY(0)");
    }
  }

  // スクロール位置に基づいてボタンの表示/非表示を制御する関数
  function updateButtonVisibility() {
    // FVセクションの高さを取得
    const fvSection = $(".fv");
    const contentsSection = $(".contents");

    if (fvSection.length === 0 || contentsSection.length === 0) return;

    const fvHeight = fvSection.outerHeight();
    const scrollTop = $(window).scrollTop();

    // 明確な条件: FVの高さを完全に超えた場合のみ表示
    const shouldShowButton = scrollTop > fvHeight;

    // 表示/非表示の切り替え
    if (shouldShowButton) {
      if (!mochicoButton.hasClass("is-visible")) {
        // ボタンを表示する際に通常位置も設定
        setButtonNormalPosition();

        mochicoButton.addClass("is-visible").css({
          opacity: "1",
          visibility: "visible",
          "pointer-events": "auto",
        });
      }

      // フッター近くでの位置調整を実行
      updateButtonPosition();
    } else {
      if (mochicoButton.hasClass("is-visible")) {
        mochicoButton.removeClass("is-visible").css({
          opacity: "0",
          visibility: "hidden",
          "pointer-events": "none",
        });
      }
    }
  }

  // スクロールイベント
  $(window).on("scroll", updateButtonVisibility);

  // 安全のためにDOMContentLoadedでも強制的に非表示
  $(document).ready(function () {
    mochicoButton.css({
      opacity: "0",
      visibility: "hidden",
      "pointer-events": "none",
    });

    // 通常位置を設定
    setButtonNormalPosition();
  });

  // ページ読み込み完了後、ボタンの状態を初期化
  $(window).on("load", function () {
    // 最初は非表示を保証
    mochicoButton
      .css({
        opacity: "0",
        visibility: "hidden",
        "pointer-events": "none",
      })
      .removeClass("is-visible");

    // 通常位置を設定
    setButtonNormalPosition();

    // 少し遅延させてから現在のスクロール位置をチェック
    setTimeout(updateButtonVisibility, 300);
  });

  // リサイズ時
  $(window).on("resize", function () {
    // 通常位置を再設定
    setButtonNormalPosition();

    // ボタンの表示/非表示と位置を更新
    updateButtonVisibility();
  });
});
// =======================================
// fv
// =======================================
class TopAnimation1 {
  constructor() {
    if (document.querySelector("main .fv")) {
      this.opening();
    }
  }

  opening() {
    const el_text = document.querySelector(".fv__text");
    const el_logo = document.querySelector(".fv__logo");
    const el_date = document.querySelector(".fv__date");
    const el_bg1 = document.querySelector(".fv__bg1");
    const el_bg2 = document.querySelector(".fv__bg2");
    const isMobile = window.innerWidth <= 850;

    const runAnimation = () => {
      const timeline1 = gsap.timeline();

      gsap.set([el_text, el_logo, el_date], {
        opacity: 0,
        y: isMobile ? 40 : 24,
      });

      gsap.set([el_bg1, el_bg2], {
        opacity: 0,
        scale: isMobile ? 0.3 : 0.5,
      });

      timeline1
        .to(
          el_text,
          {
            duration: 1,
            opacity: 1,
            y: 0,
            ease: "elastic.out(1,0.3)",
          },
          "-=0.9"
        )
        .to(
          el_logo,
          {
            duration: 1,
            opacity: 1,
            y: 0,
            ease: "elastic.out(1,0.3)",
          },
          "-=1"
        )
        .to(
          el_date,
          {
            duration: 1,
            opacity: 1,
            y: 0,
            ease: "elastic.out(1,0.3)",
          },
          "-=0.9"
        );

      if (isMobile) {
        timeline1.to(
          [el_bg1, el_bg2],
          {
            duration: 2,
            opacity: 1,
            scale: 1,
            ease: "elastic.out(1,0.3)",
          },
          "-=1"
        );
      } else {
        timeline1
          .to(
            el_bg1,
            {
              duration: 2,
              opacity: 1,
              scale: 1,
              ease: "elastic.out(1,0.3)",
            },
            "-=1"
          )
          .to(
            el_bg2,
            {
              duration: 2,
              opacity: 1,
              scale: 1,
              ease: "elastic.out(1,0.3)",
            },
            "-=1.9"
          );
      }
    };

    // 対象画像がすべて読み込まれたらアニメーションを走らせる
    const images = document.querySelectorAll(".fv img");
    let loadedCount = 0;
    const totalImages = images.length;

    images.forEach((img) => {
      if (img.complete) {
        loadedCount++;
      } else {
        img.addEventListener("load", () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            runAnimation();
          }
        });
      }
    });

    // 全部completeだった場合
    if (loadedCount === totalImages) {
      runAnimation();
    }
  }
}

const init = () => {
  new TopAnimation1();
};

window.addEventListener("DOMContentLoaded", init);

// class TopAnimation1 {
//   constructor() {
//     if (document.querySelector("main .fv")) {
//       this.opening();
//     }
//   }

//   opening() {
//     const timeline1 = gsap.timeline();
//     const el_text = document.querySelector(".fv__text");
//     const el_logo = document.querySelector(".fv__logo");
//     const el_date = document.querySelector(".fv__date");
//     const el_bg1 = document.querySelector(".fv__bg1");
//     const el_bg2 = document.querySelector(".fv__bg2");

//     gsap.set([el_text, el_logo, el_date], {
//       opacity: 0,
//       y: 24,
//     });

//     gsap.set([el_bg1, el_bg2], {
//       opacity: 0,
//       scale: 0.5,
//     });

//     window.addEventListener("load", () => {
//       timeline1
//         .to(
//           el_text,
//           {
//             duration: 1,
//             opacity: 1,
//             y: 0,
//             ease: "elastic.out(1,0.3)",
//           },
//           "-=0.9"
//         )
//         .to(
//           el_logo,
//           {
//             duration: 1,
//             opacity: 1,
//             y: 0,
//             ease: "elastic.out(1,0.3)",
//           },
//           "-=1"
//         )
//         .to(
//           el_date,
//           {
//             duration: 1,
//             opacity: 1,
//             y: 0,
//             ease: "elastic.out(1,0.3)",
//           },
//           "-=0.9"
//         );

//       if (window.innerWidth <= 850) {
//         timeline1.to(
//           [el_bg1, el_bg2],
//           {
//             duration: 2,
//             opacity: 1,
//             scale: 1,
//             ease: "elastic.out(1,0.3)",
//           },
//           "-=1"
//         );
//       } else {
//         timeline1
//           .to(
//             el_bg1,
//             {
//               duration: 2,
//               opacity: 1,
//               scale: 1,
//               ease: "elastic.out(1,0.3)",
//             },
//             "-=1"
//           )
//           .to(
//             el_bg2,
//             {
//               duration: 2,
//               opacity: 1,
//               scale: 1,
//               ease: "elastic.out(1,0.3)",
//             },
//             "-=1.9"
//           );
//       }
//     });
//   }
// }

// const init = () => {
//   new TopAnimation1();
// };

// window.addEventListener("DOMContentLoaded", init);
