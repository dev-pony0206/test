<template>
    <div class="w-full h-screen flex justify-center items-center">
        <div class="w-9/12">
            <EasyDataTable :headers="headers" :items="items" alternating border-cell buttons-pagination must-sort
                show-index>
                <template #loading>
                    <img src="https://i.pinimg.com/originals/94/fd/2b/94fd2bf50097ade743220761f41693d5.gif"
                        style="width: 100px; height: 80px;" />
                </template>
                <template #pagination="{ prevPage, nextPage, isFirstPage, isLastPage }">
                    <button :disabled="isFirstPage" @click="prevPage"
                        class="bg-zinc-500 hover:bg-lime-300 rounded-md p-1 mr-3">
                        prev page
                    </button>
                    <button :disabled="isLastPage" @click="nextPage" class="bg-zinc-500 hover:bg-lime-300 rounded-md p-1">
                        next page
                    </button>
                </template>
            </EasyDataTable>
        </div>
            <!-- <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, index) in rows" :key="index">
                        <td v-if="!row.editing">{{ row.name }}</td>
                        <td v-if="!row.editing">{{ row.email }}</td>
                        <td v-if="row.editing"><input type="text" v-model="row.name"></td>
                        <td v-if="row.editing"><input type="email" v-model="row.email"></td>
                        <td>
                            <button v-if="!row.editing" class="edit-button" @click="editRow(row)">Edit</button>
                            <button v-if="row.editing" class="save-button" @click="saveRow(row)">Save</button>
                            <button class="delete-button" @click="deleteRow(index)">Delete</button>

                        </td>
                    </tr>
                </tbody>
            </table>
            <button @click="addRow" class="add-button">Add Row</button> -->
    </div>
</template>
  
<script lang="ts" setup>
definePageMeta({
    layout: "userlist-header",
    // middleware: "after-auth",
});

import type { Header, Item } from "vue3-easy-data-table";

const headers: Header[] = [
    { text: "No", value: "no", width: 20 },
    { text: "Avatar", value: "photo", width: 300 },
    { text: "Name", value: "name", width: 340 },
    { text: "Score", value: "score", width: 300 },
    { text: "Age", value: "age", width: 340 },
]

const items: Item[] = [
    { no: "Stephen Curry", photo: "GSW", name: 30, gender: 'G', age: { "height": '6-2', "weight": 185 } },
    { no: "Lebron James", photo: "LAL", name: 6, gender: 'F', age: { "height": '6-9', "weight": 250 } },
    { no: "Kevin Durant", photo: "BKN", name: 7, gender: 'F', age: { "height": '6-10', "weight": 240 } },
    { no: "Giannis Antetokounmpo", photo: "MIL", name: 34, gender: 'F', age: { "height": '6-11', "weight": 242 } },
]
</script>
