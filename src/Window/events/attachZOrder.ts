let globalZ = 1000;

export function attachZOrder($window: HTMLDivElement) {
  function onFocus() {
    $window.style.zIndex = "" + ++globalZ;
  }

  $window.addEventListener("mousedown", onFocus);
  $window.addEventListener("focusin", onFocus);
  $window.addEventListener("touchstart", onFocus);

  return function detachZOrder() {
    $window.removeEventListener("mousedown", onFocus);
    $window.removeEventListener("focusin", onFocus);
    $window.removeEventListener("touchstart", onFocus);
  };
}
