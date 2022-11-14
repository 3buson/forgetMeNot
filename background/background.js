import { getNumberOfStaleIssues, update } from '../shared/utils.js'
import { openNagPage } from '../nagging/utils.js'

const PULL_DATA_ALARM_NAME = "pullExternalData"
const NAG_ALARM_NAME = "nag"

initialize()

function initialize() {
    chrome.alarms.onAlarm.addListener(alarm => {
        if (alarm.name === PULL_DATA_ALARM_NAME) {
            update()
        } else if (alarm.name === NAG_ALARM_NAME) {
            handleNag()
        } else {
            console.log(`Unknown alarm encountered: '${alarm.name}'.`)
        }
    })

    update()
    schedulePullDataAlarm()
    scheduleNagAlarms()
}

function schedulePullDataAlarm() {
    chrome.alarms.create(PULL_DATA_ALARM_NAME, { periodInMinutes: 5 })
}

function scheduleNagAlarms() {
    chrome.alarms.clear(NAG_ALARM_NAME)
    chrome.alarms.create(NAG_ALARM_NAME, { when: getTomorrowAt(9).valueOf() })
    chrome.alarms.create(NAG_ALARM_NAME, { when: getTomorrowAt(14).valueOf() })
}

function getTomorrowAt(hour) {
    const date = new Date()
    date.setDate(date.getDate() + 1)
    date.setHours(hour, 0, 0)
    return date
}

async function handleNag() {
    scheduleNagAlarms()
    const numberOfStaleIssues = await getNumberOfStaleIssues()
    if (numberOfStaleIssues === 0 || !numberOfStaleIssues) {
        return
    }
    await openNagPage()
}
