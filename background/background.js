import { update } from '../shared/utils.js'

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
