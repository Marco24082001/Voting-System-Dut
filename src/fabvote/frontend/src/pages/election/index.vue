<template>
	<div class="row justify-content-center">
		<div class="col-8">
			<el-form class="login-form" size="large" label-position="left" label-width="6rem" :model="model" :rules="rules"
				ref="form">
				<el-form-item prop="name" label="Name">
					<el-input v-model="model.name" placeholder="Firstname">
					</el-input>
				</el-form-item>
				<el-form-item prop="start_date" label="Start date">
					<el-date-picker v-model="model.start_date" type="datetime" placeholder="Select date and time" />
				</el-form-item>
				<el-form-item prop="duration" label="Duration">
					<el-input-number v-model="model.duration" :min="1" :max="60" />
				</el-form-item>
				<el-form-item>
					<el-button class="login-button" type="primary" @click="edit">Save</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import ElectionService from "@/services/election/election.services";

export default {
	async created() {
		const election = (await ElectionService.getAll()).data.response;
		this.model = {...election};
	},
	data() {
		return {
			rules: {
				name: [
					{ required: true, message: "Name is required", trigger: "blur" }
				],
				start_date: [
					{ required: true, message: "Start time is required", trigger: "blur" }
				],
				duration: [
					{ required: true, message: "Duration is required", trigger: "blur" }
				]
			},
			model: {
				id: "",
				name: "Default election",
				start_date: new Date(),
				duration: 30, 
			},
		}
	},
	methods: {
		edit: async function () {
			await this.$refs.form.validate(async (valid, fields) => {
				if (valid) {
					this.$store.commit("animation/setFullscreenLoading", true);
					const res = await ElectionService.edit({ ...this.model });
					this.$store.commit("animation/setFullscreenLoading", false);
				} else {
					console.log("invalid");
				}
			});
		}
	}
}
</script>