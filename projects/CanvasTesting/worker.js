let DotPressed = false

onmessage = function(Message) {
    if (Message.data == "DotPressed") {
        DotPressed = true
    }
}

setInterval(async function () {
    DotPressed = false
    postMessage("SecondHasPassed")
    while (DotPressed == false) {
        await new Promise(Resolve => setTimeout(Resolve, 1))
    }
}, 1000)