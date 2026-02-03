type Player = {
    name: string,
    clubs: string[],
    isRetired?: boolean | string
}

let playerType : Player = {
    name: "Puyol",
    clubs: ["Barcelona"],
    isRetired: true
}

playerType = {
    name: "Del piero",
    clubs: "Juve",
    isRetired: true
}

playerType = {
    name: "Puyol",
    clubs: ["Barcelona"]
}

playerType = {
    name: "Puyol"
}

playerType = {
    name: "Puyol",
    clubs: ["Barcelona"],
    isRetired: "NO"
}