import { defineStore } from 'pinia'
import { Business } from '@/types'
interface StateType {
  menuList: Business.MenuItem[]
  flag: boolean
}
export const mainUser = defineStore('mainStore', {
  state(): StateType {
    return {
      // 权限菜单
      menuList: [],
      flag: false
    }
  },
  actions: {
    // 获取权限菜单
    getMenuList(): Promise<Business.MenuItem[]> {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.menuList = [
            {
              id: 1,
              title: '表单',
              path: 'form',
              name: 'form',
              icon: 'icon-icon-user',
              children: [
                {
                  id: 11,
                  title: '下拉框',
                  name: 'select',
                  path: 'select'
                },
                {
                  id: 12,
                  title: '输入框',
                  name: 'input',
                  path: 'input'
                },
                {
                  id: 13,
                  title: '单选框',
                  name: 'radio',
                  path: 'radio'
                },
                {
                  id: 14,
                  title: '复选框',
                  name: 'checkbox',
                  path: 'checkbox'
                },
                {
                  id: 15,
                  title: '日期',
                  name: 'date',
                  path: 'date'
                },
                {
                  id: 16,
                  title: '级联',
                  name: 'cascader',
                  path: 'cascader'
                },
                {
                  id: 17,
                  title: '上传图片',
                  name: 'upload',
                  path: 'upload'
                },
                {
                  id: 18,
                  title: '表单布局样式',
                  name: 'formLayout',
                  path: 'formLayout'
                },
                {
                  id: 19,
                  title: '区间输入框',
                  name: 'inputRange',
                  path: 'inputRange'
                }
              ]
            },
            {
              id: 2,
              title: '表格',
              path: 'table',
              name: 'table',
              icon: 'icon-icon-user',
              children: [
                {
                  id: 21,
                  title: '基础表格',
                  path: 'basicTable',
                  name: 'basicTable'
                },
                {
                  id: 22,
                  title: '服务端排序',
                  path: 'sortTable',
                  name: 'sortTable'
                },
                {
                  id: 23,
                  title: '可选中数据',
                  path: 'checkboxTable',
                  name: 'checkboxTable'
                },
                {
                  id: 24,
                  title: '虚拟表格',
                  path: 'virtualTable',
                  name: 'virtualTable'
                },
                {
                  id: 25,
                  title: '可搜索的表格',
                  path: 'searchTable',
                  name: 'searchTable'
                }
              ]
            },
            {
              id: 3,
              title: '知识点合集',
              path: 'knowledgeTotal',
              name: 'knowledgeTotal',
              icon: 'icon-icon-user',
              children: [
                {
                  id: 31,
                  title: '数据类型判断',
                  path: 'knowledge1',
                  name: 'knowledge1'
                },
                {
                  id: 32,
                  title: 'call/bind/apply',
                  path: 'knowledge2',
                  name: 'knowledge2'
                },
                {
                  id: 33,
                  title: '发布订阅',
                  path: 'knowledge3',
                  name: 'knowledge3'
                }
              ]
            }
          ]
          this.flag = true
          resolve(this.menuList)
        })
      })
    }
  }
})
