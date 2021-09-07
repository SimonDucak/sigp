import { User } from "../shared-resources/User";

let users: User[] = [];

export const userJoin = (user: User, userID): User => {
    const newUser: User = { ...user, id: userID };
    users.push(newUser);
    return newUser;
};

export const removeUser = (userID: string) => {
    users = users.filter((user) => user.id !== userID);
};

export const getCurrentUser = (id: string): User | undefined => users.find((u) => u.id === id);

export const getUsers = (): User[] => users;
