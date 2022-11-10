import { getSync } from "../shared/storage.js";
import { getNumberOfStaleIssues } from "../shared/utils.js";

async function loadData() {
    const numberOfStaleIssues = await getNumberOfStaleIssues()
    document.getElementById('number-of-stale-issues').innerText = numberOfStaleIssues
}

loadData()
