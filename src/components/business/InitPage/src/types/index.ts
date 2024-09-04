export interface Http{
    url: string;
    method: 'get' | 'post';
    data?: Global.Recordable;
}

export interface HttpType {
    pageList: Http; // 列表接口
    insert?: Http; // 新增接口
    delete?: Http; // 删除接口
    update?: Http; // 更新接口
    detail?: Http; // 详情接口
}