const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];
getRandomUser()
getRandomUser()
getRandomUser()
// Fet random user and add money
async function getRandomUser() {

  // fetch data from the api
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();


  // data comes in the json format, and in this case we only want the first time of that json which hold useful info
  const user = data.results[0];

  // create a new user based on the name and last name from above and a random math number 
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  // add the new user to the empty list we define outside the function above
  addData(newUser);
}

// map function to loop through the data and double the money
function doubleMoney(){
  data = data.map(user=> {return {...user, money: user.money * 2};});
  updateDom();  

}

function sortByRichest(){
  data.sort((a,b) => b.money - a.money);
  updateDom();
}



function showMillionairs(){
  data = data.filter((item) => item.money > 1000000);

  updateDom();
}

function calculateWealth(){
  total = data.reduce((acc, num) => (acc +=num.money),0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(total)}</strong></h3>`

  main.appendChild(wealthEl);

}

// adds item to the data list defined above
function addData(obj) {
  data.push(obj);

  updateDom();
}


// update DOM
function updateDom(providedData = data){
  // clear the main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'

  providedData.forEach((item, index, array) => {
    const element = document.createElement('div');
    element.classList.add('person');

    element.innerHTML = `<strong>${item.name}</strong> £${formatMoney(item.money)}`;

    main.appendChild(element);

  })



}

function formatMoney(number){
  return (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// event listeners
addUserBtn.addEventListener('click', getRandomUser); 
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionairs);
calculateWealthBtn.addEventListener('click', calculateWealth);