const amiiboAPI = 'http://localhost:3000/amiibo'
const amiiboCollection = document.getElementById('amiibo-collection')
const amiiboForm = document.getElementById('add-amiibo-form')

let currentFilterOption = 'default'

const headers = {
     Accept: "application/json",
    "Content-Type": "application/json",
  }

let amiiboList = [];


//Secret Form Access
let grantAccess = true;
const accessButton = document.getElementById('access-btn');
const amiiboContainer = document.querySelector(".amiibo-container");

accessButton.addEventListener('click', () => {
  grantAccess= !grantAccess;
  amiiboContainer.style.display = grantAccess ? 'none' : 'flex';
  amiiboCollection.style.display = grantAccess ? 'none' : 'inline-block';
})

//Authorize button style and text change
function authorize() {
    accessButton.innerHTML = "Authorized!"
    accessButton.style.backgroundColor = "green"
}

//Form Event Listener
amiiboForm.addEventListener('submit', addNewAmiibo)


//GET FETCH
fetch(amiiboAPI)
.then(resp => resp.json())
.then(json => {
    amiiboList = json
    renderAmiibos()
})

//Describe what renderAmiibos does 
function renderAmiibos() {
    amiiboCollection.innerHTML = " ";
    amiiboList.forEach(renderAmiibo)
}

//renderamiibo will have the purpose of creating the figure/card
function renderAmiibo(amiibo) {
    const figure = document.createElement('div')
    figure.classList.add('figure')
    const voteButtonId = `vote-button${amiibo.id}`
    figure.innerHTML = `
    <h2>${amiibo.name}</h2>
    <img src="${amiibo.image}" class= "amiibo-model"/>
    <span>${amiibo.votes} Votes </span>
    <p>${amiibo.use}</p>
    <button class="vote-button" id="${voteButtonId}">VOTE!</button>
    `;
    amiiboCollection.append(figure)

    const voteButton = document.getElementById(voteButtonId)
    voteButton.addEventListener('click', event => {
        upVotes(amiibo.id)
    })
}


//Adding new amiibo via form submit event listener function
function addNewAmiibo(event){
    event.preventDefault()
    const form = event.target
    const newAmiibo = {
        name: form.name.value,
        image: form.image.value,
        use: form.use.value,
        votes: 0
    }

    //POST FETCH
    fetch(amiiboAPI, {
        headers,
        method: "POST",
        body: JSON.stringify(newAmiibo)
    })
    .then(resp => resp.json())
    .then(json => {
        amiiboList.push(json)
        renderAmiibos()
        filterAmiibos(currentFilterOption)

        form.reset()
    })
}

//Vote Button Event Listener for each unique Amiibo ID
function upVotes(id) {
    const amiiboVotes = amiiboList.find(amiibo => amiibo.id === id)

    //PATCH FETCH
    fetch(`${amiiboAPI}/${id}`, {
        headers,
        method: "PATCH",
        body: JSON.stringify({
            votes: amiiboVotes.votes + 1
        })
    })
    .then(resp => resp.json())
    .then(json => {
        amiiboVotes.votes = json.votes
        renderAmiibos()
        filterAmiibos(currentFilterOption)
    })
}

//Filter Function
function filterAmiibos(option) {

    currentFilterOption = option

    let sortedAmiibos

    //Switch Case ternary

    switch(option) {
        case 'asc':
            sortedAmiibos = amiiboList.slice().sort((a, b) => (a.name > b.name ? 1 : -1))
        break;
        case 'desc':
            sortedAmiibos = amiiboList.slice().sort((a, b) => (a.name < b.name ? 1 : -1));
        break;
        default:
        sortedAmiibos = amiiboList.slice()
    }

    amiiboCollection.innerHTML = " ";
    sortedAmiibos.forEach(renderAmiibo)
}


//Filter Event Listener
const filter = document.getElementById('filter-select')
filter.addEventListener('change', () => {
    const selectedOption = filter.value
    filterAmiibos(selectedOption)
});