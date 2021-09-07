import { createStore } from 'vuex'
import { User } from "shared-resources/User"

export enum Mutations {
  SET_ONLINE_USERS = "SET_ONLINE_USERS",
  PUSH_USER = "PUSH_USER",
  SET_CURRENT_USER_ID = "SET_CURRENT_USER_ID",
}

export interface StoreState {
  onlineUsers: User[],
  currentUserID: string,
}

export default createStore<StoreState>({
  state: {
    onlineUsers: [],
    currentUserID: "",
  },
  mutations: {
    [Mutations.SET_ONLINE_USERS]: (state: StoreState, users: User[]) => {
      state.onlineUsers = users;
    },
    [Mutations.PUSH_USER]: (state: StoreState, user: User) => {
      state.onlineUsers.push(user);
    },
    [Mutations.SET_CURRENT_USER_ID]: (state: StoreState, id: string) => {
      state.currentUserID = id;
    }
  },
  getters: {
    onlineUsers: (state): User[] => state.onlineUsers,
    currentUserID: (state): string => state.currentUserID,
  }
})
