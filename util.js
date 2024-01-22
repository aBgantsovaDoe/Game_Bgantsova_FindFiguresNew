const getCurrentFromStorage = function () {
    return JSON.parse(localStorage.getItem('user'));
  }
  
  const putCurrentInStorage = function (user) {
    localStorage.setItem('user', JSON.stringify(user));
  };
  
  export {putCurrentInStorage, getCurrentFromStorage};