import { defineStore } from 'pinia'
import { Business } from '@/types'
interface StateType {
  menuList: Business.MenuItem[];
  flag: boolean;
}
export const mainUser = defineStore('mainStore', {
  state (): StateType {
    return {
      // 权限菜单
      menuList: [],
      flag: false
    }
  },
  actions: {
    // 获取权限菜单
    getMenuList (): Promise<Business.MenuItem[]> {
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