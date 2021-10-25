let log = item => console.log(item);

//subopdracht 1 Landenlijst////////////////////////
function addToDom(array) {
    output = '';
    array.forEach((item, index) => {
        output += '<li>' + item + '</li>';
    });
}

function addLandenToDom() {
    const getLanden = () => randomPersonData.map(item => item.region);
    const landen = getLanden().filter(function(item, pos, self) { return self.indexOf(item) == pos; }).sort();
    let parent = document.getElementById("content");
    addToDom(landen);
    parent.innerHTML += '<h1>Landenlijst</h1>' + output;
}

//subopdracht 2 Steenbokvrouwen////////////////////////
function addToDom2(array) {
    output = '';
    array.forEach((item, index) => {
        output += '<li>' + item.name + ' ' + item.surname + '</li><br><img src=' + item.photo + '>';
    });
}

function calculateAge (born){
    let month_diff = Date.now() - new Date(born).getTime();
    let age_dt = new Date(month_diff);
    let year = age_dt.getUTCFullYear();
    let age = Math.abs(year - 1970);
    return age;
}

function sbVrouwenToDom() {
    const getMensen = () => randomPersonData.filter(item => item.gender == 'female').filter(item => calculateAge(item.birthday.mdy) > 30);
    const mensen = getMensen().sort(function (a, b) {
    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
        return 0;
    });
    let parent = document.getElementById("content");
    addToDom2(mensen);
    parent.innerHTML += '<h1>Steenbok Vrouwen</h1>' + output;
}

//subopdracht 3 Ouwe Creditcards////////////////////////



//subopdracht 4 Meeste mensen////////////////////////
function addToDom3(array) {
    output = '';
    array.forEach((item, index) => {
        output += '<li> Region: ' + item.region + ', People: ' + item.inw + '</li>';
    });
}

function addMeesteToDom() {
    const getLanden = () => randomPersonData.map(item => item.region);
    const landen = getLanden().filter(function(item, pos, self) { return self.indexOf(item) == pos; });
    inwLand = [];
    landen.forEach(function(land) {
        const getInw= () => randomPersonData.filter(item => item.region === land).length;
        inw = getInw();
        inwLand.push({'region': land, 'inw': inw});
    });
    let parent = document.getElementById("content");
    addToDom3(inwLand);
    parent.innerHTML += '<h1>Inwoners per Land</h1>' + output;
}

//subopdracht 5 Gemiddelde Leeftijd////////////////////////
let handleOnClickLand = event => {
    const gevLand = gemLand.filter(item => item.region == event.target.innerHTML);
    let parent = document.getElementById("content");
    let newLi = document.createElement("p");
    newLi.appendChild(document.createTextNode('De gemiddelde leeftijd in ' + gevLand[0].region + ' is: ' + gevLand[0].medage))
    parent.appendChild(newLi);
}

let addEventListenersButtons = () => {
    let buttonsLanden = document.querySelectorAll('.land-button');
    //log(buttonsLanden);
    buttonsLanden.forEach(item => {
        item.addEventListener('click', handleOnClickLand, false);
    })
}

function addToDom4(array) {
    let parent = document.getElementById("content");
    parent.innerHTML += '<h1>Gem Leeftijd per Land</h1>';
    array.forEach((item, index) => {
        let btn = document.createElement("button");
        btn.innerHTML = item.region;
        btn.classList.add("land-button")
        parent.appendChild(btn);
    });
    addEventListenersButtons();
}

let gemLand = [];

function addGemToDom() {
    const getLanden = () => randomPersonData.map(item => item.region);
    const landen =  getLanden().filter(function(item, pos, self) { return self.indexOf(item) == pos; }).sort();
    
    landen.forEach(function(land) {
        const getLand = () => randomPersonData.filter(item => item.region === land);
        eenLand = getLand();
        let Age = 0;
        newAge = 0;
        eenLand.forEach(function(item) {
            newAge = calculateAge (item.birthday.mdy);
            Age = Number(Age) + Number(newAge);
        });
        medAge = (Age / getLand().length);
        medAge = (Math.round(medAge * 100) / 100).toFixed(0);
        gemLand.push({'region': land, 'medage': medAge});
    });
    addToDom4(gemLand);
}



//ALGEMEEN addEventListener ////////////////////
let handleOnClick = event => {
    let parent = document.getElementById("content");
    parent.innerHTML = '';
    switch (event.target.value) {
        case "button1":
            addLandenToDom();
            addEventListeners();
            break;
        case "button2":
            sbVrouwenToDom();
            addEventListeners();
            break;
        case "button3":
            break;
        case "button4":
            addMeesteToDom();
            addEventListeners();
            break;
        case "button5":
            addGemToDom();
            addEventListeners();
            break;
    }
}

let addEventListeners = () => {
    let buttons = document.querySelectorAll('button[name="button"]');
    buttons.forEach(item => {
        item.addEventListener('click', handleOnClick, false);
    })
}

addEventListeners();