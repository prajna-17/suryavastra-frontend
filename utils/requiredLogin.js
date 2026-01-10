import { getToken } from "./auth";

export const requiredLogin = (message = "Please login to continue") => {
  if (getToken()) return true;

  // open sidebar
  if (typeof window !== "undefined" && window.openLoginSidebar) {
    window.openLoginSidebar();

    setTimeout(() => {
      document.querySelector(".login-btn")?.classList.add("shake");
      setTimeout(() => {
        document.querySelector(".login-btn")?.classList.remove("shake");
      }, 400);
    }, 200);
  }

  // toast (same style you already use)
  const toast = document.createElement("div");
  toast.className = "wish-toast";
  toast.innerText = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);

  return false;
};
