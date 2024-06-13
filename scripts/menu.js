const bargerBtn = document.getElementById("barger-menu-btn");
const bargerList = document.getElementById("barger-menu-list");

document.addEventListener('click', (event) => {
  event.preventDefault();
  if(!event.target.closest('.barger-menu-list') && !event.target.closest('.barger-menu-btn')) {
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