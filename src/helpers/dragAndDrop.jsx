export function dragStart(e, id) {
    e.dataTransfer.setData('text/plain', id);
    document.addEventListener('drop', drop);
}

export function dragEnd(e) {
    const invisibleElements = document.querySelectorAll(".opacity-dragging");
    invisibleElements.forEach(element => {
        element.style.opacity = '';
    });
    document.removeEventListener('drop', drop);
}

export function drop(e) {
    e.preventDefault();
    const paintingId = e.dataTransfer.getData('text/plain');
    const paintingElement = document.getElementById(paintingId);
    if (paintingElement) {
        e.target.appendChild(paintingElement);
    }
}
