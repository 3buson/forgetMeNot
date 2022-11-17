import { getSync, saveSync } from "../shared/storage.js";
import { track, update } from "../shared/utils.js";

function saveCredentials() {
    const email = document.getElementById('email').value
    const apiKey = document.getElementById('api-key').value
    saveSync('credentials', { email, apiKey }).then(() => {
        track({
            eventName: 'NEW_USER',
            identifier: email.split('@')[0],
        })
        document.getElementById('status').textContent = 'Credentials saved!'
        setTimeout(() => {
            update()
            chrome.tabs.getCurrent(tab => chrome.tabs.remove(tab.id))
        }, 500)
    })
}

function loadCredentials() {
    getSync('credentials').then(credentials => {
        if (!credentials) {
            return
        }
        document.getElementById('email').value = credentials.email
        document.getElementById('api-key').value = credentials.apiKey
    })
}

loadCredentials()
document.getElementById('save').addEventListener('click', saveCredentials);
