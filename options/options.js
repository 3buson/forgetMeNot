import { getSync, saveSync } from "../shared/storage.js";

function saveCredentials() {
    const email = document.getElementById('email').value
    const apiKey = document.getElementById('api-key').value
    saveSync('credentials', { email, apiKey }).then(() => {
        document.getElementById('status').textContent = 'Credentials saved!'
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
