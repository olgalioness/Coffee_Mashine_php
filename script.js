"use strict"
let state = "waiting"; // "cooking" "ready"
let balance = document.querySelector(".balance");
let cup = document.querySelector(".cup img");
// onclick="cookCoffee('Американо', 50, this)"
function cookCoffee(name, price, elem) {
  if (state != "waiting") {
    return;
  }
  if (balance.value >= price) {
    state = "cooking";
    balance.style.backgroundColor = "";
    balance.value -= price; // balance.value = balance.value - price
    changeDisplayText(`Ваш ${name} готовится`);
    
    let coffeeImg = elem.querySelector("img");
    let coffeeSrc = coffeeImg.getAttribute("src");
    
    startCooking(name, coffeeSrc);
  } else {
    changeDisplayText("Недостаточно средств");
    balance.style.backgroundColor = "rgb(255, 50, 50)";
  }
}
//Планирование
// setTimeout(func, ms); - отрабатывает только один раз
// setInterval(func, ms); - отрабатывает пока не отключим
// let timeout = setTimeout(func, ms);
// let interval = setInterval(func, ms);
// clearTimeout(timeout)
// clearInterval(interval)
function startCooking(name, src) {
  //let progressBar = document.querySelector(".progress-bar");
  cup.setAttribute("src", src);
  cup.style.display = "inline";
  let t = 0;
  let cookingInterval = setInterval(() => { // то же самое, что и function() {}
    t++;
    cup.style.opacity = t + "%";
    //progressBar.style.width = t + "%";
    changeProgressPercent(t);
    console.log(t);
    if (t == 100) {
      state = "ready";
      clearInterval(cookingInterval);
      changeDisplayText(`Ваш ${name} готов!`);
      cup.style.cursor = "pointer";
      cup.onclick = function() {
        takeCoffee();
      }
    }
  }, 50);
}

function takeCoffee() {
  if (state != "ready") {
    return;
  }
  state = "waiting";
  changeProgressPercent(0);
  cup.style.opacity = 0;
  cup.style.display = ""; // или "none"
  cup.style.cursor = "";
  changeDisplayText("Выберите кофе");
  cup.onclick = null;
}

function changeProgressPercent(percent) {
  let progressBar = document.querySelector(".progress-bar");
  progressBar.style.width = percent + "%";
}

function changeDisplayText(text) {
  if (text.length > 23) {
    text = text.slice(0, 23) + "...";
  }
  let displayText = document.querySelector(".display span");
  displayText.innerHTML = text;
}

//----------Drag'n'Drop-------------------------------------

let money = document.querySelectorAll(".money img");

// for (let i = 0; i < money.length; i++) {
//   money[i].onmousedown = takeMoney;
// }

//<div class="coffee-item" onclick="cookCoffee('Капучино', 92, this)"></div>
/*coffeeItem.onclick = function(event) {
  cookCoffee('Капучино', 92, this);
}*/
//В функцию, которая присвоена событию, передается this, который возвращает элемент, на котором это событие совершено.
for (let bill of money) {
  bill.onmousedown = takeMoney;
}
//В функцию, которая присвоена событию, первым параметром передается объект события - event, e

function takeMoney(event) {
  event.preventDefault();
/*  console.log(this);
  console.log(event);
  console.log([event.target, event.clientX, event.clientY]);*/
  let bill = this;
  
/*  console.log(bill.style.height); // ""
  console.log(bill.style.width); // ""
  console.log( bill.getBoundingClientRect() );*/
  
  let billCoords = bill.getBoundingClientRect(); //Получение объекта, которые описывает положение элемента на странице
  
  let billHeight = billCoords.height;
  let billWidth = billCoords.width;
  
  bill.style.position = "absolute";
  if (!bill.style.transform) { //bill.style.transform == "" ("" == false);
    bill.style.top = (event.clientY - billHeight/2) + "px";
    bill.style.left = (event.clientX - billWidth/2) + "px";
    bill.style.transform = "rotate(90deg)";
  } else {
    bill.style.top = (event.clientY - billWidth/2) + "px";
    bill.style.left = (event.clientX - billHeight/2) + "px";
  }
  bill.style.transition = "transform .3s";
  
  window.onmousemove = function(event) {
    let billCoords = bill.getBoundingClientRect();
    let billHeight = billCoords.height;
    let billWidth = billCoords.width;
    bill.style.top = (event.clientY - billWidth/2) + "px";
    bill.style.left = (event.clientX - billHeight/2) + "px";
  }
  
  bill.onmouseup = function() {
    window.onmousemove = null;
    if ( inAtm(bill) ) {
      let cashContainer = document.querySelector(".cash-container");
      bill.style.position = "";
      bill.style.transform = "rotate(90deg) translateX(25%)";
      cashContainer.append(bill); //Присоединить в конец элемента
      bill.style.transition = "transform 1.5s";
      setTimeout(() => {
        bill.style.transform = "rotate(90deg) translateX(-75%)";
        bill.ontransitionend = () => {
          balance.value = +balance.value + +bill.dataset.cost;
          bill.remove(); //Удаляем элемент
        }
      }, 10);
    }
  }
}

function inAtm(bill) {
  let atm = document.querySelector(".atm img");
  
  let atmCoords = atm.getBoundingClientRect();
  let atmLeftX = atmCoords.x;
  let atmRightX = atmCoords.x + atmCoords.width;
  let atmTopY = atmCoords.y;
  let atmBottomY = atmCoords.y + atmCoords.height/3;
  
  let billCoords = bill.getBoundingClientRect();
  let billLeftX = billCoords.x;
  let billRightX = billCoords.x + billCoords.width;
  let billY = billCoords.y;
  if(
        billLeftX > atmLeftX
    &&  billRightX < atmRightX
    &&  billY > atmTopY
    &&  billY < atmBottomY
    ) {
    return true;    
  } else {
    return false;
  }
}

//Получение сдачи, создание элементов с использование JavaScript
let changeButton = document.querySelector(".change-button");
changeButton.onclick = takeChange;

function takeChange() {
  if (+balance.value >= 10) {
    createCoin("10");
    balance.value -= 10;
    return setTimeout(takeChange, 300);
  } else if (+balance.value >= 5) {
    createCoin("5");
    balance.value -= 5;
    return setTimeout(takeChange, 300);
  } else if (+balance.value >= 2) {
    createCoin("2");
    balance.value -= 2;
    return setTimeout(takeChange, 300);
  } else if (+balance.value >= 1) {
    createCoin("1");
    balance.value -= 1;
    return setTimeout(takeChange, 300);
  }
}

function createCoin(cost) {
  let coinSrc = "";
  switch (cost) {
    case "10":
      coinSrc = "img/10rub.png";
      break;
    case "5":
      coinSrc = "img/5rub.png";
      break;
    case "2":
      coinSrc = "img/2rub.png";
      break;
    case "1":
      coinSrc = "img/1rub.png";
      break;
    default:
      console.error("Такой монеты не существует");
  }
  // if (cost == "10") {
  //   //
  // } else if (cost == "5") {
  //   //
  // } else if (cost == "2") {
  //   //
  // } else if (cost == "1") {
  //   //
  // } else {
  //   //
  // }
  let changeBox = document.querySelector(".change-box");
  let changeBoxWidth = changeBox.getBoundingClientRect().width;
  let changeBoxHeight = changeBox.getBoundingClientRect().height;
  let coin = document.createElement("img");
  coin.setAttribute("src", coinSrc);
  coin.style.width = "50px";
  coin.style.cursor = "pointer";
  coin.style.position = "absolute";
  coin.style.top = Math.floor(Math.random() * (changeBoxHeight - 50)) + "px";
  coin.style.left = Math.floor(Math.random() * (changeBoxWidth - 50)) + "px";
  changeBox.append(coin); // Добавляет элемент в конец родительского
  //changeBox.prepend(coin); //Добавляет элемент в начало родительского
  //changeBox.after(coin); //Добавляет элемент после родительского
  //changeBox.before(coin); //Добавляет элемент до родительского
  //changeBox.replaceWith(coin); //Заменяет родительский элемент
  coin.style.transition = "transform .5s, opacity .5s";
  coin.style.transform = "translateY(-20%)";
  coin.style.opacity = 0;
  setTimeout(() => {
    coin.style.transform = "translateY(0%)";
    coin.style.opacity = 1;
  },10)
  
  coin.onclick = () => {
    coin.style.transform = "translateY(-20%)";
    coin.style.opacity = 0;
    coin.ontransitionend = () => {
      coin.remove();
    }
  }
}













