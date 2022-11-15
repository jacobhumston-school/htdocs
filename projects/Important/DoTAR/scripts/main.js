/*
    Author: Jacob Humston 
            - Github: https://github.com/jacobhumston-school    
    Editors:
*/

// main.js
// Includes important functions for main pages, etc

// Variables
const StarterTitle = document.title;
let MenuBarStayOpenAlreadyChecked = false;
let MenuBarCurrentlyOpen = false;

// Calender function, inserts the calender
function PlaceCalender(ParentName) {
    const Parent = document.getElementById(ParentName);
    const CalenderFrame = `<iframe src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=2&amp;bgcolor=%23ffffff&amp;ctz=America%2FNew_York&amp;showTitle=1&amp;src=Y19kMzQ2ZTIxZDg1ZmVhNmUxOTg5NTRlOGMwYWYwYmE0ZjkxN2UxYmE2M2UwNjNlNjJlMzNjZDU3ZTliNzE4NDgxQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&amp;color=%234285F4" style="border-width:0; background-image: url('../assets/loading-black.gif'); background-repeat: no-repeat; background-position: center;" scrolling="no" width="100%" height="600" frameborder="0"></iframe>`;
    Parent.innerHTML = CalenderFrame;
}

// Menu function, inserts the menu
function PlaceMenuBar() {

    const Body = document.body;

    function Place(Version) {
        const Divider = document.createElement("div");
        Divider.id = "MenuBarDivider";

        const Title = document.createElement("p");
        Title.innerText = StarterTitle;
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

        if (Version === "Normal") {
            Pages.forEach(function (OptionObject) {
                const Button = document.createElement("button");
                Button.innerText = OptionObject.Name;
                Button.classList.add("LinkButton");
                Button.classList.add("MenuBarButton");
                Divider.append(Button);

                if (OptionObject.Value !== null) {
                    Button.onclick = function () {
                        window.location.href = OptionObject.Value;
                        setTimeout(function () {
                            Button.innerHTML = "";
                            Button.append(GetLoadingGIF());
                        }, 500);
                    };
                }
            });

            Body.insertAdjacentElement("afterbegin", Divider);

        } else if (Version === "Dropdown") {
            const MenuButton = document.createElement("img");
            MenuButton.src = "../assets/menu-icon.svg";
            MenuButton.classList.add("MenuBarButton");
            Divider.append(MenuButton);

            const ButtonDivider = document.createElement("div");
            ButtonDivider.id = "MenuBarButtonDivider";
            ButtonDivider.hidden = !MenuBarCurrentlyOpen;

            if (MenuBarStayOpenAlreadyChecked === false) {
                const URLPerms = new URLSearchParams(document.location.search);
                const KeepOpen = URLPerms.get("MenuBarDropdownOpen") ?? false;
                if (KeepOpen === "true") {
                    ButtonDivider.hidden = false;
                }
                MenuBarStayOpenAlreadyChecked = true;
                MenuBarCurrentlyOpen = true;
            }

            Pages.forEach(function (OptionObject) {
                const Button = document.createElement("button");
                Button.innerText = OptionObject.Name;
                Button.classList.add("LinkButton");
                Button.classList.add("MenuBarButton");
                Button.classList.add("MenuBarButtonFull");
                ButtonDivider.insertAdjacentElement("afterbegin", Button);

                if (OptionObject.Value !== null) {
                    Button.onclick = function () {
                        window.location.href = OptionObject.Value + "?MenuBarDropdownOpen=true";
                        setTimeout(function () {
                            Button.innerHTML = "";
                            Button.append(GetLoadingGIF());
                        }, 500);
                    };
                }

            });

            Body.insertAdjacentElement("afterbegin", ButtonDivider);
            Body.insertAdjacentElement("afterbegin", Divider);

            MenuButton.onclick = function () {
                MenuBarCurrentlyOpen = ButtonDivider.hidden;
                ButtonDivider.hidden = !ButtonDivider.hidden;
            };
        }

        Divider.append(Title);
    }

    function Clear() {
        const Divider = document.getElementById("MenuBarDivider");
        const ButtonDivider = document.getElementById("MenuBarButtonDivider");
        if (Divider !== null) {
            Divider.remove();
        }
        if (ButtonDivider !== null) {
            ButtonDivider.remove();
        }
    }

    function Main() {
        Clear();
        const Width = window.innerWidth;
        if (Width >= 500) {
            Place("Normal");
        } else {
            Place("Dropdown");
        }
    }

    Body.onresize = Main;
    Main();
}

// Util function, basically small automated edits, this function should be called last
function Util() {
    document.title = StarterTitle + " - Daughters of the American Revolution";
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