import { loadIssuesFromJira } from '../shared/jira.js'
import { getLocally, STORAGE_KEYS } from '../shared/storage.js'
import { toggleElement } from '../shared/utils.js'

function addStorageEventListener() {
    chrome.storage.onChanged.addListener(function (changes, _) {
        if (changes[STORAGE_KEYS.numberOfIssues]) {
            updateHtml()
        }
      })
}

function updateHtml() {
    updateNumberOfIssuesDisplay()
    updateMessaging()
    showLoaded()
}

function showLoaded() {
    toggleElement("loading", false)
    toggleElement("loaded", true)
}

function updateNumberOfIssuesDisplay() {
    const numberOfIssuesElement = document.getElementById("number-of-issues")
    getLocally("numberOfIssues").then(numberOfIssues => numberOfIssuesElement.textContent = numberOfIssues)
}

function updateMessaging() {
    getLocally("numberOfIssues").then(numberOfIssues => {
        if (numberOfIssues > 0) {
            toggleElement("no-issues", false)
            toggleElement("issues", true)
        } else {
            toggleElement("no-issues", true)
            toggleElement("issues", false)
        }
    })
}

addStorageEventListener()
loadIssuesFromJira().then(() => updateHtml())
