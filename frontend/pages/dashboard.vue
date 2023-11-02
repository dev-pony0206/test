<template>
    <div class="flex justify-center items-center h-screen">
        <div class="h-[600px] w-4/6">
            <Bar :data="chartData" :options="chartOptions" />
        </div>
    </div>
</template>


<script lang="ts" setup>
definePageMeta({
    layout: "userlist-header",
    // middleware: "after-auth",
});

import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { Bar } from 'vue-chartjs'

// Register
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const chartData = ref({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Norvember', 'December'],
    datasets: [
        {
            label: 'Data One',
            backgroundColor: 'green',
            data: [40, 20, 12, 50, 10, 70, 30, 60, 40, 90, 50, 80],
        },
    ],
})
const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
})

</script>

