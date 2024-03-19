import { saveLocally } from "./storage.js"
import { JQL } from "./utils.js"

export async function loadIssues () {
    console.log("Loading issues from Jira.")

    const url = `https://celtra.atlassian.net/rest/api/3/search?jql=${JQL}`
    const options = {
        method: "GET"
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
