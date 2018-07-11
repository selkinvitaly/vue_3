export interface NewUser {
    email: string;
    birthday: string;
    avatarUrl: string | null;
    firstName: string;
    lastName: string;
    phone: string;
    titleName: string;
    biography: string;
}

export interface User extends NewUser {
    uuid: string;
}

export interface SiblingsInfo {
    prev: string | null;
    next: string | null;
}

export enum LoadingStatus {
    Initial = 'initial',
    Loading = 'loading',
    Success = 'success',
    Failed = 'failed',
}
