var Black = "black"
var White = "white"
//  ^ Name  ^ Value

function Loaded() {
    var Button = document.getElementById("Button")
    var Body = document.body
    var LightTheme = true

    Button.onclick = function() {
        if (LightTheme == true) {
            Body.style.backgroundColor = Black
            LightTheme = !LightTheme // OR: LightTheme = false
        } else {
            Body.style.backgroundColor = White
            LightTheme = !LightTheme // OR: LightTheme = true
        }
    }
}