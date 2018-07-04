import { API_HOST } from '../consts/hosts';


export function deleteUserById(uuid: string): Promise<void> {
    return fetch(`${API_HOST}/api/v1/users/${uuid}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .catch((err: Error) => {
            console.error(err);
            throw err;
        });
}
