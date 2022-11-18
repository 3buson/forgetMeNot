import { getSync, saveSync } from "../shared/storage"
import { track } from "../shared/tracker"
import { update } from "../shared/utils"
import { TRACKING_EVENT } from "../types"

function saveCredentials (): Promise<void> {
    const email = (<HTMLInputElement>document.getElementById("email")).value
    const apiKey =(<HTMLInputElement> document.getElementById("api-key")).value
    return saveSync("credentials", { email, apiKey })
        .then(() => {
            track({
                event: TRACKING_EVENT["NEW_USER"],
                distinct_id: email.split("@")[0],
                identifier: email.split("@")[0],
            })
            document.getElementById("status").textContent = "Credentials saved!"
            setTimeout(() => {
                update()
                chrome.tabs.getCurrent(tab => chrome.tabs.remove(tab.id))
            }, 500)
        })
}

function loadCredentials (): Promise<void> {
    return getSync("credentials")
        .then(credentials => {
            if (!credentials) {
                return
            }
            (<HTMLInputElement>document.getElementById("email")).value = credentials.email
            (<HTMLInputElement>document.getElementById("api-key")).value = credentials.apiKey
        })
}

loadCredentials()
document.getElementById("save").addEventListener("click", saveCredentials)
