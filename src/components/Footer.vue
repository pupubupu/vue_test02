<template>
  <div>
    <h3>
      <input type="checkbox" v-model="allSel"/>已完成{{finish}}/还剩下{{remain}}
      <div align="right">
        <button class="btnColor" @click="delAllFinished">删除已完成的任务</button>
      </div>
    </h3>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Footer",
  props:{
    list:{
      type:Array
    }
  },
  data(){
    return{
      finish: 0,
      remain: 0,
      all: false
    }
  },
  methods:{
    delAllFinished(){
      this.$emit('delAllFinished')
    }
  },
  watch:{
    list:{
      immediate: true,
      deep: true,
      handler(newOld){
        this.finish = this.remain = 0
        newOld.forEach((item)=>{
          if (item.finished){
            this.finish++;
          }else {
            this.remain++;
          }
        })
      }
    }
  },
  mounted() {
    // this.x.$emit('demo','heihei')
  },
  computed:{
    //检测事件是否完成，可以使用数据检测，也可以使用计算属性，选中复选框时，调用自定义事件，把事件设置为已完成
    allSel:{
      get(){
        return this.all
      },
      set(value){
        this.all = value
        this.$emit('handlerAll',value)
      }
    }
  }
}
</script>

<style scoped>
  .btnColor{
    background-color: #dd6161;
    margin-left: auto;
  }
</style>