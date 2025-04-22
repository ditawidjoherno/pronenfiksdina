export function decodeAccessToken(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
}

export function isTokenExpired(token) {
    const currentTime = Math.floor(Date.now() / 1000);
    return token.exp < currentTime;
}