import Vuex from 'vuex';

const createStore = () => {
    return new Vuex.Store({
        state: () => ({
            todos: [],
            option: [
                { id: 0, label: '作業前' },
                { id: 1, label: '作業中' },
                { id: 2, label: '完了' },
            ],
        }),
        mutations: {
            insert(state, obj) {
                const d = new Date();
                const fmt =
                    d.getFullYear() +
                    '-' +
                    ('00' + (d.getMonth() + 1)).slice(-2) +
                    '-' +
                    ('00' + d.getDate()).slice(-2) +
                    ' ' +
                    ('00' + d.getHours()).slice(-2) +
                    ':' +
                    ('00' + d.getMinutes()).slice(-2);
                state.todos.unshift({
                    content: obj.content,
                    created: fmt,
                    state: '作業前',
                });
            },
            remove(state, obj) {
                for (let i = 0; i < state.todos.length; i++) {
                    const ob = state.todos[i];
                    if (ob.content === obj.content && ob.created === obj.created) {
                        if (confirm('"' + ob.content + '"を削除しますか？')) {
                            state.todos.splice(i, 1);
                            return;
                        }
                    }
                }
            },
            changeState(state, obj) {
                for (let i = 0; i < state.todos.length; i++) {
                    const ob = state.todos[i];
                    if (
                        ob.content === obj.content &&
                        ob.created === obj.created &&
                        ob.state === obj.state
                    ) {
                        let nowState;
                        for (let j = 0; j < state.option.length; j++) {
                            if (state.option[j].label === ob.state) {
                                nowState = state.option[j].id;
                            }
                        }
                        nowState++;
                        if (nowState >= state.option.length) {
                            nowState = 0;
                        }
                        obj.state = state.option[nowState].label;
                        return;
                    }
                }
            },
        },
    });
};

export default createStore;
