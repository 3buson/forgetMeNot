import { loadIssuesFromJira } from './jira.js'
import { getLocally } from "./storage.js"

const ONE_DAY_IN_MILISECONDS = 24 * 60 * 60 * 1000
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
    // never nag on weekends
    if (isWeekend()) {
        return 0
    }

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

async function animateIcon() {
    const numberOfStaleIssues = await getNumberOfStaleIssues()
    if (numberOfStaleIssues > 0) {
        currentIconState++
        const iconNumber = currentIconState % 4
        chrome.action.setIcon({ path: `../assets/bunny_${iconNumber}.png` })
        if (timeout) {
            clearTimeout(timeout)
            timeout = null
        }
        timeout = setTimeout(animateIcon, 50)
    } else {
        chrome.action.setIcon({ path: "../assets/bunny_0.png" })
    }
}

function isWeekend() {
    const date = new Date()
    return date.getDay() === 6 || date.getDay() === 0
}
