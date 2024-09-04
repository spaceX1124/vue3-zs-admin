import { Common } from '@/types'
import { VxeTablePropTypes } from 'vxe-pc-ui'
import RowConfig = VxeTablePropTypes.RowConfig;
/**
 * 分页信息类型
 * */
export interface PaginationInfo {
    pageNum: number; // 当前页数
    pageSize: number; // 每页显示条目个数
}
interface DefaultSortType {
    field: string;
    order: 'asc' | 'desc'; // asc（升序）,desc（降序）
}
/**
 * 排序配置
 * */
interface SortConfigType {
    defaultSort?: DefaultSortType | DefaultSortType[], // 默认排序（只会在初始化时被触发一次）
    remote?: boolean; // 所有列是否使用服务端排序，如果设置为 true 则不会对数据进行处理
}

/**
 * 通过从外面传递以下参数可控制表格的一些表现能力
 * */
export interface BasicTableProps {
    schemas?: Common.BasicForm[]; // 表头字段
    tableData?: Global.Recordable[]; // 表格数据
    async?: { // 异步请求
        url: string; // 接口地址
        method?: 'get' | 'post';
        data?: Global.Recordable // 接口所需部分参数
    };
    seqHidden?: boolean; // 隐藏序号
    paginationHidden?: boolean; // 隐藏分页
    paginationInfo?: PaginationInfo; // 分页信息
    virtualScroll?: boolean; // 是否开启虚拟滚动
    stripe?: boolean; // 是否带有斑马纹
    border?: boolean | 'full' | 'outer' | 'inner' | 'none'; // 边框
    sortConfig?: SortConfigType;// 排序
    openCheckbox?: boolean; // 是否开启复选框
    openVirtual?: boolean;// 是否开启虚拟表格，
    rowConfig?: RowConfig; // 设置固定的行高，开启虚拟表格的时候必须要传，否则可能会影响UI
    align?: 'left' | 'center' | 'right'; // 内容对齐方式
    headerAlign?: 'left' | 'center' | 'right'; // 表头对齐方式
    showSearch?: boolean; // 显示搜索组件
    operateList?:Common.OperateType[] // 操作按钮
    editCallback?: Global.Fn // 编辑函数
}

export interface TableActionType {
    setTableProps: Global.Fn<BasicTableProps, void>;
    setLoading: Global.Fn<boolean, void>;
    getSelectRecords:Global.Fn<undefined, Global.Recordable[]>;
    clearAllCheckbox: Global.Fn;
    refreshSearchRequestParams: (data: Global.Recordable) => void; // 刷新快捷搜索字段参数
    clearSearchRequestParams: Global.Fn
    fetchTableData: Global.Fn;
}

export interface EmitEvent {
    (e: 'registerTable', tableAction: TableActionType): void;
}