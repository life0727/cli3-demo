<template>
    <div class="wrapper">
        <v-head></v-head>
        <transition name="move" mode="out-in">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
import vHead from './Header.vue';
import bus from '../../../utils/bus';


export default {
    data() {
        return {

        };
    },
    components: {
        vHead,
    },
    created() {

    },
    mounted(){
        // bus.$emit('IDPermiss', {
        //     hasIDpermiss:false
        // })
    }
};
</script>
