
export function getToken(str) {
    const tokenString =
        typeof str === 'undefined' ? localStorage.getItem('hippo-cloud-web-token') : str;
    return tokenString;
}

export function setToken(token) {
    if (token) {
        return localStorage.setItem('hippo-cloud-web-token', token);
    }
}

export function clearToken() {
    return localStorage.clear()
    
}
