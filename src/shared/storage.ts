export const STORAGE_KEYS = {
    issueUpdatedTimestamps: "issueUpdatedTimestamps",
    lastChanged: "lastChanged",
    credentials: "credentials",
}

export function saveLocally (key, value): Promise<void> {
    return new Promise(resolve => chrome.storage.local.set({ [STORAGE_KEYS[key]]: value }, () => resolve()))
}

export function getLocally (key): Promise<any> {
    return new Promise(resolve => {
        chrome.storage.local.get().then(storage => {
            resolve(storage[STORAGE_KEYS[key]])
        })
    })
}

export function saveSync (key, value): Promise<void> {
    return new Promise(resolve => chrome.storage.sync.set({ [STORAGE_KEYS[key]]: value }, () => resolve()))
}

export function getSync (key): Promise<any> {
    return new Promise(resolve => {
        chrome.storage.sync.get().then(storage => {
            resolve(storage[STORAGE_KEYS[key]])
        })
    })
}
