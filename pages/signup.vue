<template>
    <div>
        <h1>新規ユーザー作成</h1>
        <form>
            <div class="form-group">
                <label for="name">name:</label>
                <input
                    id="name"
                    v-model="from.name"
                    class="block"
                    type="text"
                    name="name"
                    placeholder="name"
                />
            </div>
            <div class="form-group">
                <label for="email">email:</label>
                <input
                    id="email"
                    v-model="from.email"
                    class="block"
                    type="email"
                    name="email"
                    placeholder="email"
                />
            </div>
            <div class="form-group">
                <label for="age">age:</label>
                <input
                    id="age"
                    v-model="from.age"
                    class="block"
                    type="number"
                    name="age"
                    placeholder="age"
                />
            </div>
            <button type="submit" @click="onSubmit">送信</button>
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
                <tr v-for="(account, index) in userList" :key="index">
                    <td>{{ account.id }}</td>
                    <td>{{ account.name }}</td>
                    <td>{{ account.password }}</td>
                    <td>{{ account.age }}</td>
                    <!-- <td>
                <button class="button button--red" @click="deleteUser(account)">
                    削除
                </button>
            </td> -->
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
// import { IUser, ICreateUserDTO } from '~/models/User';
import { ApplicationError, BadRequest } from '~/types/error';

@Component
export default class PageSignup extends Vue {
    head() {
        return {
            titleTemplate: '会員登録 | %s',
        };
    }

    errors: Array<ApplicationError> = [];

    from: any = {
        name: '',
        email: '',
        password: '',
        // password_confirmation: '',
        age: null,
    };

    userList: any = [];

    // data(): { userList: IUser[]; user: ICreateUserDTO } {
    //     return {
    //         userList: [],
    //         user: {
    //             name: '',
    //             password: '',
    //             password_confirmation: '',
    //             age: null,
    //         },
    //     };
    // }

    isSignUpAfter: boolean = false;

    async onSubmit() {
        try {
            this.isSignUpAfter = false;
            this.errors = [];
            // バリデーション
            // if (this.form.account.length === 0) {
            //     throw new BadRequest('アカウントが入力されていません');
            // }
            if (this.from.name.length === 0) {
                throw new BadRequest('名前が入力されていません');
            }
            if (this.from.email.length === 0) {
                throw new BadRequest('メールアドレスが入力されていません');
            }
            // 新規会員情報送信
            await this.$store.dispatch('user/signupUser', this.from);
            // this.isSignUpAfter = true;
        } catch (e) {
            this.errors.push(e);
        }
    }
}
</script>
