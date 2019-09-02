import request from '@/utils/request'

export function get(params) {
  return request({
    url: '/modules/get',
    method: 'get',
    params
  })
}

export function loadMenus(moduleId) {
  return request({
    url: '/modules/loadmenus',
    method: 'get',
    params: { moduleId: moduleId }
  })
}

export function loadForRole(roleId) {
  return request({
    url: '/modules/loadforrole',
    method: 'get',
    params: { firstId: roleId }
  })
}

export function add(data) {
  return request({
    url: '/modules/add',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/modules/update',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/modules/delete',
    method: 'post',
    data
  })
}

export function addMenu(data) {
  return request({
    url: '/modules/addmenu',
    method: 'post',
    data
  })
}

export function updateMenu(data) {
  return request({
    url: '/modules/updatemenu',
    method: 'post',
    data
  })
}

export function delMenu(data) {
  return request({
    url: '/modules/deletemenu',
    method: 'post',
    data
  })
}

export function loadMenusForRole(roleId) {
  return request({
    url: '/modules/loadmenusforrole',
    method: 'get',
    params: { moduleId: '', firstId: roleId }
  })
}

export function getProperties(code) {
  return request({
    url: '/Check/GetProperties',
    method: 'get',
    params: { moduleCode: code }
  })
}

export function loadPropertiesForRole(code, roleId) {
  return request({
    url: '/Modules/LoadPropertiesForRole',
    method: 'get',
    params: { moduleCode: code, roleId: roleId }
  })
}

export function assignDataProperty(code, roleId, properties) {
  return request({
    url: '/AccessObjs/AssignDataProperty',
    method: 'post',
    data: { moduleCode: code, roleId: roleId, 'properties': properties }
  })
}

export function unAssignDataProperty(code, roleId) {
  return request({
    url: '/AccessObjs/UnAssignDataProperty',
    method: 'post',
    data: { moduleCode: code, roleId: roleId, 'properties': [] }
  })
}
