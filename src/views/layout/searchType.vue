<template>
  <div class="searchType">
    <ul>
      <li v-for="item in searchType" :class="[type == item.type ? 'font-color-active' : '']" @click="_search(item.type)">
        {{item.name}}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'searchType',
    props: {
      searchType: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data(){
      return {
          type:0
      }
    },
    created(){
      this.type = this.searchType.length ? this.searchType[0].type : 0
    },
    methods: {
      _search(type){
        this.type = type;
        this.$emit('search', type);
      }
    }

  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .searchType {
    position: absolute;
    right: 1rem;
    top: 50%;
    ul li {
      list-style: none;
      text-align: right;
      font-size: 0.15rem;
      font-weight: bold;
      margin-bottom: 0.2rem;
      cursor: pointer;
    }
    ul li:hover {
      color: #ebae19;
    }
  }
</style>
