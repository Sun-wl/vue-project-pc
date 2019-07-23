var mixins = {
  data: function () {
    return {

    }
  },
  components: {

  },
  methods: {
    jump(path, id){
      /*跳转页面*/
      if(path){
        /*如果路径含有‘http’时，另开一个网页跳转*/
        if(path.indexOf('http')>=0){
          window.open(path);
          return
        }
        var pathName = path;
        /*如果有id，跳转时加锚点*/
        if(id){
          pathName += id;
        }
        this.$router.push(pathName)
      }
    },
    back(){
      this.$router.back();
    },
    toTop(){
      /*回到顶部*/
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  },
  created(){

  }
}

export default mixins;

