export function attachDrag($movableElement: HTMLDivElement, $dragHandle: HTMLDivElement) {
  let drag: null | {
    x: number;
    y: number;
    offsetX: number;
    offsetY: number;
  } = null;

  function onDocumentMove(event: MouseEvent | TouchEvent) {
    let position: { pageX: number; pageY: number };

    if (event instanceof TouchEvent) {
      position = event.touches[0];
    } else {
      position = event;
    }

    const x = Math.min(Math.max(0, position.pageX), innerWidth);
    const y = Math.min(Math.max(28, position.pageY - drag!.offsetY), innerHeight - 30);

    $movableElement.style.left = `${x - drag!.offsetX}px`;
    $movableElement.style.top = `${y}px`;
  }

  function onDocumentUp(_event: MouseEvent | TouchEvent) {
    drag = null;

    document.removeEventListener("mousemove", onDocumentMove);
    document.removeEventListener("mouseup", onDocumentUp);
    document.removeEventListener("touchmove", onDocumentMove);
    document.removeEventListener("touchend", onDocumentUp);
  }

  function onTitlebarDown(event: MouseEvent | TouchEvent) {
    if (event.target !== $dragHandle) return;

    event.preventDefault();

    let position: { clientX: number; clientY: number };

    if (event instanceof TouchEvent) {
      position = event.touches[0];
    } else {
      position = event;
    }

    const rect = $movableElement.getBoundingClientRect();

    drag = {
      x: position.clientX,
      y: position.clientY,
      offsetX: position.clientX - rect.x,
      offsetY: position.clientY - rect.y,
    };

    document.addEventListener("mousemove", onDocumentMove);
    document.addEventListener("mouseup", onDocumentUp);
    document.addEventListener("touchmove", onDocumentMove);
    document.addEventListener("touchend", onDocumentUp);
  }

  $dragHandle.addEventListener("mousedown", onTitlebarDown);
  $dragHandle.addEventListener("touchstart", onTitlebarDown);

  return function detachDrag() {
    $dragHandle.removeEventListener("mousedown", onTitlebarDown);
    document.removeEventListener("mousemove", onDocumentMove);
    document.removeEventListener("mouseup", onDocumentUp);
    $dragHandle.removeEventListener("touchstart", onTitlebarDown);
    document.addEventListener("touchmove", onDocumentMove);
    document.addEventListener("touchend", onDocumentUp);
  };
}
