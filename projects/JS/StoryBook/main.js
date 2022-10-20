/*
    Author: Jacob Humston
*/

function StartUp() {

    // Variables
    let Data = null;
    const StoryTitle = document.getElementById("StoryTitle");
    const StoryText = document.getElementById("StoryText");
    const ButtonWrapper = document.getElementById("ButtonWrapper");

    // Extra Functions
    function CreateStoryButton(Text, Value) {
        console.log(`Story button is being created!\n>> Text: ${Text}\n>> Value: ${Value}`);
        const NewElement = document.createElement("button");
        NewElement.type = "button";
        NewElement.classList.add("StoryButton");
        NewElement.onclick = function () {
            console.log("Button was clicked!");
            Update(Value);
        };
        NewElement.innerHTML = "<b>You:</b> " + Text;
        ButtonWrapper.appendChild(NewElement);
        ButtonWrapper.appendChild(document.createElement("br"));
    }

    // Fetching JSON
    console.log("Fetching JSON...");
    fetch("./book.json").then(function (Response) {
        return Response.json();
    }).then(function (JSONData) {
        Data = JSONData;
        console.log("JSON fetched!");
        console.table(Data);
        Start();
    });

    // Update Function
    function Update(Value) {
        const CurrentData = Data.Story[Value];
        if (CurrentData === undefined) {
            console.log(`Page index ${Value} wasn't found!`);
            alert("Looks like the page isn't ready yet.");
            return;
        }
        console.log("Text and options are being updated!");
        console.table(CurrentData);
        ButtonWrapper.innerHTML = "";
        StoryText.innerHTML = "<b>Page " + (Value + 1) + "</b><br>" + CurrentData.Text;
        for (Index in CurrentData.Options) {
            const OptionData = CurrentData.Options[Index];
            CreateStoryButton(OptionData.Text, OptionData.Value);
        }
    }

    // Start Function
    function Start() {
        console.log("Starting!");
        StoryTitle.innerHTML = `StoryBook by <b>${Data.Author}</b>`;
        console.log("Author updated!");
        Update(0);
    }

}