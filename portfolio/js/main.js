function changeTitle() {
    document.title = `${document.title} - Jacob Humston's Portfolio`;
    return;
}

function loaded() {
    changeTitle();
    return;
}

/**
 * Adds commas to numbers.
 * @param {Number} providedNumber
 * @returns {string}
 * @example
 * formatNumber(1000) // 1,000
 */
function formatNumber(providedNumber) {
    let formattedNumber = '';
    let numberToFormat = providedNumber.toString();
    let numbersPassed = 0;
    for (let index = numberToFormat.length; index != 0; index--) {
        numbersPassed++;
        let character = numberToFormat.charAt(index - 1);
        formattedNumber = character + formattedNumber;
        if (numbersPassed == 3) {
            if (index != 1) {
                formattedNumber = ',' + formattedNumber;
                numbersPassed = 0;
            }
        }
    }
    return formattedNumber;
}

window.addEventListener('load', loaded);
