/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/types.ts
var StorageKeyType;
(function (StorageKeyType) {
    StorageKeyType["ISSUE_UPDATED_TIMESTAMPS"] = "issueUpdatedTimestamps";
    StorageKeyType["LAST_CHANGED"] = "lastChanged";
    StorageKeyType["CREDENTIALS"] = "credentials";
})(StorageKeyType || (StorageKeyType = {}));
var TrackingEventType;
(function (TrackingEventType) {
    TrackingEventType["NEW_USER"] = "NEW_USER";
})(TrackingEventType || (TrackingEventType = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdHlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFOLElBQVksY0FJWDtBQUpELFdBQVksY0FBYztJQUN0QixxRUFBbUQsQ0FBQTtJQUNuRCw4Q0FBNEIsQ0FBQTtJQUM1Qiw2Q0FBMkIsQ0FBQTtBQUMvQixDQUFDLEVBSlcsY0FBYyxLQUFkLGNBQWMsUUFJekI7QUFFRCxNQUFNLENBQU4sSUFBWSxpQkFFWDtBQUZELFdBQVksaUJBQWlCO0lBQ3pCLDBDQUFxQixDQUFBO0FBQ3pCLENBQUMsRUFGVyxpQkFBaUIsS0FBakIsaUJBQWlCLFFBRTVCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGVudW0gU3RvcmFnZUtleVR5cGUge1xuICAgIElTU1VFX1VQREFURURfVElNRVNUQU1QUyA9IFwiaXNzdWVVcGRhdGVkVGltZXN0YW1wc1wiLFxuICAgIExBU1RfQ0hBTkdFRCA9IFwibGFzdENoYW5nZWRcIixcbiAgICBDUkVERU5USUFMUyA9IFwiY3JlZGVudGlhbHNcIixcbn1cblxuZXhwb3J0IGVudW0gVHJhY2tpbmdFdmVudFR5cGUge1xuICAgIE5FV19VU0VSID0gJ05FV19VU0VSJyxcbn1cblxuZXhwb3J0IHR5cGUgVHJhY2tpbmdEYXRhID0ge1xuICAgIGV2ZW50OiBUcmFja2luZ0V2ZW50VHlwZSxcbiAgICBkaXN0aW5jdF9pZDogc3RyaW5nLFxuICAgIGlkZW50aWZpZXI6IHN0cmluZyxcbn1cblxuZXhwb3J0IHR5cGUgTWl4cGFuZWxUcmFja2luZ0RhdGEgPSB7XG4gICAgZXZlbnQ6IHN0cmluZyxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHRva2VuOiBzdHJpbmcsXG4gICAgICAgIHRpbWU6IG51bWJlcixcbiAgICB9ICYgVHJhY2tpbmdEYXRhXG59XG5cbmV4cG9ydCB0eXBlIEppcmFJc3N1ZXNSZXNwb25zZSA9IHtcbiAgICBpc3N1ZXM6IEppcmFJc3N1ZVtdLFxufVxuXG5leHBvcnQgdHlwZSBKaXJhSXNzdWUgPSB7XG4gICAgZmllbGRzOiB7XG4gICAgICAgIHVwZGF0ZWQ6IHN0cmluZyxcbiAgICB9XG59XG4iXX0=
;// CONCATENATED MODULE: ./src/shared/storage.ts
function saveLocally(key, value) {
    return new Promise(resolve => chrome.storage.local.set({ [key]: value }, () => resolve()));
}
function getLocally(key) {
    return new Promise(resolve => {
        chrome.storage.local.get().then(storage => {
            resolve(storage[key]);
        });
    });
}
function saveSync(key, value) {
    return new Promise(resolve => chrome.storage.sync.set({ [key]: value }, () => resolve()));
}
function getSync(key) {
    return new Promise(resolve => {
        chrome.storage.sync.get().then(storage => {
            resolve(storage[key]);
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zaGFyZWQvc3RvcmFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLFVBQVUsV0FBVyxDQUFFLEdBQW1CLEVBQUUsS0FBVTtJQUN4RCxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDOUYsQ0FBQztBQUVELE1BQU0sVUFBVSxVQUFVLENBQUUsR0FBbUI7SUFDM0MsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUN6QixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDdEMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBQ3pCLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDO0FBRUQsTUFBTSxVQUFVLFFBQVEsQ0FBRSxHQUFtQixFQUFFLEtBQVU7SUFDckQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQzdGLENBQUM7QUFFRCxNQUFNLFVBQVUsT0FBTyxDQUFFLEdBQW1CO0lBQ3hDLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDekIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3JDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUN6QixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0b3JhZ2VLZXlUeXBlIH0gZnJvbSBcIi4uL3R5cGVzXCJcblxuZXhwb3J0IGZ1bmN0aW9uIHNhdmVMb2NhbGx5IChrZXk6IFN0b3JhZ2VLZXlUeXBlLCB2YWx1ZTogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgW2tleV06IHZhbHVlIH0sICgpID0+IHJlc29sdmUoKSkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2NhbGx5IChrZXk6IFN0b3JhZ2VLZXlUeXBlKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgpLnRoZW4oc3RvcmFnZSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKHN0b3JhZ2Vba2V5XSlcbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2F2ZVN5bmMgKGtleTogU3RvcmFnZUtleVR5cGUsIHZhbHVlOiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7IFtrZXldOiB2YWx1ZSB9LCAoKSA9PiByZXNvbHZlKCkpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3luYyAoa2V5OiBTdG9yYWdlS2V5VHlwZSk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLmdldCgpLnRoZW4oc3RvcmFnZSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKHN0b3JhZ2Vba2V5XSlcbiAgICAgICAgfSlcbiAgICB9KVxufVxuIl19
;// CONCATENATED MODULE: ./src/shared/issues.ts


async function loadIssues() {
    console.log("Loading issues from Jira.");
    const credentials = await getSync(StorageKeyType.CREDENTIALS);
    if (!credentials || !credentials.email || !credentials.apiKey) {
        console.warn("Credentials not present! Cannot fetch from Jira.");
        chrome.runtime.openOptionsPage();
        return;
    }
    const url = "https://celtra.atlassian.net/rest/api/3/search?jql=assignee%20%3D%20currentUser()%20and%20status%20in%20(\"Code%20review\"%2C%20\"Spec%20review\")";
    const options = {
        method: "GET",
        headers: { "Authorization": `Basic ${btoa(`${credentials.email}:${credentials.apiKey}`)}` },
    };
    return fetch(url, options)
        .then(response => response.json())
        .then((data) => {
        console.log("Issues loaded, saving into storage.");
        saveLocally(StorageKeyType.ISSUE_UPDATED_TIMESTAMPS, data.issues.map(issue => issue.fields.updated));
        saveLocally(StorageKeyType.LAST_CHANGED, Date.now());
    })
        .catch(error => console.error(error));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNzdWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NoYXJlZC9pc3N1ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFzQixjQUFjLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFDN0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxXQUFXLENBQUE7QUFFaEQsTUFBTSxDQUFDLEtBQUssVUFBVSxVQUFVO0lBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQTtJQUN4QyxNQUFNLFdBQVcsR0FBRyxNQUFNLE9BQU8sQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDN0QsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFO1FBQzNELE9BQU8sQ0FBQyxJQUFJLENBQUMsa0RBQWtELENBQUMsQ0FBQTtRQUNoRSxNQUFNLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFBO1FBQ2hDLE9BQU07S0FDVDtJQUVELE1BQU0sR0FBRyxHQUFHLG9KQUFvSixDQUFBO0lBQ2hLLE1BQU0sT0FBTyxHQUFHO1FBQ1osTUFBTSxFQUFFLEtBQUs7UUFDYixPQUFPLEVBQUUsRUFBRSxlQUFlLEVBQUUsU0FBUyxJQUFJLENBQUMsR0FBRyxXQUFXLENBQUMsS0FBSyxJQUFJLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7S0FDOUYsQ0FBQTtJQUVELE9BQU8sS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUM7U0FDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2pDLElBQUksQ0FBQyxDQUFDLElBQXdCLEVBQUUsRUFBRTtRQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLHFDQUFxQyxDQUFDLENBQUE7UUFDbEQsV0FBVyxDQUFDLGNBQWMsQ0FBQyx3QkFBd0IsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtRQUNwRyxXQUFXLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQTtJQUN4RCxDQUFDLENBQUM7U0FDRCxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7QUFDN0MsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEppcmFJc3N1ZXNSZXNwb25zZSwgU3RvcmFnZUtleVR5cGUgfSBmcm9tIFwiLi4vdHlwZXNcIlxuaW1wb3J0IHsgZ2V0U3luYywgc2F2ZUxvY2FsbHkgfSBmcm9tIFwiLi9zdG9yYWdlXCJcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvYWRJc3N1ZXMgKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnNvbGUubG9nKFwiTG9hZGluZyBpc3N1ZXMgZnJvbSBKaXJhLlwiKVxuICAgIGNvbnN0IGNyZWRlbnRpYWxzID0gYXdhaXQgZ2V0U3luYyhTdG9yYWdlS2V5VHlwZS5DUkVERU5USUFMUylcbiAgICBpZiAoIWNyZWRlbnRpYWxzIHx8ICFjcmVkZW50aWFscy5lbWFpbCB8fCAhY3JlZGVudGlhbHMuYXBpS2V5KSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIkNyZWRlbnRpYWxzIG5vdCBwcmVzZW50ISBDYW5ub3QgZmV0Y2ggZnJvbSBKaXJhLlwiKVxuICAgICAgICBjaHJvbWUucnVudGltZS5vcGVuT3B0aW9uc1BhZ2UoKVxuICAgICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCB1cmwgPSBcImh0dHBzOi8vY2VsdHJhLmF0bGFzc2lhbi5uZXQvcmVzdC9hcGkvMy9zZWFyY2g/anFsPWFzc2lnbmVlJTIwJTNEJTIwY3VycmVudFVzZXIoKSUyMGFuZCUyMHN0YXR1cyUyMGluJTIwKFxcXCJDb2RlJTIwcmV2aWV3XFxcIiUyQyUyMFxcXCJTcGVjJTIwcmV2aWV3XFxcIilcIlxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgaGVhZGVyczogeyBcIkF1dGhvcml6YXRpb25cIjogYEJhc2ljICR7YnRvYShgJHtjcmVkZW50aWFscy5lbWFpbH06JHtjcmVkZW50aWFscy5hcGlLZXl9YCl9YCB9LFxuICAgIH1cblxuICAgIHJldHVybiBmZXRjaCh1cmwsIG9wdGlvbnMpXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgLnRoZW4oKGRhdGE6IEppcmFJc3N1ZXNSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJJc3N1ZXMgbG9hZGVkLCBzYXZpbmcgaW50byBzdG9yYWdlLlwiKVxuICAgICAgICAgICAgc2F2ZUxvY2FsbHkoU3RvcmFnZUtleVR5cGUuSVNTVUVfVVBEQVRFRF9USU1FU1RBTVBTLCBkYXRhLmlzc3Vlcy5tYXAoaXNzdWUgPT4gaXNzdWUuZmllbGRzLnVwZGF0ZWQpKVxuICAgICAgICAgICAgc2F2ZUxvY2FsbHkoU3RvcmFnZUtleVR5cGUuTEFTVF9DSEFOR0VELCBEYXRlLm5vdygpKVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpXG59XG4iXX0=
;// CONCATENATED MODULE: ./src/shared/utils.ts



const ONE_DAY_IN_MILISECONDS = 24 * 60 * 60 * 1000;
let timeout = null;
let currentIconState = 0;
const ISSUES_URL = "https://celtra.atlassian.net/issues/?jql=assignee%20%3D%20currentUser()%20and%20status%20in%20(\"Code%20review\"%2C%20\"Spec%20review\")";
function toggleElement(elementId, visible) {
    const display = visible ? "block" : "none";
    const element = document.getElementById(elementId);
    if (!element) {
        return;
    }
    element.style.display = display;
}
async function update() {
    await loadIssues();
    const numberOfIssues = await getNumberOfIssues();
    const numberOfStaleIssues = await getNumberOfStaleIssues();
    animateIcon(numberOfIssues, numberOfStaleIssues);
}
async function getNumberOfIssues() {
    const issueUpdatedTimestamps = await getLocally(StorageKeyType.ISSUE_UPDATED_TIMESTAMPS);
    if (!Array.isArray(issueUpdatedTimestamps)) {
        return 0;
    }
    return issueUpdatedTimestamps.length;
}
async function getNumberOfStaleIssues() {
    const issueUpdatedTimestamps = await getLocally(StorageKeyType.ISSUE_UPDATED_TIMESTAMPS);
    if (!Array.isArray(issueUpdatedTimestamps)) {
        return 0;
    }
    return issueUpdatedTimestamps.reduce((numberOfStaleIssues, issueUpdatedTimestamp) => {
        const nowTime = new Date().getTime();
        const issueTime = new Date(issueUpdatedTimestamp).getTime();
        const diffInMiliseconds = Math.abs(nowTime - issueTime);
        if (diffInMiliseconds > ONE_DAY_IN_MILISECONDS) {
            return numberOfStaleIssues + 1;
        }
        else {
            return numberOfStaleIssues;
        }
    }, 1);
}
function animateIcon(numberOfIssues, numberOfStaleIssues) {
    if (numberOfIssues === 0) {
        chrome.action.setIcon({ path: "../../public/icon128.png" });
        return;
    }
    if (numberOfStaleIssues === 0) {
        chrome.action.setIcon({ path: "../../public/bunny_0.png" });
        return;
    }
    currentIconState++;
    const iconNumber = currentIconState % 4;
    chrome.action.setIcon({ path: `../../public/bunny_${iconNumber}.png` });
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    timeout = setTimeout(() => animateIcon(numberOfIssues, numberOfStaleIssues), 50);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2hhcmVkL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFDekMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUNyQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sV0FBVyxDQUFBO0FBRXRDLE1BQU0sc0JBQXNCLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFBO0FBQ2xELElBQUksT0FBTyxHQUF5QyxJQUFJLENBQUE7QUFDeEQsSUFBSSxnQkFBZ0IsR0FBRyxDQUFDLENBQUE7QUFFeEIsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLDBJQUEwSSxDQUFBO0FBRXBLLE1BQU0sVUFBVSxhQUFhLENBQUUsU0FBaUIsRUFBRSxPQUFnQjtJQUM5RCxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFBO0lBQzFDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDbEQsSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUNWLE9BQU07S0FDVDtJQUNELE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtBQUNuQyxDQUFDO0FBRUQsTUFBTSxDQUFDLEtBQUssVUFBVSxNQUFNO0lBQ3hCLE1BQU0sVUFBVSxFQUFFLENBQUE7SUFDbEIsTUFBTSxjQUFjLEdBQUcsTUFBTSxpQkFBaUIsRUFBRSxDQUFBO0lBQ2hELE1BQU0sbUJBQW1CLEdBQUcsTUFBTSxzQkFBc0IsRUFBRSxDQUFBO0lBQzFELFdBQVcsQ0FBQyxjQUFjLEVBQUUsbUJBQW1CLENBQUMsQ0FBQTtBQUNwRCxDQUFDO0FBRUQsTUFBTSxDQUFDLEtBQUssVUFBVSxpQkFBaUI7SUFDbkMsTUFBTSxzQkFBc0IsR0FBRyxNQUFNLFVBQVUsQ0FBQyxjQUFjLENBQUMsd0JBQXdCLENBQUMsQ0FBQTtJQUN4RixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO1FBQ3hDLE9BQU8sQ0FBQyxDQUFBO0tBQ1g7SUFFRCxPQUFPLHNCQUFzQixDQUFDLE1BQU0sQ0FBQTtBQUN4QyxDQUFDO0FBRUQsTUFBTSxDQUFDLEtBQUssVUFBVSxzQkFBc0I7SUFDeEMsTUFBTSxzQkFBc0IsR0FBRyxNQUFNLFVBQVUsQ0FBQyxjQUFjLENBQUMsd0JBQXdCLENBQUMsQ0FBQTtJQUN4RixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO1FBQ3hDLE9BQU8sQ0FBQyxDQUFBO0tBQ1g7SUFFRCxPQUFPLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxDQUFDLG1CQUFtQixFQUFFLHFCQUFxQixFQUFFLEVBQUU7UUFDaEYsTUFBTSxPQUFPLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNwQyxNQUFNLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQzNELE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLENBQUE7UUFDdkQsSUFBSSxpQkFBaUIsR0FBRyxzQkFBc0IsRUFBRTtZQUM1QyxPQUFPLG1CQUFtQixHQUFHLENBQUMsQ0FBQTtTQUNqQzthQUFNO1lBQ0gsT0FBTyxtQkFBbUIsQ0FBQTtTQUM3QjtJQUNMLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUNULENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBRSxjQUFzQixFQUFFLG1CQUEyQjtJQUNyRSxJQUFJLGNBQWMsS0FBSyxDQUFDLEVBQUU7UUFDdEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsMEJBQTBCLEVBQUUsQ0FBQyxDQUFBO1FBQzNELE9BQU07S0FDVDtJQUVELElBQUksbUJBQW1CLEtBQUssQ0FBQyxFQUFFO1FBQzNCLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLDBCQUEwQixFQUFFLENBQUMsQ0FBQTtRQUMzRCxPQUFNO0tBQ1Q7SUFFRCxnQkFBZ0IsRUFBRSxDQUFBO0lBQ2xCLE1BQU0sVUFBVSxHQUFHLGdCQUFnQixHQUFHLENBQUMsQ0FBQTtJQUN2QyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxzQkFBc0IsVUFBVSxNQUFNLEVBQUUsQ0FBQyxDQUFBO0lBQ3ZFLElBQUksT0FBTyxFQUFFO1FBQ1QsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3JCLE9BQU8sR0FBRyxJQUFJLENBQUE7S0FDakI7SUFDRCxPQUFPLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsbUJBQW1CLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTtBQUNwRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RvcmFnZUtleVR5cGUgfSBmcm9tIFwiLi4vdHlwZXNcIlxuaW1wb3J0IHsgbG9hZElzc3VlcyB9IGZyb20gXCIuL2lzc3Vlc1wiXG5pbXBvcnQgeyBnZXRMb2NhbGx5IH0gZnJvbSBcIi4vc3RvcmFnZVwiXG5cbmNvbnN0IE9ORV9EQVlfSU5fTUlMSVNFQ09ORFMgPSAyNCAqIDYwICogNjAgKiAxMDAwXG5sZXQgdGltZW91dDogUmV0dXJuVHlwZTx0eXBlb2Ygc2V0VGltZW91dD4gfCBudWxsID0gbnVsbFxubGV0IGN1cnJlbnRJY29uU3RhdGUgPSAwXG5cbmV4cG9ydCBjb25zdCBJU1NVRVNfVVJMID0gXCJodHRwczovL2NlbHRyYS5hdGxhc3NpYW4ubmV0L2lzc3Vlcy8/anFsPWFzc2lnbmVlJTIwJTNEJTIwY3VycmVudFVzZXIoKSUyMGFuZCUyMHN0YXR1cyUyMGluJTIwKFxcXCJDb2RlJTIwcmV2aWV3XFxcIiUyQyUyMFxcXCJTcGVjJTIwcmV2aWV3XFxcIilcIlxuXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlRWxlbWVudCAoZWxlbWVudElkOiBzdHJpbmcsIHZpc2libGU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBjb25zdCBkaXNwbGF5ID0gdmlzaWJsZSA/IFwiYmxvY2tcIiA6IFwibm9uZVwiXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJZClcbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXlcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZSAoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgbG9hZElzc3VlcygpXG4gICAgY29uc3QgbnVtYmVyT2ZJc3N1ZXMgPSBhd2FpdCBnZXROdW1iZXJPZklzc3VlcygpXG4gICAgY29uc3QgbnVtYmVyT2ZTdGFsZUlzc3VlcyA9IGF3YWl0IGdldE51bWJlck9mU3RhbGVJc3N1ZXMoKVxuICAgIGFuaW1hdGVJY29uKG51bWJlck9mSXNzdWVzLCBudW1iZXJPZlN0YWxlSXNzdWVzKVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TnVtYmVyT2ZJc3N1ZXMgKCk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgY29uc3QgaXNzdWVVcGRhdGVkVGltZXN0YW1wcyA9IGF3YWl0IGdldExvY2FsbHkoU3RvcmFnZUtleVR5cGUuSVNTVUVfVVBEQVRFRF9USU1FU1RBTVBTKVxuICAgIGlmICghQXJyYXkuaXNBcnJheShpc3N1ZVVwZGF0ZWRUaW1lc3RhbXBzKSkge1xuICAgICAgICByZXR1cm4gMFxuICAgIH1cblxuICAgIHJldHVybiBpc3N1ZVVwZGF0ZWRUaW1lc3RhbXBzLmxlbmd0aFxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TnVtYmVyT2ZTdGFsZUlzc3VlcyAoKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICBjb25zdCBpc3N1ZVVwZGF0ZWRUaW1lc3RhbXBzID0gYXdhaXQgZ2V0TG9jYWxseShTdG9yYWdlS2V5VHlwZS5JU1NVRV9VUERBVEVEX1RJTUVTVEFNUFMpXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGlzc3VlVXBkYXRlZFRpbWVzdGFtcHMpKSB7XG4gICAgICAgIHJldHVybiAwXG4gICAgfVxuXG4gICAgcmV0dXJuIGlzc3VlVXBkYXRlZFRpbWVzdGFtcHMucmVkdWNlKChudW1iZXJPZlN0YWxlSXNzdWVzLCBpc3N1ZVVwZGF0ZWRUaW1lc3RhbXApID0+IHtcbiAgICAgICAgY29uc3Qgbm93VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gICAgICAgIGNvbnN0IGlzc3VlVGltZSA9IG5ldyBEYXRlKGlzc3VlVXBkYXRlZFRpbWVzdGFtcCkuZ2V0VGltZSgpXG4gICAgICAgIGNvbnN0IGRpZmZJbk1pbGlzZWNvbmRzID0gTWF0aC5hYnMobm93VGltZSAtIGlzc3VlVGltZSlcbiAgICAgICAgaWYgKGRpZmZJbk1pbGlzZWNvbmRzID4gT05FX0RBWV9JTl9NSUxJU0VDT05EUykge1xuICAgICAgICAgICAgcmV0dXJuIG51bWJlck9mU3RhbGVJc3N1ZXMgKyAxXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVtYmVyT2ZTdGFsZUlzc3Vlc1xuICAgICAgICB9XG4gICAgfSwgMSlcbn1cblxuZnVuY3Rpb24gYW5pbWF0ZUljb24gKG51bWJlck9mSXNzdWVzOiBudW1iZXIsIG51bWJlck9mU3RhbGVJc3N1ZXM6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChudW1iZXJPZklzc3VlcyA9PT0gMCkge1xuICAgICAgICBjaHJvbWUuYWN0aW9uLnNldEljb24oeyBwYXRoOiBcIi4uLy4uL3B1YmxpYy9pY29uMTI4LnBuZ1wiIH0pXG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChudW1iZXJPZlN0YWxlSXNzdWVzID09PSAwKSB7XG4gICAgICAgIGNocm9tZS5hY3Rpb24uc2V0SWNvbih7IHBhdGg6IFwiLi4vLi4vcHVibGljL2J1bm55XzAucG5nXCIgfSlcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY3VycmVudEljb25TdGF0ZSsrXG4gICAgY29uc3QgaWNvbk51bWJlciA9IGN1cnJlbnRJY29uU3RhdGUgJSA0XG4gICAgY2hyb21lLmFjdGlvbi5zZXRJY29uKHsgcGF0aDogYC4uLy4uL3B1YmxpYy9idW5ueV8ke2ljb25OdW1iZXJ9LnBuZ2AgfSlcbiAgICBpZiAodGltZW91dCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dClcbiAgICAgICAgdGltZW91dCA9IG51bGxcbiAgICB9XG4gICAgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gYW5pbWF0ZUljb24obnVtYmVyT2ZJc3N1ZXMsIG51bWJlck9mU3RhbGVJc3N1ZXMpLCA1MClcbn1cbiJdfQ==
;// CONCATENATED MODULE: ./src/popup/popup.ts

function setIssuesUrl() {
    document.getElementById("issues-url").href = ISSUES_URL;
}
async function updateHtml() {
    await updateMessaging();
    showLoaded();
}
function showLoaded() {
    toggleElement("loading", false);
    toggleElement("loaded", true);
}
async function updateMessaging() {
    const numberOfIssues = await getNumberOfIssues();
    const numberOfIssuesElement = document.getElementById("number-of-issues");
    if (numberOfIssuesElement) {
        numberOfIssuesElement.textContent = numberOfIssues.toString();
    }
    if (numberOfIssues > 0) {
        toggleElement("no-issues", false);
        toggleElement("issues", true);
    }
    else {
        toggleElement("no-issues", true);
        toggleElement("issues", false);
    }
    const numberOfStaleIssues = await getNumberOfStaleIssues();
    const numberOfStaleIssuesElement = document.getElementById("number-of-stale-issues");
    if (numberOfStaleIssuesElement) {
        numberOfStaleIssuesElement.textContent = numberOfStaleIssues.toString();
    }
    if (numberOfStaleIssues > 0) {
        toggleElement("stale-issues", true);
    }
    else {
        toggleElement("stale-issues", false);
    }
}
setIssuesUrl();
update().then(() => updateHtml());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcG9wdXAvcG9wdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLHNCQUFzQixFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUE7QUFFOUcsU0FBUyxZQUFZO0lBQ0csUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUUsQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFBO0FBQ2hGLENBQUM7QUFFRCxLQUFLLFVBQVUsVUFBVTtJQUNyQixNQUFNLGVBQWUsRUFBRSxDQUFBO0lBQ3ZCLFVBQVUsRUFBRSxDQUFBO0FBQ2hCLENBQUM7QUFFRCxTQUFTLFVBQVU7SUFDZixhQUFhLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQy9CLGFBQWEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFDakMsQ0FBQztBQUVELEtBQUssVUFBVSxlQUFlO0lBQzFCLE1BQU0sY0FBYyxHQUFHLE1BQU0saUJBQWlCLEVBQUUsQ0FBQTtJQUNoRCxNQUFNLHFCQUFxQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtJQUN6RSxJQUFJLHFCQUFxQixFQUFFO1FBQ3ZCLHFCQUFxQixDQUFDLFdBQVcsR0FBRyxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUE7S0FDaEU7SUFFRCxJQUFJLGNBQWMsR0FBRyxDQUFDLEVBQUU7UUFDcEIsYUFBYSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUNqQyxhQUFhLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFBO0tBQ2hDO1NBQU07UUFDSCxhQUFhLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ2hDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUE7S0FDakM7SUFFRCxNQUFNLG1CQUFtQixHQUFHLE1BQU0sc0JBQXNCLEVBQUUsQ0FBQTtJQUMxRCxNQUFNLDBCQUEwQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsd0JBQXdCLENBQUMsQ0FBQTtJQUNwRixJQUFJLDBCQUEwQixFQUFFO1FBQzVCLDBCQUEwQixDQUFDLFdBQVcsR0FBRyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtLQUMxRTtJQUVELElBQUksbUJBQW1CLEdBQUcsQ0FBQyxFQUFFO1FBQ3pCLGFBQWEsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUE7S0FDdEM7U0FBTTtRQUNILGFBQWEsQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUE7S0FDdkM7QUFDTCxDQUFDO0FBRUQsWUFBWSxFQUFFLENBQUE7QUFDZCxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldE51bWJlck9mSXNzdWVzLCBnZXROdW1iZXJPZlN0YWxlSXNzdWVzLCBJU1NVRVNfVVJMLCB0b2dnbGVFbGVtZW50LCB1cGRhdGUgfSBmcm9tIFwiLi4vc2hhcmVkL3V0aWxzXCJcblxuZnVuY3Rpb24gc2V0SXNzdWVzVXJsICgpOiB2b2lkIHtcbiAgICAoPEhUTUxBbmNob3JFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaXNzdWVzLXVybFwiKSkuaHJlZiA9IElTU1VFU19VUkxcbn1cblxuYXN5bmMgZnVuY3Rpb24gdXBkYXRlSHRtbCAoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdXBkYXRlTWVzc2FnaW5nKClcbiAgICBzaG93TG9hZGVkKClcbn1cblxuZnVuY3Rpb24gc2hvd0xvYWRlZCAoKTogdm9pZCB7XG4gICAgdG9nZ2xlRWxlbWVudChcImxvYWRpbmdcIiwgZmFsc2UpXG4gICAgdG9nZ2xlRWxlbWVudChcImxvYWRlZFwiLCB0cnVlKVxufVxuXG5hc3luYyBmdW5jdGlvbiB1cGRhdGVNZXNzYWdpbmcgKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IG51bWJlck9mSXNzdWVzID0gYXdhaXQgZ2V0TnVtYmVyT2ZJc3N1ZXMoKVxuICAgIGNvbnN0IG51bWJlck9mSXNzdWVzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibnVtYmVyLW9mLWlzc3Vlc1wiKVxuICAgIGlmIChudW1iZXJPZklzc3Vlc0VsZW1lbnQpIHtcbiAgICAgICAgbnVtYmVyT2ZJc3N1ZXNFbGVtZW50LnRleHRDb250ZW50ID0gbnVtYmVyT2ZJc3N1ZXMudG9TdHJpbmcoKVxuICAgIH1cblxuICAgIGlmIChudW1iZXJPZklzc3VlcyA+IDApIHtcbiAgICAgICAgdG9nZ2xlRWxlbWVudChcIm5vLWlzc3Vlc1wiLCBmYWxzZSlcbiAgICAgICAgdG9nZ2xlRWxlbWVudChcImlzc3Vlc1wiLCB0cnVlKVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHRvZ2dsZUVsZW1lbnQoXCJuby1pc3N1ZXNcIiwgdHJ1ZSlcbiAgICAgICAgdG9nZ2xlRWxlbWVudChcImlzc3Vlc1wiLCBmYWxzZSlcbiAgICB9XG5cbiAgICBjb25zdCBudW1iZXJPZlN0YWxlSXNzdWVzID0gYXdhaXQgZ2V0TnVtYmVyT2ZTdGFsZUlzc3VlcygpXG4gICAgY29uc3QgbnVtYmVyT2ZTdGFsZUlzc3Vlc0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm51bWJlci1vZi1zdGFsZS1pc3N1ZXNcIilcbiAgICBpZiAobnVtYmVyT2ZTdGFsZUlzc3Vlc0VsZW1lbnQpIHtcbiAgICAgICAgbnVtYmVyT2ZTdGFsZUlzc3Vlc0VsZW1lbnQudGV4dENvbnRlbnQgPSBudW1iZXJPZlN0YWxlSXNzdWVzLnRvU3RyaW5nKClcbiAgICB9XG5cbiAgICBpZiAobnVtYmVyT2ZTdGFsZUlzc3VlcyA+IDApIHtcbiAgICAgICAgdG9nZ2xlRWxlbWVudChcInN0YWxlLWlzc3Vlc1wiLCB0cnVlKVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHRvZ2dsZUVsZW1lbnQoXCJzdGFsZS1pc3N1ZXNcIiwgZmFsc2UpXG4gICAgfVxufVxuXG5zZXRJc3N1ZXNVcmwoKVxudXBkYXRlKCkudGhlbigoKSA9PiB1cGRhdGVIdG1sKCkpXG4iXX0=
/******/ })()
;