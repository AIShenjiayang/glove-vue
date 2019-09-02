import { constantRouterMap } from '@/router'
import Layout from '@/views/layout/Layout'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        var newPaths = []
        data.modules.forEach((value, index) => {
          var parentPath = value.item.url
          var newPath = {
            path: '/' + parentPath,
            component: Layout,
            meta: {
              title: value.item.name,
              icon: 'tree'
            },
            name: value.item.name,
            hidden: false,
            children: []
          }
          value.children.forEach((child, index) => {
            var childPath = {
              path: child.item.url,
              component: () => import('@/views' + child.item.url.toLowerCase()),
              meta: {
                title: child.item.name,
                // icon: child.item.iconName,
                icon: 'tree',
                elements: child.item.elements
              },
              name: child.item.name,
              hidden: false
            }
            newPath.children.push(childPath)
          })
          newPaths.push(newPath)
        })
        console.log(newPaths)
        commit('SET_ROUTERS', newPaths)
        resolve()
      })
    }
  }
}

export default permission
