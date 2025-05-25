export function setCookie(cname, cvalue) {
  if (typeof document !== "undefined") {
    document.cookie = `${cname}=${cvalue}`;
  }
}

export function getCookie(name) {
  if (typeof document === "undefined") return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }

  return null;
}

export function deleteCookie(name) {
  if (typeof document !== "undefined") {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
  }
}
