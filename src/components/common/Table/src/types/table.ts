import { Common } from '@/types'
/**
 * 分页信息类型
 * */
export interface PaginationInfo {
    pageNum: number; // 当前页数
    pageSize: number; // 每页显示条目个数
}

/**
 * 通过从外面传递以下参数可控制表格的一些表现能力
 * */
export interface BasicTableProps {
    schemas?: Common.BasicForm[]; // 表头字段
    tableData?: Global.Recordable[]; // 表格数据
    async?: { // 异步请求
        url: string; // 接口地址
        data?: Global.Recordable // 接口所需部分参数
    };
    seqHidden?: boolean; // 隐藏序号
    paginationHidden?: boolean; // 隐藏分页
    paginationInfo?: PaginationInfo; // 分页信息
    virtualScroll?: boolean; // 是否开启虚拟滚动
    stripe?: boolean; // 是否带有斑马纹
    border?: boolean | 'full' | 'outer' | 'inner' | 'none'; // 边框
}

export interface TableActionType {
    setProps: (props: BasicTableProps) => void;
    setLoading: (loading: boolean) => void;
}

export interface EmitEvent {
    (e: 'registerTable', tableAction: TableActionType): void;
}