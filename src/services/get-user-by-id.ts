import { User } from '../models/users';
import { API_HOST } from '../consts/hosts';


export function getUserById(uuid: string): Promise<User | null> {
    return fetch(`${API_HOST}/api/v1/users/${uuid}`)
        .then((res) => {
            if (res.status === 404) {
                return null;
            }
            return res.json();
        })
        .catch((err) => {
            console.error(err);
            throw err;
        });
}
