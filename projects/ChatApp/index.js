const express = require("express")
const cookieParser = require("cookie-parser")
const app = express()
const port = 4000

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const fs = require("fs")
const { v4: uuidv4 } = require('uuid')

const adminData = require("./adminpass.json")

const data = {
    accounts: [],
    messages: [],
    ipBlacklist: [],
    apiCooldowns: [],
}

adminData.data.forEach(function (value) {
    data.accounts.push({
        username: value.user,
        password: value.pass,
        userId: uuidv4(),
        admin: true,
        ipWhitelist: value.ip
    })
})

const blacklistedStrings = [" ", "<", ">", "/", "\\", "'", '"', "`"]

function hasBlacklistedString(string) {
    let hasString = false
    blacklistedStrings.forEach(function (value) {
        if (string.includes(value) === true) {
            hasString = true
        }
    })
    return hasString
}

function isLoginValid(username, password, ip) {
    if (typeof (username) === "string" && typeof (password) === "string") {
        const responseObject = { exists: false, validUsername: true, validPassword: true, validLogin: false, ipPassed: true }
        const foundIndex = data.accounts.findIndex(value => value.username === username)
        if (foundIndex !== -1) {
            responseObject.exists = true
            if (data.accounts[foundIndex].password === password) {
                responseObject.validLogin = true
            }
        }
        if (username.length > 15 || username.length < 3 || hasBlacklistedString(username)) {
            responseObject.validUsername = false
        }
        if (username.length > 25 || username.length < 8 || hasBlacklistedString(password)) {
            responseObject.validPassword = false
        }
        if (data.accounts[foundIndex].ipWhitelist !== null) {
            if (data.accounts[foundIndex].ipWhitelist !== ip) {
                responseObject.ipPassed = false
            }
        }
        return responseObject
    } else {
        return {
            exists: false,
            validUsername: false,
            validPassword: false,
            validLogin: false,
            ipPassed: false,
        }
    }
}

function isIpBanned(ip) {
    return data.ipBlacklist.includes(ip)
}

app.get("/", function (request, response) {
    response.redirect("/chat")
})

app.get("/chat", function (request, response) {
    if (isIpBanned(request.ip) === true) {
        response.send("You're IP is blacklisted, lol.")
    } else {
        const username = request.cookies.username
        const password = request.cookies.password
        if (isLoginValid(username, password).validLogin === true) {
            response.sendFile("./chatapp.html", { root: "./" })
        } else {
            response.redirect("/chat/login")
        }
    }
})

app.get("/chat/login", function (request, response) {
    if (isIpBanned(request.ip) === true) {
        response.send("You're IP is blacklisted, lol.")
    } else {
        response.sendFile("./login.html", { root: "./" })
    }
})

app.get("/chat/login/api/login", function(request, response) {
    const body = response.body
    if (body === undefined || body === null) {
        response.send({
            success: false,
            errorType: "Invalid Login",
            errorMessage: "Please provide a username and password."
        })
    } else {
        const loginValidation = isLoginValid(body.username, body.password, request.ip)
        if (loginValidation.exists) {
            if (loginValidation.ipPassed) {
                response.send({
                    success: false,
                    errorType: "WOOHOO!",
                    errorMessage: "That worked, gg."
                })
            } else {
                response.send({
                    success: false,
                    errorType: "IP Whitelist",
                    errorMessage: "This account can only be used by a specific IP."
                })  
            }
        } else {
            response.send({
                success: false,
                errorType: "Invalid Login",
                errorMessage: "The username or password is incorrect."
            })  
        }
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