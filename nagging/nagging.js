import { getSync } from "../shared/storage.js";

function loadData() {
    getSync('numberOfStaleIssues').then(numberOfStaleIssues => {
        document.getElementById('number-of-stale-issues').innerText = numberOfStaleIssues
    })
}

loadData()
