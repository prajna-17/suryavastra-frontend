export function showToast(message) {
  // remove old toast if exists
  const existing = document.querySelector(".wish-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "wish-toast";
  toast.innerText = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2200);
}
