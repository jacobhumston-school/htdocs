const CatNames = [
    "Billy",
    "Bob",
    "Kitty",
    "Boots",
    "Kit",
    "Fluffy",
    "Meow",
    "Timmy",
    "Luna",
    "Millo",
    "Oliver",
    "Leo",
    "Loki",
    "Bella",
    "Charlie",
    "Williow",
    "Lucy",
    "Simba",
    "Lily",
    "Nala",
    "Chloe",
    "Stella",
    "Lola",
    "Max",
    "Jack",
    "Ollie",
    "Jasper",
    "Chadwick",
    "Doja Cat",
    "Taylor",
    "Suga",
    "Kadie",
    "Bitcoin"
]

module.exports = {
    Name: "randomcatname",
    Description: "Get a random cat name.",
    Function: function () {
        return { name: CatNames[Math.floor(Math.random() * CatNames.length)], totalNames: CatNames.length }
    },
}