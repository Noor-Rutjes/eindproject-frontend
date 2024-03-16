// Function to handle drag start event
export function dragStart(e, id) {
    e.dataTransfer.setData('text/plain', id);

    const element = document.getElementById(id);
    if (element) {
        element.classList.add("opacity-dragging");
    }

    // Event listeners toevoegen aan het document, niet aan het element zelf
    document.addEventListener('dragover', dragOver);
    document.addEventListener('dragenter', dragEnter);
    document.addEventListener('dragleave', dragLeave);
    document.addEventListener('drop', drop);
}

// Function to handle drag end event
export function dragEnd(e) {
    const invisibleElements = document.querySelectorAll(".opacity-dragging");
    invisibleElements.forEach(element => {
        element.classList.remove("opacity-dragging");
    });

    // Event listeners verwijderen van het document
    document.removeEventListener('dragover', dragOver);
    document.removeEventListener('dragenter', dragEnter);
    document.removeEventListener('dragleave', dragLeave);
    document.removeEventListener('drop', drop);
}

// Function that prevents default behavior when an element is dragged over another element
export function dragOver(e) {
    e.preventDefault();
}

// Function that prevents default behavior when a dragged element enters the area of another element
export function dragEnter(e) {
    e.preventDefault();
}

// Function that prevents default behavior when a dragged element leaves the area of another element
export function dragLeave(e) {
    e.preventDefault();
}

// Function to handle drop event
export function drop(e) {
    e.preventDefault();
    const paintingId = e.dataTransfer.getData('text/plain');
    const paintingElement = document.getElementById(paintingId);
    if (paintingElement) {
        paintingElement.classList.remove("opacity-dragging");
        e.target.appendChild(paintingElement);
    }
}
