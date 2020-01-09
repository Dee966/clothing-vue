import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Jacket from '../components/jacket/Jacket'
import Pants from "../components/pants/Pants";
import Parts from "../components/parts/Parts";
import One from "../components/jacket/One";
import Two from "../components/jacket/Two";
import Children from "../components/children/Children";
import Home from "../components/home/Home";
import Detail from "../components/detail/Detail";
import Search from "../components/home/Search";
import Order from "../components/order/Order";
import Login from "../components/login/Login";
import Register from "../components/login/Register";
import UserInfo from "../components/login/UserInfo";
import My from "../components/my/My";
import Info from "../components/my/Info";
import ShowOrder from "../components/my/ShowOrder";
import Cart from "../components/cart/Cart";
import Pay from "../components/order/Pay";

import ManagerLogin from "../components/manager/ManagerLogin";
import ManagerHome from "../components/manager/ManagerHome";
import ManagerHeader from "../components/manager/ManagerHeader";
import ManagerUpload from "../components/manager/ManagerUpload";
import ManagerOrder from "../components/manager/ManagerOrder";
import ManagerBanner from "../components/manager/ManagerBanner";
import ManagerSearch from "../components/manager/ManagerSearch";
import WriteAppraise from "../components/my/WriteAppraise";

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',name: 'loginLink',component: Login},
    {path: '/home',name: 'homeLink',component: Home,meta:{keepAlive:true}},
    {path: '/jacket/:id',name: 'jackLink',component: Jacket,meta:{keepAlive:true}},
    // {path: '/jacket',name: 'jackLink',component: Jacket,redirect:"/jacket/one",children:[
    //     {path: '/jack/one',name: 'OneLink',component: One},
    //     {path: '/jack/two',name: 'TwoLink',component: Two},
    //   ]
    // },
    {path: '/pants/:id',name: 'pantsLink',component: Pants,meta:{keepAlive:true}},
    {path: '/parts/:id',name: 'partsLink',component: Parts,meta:{keepAlive:true}},
    {path: '/children/:id',name: 'childrenLink',component: Children,meta:{keepAlive:true}},
    {path: '/detail/:id',name: 'detailLink',component: Detail,meta:{keepAlive:true}},
    {path: '/search',name: 'searchLink' ,component: Search,meta:{keepAlive:true}},
    {path: '/order',name: 'orderLink' ,component: Order,meta:{keepAlive:true}},
    {path: '/login',name: 'loginLink' ,component: Login},
    {path: '/register',name: 'registerLink' ,component: Register},
    {path: '/info/:id',name: 'infoLink' ,component: UserInfo},
    {path: '/my',name: 'myLink' ,component: My,meta:{keepAlive:true},children:[
        {path: '/my/info', name: 'myInfoLink', component: Info,meta:{keepAlive:true}},
        {path: '/my/showOrder', name: 'showOrdLink', component: ShowOrder,meta:{keepAlive:true},children:[
            {path: '/my/showOrder/wriAppraise', name: 'wriAppraiseLink', component: WriteAppraise,meta:{keepAlive:true}}
          ]},

      ]},
    {path: '/cart',name: 'cartLink' ,component: Cart,meta:{keepAlive:true}},
    {path: '/pay',name: 'payLink' ,component: Pay,meta:{keepAlive:true}},

    {path: '/maLogin',name: 'maLoginLink' ,component: ManagerLogin,meta:{keepAlive:false}},
    {path: '/maHeader',name: 'maHeaderLink' ,component: ManagerHeader,meta:{keepAlive:false},children:[
        {path: '/maHeader/maHome',name: 'maHomeLink' ,component: ManagerHome,meta:{keepAlive:false}},
        {path: '/maHeader/maUpload',name: 'maUploadLink' ,component: ManagerUpload,meta:{keepAlive:false}},
        {path: '/maHeader/maOrder',name: 'maOrderLink' ,component: ManagerOrder,meta:{keepAlive:false}},
        {path: '/maHeader/maBanner',name: 'maBannerLink' ,component: ManagerBanner,meta:{keepAlive:false}},
        {path: '/maHeader/maSearch',name: 'maSearchLink' ,component: ManagerSearch,meta:{keepAlive:false}},
        ]
    },

  ],
  // mode:"history",
  // base: '/fzsc/'
})
