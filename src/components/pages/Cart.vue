<template>
  <div>
    <HomeNavbar></HomeNavbar>
    <div class="title">
      購物車內容
    </div>
    <div class="my-5 row justify-content-center">
      <div class="col-md-6">
        <table class="table">
          <thead>
            <th></th>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody v-if="cart.carts">
            <tr v-for="item in cart.carts" :key="item.id" >
              <td class="align-middle">
                <button type="button" class="btn btn-outline-danger btn-sm"
                  @click="removeCartItem(item.id)">
                  <i class="far fa-trash-alt"></i>
                </button>
              </td>
              <td class="align-middle">
                {{ item.product.title }}
                <div class="text-success" v-if="item.coupon">
                  已套用優惠券
                </div>
              </td>
              <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
              <td class="align-middle text-right">{{ item.final_total }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-right">總計</td>
              <td class="text-right">{{ cart.total }}</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total">
              <td colspan="3" class="text-right text-success">折扣價</td>
              <td class="text-right text-success">{{ cart.final_total }}</td>
            </tr>
          </tfoot>
        </table>

        <div class="input-group mb-3 input-group-sm">
          <input type="text" class="form-control"  placeholder="請輸入優惠碼" v-model="coupon_code">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click='addCouponCode'>
              套用優惠碼
            </button>
          </div>
        </div>
      </div>
    </div>

    <ValidationObserver v-slot="{ invalid, validate }">
      <div class="my-5 row justify-content-center">
        
          <form class="col-md-6" @submit.prevent="validate().then(createOrder)" >
            <div class="form-group">
              <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                <label for="useremail">Email</label>
                <input type="email" class="form-control" name="email" id="useremail"
                  v-model="form.user.email" placeholder="請輸入 Email" :class="{'is-invalid' : errors[0]}" >
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          
            <div class="form-group">
              <ValidationProvider name="name" rules="required" v-slot="{ errors }">
                <label for="username">收件人姓名</label>
                <input type="text" class="form-control" name="name" id="username"
                  v-model="form.user.name" placeholder="輸入姓名" :class="{'is-invalid' : errors[0]}"d>
                <span class="text-danger"> {{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          
            <div class="form-group">
              <ValidationProvider name="phone" rules="required" v-slot="{ errors }">
                <label for="usertel">收件人電話</label>
                <input type="tel" class="form-control" id="usertel" name='phone' v-model="form.user.tel" placeholder="請輸入電話" :class="{'is-invalid' : errors[0]}">
                <span class="text-danger"> {{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          
            <div class="form-group">
              <ValidationProvider name="address" rules="required" v-slot="{ errors }">
                <label for="useraddress">收件人地址</label>
                <input type="text" class="form-control" name="address" id="useraddress" v-model="form.user.address"
                  placeholder="請輸入地址" :class="{'is-invalid' : errors[0]}">
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          
            <div class="form-group">
              <label for="comment">留言</label>
              <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
            </div>
            <div class="text-right">
              <button :disabled="invalid" class="btn btn-danger">送出訂單</button>
            </div>
          </form>
      
      </div>
  </ValidationObserver>
      <Footer></Footer>
  </div>
</template>

<script>
import {
  ValidationProvider,
  ValidationObserver
} from "vee-validate";
import HomeNavbar from '@/components/HomeNavbar';
import Footer from '@/components/footer';







export default {
  components:{
    HomeNavbar,
    ValidationProvider,
    ValidationObserver,
    Footer
  },
  data(){
    return{
      cart:{carts:{},final_total:'',total:'',},
      coupon_code:'',
      isLoading:false,
      form:{
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      }, 
    }
  },
  methods:{
    gatCart(){
      const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm =this;
      vm.isLoading=true;
      this.$http.get(api).then((response) => {
        vm.cart.carts = response.data.data.carts;
        vm.cart.final_total = response.data.data.final_total;
        vm.cart.total = response.data.data.total;
        console.log(response)
        vm.isLoading=false;
      })
    },
    removeCartItem(id){
      const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      const vm =this;
      vm.isLoading=true;
      this.$http.delete(api).then((response) => {
        console.log(response)
        vm.isLoading=false;
        vm.gatCart();
      })
    },
    addCouponCode(){
      const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      const vm =this;
      const coupon ={
        code :vm.coupon_code,
      }
      vm.isLoading=true;
      this.$http.post(api,{data:coupon}).then((response) => {
        console.log(response);
        vm.isLoading=false;
        vm.gatCart();
      })
    },
    createOrder(){
      const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      const vm =this;
      const order = vm.form;
      vm.isLoading=true;
      this.$http.post(api,{data:order}).then((response) => {
        console.log('訂單已建立',response);
        if(response.data.success){
          vm.$router.push(`/check_order/${response.data.orderId}`)
        }
        vm.isLoading=false;
        // vm.gatCart();
      })
    },
  },
  created(){
   this.gatCart();
  }
}
</script>

<style scoped>
.title{
  margin: auto;
  margin-top: 80px;
  max-width: 1024px;
  height: 36px; 
  color: #454f58;
  font-size: 36px;
  font-weight: 600;
  text-align: center;
}
</style>





