// BEGIN
const ORIGIN = location.origin;
const RESOURCEROOT = origin + "/panmryofficial";
window.addEventListener('DOMContentLoaded', function () {
    linkClickOperation();
    bargerMenuAnimation();
    hideHeaderWhenScroll();
    checkHeaderNavListActive();
    toggleHeaderNavListActive();
    observer.observe(document.getElementById('body-header'));
});

// aタグ押下時の動作を網羅
const linkClickOperation = function () {
    const linkElements = [
        document.querySelectorAll(`a[href^="#"]`),  // Ex href=#intro
        document.querySelectorAll(`a[href*=".html#"]`),  // Ex href = ./works.html#intro
        document.querySelectorAll(`a[href^="https"]`)  // Ex href = https://youtube.com
    ];
    linkElements[0].forEach(elem => {
        // ページ内インデックス
        elem.addEventListener('click', (e) => {
            e.preventDefault();
            let href = elem.getAttribute('href');
            let linked_id = document.getElementById(href.replace('#', ''));
            const rect = linked_id.getBoundingClientRect().top;
            const offset = window.pageYOffset;
            const position = rect + offset;
            window.scrollTo({
                top: position,
                behavior: 'smooth',
            });
        });
    });
    linkElements[1].forEach(elem => {
        // ファイルアドレス付きインデックス
        let currentHtmlFile = window.location.href.split('/').pop().split('#').shift(); // -> "index.html"
        if (elem.getAttribute('href').includes(currentHtmlFile)) {
            // リンク先ファイルが現在のページのとき
            elem.addEventListener('click', (e) => {
                e.preventDefault();
                let href = elem.getAttribute('href').split('#').pop(); // "./current.html#intro" -> "intro"
                let linked_id = document.getElementById(href);
                const rect = linked_id.getBoundingClientRect().top;
                const offset = window.pageYOffset;
                const position = rect + offset;
                window.scrollTo({
                    top: position,
                    behavior: 'smooth',
                });
            });
        } else {
            elem.addEventListener('click', (e) => {
                window.location.href = elem.getAttribute('href');
            });
        }
    })
}

// モバイル向けバーガーメニューのアニメーション
const bargerMenuAnimation = function () {
    const bargerBtn = document.getElementById("barger-menu-btn");
    const bargerList = document.getElementById("barger-menu-list");

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.barger-menu-list') && !event.target.closest('.barger-menu-btn')) {
            // barger-menu-list, barger-menu-btn外をクリック
            if (bargerBtn.className.split(" ").includes("active")) {
                // barger-menu-btn = activeのとき
                bargerBtn.classList.remove("active");
                bargerList.classList.remove("panelactive");
            }
        }
    }, false);

    // btnクリックでtoggle
    bargerBtn.onclick = () => {
        // barger-menu-btn クリック
        bargerBtn.classList.toggle("active");
        bargerList.classList.toggle("panelactive");
    }

    // リンクをクリックしたら閉じる
    const listItems = document.getElementsByClassName("h-nav-list-item");
    for (let i = 0; i < listItems.length; i++) {
        const element = listItems[i].lastElementChild;
        element.addEventListener("click", () => {
            // barger-menu-btn クリック
            bargerBtn.classList.remove("active");
            bargerList.classList.remove("panelactive");
            // 強制遷移
            let href = element.getAttribute('href');
            window.location.href = href;
        });
    };
}

// Scroll発生時、ヘッダーナビゲーションの表示／非表示切り替え
const hideHeaderWhenScroll = function () {
    const header = document.querySelector("header");
    const menu = document.querySelector(".menu");
    const bgBtn = document.getElementById("barger-menu-btn");
    let previousScroll = 0;  // 前回のスクロール量
    let scrolled = 0;  // 現在のスクロール量

    window.addEventListener("scroll", () => {
        previousScroll = scrolled;
        scrolled = window.pageYOffset

        if (scrolled > previousScroll) {  // スクロールした時
            header.style = "position: absolute; top: -100%"; // headerを画面外へ非表示
            bgBtn.style = "position: absolute; top: -100%"; // headerを画面外へ非表示
        } else {  // バックスクロールした時
            header.style = "position: fixed; top: 0;"; // headerを再表示
            bgBtn.style = "position: fixed; top: 4px; right: 10px;"; // headerを再表示
        }
    });
}


// Intersection Observer API : entriesにviewportが交わったとき、コールバック関数を実行する
// 対象が表示されたとき、ヘッダーナビゲーションを強制表示する
const observer = new IntersectionObserver((entries) => {
    const header = document.querySelectorAll(".header-nav")[0];
    const bgBtn = document.getElementById("barger-menu-btn");
    // entries: 監視対象すべてが入っているリスト  
    for (const e of entries) {
        if (e.isIntersecting) {
            // viewport に交差し、入ったとき
            header.style = "position: fixed; top: 0;"; // headerを再表示
            bgBtn.style = "position: fixed; top: 4px; right: 10px;"; // headerを再表示
        }
    }
});
 
// h-link-pc/h-link-sp すべてから class=h-nav-list-active を除去
const headerNavListReset = function () {
    document.querySelectorAll(".h-link-pc").forEach((pclink) => {
        if (pclink.classList.contains("h-nav-list-active")) pclink.classList.remove("h-nav-list-active");
    });
    document.querySelectorAll(".h-link-sp").forEach((splink) => {
        if (splink.classList.contains("h-nav-list-active")) splink.classList.remove("h-nav-list-active");
    });
}

// HTMLdoc の <body> id="for-***"を取得し、classに一致する値を持つh-link-pc/h-link-sp にclass=h-nav-list-activeを付与
const checkHeaderNavListActive = function () {
    const docId = document.body.id;
    document.querySelectorAll(".h-link-pc").forEach((pclink) => {
        if (pclink.classList.contains(docId)) pclink.classList.add("h-nav-list-active");
    });
    document.querySelectorAll(".h-link-sp").forEach((splink) => {
        if (splink.classList.contains(docId)) splink.classList.add("h-nav-list-active");
    });
}

// h-link-pc/h-link-sp がクリックされたときに 当該要素にclass=h-nav-list-activeを付与する
const toggleHeaderNavListActive = function () {
    document.querySelectorAll(".h-link-pc").forEach((a) => {
        a.addEventListener('click', (event) => {
            headerNavListReset();
            a.classList.add("h-nav-list-active");
        });
    })
}