<template>
    <div class="row">
        <div class="col-12">
            <el-form
            class="login-form"
            :model="model"
            :rules="rules"
            ref="form"
            @submit.enter.prevent="login"
            >
                <el-form-item prop="name" label="Name">
                    <el-input v-model="model.name" placeholder="Firstname">
                    </el-input>
                </el-form-item>
                <el-form-item prop="start_time" label="Start time">
                    <el-time-picker v-model="model.start_time" placeholder="Start time" />
                </el-form-item>
                <el-form-item prop="end_time" label="End time">
                    <el-time-picker v-model="model.end_time" placeholder="End time" />
                </el-form-item>
                <el-form-item>
                <el-button
                    :loading="loading"
                    class="login-button"
                    type="primary"
                    native-type="submit"
                    block
                >Save</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            rules: {
                name: [
                    { required: true, message: "Name is required", trigger: "blur" }
                ],
                start_time: [
                    { required: true, message: "Start time is required", trigger: "blur" }
                ],
                end_time: [
                    { required: true, message: "End time is required", trigger: "blur" }
                ]
            },
            model: {
                name: "Default election",
                start_time: "00:00:00",
                end_time: "12:12:12",
                active: false,
            },
        }
    }
}
</script>