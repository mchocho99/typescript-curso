interface Famous {
    name: string,
    country: string,
    job: string
}

function tellMeYouFavoriteFamous(famous: Famous) {
    console.log("Mi favorito es:" + famous.name)
}

let favorite : Famous = {
    name: "Lady Gaga",
    country: "USA",
    job: "Singer"
}

let favorite2 = {
    name: "Lady Gaga",
    country: "USA",
    job: "Singer",
    isDead: false
}

tellMeYouFavoriteFamous(favorite2)