import { Account } from '../models/accounts';
import { getAuthToken, setAuthToken } from '../utils/auth';
import { API_HOST } from '../consts/hosts';


export function signIn(login: string, pw: string): Promise<Account | null> {
    return fetch(`${API_HOST}/api/v1/sign-in`, {
        method: 'POST',
        headers: {
            'Authorization': getAuthToken() || '',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password: pw,
            login
        })
    })
        .then((res) => {
            if (res.status === 401) {
                return null;
            }
            return res.json();
        })
        .then((user: Account) => {
            setAuthToken(user.token);
            return user;
        })
        .catch((err) => {
            console.error(err);
            throw err;
        });
}
