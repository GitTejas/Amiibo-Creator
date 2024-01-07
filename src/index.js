const amiiboAPI = 'http://localhost:3000/amiibo'
const amiiboCollection = document.getElementById('amiibo-collection')
const amiiboForm = document.getElementById('add-amiibo-form')

let currentFilterOption = 'default'

const headers = {
     Accept: "application/json",
    "Content-Type": "application/json",
  }

let amiiboList = [];


let grantAccess = true;
const accessButton = document.getElementById('access-btn');
const amiiboContainer = document.querySelector(".amiibo-container");

accessButton.addEventListener('click', () => {
  grantAccess= !grantAccess;
  amiiboContainer.style.display = grantAccess ? 'none' : 'flex';
  amiiboCollection.style.display = grantAccess ? 'none' : 'grid';
})

function authorize() {
    accessButton.innerHTML = "Authorized!"
    accessButton.style.backgroundColor = "green"
}


amiiboForm.addEventListener('submit', addNewAmiibo)


fetch(amiiboAPI)
.then(resp => resp.json())
.then(json => {
    amiiboList = json
    renderAmiibos()
})

function renderAmiibos() {
    amiiboCollection.innerHTML = " ";
    amiiboList.forEach(renderAmiibo)
}

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


function addNewAmiibo(event){
    event.preventDefault()
    const form = event.target
    const newAmiibo = {
        name: form.name.value,
        image: form.image.value,
        use: form.use.value,
        votes: 0
    }

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

function upVotes(id) {
    const amiiboVotes = amiiboList.find(amiibo => amiibo.id === id)

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

function filterAmiibos(option) {

    currentFilterOption = option

    let sortedAmiibos

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

const filter = document.getElementById('filter-select')
filter.addEventListener('change', () => {
    const selectedOption = filter.value
    filterAmiibos(selectedOption)
});