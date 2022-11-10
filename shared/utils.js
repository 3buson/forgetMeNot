import { loadIssuesFromJira } from './jira.js'
import { getLocally } from "./storage.js"

let timeout = null
let currentIconState = 0

export function toggleElement(elementId, visible) {
    const display = visible ? 'block' : 'none'
    document.getElementById(elementId).style.display = display
}

export function update() {
    return loadIssuesFromJira().then(() => animateIcon())
}

export async function getNumberOfStaleIssues() {
    if (isWeekend()) {
        // never nag on weekends
        return 0
    }

    const issueUpdatedTimestamps = await getLocally("issueUpdatedTimestamps")
    if (!Array.isArray(issueUpdatedTimestamps)) {
        return 0
    }

    return issueUpdatedTimestamps.reduce((numberOfStaleIssues, issueUpdatedTimestamp) => {
        const oneDayInMiliseconds = 24 * 60 * 60 * 1000
        const diffInMiliseconds = Math.abs(new Date(issueUpdatedTimestamp) - new Date())
        if (diffInMiliseconds > oneDayInMiliseconds) {
            return numberOfStaleIssues + 1
        } else {
            return numberOfStaleIssues
        }
    }, 0)
}

async function animateIcon() {
    const numberOfStaleIssues = await getNumberOfStaleIssues()
    if (numberOfStaleIssues > 0) {
        console.log("Stale issues present, rotating the icon.")
        currentIconState++
        const iconNumber = currentIconState % 4
        chrome.action.setIcon({ path: `../assets/bunny_${iconNumber}.png` })
        if (timeout) {
            clearTimeout(timeout)
            timeout = null
        }
        timeout = setTimeout(animateIcon, 50)
    } else {
        console.log("No stale issues present, setting the default icon.")
        chrome.action.setIcon({ path: "../assets/bunny_0.png" })
    }
}

function isWeekend() {
    const date = new Date()
    return date.getDay() === 6 || date.getDay() === 0
}
