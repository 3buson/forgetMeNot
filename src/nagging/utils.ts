import { getNumberOfIssues, getNumberOfStaleIssues, toggleElement } from "../shared/utils"

export async function updateHtml () {
    const numberOfIssues = await getNumberOfIssues()
    const numberOfStaleIssues = await getNumberOfStaleIssues()

    document.getElementById("number-of-issues-1").innerText = numberOfIssues.toString(0)
    document.getElementById("number-of-issues-2").innerText = numberOfIssues.toString(0)
    document.getElementById("number-of-stale-issues").innerText = numberOfStaleIssues.toString(0)

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
