export interface Http{
    url: string;
    method?: 'get' | 'post';
    data?: Global.Recordable;
}

export interface HttpType {
    pageList: Http | string; // 列表接口
    insert?: Http | string; // 新增接口
    delete?: Http | string; // 删除接口
    update?: Http | string; // 更新接口
    detail?: Http | string; // 详情接口
}