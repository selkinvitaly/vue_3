import * as qs from 'qs';

import { User } from '../models/users';
import { API_HOST } from '../consts/hosts';


interface GetUsersParams {
    limit?: number;
    skip?: number;
}

export function getUsers(params: GetUsersParams = {}): Promise<User[]> {
    const { limit, skip } = params;
    const query = qs.stringify({ limit, skip });
    return fetch(`${API_HOST}/api/v1/users${!!query ? '?' + query : '' }`)
        .then((res) => res.json())
        .catch((err) => {
            console.error(err);
            throw err;
        });
}
