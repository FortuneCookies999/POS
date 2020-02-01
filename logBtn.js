const HOVER_CLASS_2 = 'coloring';

function popup(){
  event.preventDefault();
  window.open("log.html", "popup", "width=200, height=500");
}

function createBtn(){
  const table = document.querySelector(".chong");
  const tr = table.querySelector("tr");
  const td = document.createElement("td");
  const btn = document.createElement("text");
  btn.innerText = "거래 내역";
  btn.addEventListener("click", popup);
  td.appendChild(btn);
  td.classList.add(HOVER_CLASS_2);
  tr.appendChild(td);
}

function init(){
  createBtn();
}

init();
