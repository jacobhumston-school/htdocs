// Main function that is run on startup
function slideshow() {

    // Getting the slideshow img
    const slideshowImage = document.getElementById("slideshowImage")

    // This is our configuration
    const configuration = {
        intervalSeconds: 3, // Amount of seconds between each image change
        images: [
            "catone.jpg",
            "cattwo.jpg",
            "catthree.jpg",
            "catfour.jpeg",
            "catfive.jpg",
        ], // Array of image location
        imageRoot: "./images/" // Path for images
    }

    // Prefix name
    const config = configuration

    // Current index
    let currentIndex = 0

    setInterval(() => {
        // Updating current index and setting the new image
        currentIndex++
        let image = config.images[currentIndex]

        // If we are too far in the array we can back track and go back to the first index, which is 0
        if (image === undefined) {
            currentIndex = 0
            image = config.images[currentIndex]
        }

        // Setting the new source of the image
        slideshowImage.src = config.imageRoot + image
    }, 1000 * config.intervalSeconds);
    // setInterval uses milliseconds, so we convert it to seconds by multiplying by 1000
}