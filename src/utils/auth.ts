const TOKEN_KEY = 'auth_token';


export function getAuthToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token: string): void {
    return localStorage.setItem(TOKEN_KEY, token);
}

export function removeAuthToken(): void {
    return localStorage.removeItem(TOKEN_KEY);
}
