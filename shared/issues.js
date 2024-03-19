import { getSync, saveLocally } from "./storage.js"
import { JQL } from "./utils.js"

export async function loadIssues () {
    console.log("Loading issues from Jira.")
    const credentials = await getSync("credentials")
    if (!credentials || !credentials.email || !credentials.apiKey) {
        console.warn("Credentials not present! Cannot fetch from Jira.")
        chrome.runtime.openOptionsPage()
        return
    }

    const url = `https://celtra.atlassian.net/rest/api/3/search?jql=${JQL}`
    const options = {
        method: "GET",
        headers: { "Authorization": `Basic ${btoa(`${credentials.email}:${credentials.apiKey}`)}` },
    }

    return fetch(url, options)
        .then(response => response.json())
        .then(data => {
            console.log("Issues loaded, saving into storage.")
            saveLocally("issueUpdatedTimestamps", data.issues.map(issue => issue.fields.updated))
            saveLocally("lastChanged", Date.now())
        })
        .catch(error => {
            console.error(error)
            saveLocally("issueUpdatedTimestamps", [])
            saveLocally("lastChanged", Date.now())
            throw error
        })
}
