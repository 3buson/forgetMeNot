import { getNumberOfStaleIssues, update } from '../shared/utils.js'
import { openNagPage } from '../nagging/utils.js'

const PULL_DATA_ALARM_NAME = "pullExternalData"
const NAG_ALARM_NAME = "nag"

chrome.runtime.onInstalled.addListener(() => {
    update()
    schedulePullDataAlarm()
    scheduleNagAlarm()

    chrome.alarms.onAlarm.addListener(alarm => {
        if (alarm.name === PULL_DATA_ALARM_NAME) {
            update()
        } else if (alarm.name === NAG_ALARM_NAME) {
            handleNag()
        }
    })
})

function schedulePullDataAlarm() {
    chrome.alarms.create(PULL_DATA_ALARM_NAME, {
        delayInMinutes: 5,
        periodInMinutes: 5,
    })
}

function scheduleNagAlarm() {
    chrome.alarms.create(PULL_DATA_ALARM_NAME, { when: getTomorrowAtNine().valueOf() })
}

function getTomorrowAtNine() {
    const date = new Date()
    date.setDate(date.getDate() + 1)
    date.setHours(9, 0, 0)
    return date
}

async function handleNag() {
    scheduleNagAlarm()
    if (getNumberOfStaleIssues === 0) {
        return
    }
    await openNagPage()
}
