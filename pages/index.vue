<template>
    <div>
        <h1>TODOリスト</h1>
        <div class="addArea">
            <input v-model="model.todo" type="text" placeholder="タスクを入力してください" />
            <button class="button button--green" @click="addItem">追加</button>
        </div>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>タスク</th>
                    <th>登録日時</th>
                    <th>状態</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in todoList" :key="index">
                    <td>{{ item.id }}</td>
                    <td>{{ item.todo }}</td>
                    <td>{{ item.createdAt }}</td>
                    <td>
                        <button @click="changeDone(item)">
                            {{ item.done }}
                        </button>
                    </td>
                    <td>
                        <button class="button button--red">削除</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { IItem, ICreateTodoDto, IUpdateTodoDto } from '@/models/Item';

export default Vue.extend({
    data(): { todoList: IItem[]; model: ICreateTodoDto | IUpdateTodoDto } {
        return {
            todoList: [],
            model: {
                todo: '',
                done: false,
            },
        };
    },

    async created() {
        await this.getItems();
    },

    methods: {
        async getItems() {
            this.todoList = await this.$axios.$get('http://localhost:4000/item/');
        },
        async addItem() {
            await this.$axios.$post('http://localhost:4000/item', this.model);
            await this.getItems();
            this.model.todo = '';
        },
        async changeDone(item: IItem) {
            const data: ICreateTodoDto = {
                todo: item.todo,
                done: !item.done,
            };
            await this.$axios.$put(`http://localhost:4000/item/${item.id}`, data);
            await this.getItems();
        },
    },
});
</script>

<style></style>
