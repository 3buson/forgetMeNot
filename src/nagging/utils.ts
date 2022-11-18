import { getNumberOfIssues, getNumberOfStaleIssues, toggleElement } from "../shared/utils"

export async function updateHtml () {
    const numberOfIssues = await getNumberOfIssues()
    const numberOfStaleIssues = await getNumberOfStaleIssues()

    const numberOfIssues1El = document.getElementById("number-of-issues-1")
    if (numberOfIssues1El) {
        numberOfIssues1El.innerText = numberOfIssues.toString(0)
    }
    const numberOfIssues2El = document.getElementById("number-of-issues-2")
    if (numberOfIssues2El) {
        numberOfIssues2El.innerText = numberOfIssues.toString(0)
    }
    const numberOfStaleIssuesEl = document.getElementById("number-of-stale-issues")
    if (numberOfStaleIssuesEl) {
        numberOfStaleIssuesEl.innerText = numberOfStaleIssues.toString(0)
    }

    if (numberOfStaleIssues > 0) {
        toggleElement("stale-issues", true)
        toggleElement("no-stale-issues", false)
    } else {
        toggleElement("no-stale-issues", true)
        toggleElement("stale-issues", false)
    }
}

export async function openNagPage () {
    const numberOfStaleIssues = await getNumberOfStaleIssues()
    if (numberOfStaleIssues === 0) {
        return
    }

    const nagPageUrl = chrome.runtime.getURL("nagging/nagging.html")
    await chrome.tabs.create({
        active: true,
        url: nagPageUrl,
    })
}
