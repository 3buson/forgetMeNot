import { getSync, saveLocally } from './storage.js'

export async function loadIssuesFromJira() {
    console.log('Loading issues from Jira.')
    const credentials = await getSync("credentials")
    if (!credentials || !credentials.email || !credentials.apiKey) {
        console.error('Credentials not present! Cannot fetch from Jira.')
        chrome.runtime.openOptionsPage()
        return
    }

    const url = `https://celtra.atlassian.net/rest/api/3/search?jql=assignee%20%3D%20currentUser()%20and%20status%20in%20("Code%20review"%2C%20"Spec%20review")`
    const options = {
        method: "GET",
        headers: {"Authorization": `Basic ${btoa(`${credentials.email}:${credentials.apiKey}`)}`},
    }

    return fetch(url, options)
        .then(response => response.json())
        .then(data => {
            saveLocally("numberOfIssues", data.issues.length)
            saveLocally("numberOfStaleIssues", numberOfStaleIssues(data.issues))
            saveLocally("lastChanged", Date.now())
        })
        .catch(error => console.error(error))
}

function numberOfStaleIssues(issues) {
    return issues.reduce((numberOfStaleIssues, issue) => {
        const oneDayInMiliseconds = 24 * 60 * 60 * 1000
        const diffInMiliseconds = Math.abs(new Date(issue.fields.updated) - new Date())
        if (diffInMiliseconds > oneDayInMiliseconds) {
            return numberOfStaleIssues + 1
        } else {
            return numberOfStaleIssues
        }
    }, 0)
}
