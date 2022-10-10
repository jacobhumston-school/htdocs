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
const e = require("express")

const data = {
    accounts: [],
    messages: [],
    ipBlacklist: [],
    apiCooldowns: [],
    sessions: [],
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
            if (data.accounts[foundIndex].ipWhitelist !== null) {
                if (data.accounts[foundIndex].ipWhitelist !== ip) {
                    responseObject.ipPassed = false
                }
            }
            responseObject.account = data.accounts[foundIndex]
        }
        if (username.length > 15 || username.length < 3 || hasBlacklistedString(username)) {
            responseObject.validUsername = false
        }
        if (password.length > 25 || password.length < 8 || hasBlacklistedString(password)) {
            responseObject.validPassword = false
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

function isValidSession(sessionId) {
    if (sessionId !== null && sessionId !== undefined) {
        if (data.sessions.findIndex(value => value.sessionId === sessionId) !== -1) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}

app.get("/", function (request, response) {
    response.redirect("/chat")
})

app.get("/chat", function (request, response) {
    if (isIpBanned(request.ip) === true) {
        response.send("You're IP is blacklisted, lol.")
    } else {
        const sessionId = request.cookies.sessionId
        if (isValidSession(sessionId)) {
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
        const sessionId = request.cookies.sessionId
        if (isValidSession(sessionId)) {
            response.redirect("/chat")
        } else {
            response.sendFile("./login.html", { root: "./" })
        }
    }
})

app.post("/chat/login/api/signin", function (request, response) {
    const body = request.body
    if (body === undefined || body === null) {
        response.send({
            success: false,
            errorType: "Invalid Login",
            errorMessage: "Please provide a username and password."
        })
    } else {
        const loginValidation = isLoginValid(body.username, body.password, request.ip)
        if (loginValidation.exists) {
            if (loginValidation.validLogin) {
                if (loginValidation.ipPassed) {
                    const session = { sessionId: `${uuidv4()}-${uuidv4()}-${uuidv4()}`, accountId: loginValidation.account.userId }
                    data.sessions.push(session)
                    response.cookie("sessionId", session.sessionId)
                    response.send({
                        success: true,
                        session: session,
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
        } else {
            response.send({
                success: false,
                errorType: "Invalid Login",
                errorMessage: "The username or password is incorrect."
            })
        }
    }
})

app.post("/chat/login/api/signup", function (request, response) {
    const body = request.body
    if (body === undefined || body === null) {
        response.send({
            success: false,
            errorType: "Invalid Login",
            errorMessage: "Please provide a username and password."
        })
    } else {
        const loginValidation = isLoginValid(body.username, body.password, request.ip)
        if (loginValidation.exists) {
            response.send({
                success: false,
                errorType: "Account Already Exists",
                errorMessage: "The username you picked is already being used, try logging in."
            })
        } else {
            if (loginValidation.validPassword && loginValidation.validUsername) {
                const newAccount = {
                    username: body.username,
                    password: body.password,
                    userId: uuidv4(),
                    admin: false,
                    ipWhitelist: null
                }
                data.accounts.push(newAccount)
                const session = { sessionId: `${uuidv4()}-${uuidv4()}-${uuidv4()}`, accountId: newAccount.userId }
                data.sessions.push(session)
                response.cookie("sessionId", session.sessionId)
                response.send({
                    success: true,
                    session: session,
                })
            } else {
                response.send({
                    success: false,
                    errorType: "Invalid Sign up",
                    errorMessage: `The username must be between 3-15 characters & the password must be between 8-25 characters. Username and password cannot contain the following characters:&nbsp;<code>${blacklistedStrings.join("</code>, <code>")}</code>`,
                    returned: loginValidation
                })
            }
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

app.get("/data/get/lol", function (request, response) {
    response.send(data)
})

app.use(function (request, response) {
    response.redirect("/")
})

app.listen(port, function () {
    console.log(`Listening to port ${port}!`)
})