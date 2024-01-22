// Функция для сохранения имени пользователя

function saveUsername() {
    var usernameInput = document.getElementById("username").value;
    const difficulty = document.querySelector('input[name="difficulty"]:checked').value;
    // Проверяем, что поле ввода имени не пустое
    if (usernameInput !== "") {
    let user =
    {
        name: usernameInput,
        score: 0,
        level: 1,
        difficulty: difficulty,
    };
    sessionStorage.setItem('name',user.name);
    sessionStorage.setItem('score',user.score);
    sessionStorage.setItem('level',user.level);
    sessionStorage.setItem('difficulty',user.difficulty);
      // Получаем массив из localStorage или создаем пустой массив, если его нет
let usernames = JSON.parse(localStorage.getItem("usernames")) || [];

// Добавляем новый элемент к массиву
usernames.push(user);

   localStorage.setItem("current_user", JSON.stringify(user));

// Сохраняем обновленный массив в localStorage
localStorage.setItem("usernames", JSON.stringify(usernames));
  
      // Очищаем поле ввода имени
      document.getElementById("username").value = "";
    }

    window.location.href = 'levels.html';
    // Обновляем список имен на главной странице
    updateUsernameList();


  }
  
  // Функция для обновления списка имен на главной странице
  function updateUsernameList() {
    // Получаем список имен из LocalStorage
    let usernames = JSON.parse(localStorage.getItem("usernames")) || [];
  
    // Получаем элемент списка
    let usernameList = document.getElementById("username-list");
  
    // Очищаем список
    usernameList.innerHTML = "";
    usernames[usernames.length-1].score = sessionStorage.getItem("score");
    localStorage.setItem("usernames", JSON.stringify(usernames));

    usernames.sort(   function compareUsers(a, b) {
        if (a.score > b.score) return -1;
        if (a.score == b.score) return 0;
        if (a.score < b.score) return 1;
        });
    // Перебираем имена и добавляем их в список

    for (let i = 0; i < usernames.length; i++) {
      // Создаем элемент списка
      let listItem = document.createElement("li");
      listItem.innerHTML = (i+1) + '. ' + usernames[i].name + ' ' + usernames[i].difficulty + ' ' + usernames[i].score;
  
      // Добавляем элемент в список
      usernameList.appendChild(listItem);
    }   

  }
  
  // Вызываем функцию обновления списка имен при загрузке страницы
  updateUsernameList();
  

  function clearList()
  {
    localStorage.clear();
    location.reload();
  }