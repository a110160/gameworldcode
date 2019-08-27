<template >
  <div>
		<loading :active.sync="isLoading"></loading> 
    <HomeNavbar/>
		<div class="topImg">
			<img src="@/img/title.png">
		</div>
			

		<div class="content">
			<div class="contentBar">
				<ul class="wrap">
					<li @click="change('all')" :class="{active:search=='all'}">全部商品</li>
					<li @click="change('Xbox')" :class="{active:search=='Xbox'}">Xbox</li>
					<li @click="change('Playstation')" :class="{active:search=='Playstation'}">Playstation</li>
					<li @click="change('NintendoSwitch')" :class="{active:search=='NintendoSwitch'}">Nintendo Switch</li>
				</ul>
			</div>
			
				<div class="content_products">
					<ul class="wrap">
						<li  v-for="item in filterDatas" :key='item.id'>
							<img :src='item.imageUrl' @click="gatSingleProduct(item.id)">
							<p>{{item.title}}</p>
							<small>{{item.origin_price}}</small>
							<h2>{{item.price}}</h2>
							<button @click="add(item.id)">加入購物車</button>
						</li>
					</ul>
				</div>
			
					
		</div>
		<!-- <Pagination class='wrap pagination' v-if="search=='all'" :pagination = pagination @get_content='getProducts'></Pagination> -->
		<Footer></Footer>
  </div>
	
</template>

<script>
import HomeNavbar from '@/components/HomeNavbar';
import $ from "jquery";
import Pagination from '@/components/Pagination';
import Footer from '@/components/footer';

export default {
  components:{
		Footer,
    HomeNavbar,Pagination
	},
	data(){
    return{
      products:[],
      pagination:{},
      product:{},
      cart:{carts:{},final_total:'',total:'',},
      coupon_code:'',
      isLoading:false,
      status:{
        isLoadingItem:'',
      },
			search:'all',
    }
	},
	methods:{
		getProductAll(){
			const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      const vm =this;
      vm.isLoading=true;
      this.$http.get(api).then((response) => {
        console.log(response.data)
        vm.products = response.data.products;
				// vm.pagination = response.data.pagination;
        vm.isLoading=false;
      })
		},
		change(item){
			this.search = item;
		},
		gatSingleProduct(id){
			this.$router.push(`/signle_product/${id}`)
		},
		add(id,qty = 1){
			const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      const cartData = {
        product_id:id,
        qty,
			};
			console.log(cartData);
      vm.isLoading=true;
      this.$http.post(api,{data:cartData}).then((response) => {
        console.log(response.data);
        vm.isLoading=false;
      });
		}
	},
	created(){
		this.getProductAll();
	},
	computed:{
		filterDatas(){
			const vm = this;
			if(vm.search=='all'){
				return vm.products;
				
			}
			return  vm.products.filter(item=>{return item.category==vm.search})
			
		},
	}
}
</script>

<style scoped>
.active{
	background-color: #262b2f;
}
body{
	background-color: #f5f5f5;
}

.topImg {
	padding-top: 30px;
	vertical-align: -webkit-baseline-middle;
}
.topImg img{
	vertical-align: -webkit-baseline-middle;
}
.wrap{
	max-width: 1024px;
	margin: auto;

}

.contentBar{
	background-color:#454f58;
	/* height: 20px; */
}

.contentBar ul{
	display: flex;
	justify-content:space-around;
  color: aliceblue;
  /* float: right; */
}
.contentBar ul li{
	flex-direction: row;
  color: #fff;
  /* float: left; */
  font-size: 25px;
  line-height: 50px;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 10px;
}
.contentBar ul li:hover{
  cursor :pointer;
  background-color: #262b2f;
}
.content_products ul{
	margin-top: 30px;
	display: flex;
	justify-content:flex-start;
	flex-flow: wrap;
}
.content_products ul li{
	color: #7d7d7d;
	text-align: center;
	margin: 5px;
	width: 330px;
	margin-bottom: 20px;
	/* border: #262b2f 1px solid; */
	/* height: 200px; */
	/* background-color: #262b2f; */
}
.content_products ul li img{
height: 200px;
margin-bottom: 20px;
transform:scale(1,1);
transition: all 0.3s ease-out;
box-shadow: 0px 5px 5px 0px #f5f5f5;
}
.content_products ul li img:hover{
	cursor: pointer;
	transform:scale(1.2,1.2);
	box-shadow: 0px 5px 5px 0px #AAA7A4;
}
.content_products ul li p{
	padding-bottom: 10px;
}
.content_products ul li small{
	font-size: 14px;
	text-decoration-line: line-through
}
.content_products ul li h2{
color: red;
margin-top: 3px;
font-weight: 600;
font-size: 20px;
margin-bottom: 5px;
}
.content_products ul li button{
	border:#003C9D 1px solid;
  background-color:#003C9D;
  color:#fff;
  border-radius:10px;
	cursor:pointer;
	padding: 10px;
}
.content_products ul li button:hover{
	color:#003C9D;
	background-color:#fff;
	border: #003C9D 1px solid;
}
.pagination{
	justify-content: center;
	margin-bottom: 10px;
}
</style>