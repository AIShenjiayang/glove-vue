import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/modulemanager/index'), hidden: true },
  // { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  // { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
  // {
  //   path: '/modulemanager',
  //   component: Layout,
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/views/modulemanager/index'),
  //     name: 'modulemanager',
  //     meta: { title: '模块管理', icon: 'excel' }
  //   }]
  // },

  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      meta: { title: '主页', icon: 'dashboard' },
      component: () => import('@/views/dashboard/index')
    },
    {
      path: '/orgmanager',
      component: Layout,
      children: [{
        path: 'index',
        component: () => import('@/views/orgmanager/index'),
        name: 'orgmanager',
        meta: { title: '部门管理', icon: 'tree' }
      }]
    },
    {
      path: '/modulemanager',
      component: Layout,
      children: [{
        path: 'index',
        component: () => import('@/views/modulemanager/index'),
        name: 'modulemanager',
        meta: { title: '模块管理', icon: 'excel' }
      }]
    },
    {
      path: '/usermanager',
      component: Layout,
      children: [{
        path: 'index',
        component: () => import('@/views/usermanager/index'),
        name: 'usermanager',
        meta: { title: '用户管理', icon: 'people' }
      }]
    },
    {
      path: '/rolemanager',
      component: Layout,
      children: [{
        path: 'index',
        component: () => import('@/views/rolemanager/index'),
        name: 'rolemanager',
        meta: { title: '角色管理', icon: 'peoples' }
      }]
    },
    {
      path: '/resources',
      component: Layout,
      children: [{
        path: 'index',
        component: () => import('@/views/resources/index'),
        name: 'resources',
        meta: { title: '资源管理', icon: 'chart' }
      }]
    },
    {
      path: '/forms',
      component: Layout,
      redirect: 'noredirect',
      name: 'forms',
      meta: {
        title: '表单设计',
        icon: 'form'
      },
      children: [
        { path: 'index', component: () => import('@/views/forms/index'), name: 'formIndex', meta: { title: '表单列表', noCache: true, icon: 'table' }},
        { path: 'add', component: () => import('@/views/forms/add'), name: 'formAdd', meta: { notauth: true, title: '添加表单', noCache: true, icon: 'star' }},
        { path: 'edit/:id', component: () => import('@/views/forms/edit'), name: 'formEdit', hidden: true, meta: { notauth: true, title: '编辑表单', noCache: true, icon: 'list' }}
      ]
    },
    {
      path: '/flowschemes',
      component: Layout,
      redirect: 'noredirect',
      name: 'flowschemes',
      meta: {
        title: '流程设计',
        icon: 'eye'
      },
      children: [
        { path: 'index', component: () => import('@/views/flowschemes/index'), name: 'schemeIndex', meta: { title: '流程模板', noCache: true, icon: 'table' }},
        { path: 'add', component: () => import('@/views/flowschemes/add'), name: 'schemeAdd', meta: { notauth: true, title: '添加模板', noCache: true, icon: 'star' }},
        { path: 'edit/:id', component: () => import('@/views/flowschemes/edit'), name: 'schemeEdit', hidden: true, meta: { notauth: true, title: '编辑流程', noCache: true, icon: 'list' }}
      ]
    },
    {
      path: '/flowinstances',
      component: Layout,
      redirect: 'noredirect',
      name: 'flowinstances',
      meta: {
        title: '流程中心',
        icon: 'guide'
      },
      children: [
        { path: 'index', component: () => import('@/views/flowinstances/index'), name: 'index', meta: { title: '我的流程', noCache: true, icon: 'table' }},
        { path: 'detail/:id', component: () => import('@/views/flowinstances/detail'), name: 'flowinstanceDtl', hidden: true, meta: { notauth: true, title: '流程详情', noCache: true, icon: 'list' }},
        { path: 'verify/:id', component: () => import('@/views/flowinstances/verify'), name: 'verifyFlowinstance', hidden: true, meta: { notauth: true, title: '处理流程', noCache: true, icon: 'list' }},
        { path: 'add', component: () => import('@/views/flowinstances/add'), name: 'instanceAdd', meta: { notauth: true, title: '发起流程', noCache: true, icon: 'star' }},
        { path: 'disposed', component: () => import('@/views/flowinstances/dispose'), name: 'disposed', meta: { title: '已处理流程', noCache: true, icon: 'star' }},
        { path: 'wait', component: () => import('@/views/flowinstances/wait'), name: 'wait', meta: { title: '待处理流程', noCache: true, icon: 'list' }}
      ]
    },
    { path: '*', redirect: '/404', hidden: true }]
  }]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/modulemanager',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/modulemanager/index'),
      name: 'modulemanager',
      meta: { title: '模块管理', icon: 'excel' }
    }]
  },
  {
    path: '/orgmanager',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/orgmanager/index'),
      name: 'orgmanager',
      meta: { title: '部门管理', icon: 'tree' }
    }]
  },
  {
    path: '/usermanager',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/usermanager/index'),
      name: 'usermanager',
      meta: { title: '用户管理', icon: 'people' }
    }]
  },
  {
    path: '/rolemanager',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/rolemanager/index'),
      name: 'rolemanager',
      meta: { title: '角色管理', icon: 'peoples' }
    }]
  },
  {
    path: '/resources',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/resources/index'),
      name: 'resources',
      meta: { title: '资源管理', icon: 'chart' }
    }]
  },
  {
    path: '/forms',
    component: Layout,
    redirect: 'noredirect',
    name: 'forms',
    meta: {
      title: '表单设计',
      icon: 'form'
    },
    children: [
      { path: 'index', component: () => import('@/views/forms/index'), name: 'formIndex', meta: { title: '表单列表', noCache: true, icon: 'table' }},
      { path: 'add', component: () => import('@/views/forms/add'), name: 'formAdd', meta: { notauth: true, title: '添加表单', noCache: true, icon: 'star' }},
      { path: 'edit/:id', component: () => import('@/views/forms/edit'), name: 'formEdit', hidden: true, meta: { notauth: true, title: '编辑表单', noCache: true, icon: 'list' }}
    ]
  },
  {
    path: '/flowschemes',
    component: Layout,
    redirect: 'noredirect',
    name: 'flowschemes',
    meta: {
      title: '流程设计',
      icon: 'eye'
    },
    children: [
      { path: 'index', component: () => import('@/views/flowschemes/index'), name: 'schemeIndex', meta: { title: '流程模板', noCache: true, icon: 'table' }},
      { path: 'add', component: () => import('@/views/flowschemes/add'), name: 'schemeAdd', meta: { notauth: true, title: '添加模板', noCache: true, icon: 'star' }},
      { path: 'edit/:id', component: () => import('@/views/flowschemes/edit'), name: 'schemeEdit', hidden: true, meta: { notauth: true, title: '编辑流程', noCache: true, icon: 'list' }}

    ]
  },
  {
    path: '/flowinstances',
    component: Layout,
    redirect: 'noredirect',
    name: 'flowinstances',
    meta: {
      title: '流程中心',
      icon: 'guide'
    },
    children: [
      { path: 'index', component: () => import('@/views/flowinstances/index'), name: 'index', meta: { title: '我的流程', noCache: true, icon: 'table' }},
      { path: 'detail/:id', component: () => import('@/views/flowinstances/detail'), name: 'flowinstanceDtl', hidden: true, meta: { notauth: true, title: '流程详情', noCache: true, icon: 'list' }},
      { path: 'verify/:id', component: () => import('@/views/flowinstances/verify'), name: 'verifyFlowinstance', hidden: true, meta: { notauth: true, title: '处理流程', noCache: true, icon: 'list' }},

      { path: 'add', component: () => import('@/views/flowinstances/add'), name: 'instanceAdd', meta: { notauth: true, title: '发起流程', noCache: true, icon: 'star' }},
      { path: 'disposed', component: () => import('@/views/flowinstances/dispose'), name: 'disposed', meta: { title: '已处理流程', noCache: true, icon: 'star' }},
      { path: 'wait', component: () => import('@/views/flowinstances/wait'), name: 'wait', meta: { title: '待处理流程', noCache: true, icon: 'list' }}
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

