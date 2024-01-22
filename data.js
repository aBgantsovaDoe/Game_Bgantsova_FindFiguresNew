 const USERS = {
       first: 10,
   second: 30,
   third: 15,
   forth: 2
 };
 let jsonUsers = JSON.stringify(USERS);
 localStorage.setItem('users', jsonUsers);