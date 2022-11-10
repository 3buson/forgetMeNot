export const STORAGE_KEYS = {
    numberOfIssues: 'numberOfIssues',
    issueUpdatedTimestamps: 'issueUpdatedTimestamps',
    lastChanged: 'lastChanged',
    credentials: 'credentials'
}

export function saveLocally(key, value) {
    return new Promise(resolve => chrome.storage.local.set({[STORAGE_KEYS[key]]: value}, () => resolve()))
}

export function getLocally(key) {
    return new Promise(resolve => {
        chrome.storage.local.get().then(storage => {
            resolve(storage[STORAGE_KEYS[key]])
        })
    })
}

export function saveSync(key, value) {
    return new Promise(resolve => chrome.storage.sync.set({[STORAGE_KEYS[key]]: value}, () => resolve()))
}

export function getSync(key) {
    return new Promise(resolve => {
        chrome.storage.sync.get().then(storage => {
            resolve(storage[STORAGE_KEYS[key]])
        })
    })
}
