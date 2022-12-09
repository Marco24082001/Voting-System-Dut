<template>
    <div class="row justify-content-center">
        <h1 v-if="'voted' === 'true'">Ban da vote !</h1>
        <div class="col-12" align="center">
            <el-card v-for="(ballot, index) in ballots" :key="index" class="box-card mt-4">
                <template #header>
                    <div class="card-header">
                        <span>{{ballot.position.name}}</span>
                        <span>Được vote tối đa {{ballot.position.maximum}} cử tri</span>
                        <el-button class="button" text>Hide</el-button>
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
                            <span>{{candidate.name}}</span>
                            <el-button class="button ml-4" type="primary" text>Tiểu sử</el-button>
                            </div>
                        </template>
                        <el-avatar shape="square" :size="300" fit="cover" :src="candidate.imageUrl" />
                        <div class="row justify-content-center">
                            <el-button type="primary" plain @click="vote($event, index, candidate.id)">Vote</el-button>
                        </div>
                    </el-card>
                </el-space>
            </el-card>
            <el-button type="primary" class="mt-4" @click="votedSubmit">Submit your votes</el-button>
            <el-button v-if="voted === 'false'" type="primary" class="mt-4" @click="votedSubmit">Submit your votes</el-button>
        </div>
    </div>
</template> 

<script>
// const img_url = require('@/assets/img/vue-logo.png')
import BallotServices from "@/services/ballot/ballot.services";
import AuthenticationServices from "@/services/authentication/authentication.services";
import { ElMessage } from "element-plus";

export default {
    data() {
        return {
            ballots: [],
            voted: "false",
        }
    },
    async created() {
        this.ballots = (await BallotServices.getAllBallots()).data.response;
        for (const ballot of this.ballots) {
            ballot.voted_candidates = []
        }
        const currentUser = (await AuthenticationServices.getCurrentUser()).data.response;
        this.voted = currentUser.voted;
    },
    methods: {
        vote: function(event, index, candidateId) {
            console.log(event);
            let idx = this.ballots[index].voted_candidates.indexOf(candidateId);
            if (idx !== -1) {
                this.ballots[index].voted_candidates.splice(idx, 1);
                event.target.innerText = "Vote";
            } else {
                if (this.ballots[index].voted_candidates.length >= this.ballots[index].position.maximum) {
                    ElMessage.error(`Ban da bau chon qua ${this.ballots[index].position.maximum} nguoi o vi tri nay`);
                    return false
                }
                this.ballots[index].voted_candidates.push(candidateId);
                event.target.innerText = "Unvote";
            }
        },

        validate: function() {
            for (const ballot of this.ballots) {
                if (ballot.voted_candidates.length === 0) {
                    ElMessage.error(`bạn không được để trống phiếu bầu`);
                    return false
                }
                return true
            }
        },

        votedSubmit: async function() {
            
            if(this.validate()) {
                this.$store.commit("animation/setFullscreenLoading", true);
                const res = await BallotServices.submitBallots(this.ballots);
                this.$store.commit("animation/setFullscreenLoading", false);
                if (!res.data.error) {
                    this.voted = 'true';
                    ElMessage.success("Vote successed !")
                } else {
                    ElMessage.error(res.data.error);
                }
            }
        },

        
    }
}
</script>

<style lang="scss" scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: larger;
}
</style>