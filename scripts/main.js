document.addEventListener('DOMContentLoaded', () => {
  // DOM の読み込みが完了したら読み込まれる
  const header = document.querySelector('header');
  const menu = header.querySelector('.menu');

  const HeaderAnimation = (() => {
    const wrp = { menu };

    wrp.hide = () => {
      if (header.classList.contains('visible')) header.classList.remove('visible');
      header.classList.add('hidden');
      header.style = 'display: none;';
    }

    wrp.show = () => {
      header.style = 'display: flex; opacity: 0;';
      if (header.classList.contains('hidden')) header.classList.remove('hidden');
      setTimeout(() => {
        header.classList.add('visible');
        header.style = 'opacity: 1;';
      }, 100)
      
    }

    return wrp;
  })();

  const BargerAnimation = (() => {
    const wrp = {
      menu,
      button: header.querySelector('#header-barger-btn'),
    };

    const clickHandler = (e) => {
      if (!e.target.closest('.menu') && !e.target.closest('#header-barger-btn')) {
        // 外をクリック
        wrp.hide();
      }
    }

    wrp.hide = () => {
      if (menu.classList.contains('opened')) menu.classList.remove('opened');
      menu.classList.add('closed');
      window.removeEventListener('click', clickHandler);
    }

    wrp.show = () => {
      if (menu.classList.contains('closed')) menu.classList.remove('closed');
      menu.classList.add('opened');
      window.addEventListener('click', clickHandler, false);
    }

    return wrp;
  })();

  // バーガーボタンの設定
  BargerAnimation.button.addEventListener('click', () => {
    // メニューを隠す
    if (menu.classList.contains('opened')) BargerAnimation.hide();
    // メニューを表示する
    else BargerAnimation.show();
  });

  // スクロール時のイベント
  let previousScroll = 0;
  let scrolled = 0;
  window.addEventListener("scroll", () => {
    previousScroll = scrolled;
    scrolled = window.pageYOffset
    if (scrolled > previousScroll) {
      // スクロール時
      HeaderAnimation.hide();
      BargerAnimation.hide();
    } else {
      // バックスクロール時
      HeaderAnimation.show();
    }
  });
});
