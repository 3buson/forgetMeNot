import { getNumberOfIssues, ISSUES_URL, update } from "../shared/utils.js"
import { openNagPage } from "../nagging/utils.js"

const PULL_DATA_ALARM_NAME = "pullExternalData"
const NAG_ALARM_NAME = "nag"

initialize()

async function initialize (): Promise<void> {
    chrome.alarms.onAlarm.addListener(alarm => {
        if (alarm.name === PULL_DATA_ALARM_NAME) {
            update()
        } else if (alarm.name === NAG_ALARM_NAME) {
            handleNag()
        } else {
            console.log(`Unknown alarm encountered: '${alarm.name}'.`)
        }
    })

    await update()
    schedulePullDataAlarm()
    scheduleNagAlarm()
}

function schedulePullDataAlarm (): void {
    chrome.alarms.clear(PULL_DATA_ALARM_NAME)
    chrome.alarms.create(PULL_DATA_ALARM_NAME, { periodInMinutes: 5 })
    console.log("Pull data alarm scheduled.")
}

function scheduleNagAlarm (): void {
    chrome.alarms.clear(NAG_ALARM_NAME)
    const nextNagTime = getNextNagTime()
    chrome.alarms.create(NAG_ALARM_NAME, { when: nextNagTime.valueOf() })
    console.log(`Nag alarm scheduled for ${getNextNagTime().toString()}.`)
}

function getNextNagTime (): Date {
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

async function handleNag (): Promise<void> {
    scheduleNagAlarm()

    // never nag on weekends
    if (isWeekend()) {
        return
    }

    await notify()
    await openNagPage()
}

async function notify (): Promise<void>
{
    const numberOfIssues = await getNumberOfIssues()
    if (numberOfIssues === 0 || !numberOfIssues) {
        return
    }

    chrome.notifications.create("issues-notification", {
        type: "basic",
        iconUrl: "../../public/bunny_0.png",
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
