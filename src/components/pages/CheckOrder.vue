<template>
  <div>
    <HomeNavbar> </HomeNavbar>
    <div class="title">
      確認訂單
    </div>
    <div class="my-5 row justify-content-center">
      <form class="col-md-6" @submit.prevent='payOrder'>
        <table class="table">
          <thead>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody>
            <tr v-for="item in order.products" :key="item.id">
              <td class="align-middle">{{ item.product.title }}</td>
              <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
              <td class="align-middle text-right">{{ item.final_total }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="text-right">總計</td>
              <td class="text-right">{{ order.total }}</td>
            </tr>
          </tfoot>
        </table>

        <table class="table">
          <tbody>
            <tr>
              <th width="100">Email</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr>
              <th>姓名</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th>收件人電話</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th>收件人地址</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td>
                <span v-if="!order.is_paid">尚未付款</span>
                <span v-else class="text-success">付款完成</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-right" v-if="order.is_paid === false">
          <button class="btn btn-danger">確認付款去</button>
        </div>
      </form>
    </div>
    <Footer></Footer>
		
  </div>
</template>

<script>
import Footer from '@/components/footer';
import HomeNavbar from '@/components/HomeNavbar';
export default {
  components:{HomeNavbar,Footer},
  data() {
    return {
      order:{user:{}},
      orderId: '',
    }
  },
  methods:{
    getOrder(){
      const vm =this;
      const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;
      // vm.isLoading=true;
      this.$http.get(api).then((response) => {
        console.log(response)
        vm.order = response.data.order;
        // vm.isLoading=false;
      })
    },
    payOrder(){
      const vm =this;
      const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;
      vm.isLoading=true;
      this.$http.post(api).then((response) => {
        console.log(response)
        vm.isLoading=false;
        if(response.data.success){
          vm.getOrder();
        }
      })
    },
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
    console.log(this.orderId);
  },
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