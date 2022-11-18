import { StorageKeyType } from "../types"

export function saveLocally (key: StorageKeyType, value: any): Promise<void> {
    return new Promise(resolve => chrome.storage.local.set({ [key]: value }, () => resolve()))
}

export function getLocally (key: StorageKeyType): Promise<any> {
    return new Promise(resolve => {
        chrome.storage.local.get().then(storage => {
            resolve(storage[key])
        })
    })
}

export function saveSync (key: StorageKeyType, value: any): Promise<void> {
    return new Promise(resolve => chrome.storage.sync.set({ [key]: value }, () => resolve()))
}

export function getSync (key: StorageKeyType): Promise<any> {
    return new Promise(resolve => {
        chrome.storage.sync.get().then(storage => {
            resolve(storage[key])
        })
    })
}
