import { getNumberOfIssues, ISSUES_URL, update } from "../shared/utils.js"
import { openNagPage } from "../nagging/utils.js"

const PULL_DATA_ALARM_NAME = "pullExternalData"
const NAG_ALARM_NAME = "nag"

var newConsole = (function (oldConsole) {
    const timestamp = new Date().toISOString()
    return {
        log: function (text) {
            oldConsole.log(`${timestamp} ${text}`)
        },
        info: function (text) {
            oldConsole.info(`${timestamp} ${text}`)
        },
        warn: function (text) {
            oldConsole.warn(`${timestamp} ${text}`)
        },
        error: function (text) {
            oldConsole.error(`${timestamp} ${text}`)
        },
    }
}(console))

// Then redefine the old console
console = newConsole

initialize()

function initialize () {
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
    scheduleNagAlarm()
}

function schedulePullDataAlarm () {
    chrome.alarms.clear(PULL_DATA_ALARM_NAME)
    chrome.alarms.create(PULL_DATA_ALARM_NAME, { periodInMinutes: 5 })
    console.log("Pull data alarm scheduled.")
}

function scheduleNagAlarm () {
    chrome.alarms.clear(NAG_ALARM_NAME)
    const nextNagTime = getNextNagTime()
    chrome.alarms.create(NAG_ALARM_NAME, { when: nextNagTime.valueOf() })
    console.log(`Nag alarm scheduled for ${getNextNagTime().toString()}.`)
}

function getNextNagTime () {
    const date = new Date()
    const currentHour = date.getHours()

    if (currentHour < 9) { // morning
        date.setHours(9, 0, 0)
    } else if (currentHour < 14) { // midday
        date.setHours(14, 0, 0)
    } else { // later afternoon
        date.setDate(date.getDate() + 1)
        date.setHours(9, 0, 0)
    }

    return date
}

async function handleNag () {
    scheduleNagAlarm()

    // never nag on weekends
    if (isWeekend()) {
        return
    }

    await notify()
    await openNagPage()
}

async function notify () {
    const numberOfIssues = await getNumberOfIssues()
    if (numberOfIssues === 0 || !numberOfIssues) {
        return
    }

    chrome.notifications.create("issues-notification", {
        type: "basic",
        iconUrl: "../assets/bunny_0.png",
        title: "You have issues that are waiting for you",
        message: `There are ${numberOfIssues} issue(s) that are waiting for your review! Please click the notification to review them.`,
        priority: 2,
    })
    chrome.notifications.onClicked.addListener(() => chrome.tabs.create({ url: ISSUES_URL }))
}

function isWeekend () {
    const date = new Date()
    return date.getDay() === 6 || date.getDay() === 0
}
