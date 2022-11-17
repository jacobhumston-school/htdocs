/*
    Author: Jacob Humston 
            - Github: https://github.com/jacobhumston-school    
    Editors:
*/

// main.js
// Includes important functions for pages, etc

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
                Value: "../pages/join.html",
                Name: "Join"
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

                if (Button.innerText == StarterTitle) {
                    Button.classList.add("StickoutColor");
                }

                Button.onclick = function () {
                    window.location.href = OptionObject.Value;
                    setTimeout(function () {
                        Button.innerHTML = "";
                        Button.append(GetLoadingGIF());
                    }, 500);
                };

            });

            Body.insertAdjacentElement("afterbegin", Divider);

        } else if (Version === "Dropdown") {
            const MenuButton = document.createElement("img");
            MenuButton.classList.add("MenuBarButton");
            MenuButton.id = "MenuBarButtonImage";
            Divider.append(MenuButton);

            const ButtonDivider = document.createElement("div");
            ButtonDivider.id = "MenuBarButtonDivider";
            ButtonDivider.hidden = !MenuBarCurrentlyOpen;

            if (MenuBarStayOpenAlreadyChecked === false) {
                const URLPerms = new URLSearchParams(document.location.search);
                const KeepOpen = URLPerms.get("MenuBarDropdownOpen") ?? false;
                if (KeepOpen === "true") {
                    ButtonDivider.hidden = false;
                    MenuBarCurrentlyOpen = true;
                }
                MenuBarStayOpenAlreadyChecked = true;
            }

            let CurrentTimeout = 450;
            const TimeoutDifference = -100;
            const CreatedButtons = [];
            Pages.forEach(function (OptionObject) {
                const Button = document.createElement("button");
                Button.innerText = OptionObject.Name;
                Button.classList.add("LinkButton");
                Button.classList.add("MenuBarButton");
                Button.classList.add("MenuBarButtonFull");
                Button.style.opacity = "0";
                ButtonDivider.insertAdjacentElement("afterbegin", Button);

                if (Button.innerText == StarterTitle) {
                    Button.classList.add("StickoutColor");
                }

                CurrentTimeout = CurrentTimeout + TimeoutDifference;
                Button.classList.add("FadeInAnimation");
                Button.style.animationDelay = CurrentTimeout + "ms";

                Button.onanimationend = function () {
                    Button.style.opacity = null;
                };

                Button.onclick = function () {
                    window.location.href = OptionObject.Value + "?MenuBarDropdownOpen=true";
                    setTimeout(function () {
                        Button.innerHTML = "";
                        Button.append(GetLoadingGIF());
                    }, 500);
                };

                CreatedButtons.push(Button);

            });

            Body.insertAdjacentElement("afterbegin", ButtonDivider);
            Body.insertAdjacentElement("afterbegin", Divider);

            function ImageUpdate() {
                if (MenuBarCurrentlyOpen === true) {
                    MenuButton.src = "../assets/close-icon.svg";
                } else {
                    MenuButton.src = "../assets/menu-icon.svg";
                }
            }

            MenuButton.onclick = function () {
                MenuBarCurrentlyOpen = ButtonDivider.hidden;
                ButtonDivider.hidden = !ButtonDivider.hidden;
                CreatedButtons.forEach(function (Button) {
                    Button.style.opacity = "0";
                });
                ImageUpdate();
            };

            ImageUpdate();

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

// Footer function, inserts the footer
function PlaceFooter() {
    const Body = document.body;

    const FooterDivider = document.createElement("div");
    FooterDivider.id = "FooterDivider";
    FooterDivider.classList.add("TopMargin");

    const Image = document.createElement("img");
    Image.src = "../assets/banner-white.png";
    Image.width = 359 / 1.5;
    Image.height = 129 / 1.5;
    FooterDivider.append(Image);

    FooterDivider.insertAdjacentHTML("beforeend", "<br><br>Website authored by <b>Jacob Humston</b><br>");

    const CopyrightText = document.createElement("span");
    CopyrightText.innerText = "© 1890 - 2022, National Society Daughters of the American Revolution (NSDAR) | All Rights Reserved.";
    CopyrightText.style.fontSize = "13px";
    FooterDivider.append(CopyrightText);

    Body.insertAdjacentElement("beforeend", FooterDivider);
}

// Util function, basically small automated edits
function Util() {
    document.title = StarterTitle + " - Daughters of the American Revolution";

    const Body = document.body;

    const Wrapper = document.createElement("div");
    Wrapper.id = "ContentWrapper";
    Wrapper.innerHTML = Body.innerHTML;
    Body.innerHTML = "";
    Body.append(Wrapper);

    // Spacing for footer
    Wrapper.insertAdjacentHTML("beforeend", "<br><br>");

    function Update() {
        Wrapper.style.minHeight = ((window.innerHeight - Wrapper.offsetHeight) / 2) + "px";
    }

    window.addEventListener("resize", Update);

    Update();
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
    Util();
    PlaceMenuBar();
    PlaceFooter();
}