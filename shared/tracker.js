const MIXPANEL_PROJECT_TOKEN = "a61ea6c0c2d34a4760e65c00ac58edaa"
const TRACK_URL_BASE = "https://api-eu.mixpanel.com/"

export async function track (data) {
    const typeOfData = typeof data
    if (typeOfData !== "object") {
        console.error(`Cannot track non objects, ${typeOfData} given.`)
        return
    }

    const options = {
        method: "POST",
        headers: { accept: "text/plain", "content-type": "application/json" },
        body: JSON.stringify([{
            event: "forgetMeNot",
            properties: {
                token: MIXPANEL_PROJECT_TOKEN,
                time: Date.now(),
                ...data,
            },
        }]),
    }

    return fetch(`${TRACK_URL_BASE}track`, options)
        .then(() => console.log("User signup tracking successful"))
        .catch(error => console.error(error))
}
