/*
    Author: Jacob Humston 
            - Github: https://github.com/jacobhumston-school    
    Editors:
*/

// main.js
// Includes important functions for main pages, etc

// Calender function, inserts the calender
function PlaceCalender(ParentName) {
    const Parent = document.getElementById(ParentName);
    const CalenderFrame = `<iframe src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=2&amp;bgcolor=%23ffffff&amp;ctz=America%2FNew_York&amp;showTitle=1&amp;src=Y19kMzQ2ZTIxZDg1ZmVhNmUxOTg5NTRlOGMwYWYwYmE0ZjkxN2UxYmE2M2UwNjNlNjJlMzNjZDU3ZTliNzE4NDgxQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&amp;color=%234285F4" style="border-width:0; background-image: url('../assets/loading-black.gif'); background-repeat: no-repeat; background-position: center;" scrolling="no" width="100%" height="600" frameborder="0"></iframe>`;
    Parent.innerHTML = CalenderFrame;
}

// Menu function, inserts the menu
function PlaceMenuBar() {
    const Body = document.body;

    const Divider = document.createElement("div");
    Divider.id = "MenuBarDivider";

    const Title = document.createElement("p");
    Title.innerText = document.title;
    Title.id = "MenuBarParagraph";

    const Pages = [
        {
            Value: "../pages/calender.html",
            Name: "Calender"
        },
        {
            Value: "../pages/contact-us.html",
            Name: "Contact Us"
        },
        {
            Value: "../pages/home.html",
            Name: "Home"
        }
    ];

    Pages.forEach(function (OptionObject) {
        const Button = document.createElement("button");
        Button.innerText = OptionObject.Name;
        Button.classList.add("LinkButton");
        Button.classList.add("MenuBarButton");
        Divider.append(Button);
        if (OptionObject.Value !== null) {
            Button.onclick = function () {
                window.location.href = OptionObject.Value;
                // display loading gif it takes longer then 500 ms (half a second)
                setTimeout(function () {
                    Button.innerHTML = "";
                    Button.append(GetLoadingGIF());
                }, 500);
            };
        }
    });

    Divider.append(Title);
    Body.insertAdjacentElement("afterbegin", Divider);
    Body.insertAdjacentHTML("afterbegin", "<!-- Menu Bar -->");
}

// Util function, basically small automated edits, this function should be called last
function Util() {
    document.title = document.title + " - Daughters of the American Revolution";
}

// Loading GIF function, returns a loading GIF element
function GetLoadingGIF() {
    const Element = document.createElement("img");
    Element.src = "../assets/loading.gif";
    Element.classList.add("LoadingGIF");
    return Element;
}

// Load function, this is like a wrapper for other functions that should be called
// -------------- it's important to note that load is called on ALL pages
function Load() {
    PlaceMenuBar();
    Util();
}