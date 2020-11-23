import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { BadRequest } from './types/error';
import { IUser } from '~/types/type';

export interface State {
    token: string | null;
    isGuest: boolean;
    user: IUser | null;
}

export interface RootState {}

export const state = (): State => ({
    token: null,
    isGuest: true,
    user: null,
});

export const mutations: MutationTree<State> = {
    setToken(state, token: string) {
        state.token = token;
    },
    setUser(state, user: IUser | null) {
        if (user !== null) {
            state.isGuest = false;
            state.user = user;
        } else {
            state.isGuest = true;
            state.user = null;
        }
    },
};

export const actions: ActionTree<State, RootState> = {};

export const getters: GetterTree<State, RootState> = {
    token(state) {
        return state.token;
    },

    isGuest(state) {
        return state.isGuest;
    },

    name(state) {
        if (state.user) {
            return state.user.name;
        } else {
            return null;
        }
    },
    user(state): IUser | null {
        return state.user;
    },
};
