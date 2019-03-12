<template>
  <div>
    <clientList></clientList>
  </div>
</template>

<script>
 import  clientList from './clientList'
export default {
    components:{
     clientList
    },
    computed:{    
            rightTitle(){
                return this.$store.state.rightTitle
            },
        },
    mounted(){
        this.$store.state.defaultActive = '客户管理';
        this.$store.state.rightTitle = '客户管理'
    }
}
</script>

<style>

</style>
