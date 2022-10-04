<template>
  <div style="width: 400px">
    <div id="app">
      <Header @add="add" ref="a"></Header>
      <List :list="list" ref="b"></List>
      <Footer :list="list" ref="c" @handlerAll="all" @delAllFinished="delAllFinished" v-show="list.length != 0"></Footer>
    </div>
  </div>
</template>

<script>

import Header from "@/components/Header";
import List from "@/components/List";
import Footer from "@/components/Footer";
import {nanoid} from 'nanoid';
export default {
  name: 'App',
  components: {
    Footer,
    List,
    Header

  },
  data(){
    return{
      list: JSON.parse(localStorage.getItem('data')),
      aa:'我是最大的爹',
      // data :[
      //   {
      //     id:1,
      //     name:'吃饭',
      //     finished:false
      //   },{
      //     id:2,
      //     name:'睡觉',
      //     finished: true
      //   },{
      //     id:3,
      //     name:'敲代码',
      //     finished: false
      //   }
      // ]
    }
  },
  methods:{

    add(ele){ //待办事件添加方法，使用nanoid随机生成id
      let item
      // if(this.list.length != 0){
        item = {id: nanoid(), name: ele, finished:false}
      // }else{
      //   data = {id: nanoid(), name: ele, finished:false}
      // }
      //修改list,这是用户在页面上直接观察到的
      this.list.unshift(item)
      //修改浏览器本地存储，这是保存记录，下一次再打开浏览器会显示上次操作后的数据
      // localStorage.setItem('data',JSON.stringify(this.list))
    },
    all(value){ //代办事件全选（全部已完成）
      // for (let i = 0; i < this.list.length; i++) {
      //   this.list[i].finished = value
      // }
      this.list.filter((item)=>{
        return item.finished = value
      })
    },
    delAllFinished() { //删除所有已完成事件
      this.list = this.list.filter((item)=>{
        return item.finished == false
      })
    }

  },
  watch:{
    //当list发生修改时，将浏览器本地存储的数据同步修改
    list:{
      deep: true,
      handler(newVal){
        //修改localStorage
        localStorage.setItem('data',JSON.stringify(newVal))
      }
    }
  },
  mounted() {
    //数据初始化，这里使用localStorage
    // this.data = JSON.stringify(this.data)
    // localStorage.setItem('data',this.data)
    // this.list = JSON.parse(localStorage.getItem('data'))

    //修改某一条事项是否完成
    this.$bus.$on('change',(param)=>{
      for (let i = 0; i < this.list.length; i++) {
        if(this.list[i].id == param.id){
          this.list[i].finished = param.finished
          break
        }
      }

    })


    // 删除某一条事项
    // this.$bus.$on('del',(param)=>{
    //   for (let i = 0; i < this.list.length; i++) {
    //     if(this.list[i].id == param.id){
    //       this.list.splice(i,1)
    //       break
    //     }
    //   }
    //
    // })
    //使用消息订阅与发布
    this.pid =  this.$pubsub.subscribe('del',(msgName,param)=>{
      for (let i = 0; i < this.list.length; i++) {
        if(this.list[i].id == param.id){
          this.list.splice(i,1)
          break
        }
      }
    })

  },
  beforeUnmount() {
    this.$bus.$off('del')
    this.$bus.$off('change')
    this.$pubsub.unsubscribe(this.pid)
  }
}




</script>

<style>
/*#app {*/
/*  font-family: Avenir, Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  margin-top: 60px;*/
/*}*/
</style>
