type ResizeDirection = "h" | "v" | "both";

type ResizeState = {
  x: number;
  y: number;
  width: number;
  height: number;
  direction: ResizeDirection;
} | null;

/**
 * Checks if a <= x <= c
 */
const inRange = (x: number, a: number, b: number) => {
  return x >= a && x <= b;
};

const getMouseCorner = (event: MouseEvent | TouchEvent, resizeArea: HTMLElement): null | ResizeDirection => {
  const rect = resizeArea.getBoundingClientRect();
  const cornerSize = 16;

  let position: { clientX: number; clientY: number };

  if (event instanceof TouchEvent) {
    position = event.touches[0];
  } else {
    position = event;
  }

  if (
    inRange(position.clientX, rect.right - cornerSize, rect.right + cornerSize) &&
    inRange(position.clientY, rect.bottom - cornerSize, rect.bottom + cornerSize)
  ) {
    return "both";
  } else if (inRange(position.clientX, rect.right - cornerSize, rect.right + cornerSize)) {
    return "h";
  } else if (inRange(position.clientY, rect.bottom - cornerSize, rect.bottom + cornerSize)) {
    return "v";
  }

  return null;
};

export function attachResize($resizableElement: HTMLDivElement, $resizeHandle: HTMLDivElement) {
  let resize: ResizeState = null;

  function onMouseMove(event: MouseEvent | TouchEvent) {
    resize = resize!;

    let position: { pageX: number; pageY: number };

    if (event instanceof TouchEvent) {
      position = event.touches[0];
    } else {
      position = event;
    }

    if (resize.direction === "h" || resize.direction === "both") {
      $resizableElement.style.width = `${position.pageX - resize.x}px`;
    }

    if (resize.direction === "v" || resize.direction === "both") {
      $resizableElement.style.height = `${position.pageY - resize.y}px`;
    }
  }

  function onMouseUp(_event: MouseEvent | TouchEvent) {
    document.body.removeEventListener("mouseup", onMouseUp);
    document.body.removeEventListener("mousemove", onMouseMove);
    document.body.removeEventListener("touchend", onMouseUp);
    document.body.removeEventListener("touchmove", onMouseMove);
    resize = null;
  }

  function onMouseDown(event: MouseEvent | TouchEvent) {
    if (event instanceof MouseEvent && event.button !== 0) {
      return;
    }

    const rect = $resizableElement.getBoundingClientRect();

    resize = {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
      direction: getMouseCorner(event, $resizableElement) ?? "both",
    };

    event.preventDefault();

    document.body.addEventListener("mouseup", onMouseUp);
    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("touchend", onMouseUp);
    document.body.addEventListener("touchmove", onMouseMove);
  }

  $resizeHandle.addEventListener("mousedown", onMouseDown);
  $resizeHandle.addEventListener("touchstart", onMouseDown);

  return function detachResize() {
    $resizeHandle.removeEventListener("mousedown", onMouseDown);
    document.body.removeEventListener("mouseup", onMouseUp);
    document.body.removeEventListener("mousemove", onMouseMove);
    $resizeHandle.removeEventListener("touchstart", onMouseDown);
    document.body.removeEventListener("touchend", onMouseUp);
    document.body.removeEventListener("touchmove", onMouseMove);
  };
}
