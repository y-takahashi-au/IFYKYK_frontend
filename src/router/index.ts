import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginAccount.vue')
    },
    {
      path: '/qr/:userId',
      name: 'qr',
      component: () => import('@/views/QR.vue')
    },
    {
      path: '/initUser/:userId',
      name: 'initUser',
      component: () => import('@/views/InitUser.vue')
    },
    {
      path: '/restaurantList',
      name: 'restaurantList',
      component: () => import('@/views/RestaurantList.vue')
    },
    {
      path: '/flatHouse/list',
      name: 'flatHouseList',
      component: () => import('@/views/flatHouse/PlaceList.vue')
    },
    {
      path: '/flatHouse/detail/:id(\\d+)',
      name: 'flatHouseDetail',
      component: () => import('@/views/flatHouse/PlaceDetail.vue')
    },
    {
      path: '/flatHouse/add_place',
      name: 'addFlatHouse',
      component: () => import('@/views/flatHouse/AddPlcace.vue')
    },
    {
      path: '/flatHouse/add_review/:id(\\d+)',
      name: 'addFlatHouseReview',
      component: () => import('@/views/flatHouse/AddReview.vue')
    },
    {
      path: '/approval/menu',
      name: 'approvalMenu',
      component: () => import('@/views/approval/ApprovalMenu.vue')
    },
    {
      path: '/approval/account_list',
      name: 'approvalAccountList',
      component: () => import('@/views/approval/ApprovalAccountList.vue')
    },
    {
      path: '/approval/account_detail',
      name: 'approvalAccountDetail',
      component: () => import('@/views/approval/ApprovalAccountDetail.vue')
    },
    {
      path: '/approval/flat_house_list',
      name: 'approvalFlatHouseList',
      component: () => import('@/views/approval/ApprovalFlatHouseList.vue')
    },
    {
      path: '/approval/flat_house_detail',
      name: 'approvalFlatHouseDetail',
      component: () => import('@/views/approval/ApprovalFlatHouseDetail.vue')
    }
  ]
})

export default router
