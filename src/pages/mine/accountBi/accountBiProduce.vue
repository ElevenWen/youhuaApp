<template>
  <div id="accountBiProduce">
      <headerTitle :title="title" ></headerTitle>
      <div class="content" v-html="ACCOUNTBI_RELUSE_DATA">
         {{ACCOUNTBI_RELUSE_DATA}}
      </div>
  </div>
</template>

<style lang="less" scoped>
    .content{
     padding: 0.3783783783783784rem;
     margin-top: 1.1891891891891893rem;
     font-size: 0.43243243243243246rem;
}
 
</style>


<script>
  import headerTitle from "../../components/header-title";
  import { mapState, mapActions, mapGetters } from "vuex";

  export default{
    data(){
      return {
        title:'记账币说明'
      }
    },
    components:{
      headerTitle
    },
    computed: {
      ...mapState("mine_index", {
        ACCOUNTBI_RELUSE_DATA: "ACCOUNTBI_RELUSE", //记账币规则
      })
    },
    created(){
      var params = {
        key:'jzb'
      }
      this.ACCOUNTBI_RELUSE(params).then(()=>{
        // console.log(this.ACCOUNTBI_RELUSE_DATA )
      })
    },
    methods:{
      ...mapActions("mine_index", { 
        ACCOUNTBI_RELUSE:'ACCOUNTBI_RELUSE',//记账币规则
      }),
    }
  }
</script>