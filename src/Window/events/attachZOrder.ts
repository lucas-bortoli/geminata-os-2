let globalZ = 1000;

export function attachZOrder($window: HTMLDivElement) {
  function onFocus() {
    $window.style.zIndex = "" + ++globalZ;
  }

  $window.addEventListener("mousedown", onFocus);
  $window.addEventListener("focusin", onFocus);

  return function detachZOrder() {
    $window.removeEventListener("mousedown", onFocus);
    $window.removeEventListener("focusin", onFocus);
  };
}
