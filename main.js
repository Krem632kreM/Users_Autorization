'use strict'

const btnRegistration = document.getElementById('registration')
const btnAutorization = document.getElementById('autorization')
const usersUl = document.querySelector('.users')
const date =  new Date().getTime()
const date1 = new Date()


let usersList;
let monthsList = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря'
];

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24),

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
}


let getUserList = function () {
  if (JSON.parse(localStorage.getItem("usersList")) === null) {
    usersList = []
  } else {
    usersList = JSON.parse(localStorage.getItem("usersList"))
  }

  usersList.forEach(function(user){
    const ul = document.createElement('li')
    ul.classList.add('user')
    ul.innerHTML = 'Имя: ' + user.firstname + ', фамилия: ' + user.surname + ', зарегестрирован:'+ user.day  + ' ' + monthsList[user.month] +' '+user.year + ' г. ' + msToTime(user.d) + "<button class='remove'></button>"

    usersUl.append(ul)

    const btnRemove = ul.querySelector('.remove')
    btnRemove.addEventListener('click', function () {
      usersList.shift(user)
        console.log(user)
        localStorage.setItem("usersList", JSON.stringify(usersList));
        window.location.reload();
      })
      
  })
}



btnRegistration.addEventListener('click', function (event) {
  window.location.reload();
  let user = {},
    k
  k = prompt("Введите имя и фамилию через пробел", "Таня Кремпина");
  user.firstname = k.substr(0, k.indexOf(" "))
  user.surname = k.substr(k.indexOf(" ") + 1)
  user.login = prompt("Введите логин", "krem");
  user.password = prompt("Введите пароль", 123);
  user.d = date;
  user.year = date1.getFullYear()
  user.month = date1.getMonth()
  user.day = date1.getDate()

  usersList.push(user)

  const ul = document.createElement('li')
  ul.classList.add('user')
  ul.innerHTML = 'Имя: ' + user.firstname + ', фамилия: ' + user.surname + ', зарегестрирован: ' + user.day + ' ' + monthsList[user.month] + ' ' + user.year + ' г. '+ msToTime(user.d) + "<button class='remove'></button>"
  usersUl.append(ul)
  localStorage.setItem("usersList", JSON.stringify(usersList));
})


getUserList();

console.log(usersList)