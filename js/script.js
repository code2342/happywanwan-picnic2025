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

// =======================================
// アコーディオンパネル
// =======================================
jQuery(function ($) {
  function setupAccordion() {
    const windowWidth = $(window).width();

    if (windowWidth <= 768) {
      // すでにイベントが登録されていたらスキップ（重複防止）
      if (!$(".js-accordion").data("bound")) {
        $(".js-accordion")
          .data("bound", true)
          .on("click", function (e) {
            e.preventDefault();

            const $parent = $(this).parent();
            const $body = $(this).next();

            if ($parent.hasClass("is-open")) {
              $parent.removeClass("is-open");
              $body.slideUp();
            } else {
              $parent.addClass("is-open");
              $body.slideDown();
            }
          });
      }
    } else {
      // 769px以上ならイベント解除（完全に無効化）
      $(".js-accordion").off("click").removeData("bound");
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

jQuery('a[href^="#"]').on("click", function (e) {
  const speed = 1000;
  const id = jQuery(this).attr("href");
  const target = jQuery("#" === id ? "html" : id);
  const position = jQuery(target).offset().top;

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

jQuery(function ($) {
  const mochicoButton = $("#page-top");
  let buttonActivated = false;

  // 初期状態は非表示
  mochicoButton.hide();

  // ブレイクポイントに応じたオフセット値を取得する関数
  function getOffsetAdjustment() {
    const windowWidth = $(window).width();

    // CSSのmqに合わせたブレイクポイント設定
    if (windowWidth >= 1200) {
      return 100;
    } else if (windowWidth >= 768) {
      return 160;
    } else {
      return 130;
    }
  }

  // スクロール処理
  $(window).on("scroll", function () {
    // contents セクションの位置を取得
    const contentsSection = $(".contents");
    const contentsSectionTop = contentsSection.offset().top;

    // 画面の上端と下端の位置
    const scrollTop = $(window).scrollTop();
    const windowHeight = $(window).height();
    const scrollBottom = scrollTop + windowHeight;

    // contentsセクションが画面内に入ったかをチェック
    const sectionVisible =
      (contentsSectionTop >= scrollTop && contentsSectionTop <= scrollBottom) || // セクション上端が画面内
      scrollTop >= contentsSectionTop; // スクロールがセクション開始位置を超えた

    // セクションが画面内に見えたら表示
    if (sectionVisible) {
      if (!buttonActivated) {
        buttonActivated = true;
        mochicoButton.fadeIn();
      }
    }
    // contentsセクションが画面内に入る前なら非表示
    else if (contentsSectionTop > scrollBottom) {
      buttonActivated = false;
      mochicoButton.fadeOut();
    }

    // フッター位置の調整（ボタンが表示されている場合のみ）
    if (buttonActivated) {
      const footerOffset = $("footer").offset().top;
      const distanceToFooter = footerOffset - scrollBottom;
      const OFFSET_ADJUSTMENT = getOffsetAdjustment(); // 現在のビューポートに応じたオフセット

      if (distanceToFooter < 0) {
        // フッターが見えている時：調整された位置に移動
        const moveAmount = Math.abs(distanceToFooter) - OFFSET_ADJUSTMENT;
        const finalMove = Math.max(0, moveAmount);

        mochicoButton.css({
          transform: `translateY(-${finalMove}px)`,
        });
      } else {
        // フッターが見えていない時：元の位置
        mochicoButton.css({
          transform: "translateY(0)",
        });
      }
    }
  });

  // ページ読み込み時とリサイズ時にも状態を確認
  $(window).on("load resize", function () {
    $(window).trigger("scroll");
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
    const timeline1 = gsap.timeline();
    const el_text = document.querySelector(".fv__text");
    const el_logo = document.querySelector(".fv__logo");
    const el_date = document.querySelector(".fv__date");
    const el_bg1 = document.querySelector(".fv__bg1");
    const el_bg2 = document.querySelector(".fv__bg2");

    gsap.set([el_text, el_logo, el_date], {
      opacity: 0,
      y: 24,
    });

    gsap.set([el_bg1, el_bg2], {
      opacity: 0,
      scale: 0.5,
    });

    window.addEventListener("load", () => {
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

      if (window.innerWidth <= 850) {
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
    });
  }
}

const init = () => {
  new TopAnimation1();
};

window.addEventListener("DOMContentLoaded", init);


// document.addEventListener('DOMContentLoaded', function() {
//   // すべてのメディア要素を検索
//   const mediaElements = document.querySelectorAll('img, video, canvas, svg');
  
//   // 各要素にスタイルを直接適用
//   mediaElements.forEach(el => {
//     el.style.setProperty('overflow', 'hidden', 'important');
//     el.style.setProperty('contain', 'paint', 'important');
    
//     // 親要素も修正
//     if (el.parentElement) {
//       el.parentElement.style.setProperty('overflow', 'hidden', 'important');
//     }
//   });
  
//   // 動的に追加される要素のための監視
//   const observer = new MutationObserver(mutations => {
//     mutations.forEach(mutation => {
//       if (mutation.addedNodes) {
//         mutation.addedNodes.forEach(node => {
//           if (node.tagName && ['IMG', 'VIDEO', 'CANVAS', 'SVG'].includes(node.tagName)) {
//             node.style.setProperty('overflow', 'hidden', 'important');
//             node.style.setProperty('contain', 'paint', 'important');
//           }
//         });
//       }
//     });
//   });
  
//   observer.observe(document.body, { childList: true, subtree: true });
// });