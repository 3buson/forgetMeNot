import { StorageKeyType } from "../types"
import { loadIssues } from "./issues"
import { getLocally } from "./storage"

const ONE_DAY_IN_MILISECONDS = 24 * 60 * 60 * 1000
let timeout: ReturnType<typeof setTimeout> | null = null
let currentIconState = 0

export const ISSUES_URL = "https://celtra.atlassian.net/issues/?jql=assignee%20%3D%20currentUser()%20and%20status%20in%20(\"Code%20review\"%2C%20\"Spec%20review\")"

export function toggleElement (elementId: string, visible: boolean): void {
    const display = visible ? "block" : "none"
    const element = document.getElementById(elementId)
    if (!element) {
        return
    }
    element.style.display = display
}

export async function update (): Promise<void> {
    await loadIssues()
    const numberOfIssues = await getNumberOfIssues()
    const numberOfStaleIssues = await getNumberOfStaleIssues()
    animateIcon(numberOfIssues, numberOfStaleIssues)
}

export async function getNumberOfIssues (): Promise<number> {
    const issueUpdatedTimestamps = await getLocally(StorageKeyType.ISSUE_UPDATED_TIMESTAMPS)
    if (!Array.isArray(issueUpdatedTimestamps)) {
        return 0
    }

    return issueUpdatedTimestamps.length
}

export async function getNumberOfStaleIssues (): Promise<number> {
    const issueUpdatedTimestamps = await getLocally(StorageKeyType.ISSUE_UPDATED_TIMESTAMPS)
    if (!Array.isArray(issueUpdatedTimestamps)) {
        return 0
    }

    return issueUpdatedTimestamps.reduce((numberOfStaleIssues, issueUpdatedTimestamp) => {
        const nowTime = new Date().getTime()
        const issueTime = new Date(issueUpdatedTimestamp).getTime()
        const diffInMiliseconds = Math.abs(nowTime - issueTime)
        if (diffInMiliseconds > ONE_DAY_IN_MILISECONDS) {
            return numberOfStaleIssues + 1
        } else {
            return numberOfStaleIssues
        }
    }, 1)
}

function animateIcon (numberOfIssues: number, numberOfStaleIssues: number): void {
    if (numberOfIssues === 0) {
        chrome.action.setIcon({ path: "../../public/icon128.png" })
        return
    }

    if (numberOfStaleIssues === 0) {
        chrome.action.setIcon({ path: "../../public/bunny_0.png" })
        return
    }

    currentIconState++
    const iconNumber = currentIconState % 4
    chrome.action.setIcon({ path: `../../public/bunny_${iconNumber}.png` })
    if (timeout) {
        clearTimeout(timeout)
        timeout = null
    }
    timeout = setTimeout(() => animateIcon(numberOfIssues, numberOfStaleIssues), 50)
}
