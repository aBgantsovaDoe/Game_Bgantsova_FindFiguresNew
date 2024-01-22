var scoreFirstLevel = 600;
var scoreTimer = scoreFirstLevel;
var fullScore = 0;
let timerInterval = null;


function timer(newTime){
const TIME_LIMIT = newTime;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;
const COLOR_CODES = {
    info: {
      color: "green"
    },
    warning: {
      color: "orange",
      threshold: WARNING_THRESHOLD
    },
    alert: {
      color: "red",
      threshold: ALERT_THRESHOLD
    }
  };
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;
startTimer();
function onTimesUp() {
  clearInterval(timerInterval);
  finishFirstLevelFailed();
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
    scoreFirstLevel = scoreFirstLevel - TIME_LIMIT/6;
    setCircleDasharray();
    setRemainingPathColor(timeLeft);
    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}
}
function onTimesUpStop() {
    clearInterval(timerInterval);
  }

// Переменная состояния для отслеживания текущего состояния уровня
let levelState = "stopped";

// Функция для обработки нажатия на кнопку
function handleButtonClick() {
  if (levelState === "stopped") {
    startFirstLevel();
  } else if (levelState === "running") {
    finishFirstLevelFailed();
  } else if (levelState === "completed") {
    startNextLevel();
  }
  else if(levelState === "stopped2"){
    startSecondLevel();
  }
  else if(levelState === "stopped3"){
    startThirdLevel();
  }
}



// Получаем ссылку на кнопку
const button = document.getElementById("rndBtn");
const button2 = document.getElementById("next-level");

document.addEventListener("DOMContentLoaded", function() {
    button.addEventListener("click", handleButtonClick);
});
// Назначаем обработчик события на клик по кнопке

function finishFirstLevelFailed()
{
 onTimesUpStop();
 content.innerHTML = null;
 document.getElementById("app").innerHTML = ``;
 var element = document.createElement("p");
 element.textContent = 'Ваше время вышло или вы нажали на кнопку остановить. Чтобы начать уровень заново нажмите на кнопку "Начать заново"';
 content.appendChild(element);
 if (document.querySelector('.level-number').textContent == 1)
 {
 levelState = "stopped";
 }
 else
 {
 if (document.querySelector('.level-number').textContent == 2)
 {
 levelState = "stopped2";
 }
 else 
 {
    levelState = "stopped3";
 }
 }
 // Изменяем текст кнопки
 button.innerHTML = "Начать уровень заново";
}

const difficalty = sessionStorage.getItem('difficulty');
document.querySelector('.level-number').textContent = 1;
document.querySelector('.name').textContent = sessionStorage.getItem('name');
document.querySelector('.difficulty').textContent = difficalty === 'easy' ? 'легко' : 'сложно';
var content = document.querySelector('.content');
function startFirstLevel()
{
  if(!button2.classList.contains('hidden'))
  {
  button2.classList.add('hidden');
  }
content.innerHTML = null;
scoreFirstLevel=600;
scoreTimer=600;
var counter = 0;
var countTrue = 0;
var content1 = document.querySelector('.content');
var class1 = "map-location";
var Task = ["Найдите ВСЕ трегольники", "Найдите ВСЕ квадраты", "Найдите ВСЕ трапеции"];
var TaskHard = ["Найдите ВСЕ треугольники И ВСЕ квадраты", "Найдите ВСЕ трапеции И НЕ треугольники", "Найдите ВСЕ перевернутые фигуры"];
var randomIndexNew = Math.floor(Math.random() * Task.length);
if (difficalty == "easy")
document.querySelector('.task-text').textContent = Task[randomIndexNew];
else
document.querySelector('.task-text').textContent = TaskHard[randomIndexNew];
var nameClass = [{class:"triangle-up", rotate: false, rigthAnswer: false},{class:"square", rotate: false, rigthAnswer: false},{class:"triangle-down", rotate: true, rigthAnswer: false},{class:"trapezoid-up", rotate: false, rigthAnswer: false},{class:"trapezoid-down", rotate: true, rigthAnswer: false},{class:"square-rotate", rotate: true, rigthAnswer: false},{class:"triangle-down", rotate: true, rigthAnswer: false},{class:"square", rotate: false, rigthAnswer: false},{class:"triangle-up", rotate: false, rigthAnswer: false},{class:"trapezoid-up", rotate: false, rigthAnswer: false}];
var indexNameClass = [0,1,2,3,4,5,6,7,8,9];
var newlight = document.createElement("div");;
var class2 = "light";
newlight.classList.add(class2);
content.appendChild(newlight);
startPosition();
function startPosition(e) {
  while (counter != 10) {
    var randomIndexIndex = Math.floor(Math.random() * indexNameClass.length);
    var randomIndex = indexNameClass[randomIndexIndex];
    var element = document.createElement("p");
    element.id = randomIndex;
    element.classList.add(class1);
    element.classList.add(nameClass[randomIndex].class);
    indexNameClass.splice(randomIndexIndex, 1);
    counter++;
    content1.appendChild(element);
    const maxX = (content1.getBoundingClientRect().left + content1.getBoundingClientRect().width);
    const maxY = content1.getBoundingClientRect().top + content1.getBoundingClientRect().height;
    const minX = content1.getBoundingClientRect().left + 5;
    const minY = content1.getBoundingClientRect().top + 5;
    loc = document.querySelectorAll('.map-location');levelState = "running";
    for(var i = 0; i < loc.length; i++){
      loc[i].style.top =  `${Math.floor((Math.random()*(maxY-minY-loc[i].getBoundingClientRect().height+1)+minY)/window.innerHeight*100)}%`;
      loc[i].style.left = `${Math.floor((Math.random()*(maxX-minX-loc[i].getBoundingClientRect().width+1)+minX)/window.innerWidth*100)}%`;
    };
  } 
  timer(60);
  levelState = "running";
  button.innerHTML = "Остановить уровень";
  loc = document.querySelectorAll('.map-location');
  for (let i = 0; i < 10; i++) {
  clickP(loc[i]);
  }

}

function clickP(loc) {
    loc.onmousedown = (e) => {
        switch(difficalty)
        {
            case "easy":
                switch(randomIndexNew)
                {
                    case 0: 
                    if((loc.classList.contains('triangle-up') || loc.classList.contains('triangle-down')) && nameClass[loc.id].rigthAnswer == false)
                    {
                        nameClass[loc.id].rigthAnswer = true;
                        countTrue++;
                        if (countTrue == 4) finishLevelSuccess();
                    }
                    break;
                    case 1: 
                    if((loc.classList.contains('square') || loc.classList.contains('square-rotate'))&& nameClass[loc.id].rigthAnswer == false)
                    {
                        nameClass[loc.id].rigthAnswer = true;
                        countTrue++;
                        if (countTrue == 3) finishLevelSuccess();
                    }
                    break;
                    case 2: 
                    if((loc.classList.contains('trapezoid-up') || loc.classList.contains('trapezoid-down'))&& nameClass[loc.id].rigthAnswer == false)
                    {
                        nameClass[loc.id].rigthAnswer = true;
                        countTrue++;
                        if (countTrue == 3) finishLevelSuccess();
                    }   
                    break;
                }
                break;
            case "hard":
                switch(randomIndexNew)
                {
                    case 0: 
                    if((loc.classList.contains('triangle-up') || loc.classList.contains('triangle-down') || loc.classList.contains('square') || loc.classList.contains('square-rotate')) && nameClass[loc.id].rigthAnswer == false)
                    {
                        nameClass[loc.id].rigthAnswer = true;
                        countTrue++;
                        if (countTrue == 7) finishLevelSuccess();
                    }
                    break;
                    case 1: 
                    if(!(loc.classList.contains('triangle-up') || loc.classList.contains('triangle-down')) && nameClass[loc.id].rigthAnswer == false)
                    {
                        nameClass[loc.id].rigthAnswer = true;
                        countTrue++;
                        if (countTrue == 6) finishLevelSuccess();
                    }
                    break;
                    case 2: 
                    if((loc.classList.contains('triangle-down') || loc.classList.contains('trapezoid-down') || loc.classList.contains('square-rotate'))&& nameClass[loc.id].rigthAnswer == false)
                    {
                        nameClass[loc.id].rigthAnswer = true;
                        countTrue++;
                        if (countTrue == 4) finishLevelSuccess();
                    }   
                    break;

                }
        };
          
    };
}

let light = document.querySelector('.light');
light.style.background = `radial-gradient(circle at 0% 0%, transparent 25px, rgba(0,0,0,1) 40px)`;
document.addEventListener('mousemove', function(e){
   let x = (e.pageX-content.getBoundingClientRect().left)/(content.getBoundingClientRect().width)*100;
   let y = (e.pageY-content.getBoundingClientRect().top)/(content.getBoundingClientRect().height)*100;
   let z = Math.max(content.getBoundingClientRect().height,content.getBoundingClientRect().width)/15;
   light.style.background = `radial-gradient(circle at ${x}% ${y}%, transparent ${z}px, rgba(0,0,0,1) ${z+20}px)`;
});
}

function startSecondLevel()
{
  if(!button2.classList.contains('hidden'))
  {
  button2.classList.add('hidden');
  }
    scoreFirstLevel = 600;
    scoreTimer=600;
    var TaskEasySecondLevel = ["Сформируйте две группы: животные и птицы.", "Сформируйте две группы: животные из мультика '38 попугаев' и все остальные.", "Сформируйте две группы: живут на деревьях и живут на земле."];
    var randomIndexNew = Math.floor(Math.random() * TaskEasySecondLevel.length);
    if (difficalty == "easy")
       {  document.querySelector('.task-text').textContent = TaskEasySecondLevel[randomIndexNew] + " Все фигуры должны быть ровными. Чтобы перевернуть фигуру нажмите на любую клавишу на клавиатуре."; timer(60);}
       else {document.querySelector('.task-text').textContent = "Сформируйте группы по цветовой категории"; timer(30);}
    content.innerHTML = `<div class="figure bird"><img src="./assets/logo/bird.png" class="pic"></div>
    <div class="figure bird"><img src="./assets/logo/parrot.png" class="pic"></div>
    <div class="figure bird"><img src="./assets/logo/owl.png" class="pic"></div>
    <div class="figure beast"><img src="./assets/logo/elephant.png" class="pic"></div>
    <div class="figure beast"><img src="./assets/logo/fox.png" class="pic"></div>
    <div class="figure beast"><img src="./assets/logo/monkey.png" class="pic"></div>`;
    const figure = document.getElementsByClassName('figure');
    const picture = document.getElementsByClassName('pic');
    const birds = document.getElementsByClassName("bird");
    const beasts = document.getElementsByClassName("beast");
    var content2 = document.querySelector('.content');
    class element {
        constructor(x, y, angle) {
            this.x = x;
            this.y = y;
            this.angle = angle;
            this.cur_angle = angle;
        }
      }
      levelState = "running";
      button.innerHTML = "Остановить уровень";
      startPosition();
      function startPosition(){
      elements = [
        new element(Math.floor(Math.random()*(content2.getBoundingClientRect().left + content2.getBoundingClientRect().width - 200)), Math.floor(Math.random()*(content2.getBoundingClientRect().top + content2.getBoundingClientRect().height - 200)), 180),
        new element(Math.floor(Math.random()*(content2.getBoundingClientRect().left + content2.getBoundingClientRect().width - 200)), Math.floor(Math.random()*(content2.getBoundingClientRect().top + content2.getBoundingClientRect().height - 200)), 225),
        new element(Math.floor(Math.random()*(content2.getBoundingClientRect().left + content2.getBoundingClientRect().width - 200)), Math.floor(Math.random()*(content2.getBoundingClientRect().top + content2.getBoundingClientRect().height - 200)), -90),
        new element(Math.floor(Math.random()*(content2.getBoundingClientRect().left + content2.getBoundingClientRect().width - 200)), Math.floor(Math.random()*(content2.getBoundingClientRect().top + content2.getBoundingClientRect().height - 200)), 45),
        new element(Math.floor(Math.random()*(content2.getBoundingClientRect().left + content2.getBoundingClientRect().width - 200)), Math.floor(Math.random()*(content2.getBoundingClientRect().top + content2.getBoundingClientRect().height - 200)), -135),
        new element(Math.floor(Math.random()*(content2.getBoundingClientRect().left + content2.getBoundingClientRect().width - 200)), Math.floor(Math.random()*(content2.getBoundingClientRect().top + content2.getBoundingClientRect().height - 200)), 315)];
        from_start();
        rotateOnKey();
      
      function from_start() {
        for (let i = 0; i < 6; i++) {
            from_start1(figure.item(i), picture.item(i), i);
        }
        move();
        function from_start1(fig, pic, i) {
            elements[i].inItsArea = false;
            fig.style.left = elements[i].x + "px";
            fig.style.top = elements[i].y + "px";
            rotate(pic, i, elements[i].angle);
            pic.style.display = 'block';
            pic.style.border = 0;
        }
      }
    }
      function move() {
        for (let i = 0; i < 6; i++) {
              moving(figure.item(i));
        }
        
        function moving(fig) {
            fig.ondragstart = () => {
                return false;
            };
            fig.onmousedown = (e) => {
                const coords = getCoords(fig);
                const shiftX = e.clientX - coords.left;
                const shiftY = e.clientY - coords.top;
                document.onmousemove = (e) => {
                    fig.style.left = Math.max(0, Math.min(e.pageX - shiftX, content2.getBoundingClientRect().left + content2.getBoundingClientRect().width - fig.offsetWidth)- content2.getBoundingClientRect().left) + 'px';
                    fig.style.top = Math.max(0, Math.min(e.pageY - shiftY, content2.getBoundingClientRect().top + content2.getBoundingClientRect().height - fig.offsetHeight) - content2.getBoundingClientRect().top) + 'px';
                  };
                fig.onmouseup = () => {
                    document.onmousemove = null;
                    if (!check())
                    {
                        finishLevelSuccess();
                    }
                };
                function getCoords(fig) {
                    let x = fig.getBoundingClientRect();
                    return {
                        top: x.top + pageXOffset,
                        left: x.left + pageYOffset
                    };
                }
            };
        }
      }
      
      function rotateOnKey() {
        for (let i = 0; i < 6; i++) {
            picture.item(i).onclick = () => {
                document.onkeydown = () => {
                    rotate(picture.item(i), i, elements[i].cur_angle + 45);
                    if (!check())
                    {
                        finishLevelSuccess();
                    }
                }
            }
        }
      }
      
      function rotate(pic, i, x) {
            pic.style.transform = 'rotate(' + x + 'deg)';
            elements[i].cur_angle = x;
      }
      
      
      function check() {
        let x = 0;
        switch(difficalty)
        {
            case "easy":
                switch(randomIndexNew)
                {
                    case 0: 
                    for (let i = 1; i < 3; i++) {
                        x += check1(i, i-1);
                    }
                    for (let i = 4; i < 6; i++) {
                        x += check1(i, i-1);
                    }
                    if (x === 4) { return false;}
                    else {return true;}
                    case 1: 
                        x += check1(3, 1);
                        x += check1(5, 3);
                        x += check1(2, 0);
                        x += check1(4, 2);
                    if (x === 4) { return false;}
                    else {return true;}
                    case 2: 
                        x += check1(2, 0);
                        x += check1(2, 1);
                        x += check1(5, 2);
                        x += check1(5, 1);
                        x += check1(4, 3);
                    if (x ===5) { return false;}
                    else {return true;}
                }
            break;
            case "hard":
                    if (((check1(1,0)+check1(4,1))===2) && (check1(5,2)===1) && (check1(3,1)+check1(3,2)==0)) { return false;}
                    else {return true;}
               
        };

      
        function check1(i, j) {
            const fig1 = figure.item(i);
            const fig2 = figure.item(j);
            const x1 = fig1.offsetLeft;
            const y1 = fig1.offsetTop;
            const x2 = fig2.offsetLeft;
            const y2 = fig2.offsetTop;
            if (x2 < x1 + fig1.offsetWidth &&
                x2 + fig1.offsetWidth > x1 &&
                y2 < y1 + fig1.offsetHeight &&
                y2 + fig2.offsetHeight > y1
                && elements[i].cur_angle % 360 === 0 && elements[j].cur_angle % 360 === 0) {
                return 1;
            }
            return 0;
        }
      }
      
}

function startThirdLevel()
{
  if(!button2.classList.contains('hidden'))
  {
  button2.classList.add('hidden');
  }
content.innerHTML = null;
var TaskEasyThirdLevel = ["Нажмите на ВСЕ картинки", "Нажмите на изображения, где виден только один глаз", "Нажмите на изображения, где изображена только голова"];
var TaskHardThirdLevel = ["Нажмите на фигуры в ОБРАТНОМ алфавитном порядке. Если вы ошибаетесь - уровень аннулирован.", "Нажмите на фигуры в алфавитном порядке. Если вы ошибаетесь - уровень аннулирован.", "Нажмите на изображения знаков китайского календаря, которые были (будут) в 2023, 2025, 2026 годах. При неверном ответ - уровень остановлен."];
    if (difficalty == "easy")
       {scoreFirstLevel = 1200;
        scoreTimer=1200; 
        var randomIndexNew = Math.floor(Math.random() * TaskEasyThirdLevel.length);  document.querySelector('.task-text').textContent = TaskEasyThirdLevel[randomIndexNew]; timer(60);}
       else { 
        scoreFirstLevel = 2400;
        scoreTimer=2400;
        var randomIndexNew = Math.floor(Math.random() * TaskHardThirdLevel.length); document.querySelector('.task-text').textContent = TaskHardThirdLevel[randomIndexNew]; timer(30);}
let container = document.querySelector(".content");
let counter = 0;
let countTrue = 0;

let shar = "shar";
var ArrayImages = [{image:"./assets/logo/horse.png", placeholder:"Лошадь", easylevel:5, correctItem: false},{image:"./assets/logo/monkey2.png", placeholder:"Обезьяна", easylevel:6, correctItem: false}, {image:"./assets/logo/mull.png", placeholder:"Бык", easylevel:1, correctItem: false}, {image:"./assets/logo/pig.png", placeholder:"Свинья", easylevel:7, correctItem: false}, {image:"./assets/logo/rabbit.png", placeholder:"Кролик", easylevel:3, correctItem: false},{image:"./assets/logo/rat.png", placeholder:"Крыса", easylevel:4, correctItem: false},{image:"./assets/logo/snake.png", placeholder:"Змея", easylevel:2, correctItem: false}];
var ArrayImagesId = [0,1,2,3,4,5,6];
var ArrayClassesEasy = ["shar1","shar2","shar3","shar4","shar5","shar6","shar7"];
var ArrayClassesHard = ["shar1_hard","shar2_hard","shar3_hard","shar4_hard","shar5_hard","shar6_hard","shar7_hard"];
levelState = "running";
button.innerHTML = "Остановить уровень";
startPosition();
function startPosition(e) {
    while (counter != 7) {
      var randomIndexIndex = Math.floor(Math.random() * ArrayImagesId.length);
      var randomIndex = ArrayImagesId[randomIndexIndex];
      var element = document.createElement("div");
      element.id = randomIndex;
      element.classList.add(shar);
      if (difficalty == "easy")
      {
      var randomIndexClass = Math.floor(Math.random() * ArrayClassesEasy.length);
      element.classList.add(ArrayClassesEasy[randomIndexClass]);
      ArrayClassesEasy.splice(randomIndexClass,1);
      }
      else 
      {
        var randomIndexClass = Math.floor(Math.random() * ArrayClassesHard.length);
        element.classList.add(ArrayClassesHard[randomIndexClass]);
        ArrayClassesHard.splice(randomIndexClass,1);
      }
      element.innerHTML = `<img src=${ArrayImages[randomIndex].image} class = ".picture"></img> <p>${ArrayImages[randomIndex].placeholder}</p>`;
      counter++;
      ArrayImagesId.splice(randomIndexIndex,1);
      container.appendChild(element);
    } 
    var shars = document.querySelectorAll(".shar");
    for (let i = 0 ; i < shars.length; i ++)
    {
        clickP(shars[i]);
    }
  }

  function clickP(shar) {
    shar.addEventListener("mousedown", (e) => {
        switch(difficalty)
        {
            case "easy":
                switch(randomIndexNew)
                {
                    case 0: 
                    if(ArrayImages[shar.id].correctItem == false)
                    {
                        ArrayImages[shar.id].correctItem = true;
                        shar.style.border = "2px solid green";
                        console.log(shar.style);
                        countTrue++;
                        if (countTrue == 7) finishAllGame();
                    }
                    break;
                    case 1: 
                    if((ArrayImages[shar.id].placeholder == "Лошадь" || ArrayImages[shar.id].placeholder == "Кролик" || ArrayImages[shar.id].placeholder == "Змея")&& ArrayImages[shar.id].correctItem == false)
                    {
                        ArrayImages[shar.id].correctItem = true;
                        shar.style.border = "2px solid green";
                        console.log(shar.style);
                        countTrue++;
                        if (countTrue == 3) finishAllGame();
                    }
                    break;
                    case 2: 
                    if(!(ArrayImages[shar.id].placeholder == "Лошадь" || ArrayImages[shar.id].placeholder == "Кролик" || ArrayImages[shar.id].placeholder == "Змея")&& ArrayImages[shar.id].correctItem == false)
                    {
                        ArrayImages[shar.id].correctItem = true;
                        shar.style.border = "2px solid green";
                        console.log(shar.style);
                        countTrue++;
                        if (countTrue == 4) finishAllGame();
                    }
                }
                break;
            case "hard":
                switch(randomIndexNew)
                {
                    case 0: 
                    if(((ArrayImages[shar.id].easylevel) == 7 - countTrue))
                    {
                        countTrue++;
                        shar.style.border = "2px solid green";
                        if (countTrue == 7) finishAllGame();
                    }
                    else
                    {
                       countTrue = 0;
                       finishFirstLevelFailed();
                    }
                    break;
                    case 1: 
                    if(((ArrayImages[shar.id].easylevel - 1)== countTrue))
                    {
                        countTrue++;
                        shar.style.border = "2px solid green";
                        if (countTrue == 7) finishAllGame();
                    }
                    else
                    {
                       countTrue = 0;
                       finishFirstLevelFailed();
                    }
                    break;
                    case 2: 
                    if((ArrayImages[shar.id].placeholder == "Лошадь" || ArrayImages[shar.id].placeholder == "Кролик" || ArrayImages[shar.id].placeholder == "Змея")&& ArrayImages[shar.id].correctItem == false)
                    {
                        ArrayImages[shar.id].correctItem = true;
                        shar.style.border = "2px solid green";
                        console.log(shar.style);
                        countTrue++;
                        if (countTrue == 3) finishAllGame();
                    }
                    else
                    {
                        countTrue = 0;
                        finishFirstLevelFailed();
                    }
                    break;

                }
        };
          
    });
}
}

function finishLevelSuccess()
{
 onTimesUpStop();
 content.innerHTML = null;
 if (document.querySelector('.level-number').textContent == 2)
 levelState = "stopped2";
 if (document.querySelector('.level-number').textContent == 1)
 levelState = "stopped";
 var element = document.createElement("p");
 element.textContent = 'Поздравляем, вы прошли уровень! Вы можете начать его заново или перейти на следующий уровень.';
 content.appendChild(element);
 button.innerHTML = "Начать уровень заново";
 button2.classList.remove("hidden");
 document.querySelector('#next-level').addEventListener('click', GoToNewLevel);
}

function finishAllGame()
{
 onTimesUpStop();
 content.innerHTML = null;
 var element = document.createElement("p");
 element.textContent = 'Поздравляем, вы прошли все уровени! Вы можете переиграть последний уровень и увидеть себя и свой результат в рейтинге. Всегда ждем ваши новые результаты!';
 content.appendChild(element);
 levelState = "stopped3";
 button.innerHTML = "Начать уровень заново";
}

function GoToNewLevel()
{
   content.innerHTML = null;
   fullScore += scoreFirstLevel;
   sessionStorage.setItem('score',fullScore);
   if (document.querySelector('.level-number').textContent == 1)
   {
   sessionStorage.setItem('level',2);
   document.querySelector('.level-number').innerHTML = null;
   document.querySelector('.level-number').textContent = 2;
   levelState = "stopped2";
   button.innerHTML = "Начать второй уровень";
   }
   else{
   if (document.querySelector('.level-number').textContent == 2)
   {
   sessionStorage.setItem('level',3);
   document.querySelector('.level-number').innerHTML = null;
   document.querySelector('.level-number').textContent = 3;
   levelState = "stopped3";
   button.innerHTML = "Начать третий уровень";
   }}
   button2.classList.add("hidden");
   document.getElementById("app").innerHTML = ``;
   document.querySelector('.task-text').innerHTML = null;
}

const toRating = function (e) {
    e.preventDefault();
    if(!button2.classList.contains('hidden') || document.querySelector('.level-number').textContent == 3)
    {
    fullScore += scoreFirstLevel;
    sessionStorage.setItem('score',fullScore);
    }
    window.location.href = 'raiting.html';
  }
  document.querySelector('#rating').addEventListener('click', toRating);
