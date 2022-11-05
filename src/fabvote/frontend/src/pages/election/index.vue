<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <el-form
            class="login-form"
            size="large"
            label-position="left"
            label-width="6rem"
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
                start_time: new Date(),
                end_time: new Date(),
                active: false,
            },
        }
    }
}
</script>