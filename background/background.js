import { loadIssuesFromJira } from '../shared/jira.js'

const ALARM_NAME = "pullExternalData"

chrome.runtime.onInstalled.addListener(() => {
    loadIssuesFromJira()

    chrome.alarms.create(ALARM_NAME, {
        delayInMinutes: 10,
        periodInMinutes: 10,
    })

    chrome.alarms.onAlarm.addListener(alarm => {
        if (alarm.name === ALARM_NAME) {
            loadIssuesFromJira()
        }
    })
})
