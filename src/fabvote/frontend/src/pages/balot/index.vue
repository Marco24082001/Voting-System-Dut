<template>
    <div class="row justify-content-center">
        <div class="col-12" align="center">
            <el-card v-for="ballot in ballots" class="box-card mt-4">
                <template #header>
                    <div class="card-header">
                        <span>{{ ballot.position.name }}</span>
                        <span>You can vote up to {{ ballot.position.maximum }} people</span>
                        <!-- <el-button class="button" text>Hide</el-button> -->
                    </div>
                </template>
                <div class="row">

                </div>
                <!-- <el-avatar shape="square" :size="300" :fit="images.fits[1]" :src="images.url" /> -->
                <!-- <img src="../../assets/logo.png" alt=""> -->
                <el-space wrap direction="horizontal" class="justify-content-center">
                    <el-card v-for="candidate in ballot.candidates" :key="candidate.id" class="box-card" shadow="hover">
                        <template #header>
                            <div class="card-header">
                                <span>{{ candidate.name }}</span>
                                <el-popover placement="top" title="Biography" :width="300" trigger="hover"
                                    :content="candidate.biography">
                                    <template #reference>
                                        <!-- <el-button class="m-2">Hover to activate</el-button> -->
                                        <el-button class="button ml-4" type="primary" text>Biography</el-button>
                                    </template>
                                </el-popover>
                            </div>
                        </template>
                        <el-avatar shape="square" :size="300" :fit="images.fits[1]" :src="candidate.imageUrl" />
                        <div class="row justify-content-center">
                            <el-button type="primary" plain>Vote</el-button>
                        </div>
                    </el-card>
                </el-space>
            </el-card>
        </div>
    </div>
</template> 

<script>
// const img_url = require('@/assets/img/vue-logo.png')
import BallotServices from '@/services/ballot/ballot.services';

export default {
    data() {
        return {
            images: {
                fits: ['cover', 'cover', 'cover', 'cover'],
                url: "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            },
            ballots: [],
        }
    },
    async created() {
        this.ballots = (await BallotServices.getAllBallots()).data.response;
        console.log(this.ballots)
        console.log('thanhvi')
    }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>