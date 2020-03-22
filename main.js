let listContainer = document.getElementById('restaurant-list')

async function getRestaurants() {
    let restaurantList = await fetch('https://json-server.burlingtoncodeacademy.now.sh/restaurants')
        .then((response) => {
            return response.json()
        })
        .then((jsonObj) => {
            return jsonObj
        })


    restaurantList.forEach((post) => {
        let id = post.id
        let name = post.name
        let address = post.address
        let phone = post.phone
        let website = post.website
        let hours = post.hours
        let notes = post.notes

        listContainer.innerHTML += `<li><a href='/post/${id}'>${name}</a></li>`
    })
//This is for the future to add additional restaurants
//
//    restaurantList = await fetch('restaurants.json')
//        .then((response) => {
//            return response.json()
//        })
//        .then((jsonObj) => {
//            return jsonObj
//        })
//
//
//    restaurantList.forEach((post) => {
//        let id = post.id
//        let name = post.name
//        let address = post.address
//        let phone = post.phone
//        let website = post.website
//        let hours = post.hours
//        let notes = post.notes
//
//        listContainer.innerHTML += `<li><a href='/post/${id}'>${name}</a></li>`
//    })
}

getRestaurants()