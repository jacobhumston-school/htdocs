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
    const CalenderFrame = `<iframe src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=2&amp;bgcolor=%23ffffff&amp;ctz=America%2FNew_York&amp;showTitle=1&amp;src=Y19kMzQ2ZTIxZDg1ZmVhNmUxOTg5NTRlOGMwYWYwYmE0ZjkxN2UxYmE2M2UwNjNlNjJlMzNjZDU3ZTliNzE4NDgxQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&amp;color=%234285F4" style="border-width:0" scrolling="no" width="100%" height="600" frameborder="0"></iframe>`;
    Parent.innerHTML = CalenderFrame;
}

// Menu function, inserts the menu
function PlaceMenuBar() {
    const Body = document.body;

    const Divider = document.createElement("div");
    Divider.id = "MenuBarDivider";

    const FontSpan = document.createElement("span");
    FontSpan.classList.add("SmallerFont");
    FontSpan.innerText = "Daughters of the American Revolution";

    const Title = document.createElement("span");
    Title.innerHTML = document.title + " | " + FontSpan.outerHTML;

    const Dropdown = document.createElement("select");
    Dropdown.id = "MenuBarDropdown";

    const DropdownOptions = [
        {
            Value: null,
            Name: "Pages"
        },
        {
            Value: "../pages/home.html",
            Name: "Home"
        },
        {
            Value: "../pages/contact-us.html",
            Name: "Contact Us"
        },
        {
            Value: "../pages/calender.html",
            Name: "Calender"
        }
    ];

    DropdownOptions.forEach(function (OptionObject) {
        const Option = document.createElement("option");
        Option.innerText = OptionObject.Name;
        Dropdown.append(Option);
        if (OptionObject.Value !== null) {
            Option.addEventListener("click", function () {
                window.location.href = OptionObject.Value;
                Option.innerText = "Loading...";
            });
        }
    });

    Divider.append(Title);
    Divider.append(Dropdown);
    Body.insertAdjacentElement("afterbegin", Divider);
    Body.insertAdjacentHTML("afterbegin", "<!-- Menu Bar -->");
}

// Util function, basically small automated edits
function Util() {
    document.title = document.title + " - Daughters of the American Revolution";
}

// Load function, this is like a wrapper for other functions that should be called
// -------------- it's important to note that load is called on ALL pages
function Load() {
    PlaceMenuBar();
    Util();
}