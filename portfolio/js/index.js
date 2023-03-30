function loaded() {
    // let robloxVisitsElement = document.getElementById('roblox-visits');
    // let totalVisits = 0;
    // const placeIds = ['3239524144', '2433287888'];
    // const url = `https://games.roblox.com/v1/games?universeIds=${placeIds.join(',')}`;
    // const options = { method: 'GET', mode: 'same-origin', headers: { 'Content-Type': 'text/json' } };
    // fetch(url, options)
    //     .then(async function (response) {
    //         console.log(response);
    //         const json = response.body;
    //         for (const data of json.data) {
    //             totalVisits = totalVisits + data.visits;
    //         }
    //         robloxVisitsElement.innerText = formatNumber(totalVisits);
    //     })
    //     .catch((error) => {
    //         robloxVisitsElement.innerText = "ERROR!";
    //         console.error(error);
    //     });
}

window.addEventListener('load', loaded);
