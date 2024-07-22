export function dragStart(e, id) {
    e.dataTransfer.setData('text/plain', id);
    e.target.classList.add('dragging');

    // Create a clone of the dragging element
    const dragImage = e.target.cloneNode(true);
    dragImage.style.position = "absolute";
    dragImage.style.top = "-9999px"; // Position it out of sight
    document.body.appendChild(dragImage);

    // Calculate cursor offset within the element
    const offsetX = e.clientX - e.target.getBoundingClientRect().left;
    const offsetY = e.clientY - e.target.getBoundingClientRect().top;
    e.dataTransfer.setDragImage(dragImage, offsetX, offsetY);

    // Remove the dragImage after a slight delay
    setTimeout(() => {
        document.body.removeChild(dragImage);
    }, 0);
}

export function dragEnd(e) {
    e.target.classList.remove('dragging');
}

export function handleDrop(e, dropBoxIndex, dropBoxContents, setDropBoxContents, setActiveDropBoxIndex, favoritePaintings) {
    e.preventDefault();
    const paintingId = e.dataTransfer.getData('text/plain');
    const paintingToMove = favoritePaintings.find(painting => painting.id.toString() === paintingId);

    if (paintingToMove) {
        const updatedDropBoxContents = dropBoxContents.map((content, index) =>
            index === dropBoxIndex ? paintingToMove : content
        );
        setDropBoxContents(updatedDropBoxContents);
        setActiveDropBoxIndex(dropBoxIndex);
    }
}