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

const getMouseCorner = (event: MouseEvent, resizeArea: HTMLElement): null | ResizeDirection => {
  const rect = resizeArea.getBoundingClientRect();
  const cornerSize = 16;

  if (
    inRange(event.clientX, rect.right - cornerSize, rect.right + cornerSize) &&
    inRange(event.clientY, rect.bottom - cornerSize, rect.bottom + cornerSize)
  ) {
    return "both";
  } else if (inRange(event.pageX, rect.right - cornerSize, rect.right + cornerSize)) {
    return "h";
  } else if (inRange(event.pageY, rect.bottom - cornerSize, rect.bottom + cornerSize)) {
    return "v";
  }

  return null;
};

export function attachResize($resizableElement: HTMLDivElement, $resizeHandle: HTMLDivElement) {
  let resize: ResizeState = null;

  function onMouseMove(event: MouseEvent) {
    resize = resize!;

    if (resize.direction === "h" || resize.direction === "both") {
      $resizableElement.style.width = `${event.pageX - resize.x}px`;
    }

    if (resize.direction === "v" || resize.direction === "both") {
      $resizableElement.style.height = `${event.pageY - resize.y}px`;
    }
  }

  function onMouseUp(_event: MouseEvent) {
    document.body.removeEventListener("mouseup", onMouseUp);
    document.body.removeEventListener("mousemove", onMouseMove);
    resize = null;
  }

  function onMouseDown(event: MouseEvent) {
    if (event.button !== 0) {
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
  }

  $resizeHandle.addEventListener("mousedown", onMouseDown);

  return function detachResize() {
    $resizeHandle.removeEventListener("mousedown", onMouseDown);
    document.body.removeEventListener("mouseup", onMouseUp);
    document.body.removeEventListener("mousemove", onMouseMove);
  };
}
