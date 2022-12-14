/**
 *  Author: Jacob Humston
 *  Source: JS Card Matching Game for Juniors
 */

// Variables
let Canvas;
let Context;
let CanvasHeight = 400;
let CanvasWidth = 600;
let PictureList = ["card1", "card2", "cat1", "cat2", "cat3", "dolphin1", "dolphin2", "puppy1", "puppy2", "car", "house"];
let CurrentImage;
let ImagesLoaded = 0;
let More = -1;
let NumberOfCards = 4;
let SetPool = [];
let CardPool = []
let ImagePool = [];
function CardData(avail, flip, x, y, img, pair) {
    this.avail = avail;
    this.flip = flip;
    this.x = x;
    this.y = y;
    this.img = img;
    this.pair = pair;
}
let CardList = [];
let LGCards = [135, 30, 135, 220, 375, 30, 375, 220, 255, 30, 255, 220];
let SNCards = [220, 30, 305, 30, 135, 145, 305, 145, 390, 145, 220, 260, 305, 260, 390, 30, 135, 260, 135, 30, 390, 390, 260, 50, 145, 475, 145, 475, 30, 50, 260, 50, 30, 475, 260];
let BackgroundImage = new Image();
BackgroundImage.src = "images/background.jpeg";
let BackImage = new Image();
BackImage.src = "images/back.png";

// Early Function Calls
loadPreGame();

// Functions
function loadPreGame() {
    let Next = 0;
    while (Next <= (PictureList.length - 1)) {
        window[PictureList[Next] + "Image"] = preLoadImage("images/" + PictureList[Next] + ".png");
        Next++;
    }
}

function preLoadImage(Url) {
    More++;
    ImagePool[More] = new Image();
    ImagePool[More].onload = imageLoaded();
    ImagePool[More].src = Url;
    return ImagePool[More];
}

function imageLoaded() {
    ImagesLoaded++;
    if (ImagesLoaded == PictureList.length) {
        console.log("[PreLoading]: All images have been preloaded.");
    } else {
        console.log(`[PreLoading]: ${Math.round((ImagesLoaded / PictureList.length) * 100)}% of all images have been preloaded.`);
    }
}

function setCanvas(Id) {
    Canvas = document.createElement("canvas");
    let Divider = document.getElementById(Id);

    Canvas.width = CanvasWidth;
    Canvas.height = CanvasHeight;
    Canvas.style.position = "absolute";
    Canvas.style.border = "white 5px solid";

    Divider.appendChild(Canvas);

    Context = Canvas.getContext("2d");
}

function drawCardSpots() {
    Context.drawImage(BackgroundImage, 0, 0);

    
    // Red Cards
    /*Context.beginPath();
    Context.lineWidth = 2;
    Context.strokeStyle = "red";

    Context.rect(135, 30, 90, 150);
    Context.rect(375, 30, 90, 150);

    Context.rect(135, 220, 90, 150);
    Context.rect(375, 220, 90, 150);

    Context.stroke();*/

    /*
        // Blue Cards
        Context.beginPath();
        Context.lineWidth = 2;
        Context.strokeStyle = "blue";

        Context.rect(255, 30, 90, 150);
        Context.rect(255, 220, 90, 150);

        Context.stroke();
    */

    console.log(CardPool);

    for (let Index = 0; Index < NumberOfCards; Index++) {
        Context.drawImage(BackImage, CardPool[Index].x, CardPool[Index].y);

        Context.beginPath();
        Context.rect(CardPool[Index].x, CardPool[Index].y, CardWidth, CardHeight);
        Context.stroke();
    }
}

function randomCards() {
    let EValue = document.getElementById("NumberOfCards");
    NumberOfCards = EValue.value;
    CardPool = [];
    if (NumberOfCards <= 6) {
        CardWidth = 90;
        CardHeight = 150;
    } else {
        CardWidth = 70;
        CardHeight = 100;
    }
    let Temp = 0;
    for (let Index = 0; Index < NumberOfCards; Index += 2) {
        SetPool[Index] = Temp;
        SetPool[(Index + 1)] = Temp;
        Temp++;
    }
    let ThisImage = [];
    let Count = ImagePool.length;
    for (Index = 0; Index < Count; Index++) {
        let RandomImage = Math.floor(ImagePool.length * Math.random());
        ThisImage[Index] = ImagePool[RandomImage];
        ImagePool.splice(RandomImage, 1);
    }
    for (Index = 0; Index < NumberOfCards; Index++) {
        let Pick = Math.floor(SetPool.length * Math.random());
        let Drawn = SetPool.splice(Pick, 1);
        CardPool[Index] = parseInt(Drawn);
        CardPool[Index] = new CardData(1, 0, LGCards[(Index + 2)], LGCards[((Index + 2) + 1)], ThisImage[CardPool[Index]], CardPool[Index]);
    }
    console.log("[CardPool]: Result: " + CardPool);
    drawCardSpots()
}

function doMouseDown(event) {
    let x = event.offsetX;
    let y = event.offsetY;

    if (x > 135 && x < 225 && y > 30 && y < 180) {
        console.log("[MouseDown]: Card 1 Clicked!");
        Context.drawImage(card1Image, 135, 30);
    }

    if (x > 375 && x < 465 && y > 30 && y < 180) {
        console.log("[MouseDown]: Card 2 Clicked!");
        Context.drawImage(card1Image, 375, 30);
    }

    if (x > 135 && x < 225 && y > 220 && y < 370) {
        console.log("[MouseDown]: Card 3 Clicked!");
        Context.drawImage(card2Image, 135, 220);
    }

    if (x > 375 && x < 465 && y > 220 && y < 370) {
        console.log("[MouseDown]: Card 1 Clicked!");
        Context.drawImage(card2Image, 375, 220);
    }

    console.log(`[MouseDown]: X: ${x}, Y: ${y}`);
}

function loadGame() {
    setCanvas("GameBoard");
    Canvas.addEventListener("mousedown", doMouseDown, false);
    randomCards();
    drawCardSpots();
}

// Listen for errors
addEventListener("error", function (error) {
    alert("Something went wrong!\n>> " + error.message);
});