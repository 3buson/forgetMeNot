import { loadIssuesFromJira } from "./jira.js"
import { getLocally } from "./storage.js"

const ONE_DAY_IN_MILISECONDS = 24 * 60 * 60 * 1000
let timeout = null
let currentIconState = 0

export const ISSUES_URL = "https://celtra.atlassian.net/issues/?jql=assignee%20%3D%20currentUser()%20and%20status%20in%20(\"Code%20review\"%2C%20\"Spec%20review\")"

export function toggleElement (elementId, visible) {
    const display = visible ? "block" : "none"
    document.getElementById(elementId).style.display = display
}

export async function update () {
    await loadIssuesFromJira()
    const numberOfIssues = await getNumberOfIssues()
    const numberOfStaleIssues = await getNumberOfStaleIssues()
    animateIcon(numberOfIssues, numberOfStaleIssues)
}

export async function getNumberOfIssues () {
    const issueUpdatedTimestamps = await getLocally("issueUpdatedTimestamps")
    if (!Array.isArray(issueUpdatedTimestamps)) {
        return 0
    }

    return issueUpdatedTimestamps.length
}

export async function getNumberOfStaleIssues () {
    const issueUpdatedTimestamps = await getLocally("issueUpdatedTimestamps")
    if (!Array.isArray(issueUpdatedTimestamps)) {
        return 0
    }

    return issueUpdatedTimestamps.reduce((numberOfStaleIssues, issueUpdatedTimestamp) => {
        const diffInMiliseconds = Math.abs(new Date(issueUpdatedTimestamp) - new Date())
        if (diffInMiliseconds > ONE_DAY_IN_MILISECONDS) {
            return numberOfStaleIssues + 1
        } else {
            return numberOfStaleIssues
        }
    }, 0)
}

function animateIcon (numberOfIssues, numberOfStaleIssues) {
    if (numberOfIssues === 0) {
        chrome.action.setIcon({ path: "../assets/icon128.png" })
        return
    }

    if (numberOfStaleIssues === 0) {
        chrome.action.setIcon({ path: "../assets/bunny_0.png" })
        return
    }

    currentIconState++
    const iconNumber = currentIconState % 4
    chrome.action.setIcon({ path: `../assets/bunny_${iconNumber}.png` })
    if (timeout) {
        clearTimeout(timeout)
        timeout = null
    }
    timeout = setTimeout(() => animateIcon(numberOfIssues, numberOfStaleIssues), 50)
}
