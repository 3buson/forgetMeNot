export const STORAGE_KEYS = {
    issueUpdatedTimestamps: "issueUpdatedTimestamps",
    lastChanged: "lastChanged",
}

export function saveLocally (key, value) {
    return new Promise(resolve => chrome.storage.local.set({ [STORAGE_KEYS[key]]: value }, () => resolve()))
}

export function getLocally (key) {
    return new Promise(resolve => {
        chrome.storage.local.get().then(storage => {
            resolve(storage[STORAGE_KEYS[key]])
        })
    })
}
