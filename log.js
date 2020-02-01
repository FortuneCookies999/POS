const body = document.querySelector("body");

function init(){
  const LOG_LS = 'log';
  const log = localStorage.getItem(LOG_LS);
  const parsedLog = JSON.parse(log);
  const table = document.createElement("table");
  if(log !== null){
  parsedLog.forEach(function(object){
    const tr = document.createElement("tr");
      if(object.value === "create"){
        const name = document.createElement("td");
        const what = document.createElement("td");
        const all = document.createElement("td");
        name.innerText = object.name;
        what.innerText = "생성";
        all.innerText = object.all;
        tr.appendChild(name);
        tr.appendChild(what);
        tr.appendChild(all);
        table.appendChild(tr);
      }else if(object.value === "sell"){
        const name = document.createElement("td");
        const what = document.createElement("td");
        const all = document.createElement("td");
        name.innerText = object.name;
        what.innerText = "판매";
        all.innerText = object.all;
        tr.appendChild(name);
        tr.appendChild(what);
        tr.appendChild(all);
        table.appendChild(tr);
      }else if(object.value === "cansel"){
        const name = document.createElement("td");
        const what = document.createElement("td");
        const all = document.createElement("td");
        name.innerText = object.name;
        what.innerText = "취소";
        all.innerText = object.all;
        tr.appendChild(name);
        tr.appendChild(what);
        tr.appendChild(all);
        table.appendChild(tr);
      }else if(object.value === "changeName"){
        const name = document.createElement("td");
        const what = document.createElement("td");
        const all = document.createElement("td");
        name.innerText = object.name;
        what.innerText = "이름 변경";
        all.innerText = object.all;
        tr.appendChild(name);
        tr.appendChild(what);
        tr.appendChild(all);
        table.appendChild(tr);
      }else if(object.value === "changePrice"){
        const name = document.createElement("td");
        const what = document.createElement("td");
        const all = document.createElement("td");
        name.innerText = object.name;
        what.innerText = "가격 변경";
        all.innerText = object.all;
        tr.appendChild(name);
        tr.appendChild(what);
        tr.appendChild(all);
        table.appendChild(tr);
      }else if(object.value === "remove"){
        const name = document.createElement("td");
        const what = document.createElement("td");
        const all = document.createElement("td");
        name.innerText = object.name;
        what.innerText = "메뉴 제거";
        all.innerText = object.all;
        tr.appendChild(name);
        tr.appendChild(what);
        tr.appendChild(all);
        table.appendChild(tr);
      }else if(object.value === "check"){
        const name = document.createElement("td");
        const what = document.createElement("td");
        const all = document.createElement("td");
        name.innerText = "";
        what.innerText = "정산";
        all.innerText = object.all;
        tr.appendChild(name);
        tr.appendChild(what);
        tr.appendChild(all);
        table.appendChild(tr);
    }
  body.appendChild(table);
  });
}
}

init();
