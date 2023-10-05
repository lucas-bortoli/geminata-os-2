export function attachDrag($movableElement: HTMLDivElement, $dragHandle: HTMLDivElement) {
  let drag: null | {
    x: number;
    y: number;
    offsetX: number;
    offsetY: number;
  } = null;

  function onDocumentMove(event: MouseEvent) {
    const { pageX: x, pageY: y } = event;

    $movableElement.style.left = `${x - drag!.offsetX}px`;
    $movableElement.style.top = `${y - drag!.offsetY}px`;
  }

  function onDocumentUp(_event: MouseEvent) {
    drag = null;

    document.removeEventListener("mousemove", onDocumentMove);
    document.removeEventListener("mouseup", onDocumentUp);
  }

  function onTitlebarDown(event: MouseEvent) {
    if (event.target !== $dragHandle) return;

    event.preventDefault();

    const rect = $movableElement.getBoundingClientRect();

    drag = {
      x: event.clientX,
      y: event.clientY,
      offsetX: event.clientX - rect.x,
      offsetY: event.clientY - rect.y,
    };

    document.addEventListener("mousemove", onDocumentMove);
    document.addEventListener("mouseup", onDocumentUp);
  }

  $dragHandle.addEventListener("mousedown", onTitlebarDown);

  return function detachDrag() {
    $dragHandle.removeEventListener("mousedown", onTitlebarDown);
    document.removeEventListener("mousemove", onDocumentMove);
    document.removeEventListener("mouseup", onDocumentUp);
  };
}
