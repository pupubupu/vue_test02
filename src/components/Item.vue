<template>
  <div class="item" @click="myitem.finished = !myitem.finished">
    <div>
      <input id="check" type="checkbox" v-model="myitem.finished"/>
      {{myitem.name}}
    </div>
    <div align="right" >
      <button class="btnColor" @click.stop="edit">编辑</button>
      <button class="btnColor" @click.stop="del" >删除</button>
    </div>
<!--    <hr>-->
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Item",
  props:{
    item:{
      type:Object
    }
  },
  data(){
    return{
      myitem:{}
    }
  },
  methods:{
    //事件删除
    del(){
      if (confirm('你确定删除此任务？')){
        // this.$bus.$emit('del',this.myitem) //使用全局事件总线
        this.$pubsub.publish('del',this.myitem) //使用pubsub事件订阅与发布
        alert('已删除')
      }else{
        alert('已取消')
      }
    },
    edit(){

    }
  },
  watch:{
    item:{
      deep: true,
      handler(newVal){
        this.myitem = JSON.parse(JSON.stringify(newVal))
      }
    },
    myitem:{
      deep: true,
      handler(newVal){
        this.$bus.$emit('change',newVal)
      }
    }
  },
  mounted() {
    this.myitem = JSON.parse(JSON.stringify(this.item)) // 深拷贝
  }
}
</script>

<style scoped>
.item{
  height: 60px;
  width: 400px;
}
.btnColor{
  background-color: #dd6161;
  margin-left: auto;
  display: none;
}
.item:hover {
  background-color: #ddd;
}
.item:hover button{
  display: block;
}
</style>