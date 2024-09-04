const adminConfig = {
  commonList: {
    onlineStatus: [
      { label: '下线', value: 0 },
      { label: '上线', value: 1 }
    ],
    ifHideList: [
      { label: '未隐藏', value: 0 },
      { label: '已隐藏', value: 1 }
    ],
    processList: [
      { label: 'H5产品', value: 1 },
      { label: '联登产品', value: 2 },
      { label: '信贷api', value: 3 },
      { label: '网贷api', value: 4 }
    ],
    creditApiType: [
      { label: '半流程', value: 1 },
      { label: '全流程', value: 2 }
    ],
    // 选择是否
    isOrNo: [
      { label: '否', value: 0 },
      { label: '是', value: 1 }
    ]
  }
}
export default adminConfig