<template>
    <div class="timer">
        <div>
            <h1> {{message}}</h1>
        </div>
        <div class="time__box">
            <p>{{days}}</p>
            <p>{{hours % 24}}</p>
            <p>{{minutes % 60}}</p>
            <p>{{seconds % 60}}</p>
        </div>
    </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
    props: {
        start_date: Date,
        end_date: Date,
    },
    setup(props) {
        const days = ref(0);
        const hours = ref(0);
        const minutes = ref(0);
        const seconds = ref(0);
        const message = ref('Duration');
        
        setInterval(() => {
            const currDate = new Date();
            if(currDate.getTime() < props.start_date.getTime()){
                const lauchTime = props.start_date - currDate;
                seconds.value = parseInt(lauchTime / 1000);
                minutes.value = parseInt(seconds.value / 60);
                hours.value = parseInt(minutes.value / 60);
                days.value = parseInt(hours.value / 24); 
                message.value = "Voting start after !!!!!!!";
            } else if (props.end_date.getTime() > currDate.getTime()) {
                const voteTime = props.end_date - currDate;
                seconds.value = parseInt(voteTime / 1000);
                minutes.value = parseInt(seconds.value / 60);
                hours.value = parseInt(minutes.value / 60);
                days.value = parseInt(hours.value / 24);
                message.value = "Duration";
            }
        }, 1000);
        return {days, hours, minutes, seconds, message}
    }
}
</script>
<style>
.timer {
    text-align: center;
}
.time__box {
    width: 500px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content:space-between;
    text-align: center;
    /* transform: translateY(100px); */
}
.time__box p {
    width: 100px;
    height: 100px;
    line-height: 100px;
    border-radius: 10px;
    background-color: whitesmoke;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    font-weight: bold;
    font-size: 2em;
    text-align: center;
}
</style>
