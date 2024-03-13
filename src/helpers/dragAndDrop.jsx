export function dragStart(e, id) {
    console.log("dragging");
    console.log("ID:", id);
    e.dataTransfer.setData('text/plain', id);

    const element = document.getElementById(id);
    if (element) {
        element.classList.add("opacity-dragging");
    }
}

export function dragEnd() {
    console.log("dragging is done");

    const invisibleElements = document.querySelectorAll(".opacity-dragging");
    invisibleElements.forEach(element => {
        element.classList.remove("opacity-dragging");
    });
}

export function dragOver(e) {
    e.preventDefault();
}

export function dragEnter(e) {
    e.preventDefault();
}

export function dragLeave(e) {
    e.preventDefault();
}

export function drop(e) {
    e.preventDefault();
    const paintingId = e.dataTransfer.getData('text/plain');
    const paintingElement = document.getElementById(paintingId);
    if (paintingElement) {
        paintingElement.classList.remove("opacity-dragging");
        e.target.appendChild(paintingElement);
    }
}
