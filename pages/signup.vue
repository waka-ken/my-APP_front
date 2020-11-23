<template>
    <div>
        <h1>新規ユーザー作成</h1>
        <form @submit.prevent="addUser">
            <div class="form-group">
                <label for="email">name:</label>
                <input v-model="user.name" />
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input v-model="user.password" type="password" />
            </div>
            <div class="form-group">
                <label for="password">age:</label>
                <input v-model="user.age" type="number" />
            </div>
            <button type="submit">送信</button>
        </form>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>name</th>
                    <th>password</th>
                    <th>age</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(acount, index) in userList" :key="index">
                    <td>{{ acount.id }}</td>
                    <td>{{ acount.name }}</td>
                    <td>{{ acount.password }}</td>
                    <td>{{ acount.age }}</td>
                    <!-- <td>
                            <button class="button button--red" @click="deleteUser(acount)">
                                削除
                            </button>
                        </td> -->
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { IUser, ICreateUserDTO } from '../models/User';

export default Vue.extend({
    data(): { userList: IUser[]; user: ICreateUserDTO } {
        return {
            userList: [],
            user: {
                name: '',
                password: '',
                age: null,
            },
        };
    },
    async created() {
        await this.getUsers();
    },

    methods: {
        async getUsers() {
            this.userList = await this.$axios.$get('http://localhost:4000/user/');
        },
        async addUser() {
            await this.$axios.$post('http://localhost:4000/user/', this.user);
            await this.getUsers();
            this.user.name = '';
            this.user.password = '';
            this.user.age = 0;
        },
    },
});
</script>
