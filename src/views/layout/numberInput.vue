<template>
  <div class="numberInput">
    <div class="reduce" @click="_reduce">
      <img src="../../assets/reduce.png" alt="">
    </div>
    <div class="inputBox">
      <input type="number" placeholder="0" :value="value" ref="input" @input="inputNum($event.target.value)"
             @change="inputNum($event.target.value)">
    </div>
    <div class="add" @click="_add">
      <img src="../../assets/add.png" alt="">
    </div>
  </div>
</template>

<script>
  module.exports = {
    props: ['value'],
    data: function () {
      return {}
    },
    methods: {
      _reduce: function ($event) {
        var formattedValue = this.$refs.input.value.trim();
        if (formattedValue > 0) {
          formattedValue--;
        }
        if (formattedValue !== this.$refs.input.value) {
          this.$refs.input.value = formattedValue;
        }
        // 通过 input 事件发出数值
        this.$emit('input', Number(formattedValue))
      },
      _add: function ($event) {
        var formattedValue = this.$refs.input.value.trim();
        formattedValue++;
        if (formattedValue !== this.$refs.input.value) {
          this.$refs.input.value = formattedValue;
        }
        // 通过 input 事件发出数值
        this.$emit('input', Number(formattedValue))
      },
      inputNum: function (value) {
        var formattedValue = value
        // 删除两侧的空格符
          .trim()
          // 保留正整数
          .slice(value.indexOf('-') === -1 ? 0 : 1, value.indexOf('.') === -1 ? value.length : value.indexOf('.'));
        // 如果值不统一，手动覆盖以保持一致
        if (formattedValue !== value) {
          this.$refs.input.value = formattedValue;
        }
        // 通过 input 事件发出数值
        this.$emit('input', Number(formattedValue))
      }

    },
    created: function () {
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .numberInput {
    border: 0.01rem solid #eee;
    -webkit-border-radius: 0.05rem;
    -moz-border-radius: 0.05rem;
    border-radius: 0.05rem;
    display: flex;
    flex-direction: row;
    height: 0.27rem;
    .reduce {
      border-right: 0.01rem solid #eee;
      width: 0.3rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 0.1rem;
      }
    }
    .inputBox{
      width:0.7rem;
      font-size:0;
      input{
        width:100%;
        height:0.25rem;
        border:none;
        text-align: center;
      }
    }
    .add{
      border-left: 0.01rem solid #eee;
      width: 0.3rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 0.1rem;
      }
    }
  }
</style>
