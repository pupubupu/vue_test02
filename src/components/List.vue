<template>
  <div>
    <ul style="padding-left: 0px;">
      <li v-for="(item) in list" :key="item.id" style="list-style: none">
        <Item :item="item"></Item>
      </li>
    </ul>
  </div>
</template>

<script>
import Item from "@/components/Item";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "List",
  components:{
    Item
  },
  props:{
    list:{
      type:Array
    }
  },
  data(){
    return{
    }
  },
  methods:{
    // demo(id){
    //   this.list = this.list.filter(function (item){
    //     return item.id != id
    //   })
    // }
  }
}
</script>

<style scoped>

</style>