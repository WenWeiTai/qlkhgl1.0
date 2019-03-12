<template>
  <div>
    <managerList></managerList>
  </div>
</template>

<script>
import  managerList from './managerList'
export default {
    components:{
      managerList
    },
    computed:{    
            rightTitle(){
                return this.$store.state.rightTitle
            },
        },
    mounted(){
        this.$store.state.defaultActive = '客户经理管理';
        this.$store.state.rightTitle = '客户经理管理'
    }
}
</script>

<style>

</style>
