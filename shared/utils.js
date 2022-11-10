import { loadIssuesFromJira } from './jira.js'
import { getLocally } from "./storage.js"

const ONE_DAY_IN_MILISECONDS = 24 * 60 * 60 * 1000
let timeout = null
let currentIconState = 0

export const ISSUES_URL = 'https://celtra.atlassian.net/issues/?jql=assignee%20%3D%20currentUser()%20and%20status%20in%20("Code%20review"%2C%20"Spec%20review")'

export function toggleElement(elementId, visible) {
    const display = visible ? 'block' : 'none'
    document.getElementById(elementId).style.display = display
}

export async function update() {
    await loadIssuesFromJira()
    const numberOfIssues = await getLocally("numberOfIssues")
    const numberOfStaleIssues = await getNumberOfStaleIssues()
    animateIcon(numberOfStaleIssues)
    notify(numberOfIssues)
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

function animateIcon(numberOfStaleIssues) {
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
    timeout = setTimeout(() => {
        animateIcon(numberOfStaleIssues)
    }, 50)
}

function notify(numberOfIssues) {
    console.log('notify')
    console.log(numberOfIssues)
    if (numberOfIssues === 0) {
        return
    }

    chrome.notifications.create("issues-notification", {
        type: 'basic',
        iconUrl: "../assets/bunny_0.png",
        title: 'You have issues that are waiting for you',
        message: `There are ${numberOfIssues} issue(s) that are waiting for your review! Please click the notification to review them.`,
        priority: 2,
    })
    chrome.notifications.onClicked.addListener(() => chrome.tabs.create({ url: ISSUES_URL }))
}

function isWeekend() {
    const date = new Date()
    return date.getDay() === 6 || date.getDay() === 0
}
