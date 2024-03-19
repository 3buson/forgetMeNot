import { loadIssues } from "./issues.js"
import { getLocally } from "./storage.js"

const ONE_DAY_IN_MILISECONDS = 24 * 60 * 60 * 1000
let iconAnimationTimeout = null
let currentIconState = 0

export const JQL = "assignee%20%3D%20currentUser()%20and%20status%20in%20(\"Code%20review\"%2C%20\"Spec%20review\"%2C%20\"In%20review\")"
export const ISSUES_URL = `https://celtra.atlassian.net/issues/?jql=${JQL}`

export function toggleElement (elementId, visible) {
    const display = visible ? "block" : "none"
    document.getElementById(elementId).style.display = display
}

export async function update () {
    try {
        await loadIssues()
        const numberOfIssues = await getNumberOfIssues()
        const numberOfStaleIssues = await getNumberOfStaleIssues()
        animateIcon(numberOfIssues, numberOfStaleIssues)
    } catch {
        setError()
    }
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
        clearIconAnimationTimeout()
        return
    }

    if (numberOfStaleIssues === 0) {
        chrome.action.setIcon({ path: "../assets/bunny_0.png" })
        clearIconAnimationTimeout()
        return
    }

    currentIconState++
    const iconNumber = currentIconState % 4
    chrome.action.setIcon({ path: `../assets/bunny_${iconNumber}.png` })
    clearIconAnimationTimeout()
    iconAnimationTimeout = setTimeout(() => animateIcon(numberOfIssues, numberOfStaleIssues), 50)
}

function setError () {
    chrome.action.setIcon({ path: "../assets/icon_error.png" })
}

function clearIconAnimationTimeout () {
    if (iconAnimationTimeout) {
        clearTimeout(iconAnimationTimeout)
        iconAnimationTimeout = null
    }
}
