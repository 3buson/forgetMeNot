## Description
![icon128](https://user-images.githubusercontent.com/6026190/201629288-a5335a3c-3cdb-47cf-8498-1908fd3be453.png)
ForgetMeNot is a simple Google Chrome extension that reminds you of Code/Spec review tickets that are assigned to you on Jira. It was created in an attempt to speed up the Code/Spec review process @Celtra.
Currently, the Jira API URL is hardcoded to `https://celtra.atlassian.net/`, this could easily be made configurable in the future.

## Usage
The extension is not (yet) published on Chrome Web Store, you can simply clone the repo from GitHub (or download the ZIP & unpack it locally) and manually install the extension by navigating to `chrome://extensions/` & clicking the `Load unpacked` button. Make sure that `Developer mode` is turned on.

<img width="1601" alt="Screenshot 2022-11-14 at 11 00 01" src="https://user-images.githubusercontent.com/6026190/201631259-f0dd0fdb-61a8-4604-830f-a631c3be4359.png">

<img width="1651" alt="Screenshot 2022-11-14 at 10 59 07" src="https://user-images.githubusercontent.com/6026190/201631099-78f8e554-a081-4375-8015-d6b8d75ef396.png">

## Features
- When you install the extension you'll be prompted to enter the Jira email and API key so the extension can fetch the issues from the Jira API.
- It will do so every 5 minutes and when the extension popup is open.
- The popup displays if and how many issues are assigned to you and provides a link to open them in Jira.
- If the issue has not been updated for more than 24 hours it will be considered as 'stale'.
- You will get notified about stale issues every working day at 9 am through a new tab and a system notification.
