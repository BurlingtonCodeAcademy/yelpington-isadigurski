//Centers Right On Burlington
let myMap = L.map('map').setView([44.4773, -73.212], 16);

//Places A Messag On A Single Pin
//let marker = [L.marker([44.4761289, -73.211555]).addTo(myMap)]
//let myMarker = L.marker([44.4761289, -73.211555]).addTo(myMap)
//myMarker.bindPopup(`Ahli Baba's Kabob Shop`)

//Leaflet Map
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    minZoom: 15,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
}).addTo(myMap);

//Takes Address From JSON File & Takes It's Lat/Lon Information
function getLatLon(address) {

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
            L.marker([lat, lon]).addTo(myMap)
        })
}
//Adds Address Name & Location(Lat/Lon) Together From JSON File
async function getRestaurants() {
    let restaurantList = await fetch('https://json-server.burlingtoncodeacademy.now.sh/restaurants')
        .then((response) => {
            return response.json()
        })
        .then((jsonObj) => {
            return jsonObj
        })


    restaurantList.forEach((post) => {
        let address = post.address
        getLatLon(address)
    })
}

getRestaurants()
