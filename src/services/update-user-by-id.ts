import { User } from '../models/users';
import { HttpError } from '../models/errors';
import { API_HOST } from '../consts/hosts';


export function updateUserById(uuid: string, newUser: User): Promise<User> {
    return fetch(`${API_HOST}/api/v1/users/${uuid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    })
        .then((res) => {
            switch (res.status) {
                case 200:
                    return res.json();

                case 400:
                    return new Promise<void>((_resolve, reject) => {
                        res.json()
                            .then((data: { error: string }) => {
                                // error with validation server message
                                throw new HttpError(data.error, res.status);
                            })
                            .catch(reject);
                    });

                default:
                    throw new HttpError('an error occurred while updating user', res.status);
            }
        })
        .catch((err: Error) => {
            console.error(err);
            throw err;
        });
}
