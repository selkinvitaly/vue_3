import { getAuthToken, removeAuthToken } from '../utils/auth';


export function signOut(): Promise<void> {
    return fetch(`//localhost:3001/api/v1/sign-out`, {
        method: 'POST',
        headers: {
            'Authorization': getAuthToken() || '',
            'Content-Type': 'application/json'
        }
    })
        .then(() => {
            removeAuthToken();
        })
        .catch((err) => {
            console.error(err);
            throw err;
        });
}
