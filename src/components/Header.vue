<template>
  <div>
    <input type="text" placeholder="请输入你的任务名称，按回车确认" @keyup.enter="add" class="shape" v-model="shijian"/>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Header",
  data(){
    return{
      shijian:''
    }
  },
  methods:{
    add(){
      if(this.shijian.trim() != ''){ //校验数据，为输入或输入空格时不添加参数
        this.$emit('add',this.shijian)
        this.shijian = '' //输入框重新清零
      }
    }
  }

}

</script>

<style scoped>
.shape{
  height: 35px;
  width: 400px;
  font-size: x-large;
}

</style>