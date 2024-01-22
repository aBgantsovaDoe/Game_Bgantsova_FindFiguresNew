
//descenging
function compareUsers(a, b) {
if (a[1] > b[1]) return -1;
if (a[1] == b[1]) return 0;
if (a[1] < b[1]) return 1;
}

let sortUsers = Object.entries(USERS);

sortUsers.sort(compareUsers);

for (let i = 0; i < sortUsers.length; i++) {
const item = template.content.cloneNode(true);
item.querySelector('.name').textContent = sortUsers[i][0];
item.querySelector('.score').textContent = sortUsers[i][1];
list.appendChild(item);
};

function clearList()
{
  localStorage.clear();
  location.reload();
}