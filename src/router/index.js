import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '@/components/HelloWorld';
import Dashboard from '@/components/Dashboard';
import Home from '@/components/pages/Home';
import Login from '@/components/pages/Login';
import Products from '@/components/pages/Products';
import Order from '@/components/pages/Order';
import Coupon from '@/components/pages/Coupon';
import Cart from '@/components/pages/Cart';
import CheckOrder from '@/components/pages/CheckOrder';
import SignleProduct from '@/components/pages/SignleProduct';
import CustomerOrders from '@/components/pages/CustomerOrders';
import CustomerCheckout from '@/components/pages/CustomerCheckout';
Vue.use(VueRouter);



export default new VueRouter({
routes:[
    {
        path:'*',
        redirect:'/Home'
    },
    // {
    //     name:'HelloWorld',
    //     path:'/',
    //     component:Home,
    //     meta: { requiresAuth: true },
    // },
    {
        name:'Login',
        path:'/login',
        component:Login,
    },
    {
        name:'Home',
        path:'/',
        component:Home,
        
    },
    {
        name:'SignleProduct',
        path:'/signle_product/:id',
        component:SignleProduct,
    },
    {
        name:'Cart',
        path:'/cart',
        component:Cart,
    },
    {
        name:'CheckOrder',
        path:'/check_order/:orderId',
        component:CheckOrder,
    },
    {
        name:'Dashboard',
        path:'/admin',
        component:Dashboard,
        children:[{
            name:'Products',
            path:'products',
            component:Products,
            meta: { requiresAuth: true },
        },{
            name:'Order',
            path:'order',
            component:Order,
            meta: { requiresAuth: true },
        },{
            name:'coupon',
            path:'coupon',
            component:Coupon,
            meta: { requiresAuth: true },
        }]
    },
    {
        path:'/',
        component:Dashboard,
        children:[{
            name:'CustomerOrders',
            path:'customer_orders',
            component:CustomerOrders,
            
        },
        {
            name:'CustomerCheckout',
            path:'customer_checkout/:orderId',
            component:CustomerCheckout,
            
        }]
    },
],
});