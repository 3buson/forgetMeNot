export function toggleElement(elementId, visible) {
    const display = visible ? 'block' : 'none'
    document.getElementById(elementId).style.display = display
}
