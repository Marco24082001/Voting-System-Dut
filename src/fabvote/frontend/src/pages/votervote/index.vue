<template>
    <div>
        <el-row>
            <el-col :span="14">
                <h1 v-if="voted === 'true'">VOTED</h1>
            </el-col>
            <el-col :span="10" align="right">

                <Timer :start_date="start_date" :end_date="end_date"></Timer>

            </el-col>
        </el-row>

        <div class="row justify-content-center">


            <!-- <h1>{{this.start_date.toLocaleString()}}</h1> -->

            <div class="col-12" align="center">
                <el-card v-for="(ballot, index) in ballots" :key="index" class="box-card mt-4">
                    <template #header>
                        <div class="card-header">
                            <span>{{ ballot.position.name }}</span>
                            <span>You can vote up to {{ ballot.position.maximum }} people</span>
                            <!-- <el-button class="button" text></el-button> -->
                        </div>
                    </template>
                    <div class="row">

                    </div>
                    <!-- <el-avatar shape="square" :size="300" :fit="images.fits[1]" :src="images.url" /> -->
                    <!-- <img src="../../assets/logo.png" alt=""> -->
                    <el-space wrap direction="horizontal" class="justify-content-center">
                        <el-card v-for="candidate in ballot.candidates" :key="candidate.id" class="box-card"
                            shadow="hover">
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
                            <el-avatar shape="square" :size="300" fit="cover" :src="candidate.imageUrl" />
                            <div class="row justify-content-center">
                                <el-button type="primary" plain
                                    @click="vote($event, index, candidate.id)">Vote</el-button>
                            </div>
                        </el-card>
                    </el-space>
                </el-card>
                <el-button v-if="voted === 'false' && vote_active === true" type="primary" class="mt-4"
                    @click="votedSubmit">Submit your votes</el-button>
            </div>
        </div>
    </div>

</template> 

<script>
// const img_url = require('@/assets/img/vue-logo.png')
import env from "../../../env";
import io from 'socket.io-client';
import ElectionServices from "@/services/election/election.services";
import BallotServices from "@/services/ballot/ballot.services";
import AuthenticationServices from "@/services/authentication/authentication.services";
import { ElMessage } from "element-plus";
import Timer from "@/components/timer.vue";

export default {
    components: {
        Timer
    },
    data() {
        return {
            socketInstance: "",
            ballots: [],
            voted: "false",
            vote_active: "false",
            election: {},
            start_date: new Date(),
            end_date: new Date(),
        }
    },
    async created() {
        this.election = (await ElectionServices.getAll()).data.response;
        this.election.start_date = new Date(this.election.start_date);
        this.start_date = new Date(this.election.start_date)
        this.end_date = new Date(this.election.start_date)
        this.end_date.setMinutes(this.end_date.getMinutes() + this.election.duration);
        console.log(this.start_date.toLocaleString(), this.end_date.toLocaleString());
        this.ballots = (await BallotServices.getAllBallots()).data.response;
        for (const ballot of this.ballots) {
            ballot.voted_candidates = []
        }
        const currentUser = (await AuthenticationServices.getCurrentUser()).data.response;
        this.voted = currentUser.voted;
        // create socket
        this.socketInstance = io(env.API_URL);

        setInterval(() => {
            const currDate = new Date();
            if (currDate.getTime() < this.start_date.getTime() || currDate.getTime() > this.end_date.getTime()) {
                this.vote_active = false;
            } else {
                this.vote_active = true;
            }
        })
    },
    methods: {
        vote: function (event, index, candidateId) {
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

        validate: function () {
            for (const ballot of this.ballots) {
                if (ballot.voted_candidates.length === 0) {
                    ElMessage.error(`bạn không được để trống phiếu bầu`);
                    return false
                }
            }
            return true
        },

        votedSubmit: async function () {
            if (this.validate()) {
                this.$store.commit("animation/setFullscreenLoading", true);
                const res = await BallotServices.submitBallots(this.ballots);
                this.$store.commit("animation/setFullscreenLoading", false);
                if (!res.data.error) {
                    this.voted = 'true';
                    ElMessage.success("Vote successed !")
                    this.socketInstance.emit("vote-success");
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