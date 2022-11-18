(()=>{"use strict";const e={issueUpdatedTimestamps:"issueUpdatedTimestamps",lastChanged:"lastChanged",credentials:"credentials"};function t(t,n){return new Promise((s=>chrome.storage.local.set({[e[t]]:n},(()=>s()))))}function n(t){return new Promise((n=>{chrome.storage.local.get().then((s=>{n(s[e[t]])}))}))}let s=null,a=0;function i(e,t){const n=t?"block":"none";document.getElementById(e).style.display=n}async function o(){const e=await n("issueUpdatedTimestamps");return Array.isArray(e)?e.length:0}async function r(){const e=await n("issueUpdatedTimestamps");return Array.isArray(e)?e.reduce(((e,t)=>{const n=(new Date).getTime(),s=new Date(t).getTime();return Math.abs(n-s)>864e5?e+1:e}),0):0}function c(e,t){if(0===e)return void chrome.action.setIcon({path:"../../public/icon128.png"});if(0===t)return void chrome.action.setIcon({path:"../../public/bunny_0.png"});a++;const n=a%4;chrome.action.setIcon({path:`../../public/bunny_${n}.png`}),s&&(clearTimeout(s),s=null),s=setTimeout((()=>c(e,t)),50)}document.getElementById("issues-url").href='https://celtra.atlassian.net/issues/?jql=assignee%20%3D%20currentUser()%20and%20status%20in%20("Code%20review"%2C%20"Spec%20review")',async function(){await async function(){console.log("Loading issues from Jira.");const n=await new Promise((t=>{chrome.storage.sync.get().then((n=>{t(n[e.credentials])}))}));if(!n||!n.email||!n.apiKey)return console.warn("Credentials not present! Cannot fetch from Jira."),void chrome.runtime.openOptionsPage();const s={method:"GET",headers:{Authorization:`Basic ${btoa(`${n.email}:${n.apiKey}`)}`}};return fetch('https://celtra.atlassian.net/rest/api/3/search?jql=assignee%20%3D%20currentUser()%20and%20status%20in%20("Code%20review"%2C%20"Spec%20review")',s).then((e=>e.json())).then((e=>{console.log("Issues loaded, saving into storage."),t("issueUpdatedTimestamps",e.issues.map((e=>e.fields.updated))),t("lastChanged",Date.now())})).catch((e=>console.error(e)))}(),c(await o(),await r())}().then((()=>async function(){await async function(){const e=await o();document.getElementById("number-of-issues").textContent=e.toString(),e>0?(i("no-issues",!1),i("issues",!0)):(i("no-issues",!0),i("issues",!1));const t=await r();document.getElementById("number-of-stale-issues").textContent=t.toString(),i("stale-issues",t>0)}(),i("loading",!1),i("loaded",!0)}()))})();