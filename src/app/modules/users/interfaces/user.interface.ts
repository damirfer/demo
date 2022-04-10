export interface User {
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    status: string

    //UI
    deletingOn: boolean | null
}