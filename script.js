/*
    This file contains all JavaScript code
    for interacting with the remove Web API
    provided by https://thecatapi.com/.

    Author: Mehdi Jokar
    File:   script.js
    Date:   December 1, 2022
 */


window.onload = function () {

    // get the button element
    let button = document.querySelector("button");

    //add an event listener for button click 
    //that displays breed properties
    button.addEventListener("click", displayBreedProperties);

    //add an event listener for button click 
    //that displays 10 images for each breed
    button.addEventListener("click", displayBreedImages);
}

// this function displays breed properties by calling the cat api
function displayBreedProperties() {

    // get selected option inner text
    var selectElm = document.getElementById("breeds");
    var val = selectElm.options[selectElm.selectedIndex].text;

    // a URL and parameters for the fetch
    let webAddress = "https://api.thecatapi.com/v1/breeds/search?q=" + val;
    let params = {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "removed"
        }
    };

    fetch(webAddress, params) //gather the response asynchronously
        .then(function (response) {  //this get the JSON in the response asynchronously
            return response.json();
        })
        .then(function (data) { //do something with the JSON data

            // get each element by their id and change the inner html
            let name = document.querySelector("#name");
            name.innerHTML = data[0].name;

            let description = document.querySelector("#description");
            description.innerHTML = data[0].description;

            let origin = document.querySelector("#origin");
            origin.innerHTML = data[0].origin;

            let life = document.querySelector("#life-span");
            life.innerHTML = data[0].life_span;

            let child = document.querySelector("#child-friendly");
            // get the value by calling friendliness function
            let childFriendly = friendliness(data[0].child_friendly);
            child.innerHTML = childFriendly;

            let dog = document.querySelector("#dog-friendly");
            // get the value by calling friendliness function
            let dogFriendly = friendliness(data[0].dog_friendly);
            dog.innerHTML = dogFriendly;

            let energy = document.querySelector("#energy-level");
            // get the value by calling energyLevel function
            let energyStr = energyLevel(data[0].energy_level);
            energy.innerHTML = energyStr;

            let social = document.querySelector("#social-needs");
            // get the value by calling socialNeed function
            let socialStr = socialNeed(data[0].social_needs);
            social.innerHTML = socialStr;

            let learn = document.querySelector("#wiki");
            // add value to href attribute
            learn.href = data[0].wikipedia_url;
            learn.innerHTML = "wikipedia";

        });
}

// this function returns a string value for each friendliness number
function friendliness(num) {
    if (num == 1) {
        return "very unfriendly (1)";
    } else if (num == 2) {
        return "unfriendly (2)";
    } else if (num == 3) {
        return "indifferent (3)";
    } else if (num == 4) {
        return "friendly (4)";
    } else {
        return "very friendly (5)";
    }
}

// this function returns a string value for each energy level number
function energyLevel(num) {
    if (num == 1) {
        return "like a sloth (1)";
    } else if (num == 2) {
        return "slow moving (2)";
    } else if (num == 3) {
        return "energetic (3)";
    } else if (num == 4) {
        return "a ball of energy (4)";
    } else {
        return "bouncing off the walls (5)";
    }
}

// this function returns a string value for each social need number
function socialNeed(num) {
    if (num == 1) {
        return "antisocial (1)";
    } else if (num == 2) {
        return "a loner (2)";
    } else if (num == 3) {
        return "indifferent (3)";
    } else if (num == 4) {
        return "needs friends (4)";
    } else {
        return "very needy (5)";
    }
}

// this function displays 10 images for the breed 
// by calling the cat api
function displayBreedImages() {

    // get option value
    var selectElm = document.getElementById("breeds");
    var val = selectElm.value;

    // a URL and parameters for the fetch
    let webAddress = "https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=" + val;
    let params = {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "live_9trhxMMn8jdjRt6IEr0FxxzGU4dRF7FtwvJWHOVlRcmR5NWg7IFoRS2CuTi7E6fE"
        }
    };

    fetch(webAddress, params) //gather the response asynchronously
        .then(function (response) {  //this get the JSON in the response asynchronously
            return response.json();
        })
        .then(function (data) { //do something with the JSON data

            // get the third section element by its id 
            let bottom = document.querySelector("#bottom");

            // empty the section element
            bottom.innerHTML = "";

            // create img element for maximum ten images and 
            // append them to the section element
            for (let i = 0; i < data.length; i++) {
                //create a new img element 
                let imgEle = document.createElement("img");
                let source = data[i].url;
                imgEle.src = source;
                imgEle.alt = "cat picture " + (i + 1);

                // append the new element to the section element
                bottom.appendChild(imgEle);

            }

        });
}

