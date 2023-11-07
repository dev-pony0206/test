<template>
    <div class="flex justify-center items-center h-screen">
        <div class="h-[600px] w-4/6">
            <Bar :data="chartData" :options="chartOptions" />
        </div>
    </div>
</template>


<script lang="ts" setup>
definePageMeta({
    layout: "userlist-dashboard",
    middleware: "after-auth"
});

import { useMainStore } from '~/store/main';
import { storeToRefs } from 'pinia';

const main = useMainStore()
const { users }: any = storeToRefs(main)
const { allUsers }: any = storeToRefs(main)
import { ref } from 'vue';

const forLabel = ref([])
const forData = ref([])

forLabel.value = allUsers.value.map((user: any) => user.name);

forData.value = allUsers.value.map((user: any) => user.score);

import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { Bar } from 'vue-chartjs'

// Register
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const chartData = ref({
    labels: forLabel.value,
    datasets: [
        {
            label: 'Data One',
            backgroundColor: 'green',
            data: forData.value
        },
    ],
})
const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
})

</script>

