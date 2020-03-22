let path = window.location.pathname

let pathArray = path.split('/')

let id = pathArray.pop()

console.log(id)

let name = document.getElementById('name')
let address = document.getElementById('address')
let phone = document.getElementById('phone')
let webstie = document.getElementById('website')
let hours = document.getElementById('hours')
let notes = document.getElementById('notes')

async function getRestaurantData(id) {
    let data = await fetch(`https://json-server.burlingtoncodeacademy.now.sh/restaurants/${id}`)
        .then((response) => {
            return response.json()
        })
        .then((jsonObj) => {
            return jsonObj
        })

    name.textContent = data.name
    address.textContent = data.address
    phone.textContent = data.phone
    website.textContent = data.website
    hours.textContent = data.hours
    notes.textContent = data.notes

    let restaurantInfo = await fetch(`https://json-server.burlingtoncodeacademy.now.sh/restaurants/${data.id}`)
        .then((response) => {
            return response.json()
        })
        .then((userJson) => {
            return userJson
        })

    console.log(restaurantInfo)

    let myInfo = `${name.textContent}` + '<br><br>' + `${notes.textContent}`//Places Information in Marker
    placeMarker(restaurantInfo.address, myInfo)//Calls Marker Function
    //getRestaurants.textContent = retaurantName
}

getRestaurantData(id)


let myMap = L.map('map').setView([44.475, -73.2121], 20);

L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    minZoom: 15,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
}).addTo(myMap);

//Gets Address & Adds Pin To Post Page
function getLatLon(address) {

    fetch(
        `https://nominatim.openstreetmap.org/search/?q=${address}&format=json`
    ).then((data) => {
        return data.json()
    })
        .then((locInfo) => {
            let info = locInfo[0]
            let lat = info.lat
            let lon = info.lon
            myMap.panTo([lat, lon])
        })
}

async function getRestaurant(name) {
    let restaurant = await fetch(`https://json-server.burlingtoncodeacademy.now.sh/restaurants/${name}`)
        .then((response) => {
            return response.json()
        })
        .then((jsonObj) => {
            return jsonObj
        })

    let address = restaurant.address

    getLatLon(address)
}

getRestaurant(id)

//This will add a message to the pin when you click on pin
function placeMarker(address, myInfo) {

    fetch(
        `https://nominatim.openstreetmap.org/search/?q=${address}&format=json`
    )
        .then((data) => {
            return data.json()
        })
        .then((locInfo) => {
            let info = locInfo[0]
            let lat = info.lat
            let lon = info.lon
            let thisMarker = L.marker([lat, lon]).addTo(myMap).bindPopup(myInfo)

            console.log(thisMarker)

            thisMarker.on('mouseover', () => {
                thisMarker.openPopup()
            })
            thisMarker.on('mouseout', () => {
                thisMarker.closePopup()
            })
        })
}
