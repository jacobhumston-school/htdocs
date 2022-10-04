const express = require('express')
const app = express()
const port = 3000

const fs = require("fs")
const paths = []

const serverStartUp = Date.now()

for (const fileName of fs.readdirSync("./TestAPI")) {
	const data = require("./TestAPI/" + fileName)
	paths.push(`[GET] <a href="http://192.168.0.23:3000/api/${data.Name}" target="blank">${data.Name}</a> - ${data.Description}`)
	let ReqCountGlobal = 0
	const LocalReqCount = {}
	app.get("/api/" + data.Name, (req, res) => {
		ReqCountGlobal++
		if (LocalReqCount[req.ip] !== undefined) {
			LocalReqCount[req.ip]++
		} else {
			LocalReqCount[req.ip] = 1;
		}
		let Object = null
		let Meta = {}
		Meta.requestCountGlobal = ReqCountGlobal
		Meta.requestCountLocal = LocalReqCount[req.ip]
		Meta.requestLocalIP = req.ip
		Meta.serverUptime = {
			milliseconds: Date.now() - serverStartUp,
			seconds: Math.floor((Date.now() - serverStartUp) / 1000),
			minutes: Math.floor((Date.now() - serverStartUp) / 60000),
			hours: Math.floor((Date.now() - serverStartUp) / 3.6e+6),
			days: Math.floor((Date.now() - serverStartUp) / 8.64e+7),
		}
		try {
			Object = { success: true, data: data.Function(req, res), metaData: Meta }
		} catch (error) {
			Object = { success: false, errorMessage: error, metaData: Meta }
		}
		res.send(Object)
	})
}

app.get('/docs', (req, res) => {
	res.send(`<h1>[Docs] API Endpoints</h1><p>${paths.join("<br>")}</p>`)
})

app.get('/', (req, res) => {
	res.redirect("/docs")
})

app.use(function (req, res) {
	res.redirect("/")
})

app.listen(port, () => {
	console.log(`App listening on port ${port}...`)
})