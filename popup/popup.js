import { getLocally, STORAGE_KEYS } from '../shared/storage.js'
import { getNumberOfStaleIssues, toggleElement, update } from '../shared/utils.js'

function updateHtml() {
    updateMessaging()
    showLoaded()
}

function showLoaded() {
    toggleElement("loading", false)
    toggleElement("loaded", true)
}

async function updateMessaging() {
    const numberOfIssues = await getLocally("numberOfIssues")
    const numberOfIssuesElement = document.getElementById("number-of-issues")
    numberOfIssuesElement.textContent = numberOfIssues

    if (numberOfIssues > 0) {
        toggleElement("no-issues", false)
        toggleElement("issues", true)
    } else {
        toggleElement("no-issues", true)
        toggleElement("issues", false)
    }

    const numberOfStaleIssues = await getNumberOfStaleIssues()
    const numberOfStaleIssuesElement = document.getElementById("number-of-stale-issues")
    numberOfStaleIssuesElement.textContent = numberOfStaleIssues

    if (numberOfStaleIssues > 0) {
        toggleElement("stale-issues", true)
    } else {
        toggleElement("stale-issues", false)
    }
}

update().then(() => updateHtml())
