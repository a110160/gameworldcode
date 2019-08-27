<template >
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th width='120'>應付金額</th>
          <th>是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in orders" :key="key"
          v-if="orders.length"
          :class="{'text-secondary': !item.is_paid}">
          <td>{{ item.create_at | time }}</td>
          <td><span v-text="item.user.email" v-if="item.user"></span></td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right">{{ item.total | currency }}</td>
          <td>
            <strong v-if="item.is_paid" class="text-success">已付款</strong>
            <span v-else class="text-muted">尚未起用</span>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination :pagination = pagination @get_content='getOrder'></Pagination>
  </div>
</template>

<script>
import Pagination from '../Pagination'
export default {
  components:{Pagination},
  data(){
    return{
      orders:{
        products:{}
      },
      pagination:{}
    }
  },
  methods:{
    getOrder(page = 1){
      const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`;
      const vm =this;
      vm.isLoading=true;
      this.$http.get(api).then((response) => {
        console.log(response.data)
        vm.orders = response.data.orders;
        // vm.pagination = response.data.pagination;
        vm.isLoading=false;
      })
    },
  },
  filters:{
    time(element){
      let origin_date = new Date(element * 1000);
      let date = origin_date.getDate();
      let month = origin_date.getMonth()+1; 
      let year = origin_date.getFullYear()
      return `${year}-0${month}-${date}`;
      
    },
  },
  created(){
    this.getOrder();
  },
}
</script>