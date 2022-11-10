import { loadIssuesFromJira } from '../shared/jira.js'
import { getLocally } from '../shared/storage.js'

let timeout = null
let currentIconState = 0
const ALARM_NAME = "pullExternalData"

chrome.runtime.onInstalled.addListener(() => {
    update()

    chrome.alarms.create(ALARM_NAME, {
        delayInMinutes: 5,
        periodInMinutes: 5,
    })

    chrome.alarms.onAlarm.addListener(alarm => {
        if (alarm.name === ALARM_NAME) {
            update()
        }
    })
})

function update() {
    loadIssuesFromJira().then(() => rotateIconIfNeeded())
}

async function rotateIconIfNeeded() {
    console.log('rotate if needed')
    const numberOfStaleIssues = await getLocally("numberOfStaleIssues")
    if (numberOfStaleIssues > 0) {
        currentIconState++
        const iconNumber = currentIconState % 4
        chrome.action.setIcon({ path: `../assets/bunny_${iconNumber}.png` })
        if (timeout) {
            clearTimeout(timeout)
            timeout = null
        }
        timeout = setTimeout(rotateIconIfNeeded, 250)
    } else {
        chrome.action.setIcon({ path: "../assets/bunny_0.png" })
    }
}
