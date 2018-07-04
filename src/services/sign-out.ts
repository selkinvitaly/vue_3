import { getAuthToken, removeAuthToken } from '../utils/auth';
import { API_HOST } from '../consts/hosts';


export function signOut(): Promise<void> {
    return fetch(`${API_HOST}/api/v1/sign-out`, {
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
