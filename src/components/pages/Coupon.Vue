<template >
  <div>
    <loading :active.sync="isLoading"></loading> 
    <div class="text-right">
      <button class="btn btn-primary mt-4" @click='openModal(true)'>建立新優惠卷</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th >名稱</th>
          <th >折扣百分比</th>
          <th >到期日</th>
          <th >是否啟用</th>
          <th >編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in coupons" :key="item.id">
          <td>{{item.title}}</td>
          <td>{{item.percent | percent}}</td>
          <td>{{item.due_date }}</td>
          <td>
            <span v-if="item.is_enabled==1" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm" @click="openModal(false,item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="openDelModal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div class="modal fade" id="couponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">優惠卷</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form> 
              <div class="form-group">
                <label for="title" class="col-form-label">優惠卷標題</label>
                <input type="text" class="form-control" id="title" v-model="tempCoupon.title">
              </div>
              <div class="form-group">
                <label for="code" class="col-form-label">優惠碼:</label>
                <input type="text" class="form-control" id="code" v-model="tempCoupon.code">
              </div>
              <div class="form-group">
                <label for="due_date" class="col-form-label">到期日</label>
                <input type="date" class="form-control" id="due_date" v-model="tempCoupon.due_date">
              </div>
              <div class="form-group">
                <label for="percent" class="col-form-label">折扣百分比</label>
                <input type="number" class="form-control" id="percent" v-model="tempCoupon.percent">
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox"
                  id="is_enabled" v-model="tempCoupon.is_enabled"
                  :true-value='1'
                  :false-value='0'>
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
              
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateCoupon">確定</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempCoupon.title }}</strong> 優惠券(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="deleteCoupon()"
              >確認刪除</button>
          </div>
        </div>
      </div>
    </div>

    


  </div>
</template>

<script>
import $ from "jquery";

export default {
  data(){
    return{
      isLoading:false,
      isNew :false,
      tempCoupon:{},
      pagination:{},
      coupons:{},

    }
  },
  methods: {
    openModal(isNew,item){
      if(isNew){
        this.tempCoupon = {};
        this.isNew = true;
      }else{
        this.tempCoupon = Object.assign({} , item);
        this.isNew = false;
      }
      $('#couponModal').modal('show');
    },
    updateCoupon(){
      let api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
      let httpMethod = 'post';
      const vm =this;
      if(!vm.isNew){
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
        httpMethod ='put';
      }
      let sendData = Object.assign({} , vm.tempCoupon); 
      sendData.due_date = new Date(vm.tempCoupon.due_date).getTime()/1000;
      this.$http[httpMethod](api,{data:sendData}).then((response) => {
        console.log(response.data);
        if(response.data.success){
          $('#couponModal').modal('hide');
          vm.getCoupon();
        }else{
          $('#couponModal').modal('hide');
          vm.getCoupon();
          console.log("新增失敗");
        }
      })
    },
    getCoupon(page = 1){
      const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`;
      const vm =this;
      vm.isLoading=true;
      this.$http.get(api).then((response) => {
        console.log(response.data)
        vm.coupons = response.data.coupons;
        vm.coupons.forEach(vm.time) //
        // vm.coupons.due_date=vm.time(vm.coupons.due_date);
        vm.pagination = response.data.pagination;
        vm.isLoading=false;
      })
    },
    openDelModal(item){
      this.tempCoupon = Object.assign({} , item);
      $('#delCouponModal').modal('show');
    },
    deleteCoupon(){
      const vm =this;
      const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
      this.$http.delete(api).then((response) => {
        console.log(response.data)
        if(response.data.success){
          $('#delCouponModal').modal('hide');
          vm.getCoupon();
          vm.tempCoupon = {};
        }else{
          $('#delCouponModal').modal('hide');
          vm.getCoupon();
          vm.tempCoupon = {};
          console.log('刪除失敗');
        }
      })
    },
    time(element){
      const nowTime = new Date().getTime()/1000;
      
      let origin_date = new Date(element.due_date * 1000);
      let date = origin_date.getDate();
      let month = origin_date.getMonth()+1; 
      let year = origin_date.getFullYear()
      element.due_date= `${year}-0${month}-${date}`;
      
    },
  },
  created() {
    this.getCoupon();
    
  },
  filters:{
    percent(n){
      return `${n}%`;
    },
    
  }
}
</script>

