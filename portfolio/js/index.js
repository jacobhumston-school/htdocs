function loaded() {
    let robloxVisitsElement = document.getElementsByName('roblox-visits').item(1);
    let totalVisits = 0;
    const placeIds = ['3239524144', '2433287888'];
    const url = `https://games.roblox.com/v1/games?universeIds=${placeIds.join(',')}`;
    const options = { method: 'GET', mode: 'no-cors', headers: { 'Content-Type': 'application/json' } };
    fetch(url, options).then(async function (response) {
        const json = await response.json();
        console.log(json);
    });
    robloxVisitsElement.innerText = formatNumber(totalVisits);
}

window.addEventListener('load', loaded);
