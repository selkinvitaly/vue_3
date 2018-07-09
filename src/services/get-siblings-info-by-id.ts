import { API_HOST } from '../consts/hosts';
import { SiblingsInfo } from '../models/users';


export function getSiblingsInfoById(uuid: string): Promise<SiblingsInfo> {
    return fetch(`${API_HOST}/api/v1/users/${uuid}/siblings`)
        .then(res => res.json())
        .catch((err) => {
            console.error(err);
            throw err;
        });
}
