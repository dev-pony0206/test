<template>
    <div class="w-full h-screen flex justify-center items-center">
        <div class="w-9/12">
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Score</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, id) in users" :key="id">
                        <td v-if="!user.editing">{{ id + 1 }}</td>
                        <td v-if="!user.editing">{{ user.name }}</td>
                        <td v-if="!user.editing">{{ user.score }}</td>
                        <td v-if="!user.editing">{{ user.age }}</td>
                        <td v-if="user.editing">{{ id + 1 }}</td>
                        <td v-if="user.editing"><input type="text" :value="user.name"
                                v-on:input="(e: any) => updatedUser.name = e.target.value"></td>
                        <td v-if="user.editing"><input type="number" :value="user.score"
                                v-on:input="(e: any) => updatedUser.score = e.target.value"></td>
                        <td v-if="user.editing"><input type="number" :value="user.age"
                                v-on:input="(e: any) => updatedUser.age = e.target.value"></td>
                        <td>
                            <button v-if="!user.editing" class="edit-button" @click="editUser(user)">Edit</button>
                            <button v-if="user.editing" class="save-button" @click="saveUser(updatedUser)">Save</button>
                            <button class="delete-button" @click="deleteUser(id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button @click="addUser()" class="add-button">Add Row</button>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
definePageMeta({
    layout: "userlist-header",
    // middleware: "after-auth",
});

import { useMainStore } from '~/store/main';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const controlUser = useUsers()

const updatedUser = ref({
    name: "",
    score: "",
    age: "",
    editing: true
})

const main = useMainStore()
const { users }: any = storeToRefs(main)
const { pageStatus }: any = storeToRefs(main)

const deleteUser = (id: number) => {
    controlUser.deleteUser(id)
}
const editUser = (user: any) => {
    user.editing = true
}
const saveUser = (updatedUser: any) => {
    controlUser.updateUser(updatedUser)
    updatedUser.value = {
        name: "",
        score: "",
        age: "",
        editing: false
    }
}
const addUser = () => {
    users.value.push({ name: '', email: '', editing: true });
}

</script>

<style scoped>
/* CSS code */
table {
    border-collapse: collapse;
    width: 100%;
}

th,
td {
    text-align: left;
    padding: 8px;
    border-bottom: 1px solid #ddd;
}

th {
    background-color: #f2f2f2;
}

tr:nth-child(even) {
    background-color: #f2f2f2;
}

tr:hover {
    background-color: #ddd;
}

input[type=text],
input[type=email] {
    width: 100%;
    padding: 6px 10px;
    margin: 4px 0;
    box-sizing: border-box;

}

button {
    display: inline-block;
    font-size: 14px;
    font-weight: bold;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 4px;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    transition: all 0.3s ease-in-out;
}

.edit-button {
    background-color: #2196F3;
    color: white;
}

.edit-button:hover {
    background-color: #1976D2;
}

.save-button {
    background-color: #4CAF50;
    color: white;
}

.save-button:hover {
    background-color: #388E3C;
}

.delete-button {
    background-color: #f44336;
    color: white;
}

.delete-button:hover {
    background-color: #C62828;
}

.add-button {
    margin-top: 1rem;
    background-color: #4CAF50;
    color: white;
}

.add-button:hover {
    background-color: #3e8e41;
}</style>
