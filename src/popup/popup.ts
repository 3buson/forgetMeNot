import { getNumberOfIssues, getNumberOfStaleIssues, ISSUES_URL, toggleElement, update } from "../shared/utils"

function setIssuesUrl (): void {
    (<HTMLAnchorElement>document.getElementById("issues-url")).href = ISSUES_URL
}

async function updateHtml (): Promise<void> {
    await updateMessaging()
    showLoaded()
}

function showLoaded (): void {
    toggleElement("loading", false)
    toggleElement("loaded", true)
}

async function updateMessaging (): Promise<void> {
    const numberOfIssues = await getNumberOfIssues()
    const numberOfIssuesElement = document.getElementById("number-of-issues")
    if (numberOfIssuesElement) {
        numberOfIssuesElement.textContent = numberOfIssues.toString()
    }

    if (numberOfIssues > 0) {
        toggleElement("no-issues", false)
        toggleElement("issues", true)
    } else {
        toggleElement("no-issues", true)
        toggleElement("issues", false)
    }

    const numberOfStaleIssues = await getNumberOfStaleIssues()
    const numberOfStaleIssuesElement = document.getElementById("number-of-stale-issues")
    if (numberOfStaleIssuesElement) {
        numberOfStaleIssuesElement.textContent = numberOfStaleIssues.toString()
    }

    if (numberOfStaleIssues > 0) {
        toggleElement("stale-issues", true)
    } else {
        toggleElement("stale-issues", false)
    }
}

setIssuesUrl()
update().then(() => updateHtml())
