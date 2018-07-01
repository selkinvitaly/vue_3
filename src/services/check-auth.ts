import { Account } from '../models/accounts';
import { getAuthToken } from '../utils/auth';


export function checkAuth(): Promise<Account | null> {
    return fetch(`//localhost:3001/api/v1/auth`, {
        headers: {
            'Authorization': getAuthToken() || '',
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            if (res.status === 401) {
                return null;
            }
            return res.json();
        })
        .catch((err) => {
            console.error(err);
            throw err;
        });
}
