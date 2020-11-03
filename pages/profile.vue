<template>
    <div>
        <Profile v-for="user in users" :key="user.id" :user="user" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import User from '../models/User'
import Profile from '../components/Profile.vue'

@Component({
    components: {
        Profile,
    },
})
export default class ProfilePage extends Vue {
    users: User[] = [
        {
            id: 1,
            name: '太郎',
            age: 15,
        },
        {
            id: 2,
            name: '二郎',
            age: 13,
        },
    ]
}
</script>
