const express = require("express")
const cookieParser = require("cookie-parser")
const app = express()
const port = 4000

app.use(cookieParser())

const fs = require("fs")

const adminData = require("./adminpass.json")

const data = {
    accounts: [],
    messages: [],
    ipBlacklist: []
}

adminData.data.forEach(function (value) {
    data.accounts.push({
        username: value.user,
        password: value.pass,
        admin: true,
    })
})

app.get("/", function (request, response) {
    response.redirect("/chat")
})

app.get("/chat", function (request, response) {
    if (data.ipBlacklist.includes(request.ip) === true) {
        response.send("You're IP is blacklisted, lol.")
    } else {
        const username = request.cookies.username
        const password = request.cookies.password
        if (typeof (username) === "string" && typeof (password) === "string") {
            response.sendFile("./chatapp.html", { root: "./" })
        } else {
            response.redirect("/chat/login")
        }
    }
})

app.get("/chat/login", function (request, response) {
    if (data.ipBlacklist.includes(request.ip) === true) {
        response.send("You're IP is blacklisted, lol.")
    } else {
        response.sendFile("./login.html", { root: "./" })
    }
})

for (const fileName of fs.readdirSync("./assets")) {
    app.get(`/chat/assets/${fileName}`, function (request, response) {
        response.sendFile(`./${fileName}`, {
            root: "./assets/",
        })
    })
}

app.listen(port, function () {
    console.log(`Listening to port ${port}!`)
})