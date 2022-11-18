import { getSync, saveLocally } from "./storage"

export async function loadIssues (): Promise<void> {
    console.log("Loading issues from Jira.")
    const credentials = await getSync("credentials")
    if (!credentials || !credentials.email || !credentials.apiKey) {
        console.warn("Credentials not present! Cannot fetch from Jira.")
        chrome.runtime.openOptionsPage()
        return
    }

    const url = "https://celtra.atlassian.net/rest/api/3/search?jql=assignee%20%3D%20currentUser()%20and%20status%20in%20(\"Code%20review\"%2C%20\"Spec%20review\")"
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
        .catch(error => console.error(error))
}
