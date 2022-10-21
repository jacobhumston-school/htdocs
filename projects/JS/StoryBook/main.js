/*
    Author: Jacob Humston
*/

function StartUp() {

    // Variables
    let Data = null;
    let ButtonCount = 0;
    let CurrentTextInterval = null;
    let PagesViewed = [];
    const StoryTitle = document.getElementById("StoryTitle");
    const StoryText = document.getElementById("StoryText");
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
        NewElement.innerHTML = "<b>You:</b> " + Text;
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
    function Update(Value) {
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
            }
            return;
        }
        PagesViewed.push(Value + 1);
        console.log("Text and options are being updated!");
        console.table(CurrentData);
        ButtonWrapper.innerHTML = "";
        StoryText.innerHTML = "";
        PageNumber.innerHTML = `<b>Page ${Value + 1}</b>`;
        let StringIndex = -1;
        let Text = CurrentData.Text;
        console.log("CurrentTextInterval started!");
        CurrentTextInterval = setInterval(function () {
            StringIndex++;
            if (StringIndex < Text.length) {
                if (Text.charAt(StringIndex) === "*") {
                    StoryText.innerHTML = StoryText.innerHTML + "<br>";
                } else {
                    StoryText.innerHTML = StoryText.innerHTML + Text.charAt(StringIndex);
                }
            } else {
                StoryText.innerHTML = Text.replaceAll("*", "<br>");
                if (Value === Data.Story.length - 1) {
                    StoryText.innerHTML = StoryText.innerHTML + "<br><br>It seems the story ends here. The following is the path you took in the story:<br><b>" + PagesViewed.join("</b> > <b>") + "</b>";
                }
                clearInterval(CurrentTextInterval);
                console.log("CurrentTextInterval cleared!");
                CurrentTextInterval = null;
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

}