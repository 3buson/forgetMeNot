import { getSync, saveSync } from "../shared/storage"
import { track } from "../shared/tracker"
import { update } from "../shared/utils"
import { StorageKeyType, TrackingEventType } from "../types"

function saveCredentials (): Promise<void> {
    const email = (<HTMLInputElement>document.getElementById("email")).value
    const apiKey =(<HTMLInputElement> document.getElementById("api-key")).value
    return saveSync(StorageKeyType.CREDENTIALS, { email, apiKey })
        .then(() => {
            track({
                event: TrackingEventType.NEW_USER,
                distinct_id: email.split("@")[0],
                identifier: email.split("@")[0],
            })
            const statusEl = document.getElementById("status")
            if (statusEl) {
                statusEl.textContent = "Credentials saved!"
            }

            setTimeout(() => {
                update()
                chrome.tabs.getCurrent((tab: chrome.tabs.Tab | undefined) => {
                    if (!tab || !tab.id) {
                        return
                    }
                    chrome.tabs.remove(tab.id)
                })
            }, 500)
        })
}

function loadCredentials (): Promise<void> {
    return getSync(StorageKeyType.CREDENTIALS)
        .then(credentials => {
            if (!credentials) {
                return
            }
            (<HTMLInputElement>document.getElementById("email")).value = credentials.email
            (<HTMLInputElement>document.getElementById("api-key")).value = credentials.apiKey
        })
}

loadCredentials()
const saveEl = document.getElementById("save")
if (saveEl) {
    saveEl.addEventListener("click", saveCredentials)
}
