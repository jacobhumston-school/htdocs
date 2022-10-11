// source code written by Jacob Humston, use for whatever u want!!!!

const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 4000;
const webSocketPort = 4001;
const webSocket = require("ws");

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// data is kept here in a very nice data object!!

const adminData = require("./adminpass.json");

const data = {
    accounts: [],
    messages: [],
    ipBlacklist: [],
    apiCooldowns: [],
    sessions: [],
};

adminData.data.forEach(function (value) {
    data.accounts.push({
        username: value.user,
        password: value.pass,
        userId: uuidv4(),
        admin: true,
        ipWhitelist: value.ip,
        profilePicture: `https://ui-avatars.com/api/?name=${value.user}&format=svg&rounded=true`
    });
});

// these are util functions

const blacklistedStrings = [" ", "<", ">", "/", "\\", "'", '"', "`", "&", "?", "!"];

function hasBlacklistedString(string) {
    let hasString = false;
    blacklistedStrings.forEach(function (value) {
        if (string.includes(value) === true) {
            hasString = true;
        }
    });
    return hasString;
}

function isLoginValid(username, password, ip) {
    if (typeof username === "string" && typeof password === "string") {
        const responseObject = { exists: false, validUsername: true, validPassword: true, validLogin: false, ipPassed: true };
        const foundIndex = data.accounts.findIndex((value) => value.username === username);
        if (foundIndex !== -1) {
            responseObject.exists = true;
            if (data.accounts[foundIndex].password === password) {
                responseObject.validLogin = true;
            }
            if (data.accounts[foundIndex].ipWhitelist !== null) {
                if (data.accounts[foundIndex].ipWhitelist !== ip) {
                    responseObject.ipPassed = false;
                }
            }
            responseObject.account = data.accounts[foundIndex];
        }
        if (username.length > 15 || username.length < 3 || hasBlacklistedString(username)) {
            responseObject.validUsername = false;
        }
        if (password.length > 25 || password.length < 8 || hasBlacklistedString(password)) {
            responseObject.validPassword = false;
        }
        return responseObject;
    } else {
        return {
            exists: false,
            validUsername: false,
            validPassword: false,
            validLogin: false,
            ipPassed: false,
        };
    }
}

function isIpBanned(ip) {
    return data.ipBlacklist.includes(ip);
}

function isValidSession(sessionId) {
    if (sessionId !== null && sessionId !== undefined) {
        if (data.sessions.findIndex((value) => value.sessionId === sessionId) !== -1) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

// websocket for all the chat messenging needs

const wsServer = new webSocket.Server({ port: webSocketPort });

wsServer.on("listening", function () {
    console.log(`WebSocket is listening to port ${webSocketPort}...`);
});

wsServer.on("error", function (error) {
    console.log("WebSocket Error: " + error.message);
});

wsServer.on("connection", function (webSocket, request) {
    if (isIpBanned(request.socket.remoteAddress) === true) {
        webSocket.send("You're IP is blacklisted, lol.");
        webSocket.close();
    } else {
        const cookies = request.headers.cookie
        const sessionId = cookies.split("sessionId=")[1]

        if (!isValidSession(sessionId) === true) {
            webSocket.close();
        }

        const intervel = setInterval(function () {
            if (!isValidSession(sessionId) === true) {
                webSocket.close();
            }
        }, 1000)

        webSocket.onclose = function () {
            clearInterval(intervel)
        }

        /** dont need this but keeping it for later incase
        
        webSocket.onclose = function() {
            if (isValidSession(sessionId) === true) {
                const index = data.sessions.findIndex(value => value.sessionId === sessionId)
                if (index !== -1) {
                    data.sessions.splice(index, 1)
                }
            }
        }
    
        */
    }
});

// these are very important functions that are used to do very important things

function sendMessage(message, account) {
    data.messages.push({
        message: message,
        author: {
            name: account.username,
            userId: account.userId,
            profilePicture: account.profilePicture,
        },
        created: new Date(),
        id: uuidv4()
    })
    wsServer.clients.forEach(function (webSocket) {
        webSocket.send(JSON.stringify({ Type: "Messages", Data: data.messages }))
    })
}

// this is the main api, used for login and such

app.get("/", function (request, response) {
    response.redirect("/chat");
});

app.get("/ping", function (request, response) {
    response.send("ok")
})

app.get("/logout", function (request, response) {
    const sessionId = request.cookies.sessionId
    if (isValidSession(request.cookies.sessionId) === true) {
        const index = data.sessions.findIndex(value => value.sessionId === sessionId)
        if (index !== -1) {
            data.sessions.splice(index, 1)
        }
    }
    response.redirect("/")
})

app.get("/chat", function (request, response) {
    if (isIpBanned(request.ip) === true) {
        response.send("You're IP is blacklisted, lol.");
    } else {
        const sessionId = request.cookies.sessionId;
        if (isValidSession(sessionId) === true) {
            response.sendFile("./chatapp.html", { root: "./" });
        } else {
            response.redirect("/chat/login");
        }
    }
});

app.get("/chat/login", function (request, response) {
    if (isIpBanned(request.ip) === true) {
        response.send("You're IP is blacklisted, lol.");
    } else {
        const sessionId = request.cookies.sessionId;
        if (isValidSession(sessionId) === true) {
            response.redirect("/chat");
        } else {
            response.sendFile("./login.html", { root: "./" });
        }
    }
});

app.post("/chat/login/api/signin", function (request, response) {
    if (isIpBanned(request.ip) === true) {
        response.send("You're IP is blacklisted, lol.");
    } else {
        const body = request.body;
        if (body === undefined || body === null) {
            response.send({
                success: false,
                errorType: "Invalid Login",
                errorMessage: "Please provide a username and password.",
            });
        } else {
            const loginValidation = isLoginValid(body.username, body.password, request.ip);
            if (loginValidation.exists) {
                if (loginValidation.validLogin) {
                    if (loginValidation.ipPassed) {
                        const session = { sessionId: `${uuidv4()}-${uuidv4()}-${uuidv4()}`, accountId: loginValidation.account.userId };
                        data.sessions.push(session);
                        response.cookie("sessionId", session.sessionId);
                        response.send({
                            success: true,
                            session: session,
                        });
                    } else {
                        response.send({
                            success: false,
                            errorType: "IP Whitelist",
                            errorMessage: "This account can only be used by a specific IP.<br>Debug: Your IP is " + request.ip,
                        });
                    }
                } else {
                    response.send({
                        success: false,
                        errorType: "Invalid Login",
                        errorMessage: "The username or password is incorrect.",
                    });
                }
            } else {
                response.send({
                    success: false,
                    errorType: "Invalid Login",
                    errorMessage: "The username or password is incorrect.",
                });
            }
        }
    }
});

app.post("/chat/login/api/signup", function (request, response) {
    if (isIpBanned(request.ip) === true) {
        response.send("You're IP is blacklisted, lol.");
    } else {
        const body = request.body;
        if (body === undefined || body === null) {
            response.send({
                success: false,
                errorType: "Invalid Login",
                errorMessage: "Please provide a username and password.",
            });
        } else {
            const loginValidation = isLoginValid(body.username, body.password, request.ip);
            if (loginValidation.exists) {
                response.send({
                    success: false,
                    errorType: "Account Already Exists",
                    errorMessage: "The username you picked is already being used, try logging in.",
                });
            } else {
                if (loginValidation.validPassword && loginValidation.validUsername) {
                    const newAccount = {
                        username: body.username,
                        password: body.password,
                        userId: uuidv4(),
                        admin: false,
                        ipWhitelist: null,
                        profilePicture: `https://ui-avatars.com/api/?name=${body.username}&format=svg&rounded=true`
                    };
                    data.accounts.push(newAccount);
                    const session = { sessionId: `${uuidv4()}-${uuidv4()}-${uuidv4()}`, accountId: newAccount.userId };
                    data.sessions.push(session);
                    response.cookie("sessionId", session.sessionId);
                    response.send({
                        success: true,
                        session: session,
                    });
                } else {
                    response.send({
                        success: false,
                        errorType: "Invalid Sign up",
                        errorMessage: `The username must be between 3-15 characters & the password must be between 8-25 characters.<br>Username and password cannot contain the following characters:&nbsp;<code>${blacklistedStrings.join("</code>, <code>")}</code>`,
                        returned: loginValidation,
                    });
                }
            }
        }
    }
});

// add all asset urls
for (const fileName of fs.readdirSync("./assets")) {
    app.get(`/chat/assets/${fileName}`, function (request, response) {
        if (isIpBanned(request.ip) === true) {
            response.send("You're IP is blacklisted, lol.");
        } else {
            response.sendFile(`./${fileName}`, {
                root: "./assets/",
            });
        }
    });
}

// this is a dummy function for viewing data
// it will get commented out when testing is done
app.get("/data/get/lol", function (request, response) {
    response.send(data);
});

// redirct to main page incase of 404
app.use(function (request, response) {
    response.redirect("/");
});

// we gotta listen if we wanna know whats going on
app.listen(port, function () {
    console.log(`App is listening to port ${port}...`);
});

let count = 0
setInterval(function () {
    count++
    sendMessage("wassup guys " + count, data.accounts[0])
}, 1000)