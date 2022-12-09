<template>
	<div>
		<Bar :position="position" :votes="votes" :candidates="candidates"  :options="chartOptionsDefault" :data="chartData" />
	</div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
export default {
	components: {
		Bar
	},
	props: {
		position: {
			type: Object,
			default: {
				id: "POSITION2342323",
				name: "dfjsfojwoejfsf"
			}
		},
		votes: {
			type: Array,
			default: []
		},
		candidates: {
			type: Array,
			default: []
		},
		chartDataDefault: {
			type: Object,
			default: {
				labels: ['January', 'February', 'March'],
				datasets: [{
					label: "Position 1",
					data: [40, 20, 12],
					backgroundColor: [
						'rgba(255, 99, 132, 0.2)',
						'rgba(255, 159, 64, 0.2)',
						'rgba(255, 205, 86, 0.2)',
						'rgba(75, 192, 192, 0.2)',
						'rgba(54, 162, 235, 0.2)',
						'rgba(153, 102, 255, 0.2)',
						'rgba(201, 203, 207, 0.2)'
					],
				}]
			}
		},
		chartOptionsDefault: {
			type: Object,
			default: {
				responsive: true,
				indexAxis: 'y',
			}
		}
	},
	data() {
		return {
			chartData: {
				labels: ['Candidate 1', 'Candidate 2', 'Candidate 3'],
				datasets: [{
					label: "Position 1",
					data: [40, 20, 12],
					backgroundColor: [
						'rgba(255, 99, 132, 0.2)',
						'rgba(255, 159, 64, 0.2)',
						'rgba(255, 205, 86, 0.2)',
						'rgba(75, 192, 192, 0.2)',
						'rgba(54, 162, 235, 0.2)',
						'rgba(153, 102, 255, 0.2)',
						'rgba(201, 203, 207, 0.2)'
					],
				}]
			},
		}
	},
	async created() {
		this.loadDataChart();
	},
	watch: {
		votes: function(newVal, oldVal) {
			this.loadDataChart();
		}
	},
	methods: {
		loadDataChart: async function() {
			const candidatesOfPosition = this.candidates.filter((data) => data.position.id === this.position.id)
			const newLabels = await candidatesOfPosition.map(function(candidate) {
				return candidate.name;
			})
			let newData = [];
			for (const candidate of candidatesOfPosition) {
				let totalVotes = await this.votes.filter((vote) => vote.ownerId === candidate.id).length;
				newData.push(totalVotes);
			}
			const newDatasets =  [{...this.chartDataDefault.datasets[0], label: this.position.name, data: newData}]
			this.chartData = {
				...this.chartData,
				labels: newLabels,
				datasets: newDatasets,
			};
		}
	}
}
</script>

<style lang="scss" scoped>

</style>