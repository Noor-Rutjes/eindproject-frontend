// Function to handle drag start event
export function dragStart(event, id) {
    event.dataTransfer.setData('text/plain', id);

    const element = document.getElementById(id);
    if (element) {
        element.classList.add("opacity-dragging");
    }
}

// Function to handle drag end event
export function dragEnd() {
    const invisibleElements = document.querySelectorAll(".opacity-dragging");
    invisibleElements.forEach(element => {
        element.classList.remove("opacity-dragging");
    });
}

// Function that prevents default behavior when an element is dragged over another element
export function dragOver(event) {
    event.preventDefault();
}

// Function that prevents default behavior when a dragged element enters the area of another element
export function dragEnter(event) {
    event.preventDefault();
}

// Function that prevents default behavior when a dragged element leaves the area of another element
export function dragLeave(event) {
    event.preventDefault();
}

// Function to handle drop event
export function drop(event) {
    event.preventDefault();
    const paintingId = event.dataTransfer.getData('text/plain');
    const paintingElement = document.getElementById(paintingId);
    if (paintingElement) {
        paintingElement.classList.remove("opacity-dragging");
        event.target.appendChild(paintingElement);
    }
}
