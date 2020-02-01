const form = document.querySelector(".menu");
const body = document.querySelector("body");
const table = form.querySelector("table");
const all = document.querySelector("#all");

const MENU_LS = 'menuList',
      CASH_CLASS = 'cash',
      COUNT_CLASS = 'count',
      HOWMUCH_LS = 'howMuch',
      LOG_LS = 'log',
      HOVER_CLASS = 'coloring';

let menuList = [];
let logList = [];

function earning(what){
  let cash = 0;
  let i = 0;
  let savedMoney = localStorage.getItem(HOWMUCH_LS);
  if(savedMoney === null){
  while(i < menuList.length){
    const object = menuList[i];
    const money = parseInt(object.cash);
    cash = cash + money;
    i++;
  }
  all.innerText = cash + '원';
  localStorage.setItem(HOWMUCH_LS, cash);
  }else{
    let loadingMoney = parseInt(savedMoney);
    loadingMoney = loadingMoney + parseInt(what);
    all.innerText = loadingMoney + '원';
    localStorage.setItem(HOWMUCH_LS, loadingMoney);
  }
}

function removing(){
  event.preventDefault();
  const real = prompt("메뉴를 삭제하시겠습니까? 삭제하실 것이면 'yes'를 입력해주십시오", "");
  const btn = event.target;
  const td = btn.parentNode;
  const tr = td.parentNode;
  const object = menuList[tr.id-1];
  if(real === 'yes'){
  table.removeChild(tr);
  const newMenuList = menuList.filter(function(newlist){
    return newlist.id !==parseInt(tr.id);
  });
  localStorage.setItem(MENU_LS, JSON.stringify(newMenuList));
  menuList = newMenuList;
  }
  const logObj = {
    name : object.name,
    value : 'remove',
    all : localStorage.getItem(HOWMUCH_LS)
  }
  logList.push(logObj);
  localStorage.setItem(LOG_LS, JSON.stringify(logList));
}

function changeName(what){
  event.preventDefault();
  const btn = event.target;
  const td = btn.parentNode;
  const tr = td.parentNode;
  const oldFrom = menuList[tr.id-1];
  const newName = prompt("새로운 이름:", "");
  oldFrom.name = newName;
  btn.innerText = newName;
  localStorage.setItem(MENU_LS, JSON.stringify(menuList));
  const logObj = {
    name : oldFrom.name,
    value : 'changeName',
    newName : newName,
    all : localStorage.getItem(HOWMUCH_LS)
  }
  logList.push(logObj);
  localStorage.setItem(LOG_LS, JSON.stringify(logList));
}

function counting(){
  event.preventDefault();
  const btn = event.target;
  const td = btn.parentNode;
  const tr = td.parentNode;
  const object = menuList[tr.id-1];
  const price = parseInt(object.price);
  let count = parseInt(btn.innerText);
  count++;
  btn.innerText = count;
  object.number = count;
  const cash = tr.querySelector(".cash");
  const money = price + object.cash;
  cash.innerText = money;
  object.cash = money;
  localStorage.setItem(MENU_LS, JSON.stringify(menuList));
  earning(price);
  const logObj = {
    name : object.name,
    value : 'sell',
    all : localStorage.getItem(HOWMUCH_LS)
  }
  logList.push(logObj);
  localStorage.setItem(LOG_LS, JSON.stringify(logList));
}

function canceling(){
  event.preventDefault();
  const btn = event.target;
  const td = btn.parentNode;
  const tr = td.parentNode;
  const object = menuList[tr.id-1];
  const price = parseInt(object.price);
  let count = object.number;
  if(count !==0){
  count = count - 1;
  object.number = count;
  const cash = tr.querySelector(".cash");
  const target = tr.querySelector(".count");
  const money = object.cash - price;
  cash.innerText = money;
  target.innerText = count;
  object.cash = money;
  localStorage.setItem(MENU_LS, JSON.stringify(menuList));
  }
  const earn = price * -1;
  earning(earn);
  const logObj = {
    name : object.name,
    value : 'cansel',
    all : localStorage.getItem(HOWMUCH_LS)
  }
  logList.push(logObj);
  localStorage.setItem(LOG_LS, JSON.stringify(logList));
}

function pricechange(){
  event.preventDefault();
  const btn = event.target;
  const td = btn.parentNode;
  const tr = td.parentNode;
  const object = menuList[tr.id-1];
  const price = parseInt(object.price);
  const ask = prompt("새로운 가격:", "");
  const newPrice = parseInt(ask);
  btn.innerText = newPrice;
  object.price = newPrice;
  localStorage.setItem(MENU_LS, JSON.stringify(menuList));
  const logObj = {
    name : object.name,
    value : 'changePrice',
    newPrice : newPrice,
    all : localStorage.getItem(HOWMUCH_LS)
  }
  logList.push(logObj);
  localStorage.setItem(LOG_LS, JSON.stringify(logList));
}

function checking(){
  event.preventDefault();
  const now = prompt("정산액 :", "");
  all.innerText = now;
  localStorage.setItem(HOWMUCH_LS, now);
  const logObj = {
    value : 'check',
    money : now,
    all : localStorage.getItem(HOWMUCH_LS)
  }
  logList.push(logObj);
  localStorage.setItem(LOG_LS, JSON.stringify(logList));
}

function creatingPrice(what){
  const td = document.createElement("td");
  const btnPrice = document.createElement("text");
  btnPrice.innerText = what;
  btnPrice.addEventListener("click", pricechange);
  td.appendChild(btnPrice);
  td.classList.add(HOVER_CLASS);
  return td
}

function creatingCash(what, how){
  const td = document.createElement("td");
  const span = document.createElement("span");
  span.innerText = what;
  span.classList.add(CASH_CLASS);
  td.appendChild(span);
  return td
}

function createMenuBtn(what){
  const td = document.createElement("td");
  const btnMenu = document.createElement("text");
  btnMenu.innerText = what;
  btnMenu.addEventListener("click", changeName);
  td.appendChild(btnMenu);
  td.classList.add(HOVER_CLASS);
  return td
}

function createCountBtn(what){
  const td = document.createElement("td");
  const btnCount = document.createElement("text");
  btnCount.innerText = what;
  btnCount.classList.add(COUNT_CLASS);
  btnCount.addEventListener("click", counting);
  td.appendChild(btnCount);
  td.classList.add(HOVER_CLASS);
  return td
}

function creatingCancel(){
  const td = document.createElement("td");
  const btnCancel = document.createElement("text");
  btnCancel.innerText = "직전취소";
  btnCancel.addEventListener("click", canceling);
  td.appendChild(btnCancel);
  td.classList.add(HOVER_CLASS);
  return td
}

function createDelBtn(what){
  const td = document.createElement("td");
  const btnDel = document.createElement("text");
  btnDel.innerText = what;
  btnDel.addEventListener("click", removing);
  td.appendChild(btnDel);
  return td
}

function loadMenu(name, price, id, number, cash){
  const newMenu = {
    name: name,
    price: price,
    id : menuList.length+1,
    number : number,
    cash : cash
  }
  const tr = document.createElement("tr");
  const menuName = createMenuBtn(newMenu.name);
  const menuPrice = creatingPrice(newMenu.price);
  const count = createCountBtn(newMenu.number);
  const money = creatingCash(newMenu.cash);
  const cancelBtn = creatingCancel();
  const delBtn = createDelBtn("삭제");
  delBtn.classList.add(HOVER_CLASS);
  tr.appendChild(menuName);
  tr.appendChild(menuPrice);
  tr.appendChild(count);
  tr.appendChild(money);
  tr.appendChild(cancelBtn);
  tr.appendChild(delBtn);
  tr.append
  tr.id = newMenu.id;
  table.appendChild(tr);
  menuList.push(newMenu);
}

function createMenu(){
  const name = prompt("메뉴 이름:","");
  const price = prompt("가격", "");
  const id = menuList.length + 1;
  const number = 0;
  const cash = 0;
  loadMenu(name, price, id, number, cash);
  localStorage.setItem(MENU_LS, JSON.stringify(menuList));
  const logObj = {
    name : name,
    value : 'create',
    all : localStorage.getItem(HOWMUCH_LS)
  }
  logList.push(logObj);
  localStorage.setItem(LOG_LS, JSON.stringify(logList));
}

function createBtn(){
  const creBtn = document.createElement("text");
  const table = document.querySelector(".chong");
  const tr = table.querySelector("tr");
  const td = document.createElement("td");
  creBtn.innerText = "메뉴추가";
  creBtn.addEventListener("click", createMenu);
  td.appendChild(creBtn);
  td.classList.add(HOVER_CLASS);
  tr.appendChild(td);
}

function loadSavedMenu(){
  const loadedMenu = localStorage.getItem(MENU_LS);
  if(loadedMenu !== null){
    const parsedMenu = JSON.parse(loadedMenu);
    parsedMenu.forEach(function(menuList){
      loadMenu(menuList.name, menuList.price, menuList.id, menuList.number, menuList.cash);
    });
  }
}

function createAllBtn(){
  const targettable = document.querySelector(".chong");
  const tr = targettable.querySelector("tr");
  const td = document.createElement("td");
  const btn = document.createElement("text");
  btn.innerText = "정산";
  btn.addEventListener("click", checking);
  td.appendChild(btn);
  td.classList.add(HOVER_CLASS);
  tr.appendChild(td);
  targettable.appendChild(tr);
}

function loadLog(){
  const log = localStorage.getItem(LOG_LS);
  const parsedLog = JSON.parse(log);
  if(log !==null){
  parsedLog.forEach(function(what){
    logList.push(what);
  });
  }
}

function init(){
  loadLog();
  createAllBtn();
  loadSavedMenu();
  createBtn();
  let money = localStorage.getItem(HOWMUCH_LS);
  if(money === null){money = 0;}
  all.innerText = money + '원';
}

init();
