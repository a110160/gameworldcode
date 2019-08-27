<template >
  <div>
    <loading :active.sync="isLoading"></loading> 
    <HomeNavbar></HomeNavbar>
    <div class="content wrap">
      <router-link to='/'>
        <button class='back'>回到列表</button>
      </router-link>
      
      <div class="imgDiv">
        <h2>{{product.title}}</h2>
        <img :src="product.imageUrl" >
        

      </div>
      <div class="textDiv">
        
        <p>{{product.content}}</p>
        <h3>${{product.price}}<small>{{product.origin_price}}</small></h3>
        <select name="" class="form-control mt-3" v-model="product.num">
          <option :value="num" v-for="num in 10" :key="num">
            選購 {{num}} {{product.unit}}
          </option>
        </select>
        <button class='add' @click="add">加入購物車</button>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import HomeNavbar from '@/components/HomeNavbar';
import Footer from '@/components/footer';

export default {
  components:{
    HomeNavbar,Footer
  },
  data(){
    return{
      product:{},
      id:'',
    }
  },methods:{
      getProduct(id){
      const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
      const vm =this;
      vm.isLoading=true;
      this.$http.get(api).then((response) => {
        console.log(response.data)
        vm.product = response.data.product;
        vm.product.num = 1;
        // vm.pagination = response.data.pagination;
        vm.isLoading=false;
      })
    },
    add(){
      const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      const cartData = {
        product_id:vm.product.id,
        qty :vm.product.num,
      };
      vm.isLoading=true;
      this.$http.post(api,{data:cartData}).then((response) => {
        console.log(response.data);
        vm.isLoading=false;
      });
    },
  },
  
  created(){
    this.id = this.$route.params.id;
    this.getProduct(this.id);
  }
}
</script>

<style scoped>
.wrap{
  max-width: 1024px;
  margin: auto;
}
.content{
  color: #7d7d7d;
  margin-top: 100px;
  display: flex;
  flex-direction:column;
  flex-wrap: wrap;
}
.content .back{
    margin-left: 900px;
    margin-bottom: 30px;
    border:#454f58 1px solid;
    background-color:#454f58;
    color:#fff;
    border-radius:10px;
    cursor:pointer;
    padding: 10px;
}
.content .back:hover{
  border:#454f58 1px solid;
  background-color:#fff;
  color:#454f58;
}
.imgDiv{
  /* margin-top: 50px; */
  margin: auto;
  width: 500px;
 /* height: 200px; */
}
.textDiv {
  margin: auto;
  text-align: center;
  /* justify-content: center; */
  width: 400px;
  /* margin-left: 20px; */
}
.imgDiv h2{
  text-align: center;
  font-size: 2em;
  margin-bottom: 20px;
}
.textDiv p{
  text-align: justify;
  font-size: 1.5em;
  margin-bottom: 50px;
  line-height: 1.5em;
}
.textDiv h3{
  font-size: 1.7em;
  color: red;
  
}
.textDiv h3 small{
  color: #7d7d7d;
  font-size: 16px;
  margin-left: 10px;
  text-decoration: line-through;
}
.textDiv select{
  margin-bottom: 20px;
}
.textDiv .add{
  /* margin-left: 900px; */
    margin-bottom: 30px;
    /* border:red 1px solid; */
    border:0;
    background-color:red;
    color:#fff;
    border-radius:10px;
    cursor:pointer;
    padding: 10px;
    box-shadow: 0 5px  0 0px #960d0d;
    transition: all 0.3s ease-out;
}
.textDiv .add:hover{
  	transform:scale(1.2,1.2);
}

</style>