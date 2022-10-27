/*
    Author: Jacob Humston
*/

function StartUp() {

    // Variables
    let Data = null;
    let ButtonCount = 0;
    let CurrentTextInterval = null;
    let PagesViewed = [];
    let LastPageVisited = 0;
    let SkipTextAnimation = false;
    const Body = document.getElementById("Body");
    const StoryTitle = document.getElementById("StoryTitle");
    const StoryText = document.getElementById("StoryText");
    const StoryImage = document.getElementById("StoryImage");
    const ButtonWrapper = document.getElementById("ButtonWrapper");
    const PageNumber = document.getElementById("PageNumber");

    // Extra Functions
    function CreateStoryButton(Text, Value) {
        ButtonCount++;
        console.log(`Story button is being created!\n>> Text: ${Text}\n>> Value: ${Value}\n>> ButtonCount: ${ButtonCount}`);
        const NewElement = document.createElement("button");
        NewElement.type = "button";
        NewElement.classList.add("StoryButton");
        NewElement.classList.add(`StoryButton${ButtonCount}`);
        NewElement.onclick = function () {
            console.log("Button was clicked!");
            Update(Value);
        };
        NewElement.innerHTML = `<i><span class="GreyText">${ButtonCount} —</span></i> <b>You:</b> ` + Text;
        ButtonWrapper.appendChild(NewElement);
        ButtonWrapper.appendChild(document.createElement("br"));
        NewElement.addEventListener("animationend", function () {
            NewElement.style.opacity = 1;
        });
    }

    // Fetching JSON
    console.log("Fetching JSON...");
    fetch("./book.json", { cache: "no-store" }).then(function (Response) {
        return Response.json();
    }).then(function (JSONData) {
        Data = JSONData;
        console.log("JSON fetched!");
        console.table(Data);
        Start();
    });

    // Update Function
    function Update(Value, PageToGoIfCancelled) {
        SkipTextAnimation = false;
        window.scrollTo(0, 0);
        console.log("Reset scroll position!");
        StoryImage.hidden = true;
        StoryImage.width = null;
        StoryImage.height = null;
        console.log("Image was hidden, width and hight were reset!");
        Body.style.backgroundImage = null;
        console.log("Background image was cleared!");
        if (CurrentTextInterval !== null) {
            clearInterval(CurrentTextInterval);
            CurrentTextInterval = null;
            console.log("CurrentTextInterval cleared!");
        }
        ButtonCount = 0;
        const CurrentData = Data.Story[Value];
        if (CurrentData === undefined) {
            console.log(`Page index ${Value} wasn't found!`);
            console.log("Prompting confirm...");
            const DoRestart = confirm(`Page ${Value + 1} isn't ready yet...\nWould you like to go back to the first page?\n\n>> Ok/Okay = Yes\n>> Cancel = No`);
            console.log("Confirm prompt finished.\n>> Restart?: " + DoRestart);
            if (DoRestart === true) {
                Start();
            } else {
                if (PageToGoIfCancelled !== null && PageToGoIfCancelled !== undefined) {
                    Update(PageToGoIfCancelled);
                }
            }
            return;
        }
        PagesViewed.push(Value + 1);
        console.log("Text and options are being updated!");
        console.table(CurrentData);
        ButtonWrapper.innerHTML = "";
        StoryText.innerHTML = "";
        PageNumber.innerHTML = `<b>Page ${Value + 1}</b> — <i><a href="mailto:jhumston24@sciototech.org?subject=StoryBook Feedback (Page ${Value + 1})" target="blank">Send Feedback</a> (Email)</i>`;
        let StringIndex = -1;
        let Text = CurrentData.Text;
        if (Value === Data.Story.length - 1) {
            Text = Text + "**It seems the story ends here for now. Path you took:*Page " + PagesViewed.join(", Page ");
        }
        const Meta = CurrentData.Meta;
        if (Meta !== undefined) {
            if (Meta.BackgroundImage !== undefined) {
                Body.style.backgroundImage = "url(./images/" + Meta.BackgroundImage + ")";
                console.log("Background image has been loaded!");
            }
        }
        LastPageVisited = Value;
        console.log("Last visited page variable updated!");
        console.log("CurrentTextInterval starting...");
        CurrentTextInterval = setInterval(function () {
            StringIndex++;
            if (StringIndex < Text.length && SkipTextAnimation == false) {
                if (StoryText.innerHTML.charAt(StoryText.innerHTML.length - 1) === "█") {
                    StoryText.innerHTML = StoryText.innerHTML.slice(0, -1);
                }
                if (Text.charAt(StringIndex) === "*") {
                    StoryText.innerHTML = StoryText.innerHTML + "<br>█";
                } else {
                    StoryText.innerHTML = StoryText.innerHTML + Text.charAt(StringIndex) + "█";
                }
            } else {
                SkipTextAnimation = false;
                StoryText.innerHTML = Text.replaceAll("*", "<br>");
                clearInterval(CurrentTextInterval);
                console.log("CurrentTextInterval cleared!");
                CurrentTextInterval = null;
                const Image = CurrentData.Image;
                if (Image !== undefined) {
                    StoryImage.src = "./images/" + Image;
                    StoryImage.hidden = false;
                    StoryImage.width = CurrentData.ImageMeta.Width;
                    StoryImage.height = CurrentData.ImageMeta.Height;
                    console.log("Image was updated!");
                }
                for (Index in CurrentData.Options) {
                    const OptionData = CurrentData.Options[Index];
                    CreateStoryButton(OptionData.Text, OptionData.Value);
                }
                console.log("CurrentTextInterval finished!");
            }
        }, 25);
    }

    // Start Function
    function Start() {
        console.log("Starting!");
        PagesViewed = [];
        StoryTitle.innerHTML = `StoryBook by <b>${Data.Author}</b>`;
        console.log("Author updated!");
        Update(0);
    }

    // Events
    addEventListener("keydown", function (Event) {
        if (Event.key === "c" && Event.ctrlKey === true) {
            console.log("Prompting go-to-prompt...");
            const Page = prompt(`Please enter a page to go to... (1 - ${Data.Story.length})`, "1");
            if (Page !== null && Page !== "") {
                console.log("Going to page from go-to-prompt.");
                let ProvidedNumber = parseInt(Page);
                if (isNaN(ProvidedNumber) !== true) {
                    Update(ProvidedNumber - 1, LastPageVisited);
                } else {
                    Update(0);
                }
            } else {
                console.log("Go-to-prompt was cancelled or returned an empty string!");
            }
        } else if (Event.key === "s") {
            SkipTextAnimation = true;
            console.log("Skipping text animation!");
        }
    });
}
