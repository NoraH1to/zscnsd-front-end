import { BadgeProps } from 'antd';
import { AxiosResponse } from 'axios';
import React from 'react';

export = apiInterface;
export as namespace apiInterface;

declare namespace apiInterface {
  interface ResponseBase {
    code: number;
    errorData?: {
      [errorPropName: string]: string;
    };
  }
  // 接口返回体
  interface Response extends ResponseBase {
    data: any;
  }
  // 分页响应体
  interface ResponsePage extends ResponseBase {
    data: {
      content: any[];
      pageSize: number;
      totalPages: number;
      totalRecords: number;
      hasPrevious: boolean;
      hasNext: boolean;
    };
  }
  // 接口
  interface Api<P> {
    (params?: P): Promise<AxiosResponse<Response>>;
  }
  // 接口hooks
  interface Apihooks<P> {
    loading: boolean;
    setLoading: React.Dispatch<boolean>;
    setParams: React.Dispatch<P | undefined>;
    data: Response['data'] | ResponsePage['data'];
    errorData?: ResponseBase['errorData'];
  }
  // 枚举
  interface Enum {
    id: number | string;
    string: string;
  }
  // 运营商枚举
  interface Isp extends Enum {}
  // 宿舍楼栋枚举
  interface DormBlock extends Enum {}
  // 权限枚举
  interface Role extends Enum {}
  // 片区枚举
  interface Area extends Enum {}
  // 报修工单状态枚举
  interface TicketStatus extends Enum {
    status: BadgeProps['status'];
  }
  // 删除状态枚举
  interface TicketDeleted extends Enum {}
  // 报修工单故障错误类型
  interface TicketFaultType extends CUDTime {
    id: number;
    content: string;
    order: number;
    visible: boolean;
  }
  // 报修工单操作日志
  interface TicketLog extends CUDTime {
    id: number;
    ticket: Ticket;
    ticketId: Ticket['id'];
    operatorId: User['id'];
    operator: User;
    status: TicketStatus;
    comment: string; // 处理备注
  }
  // 成员信息
  interface MemberInfo extends CUDTime {
    userId: User['id'];
    workId: string;
    role: Role;
    health: number; // 血条
    punishment: number; // 惩罚级别
    workArrangement: WorkArrangement[];
  }
  interface UserBase extends CUDTime {
    id: number;
    name: string;
    studentId: number;
    networkAccount: string;
    isp: Isp;
    dormBlock: DormBlock;
    dormRoom: number;
    telephone: string;
  }
  // 用户信息
  interface User extends UserBase {
    member?: MemberInfo;
  }
  // 成员信息
  interface Member extends UserBase {
    member: MemberInfo;
  }
  // 报修工单
  interface Ticket extends CUDTime {
    id: number;
    userId: User['id'];
    user: User;
    status: TicketStatus;
    faultTypeId: number;
    faultType: TicketFaultType;
    comment: string; // 备注
    lastOperateLogId: TicketLog['id'];
    lastOperateLog: TicketLog;
  }
  // 移动ONU被占上报
  interface ReportChinaMobileOccupiedOnu extends CUDTime {
    id: number;
    userId: Member['id'];
    user: Member;
    oldSwitchSerialNumber: string;
    oldOnuData: string;
    newSwitchSerialNumber: string;
    newOnuData: string;
  }
  // 移动无数据上报
  interface ReportChinaMobileNoData extends CUDTime {
    id: number;
    userId: Member['id'];
    user: Member;
    networkAccount: Member['networkAccount'];
    switchSerialNumber: string;
    onuData: string;
  }
  // 主线上报
  interface ReportWallLine extends CUDTime {
    id: number;
    userId: Member['id'];
    user: Member;
    dormBlock: DormBlock;
    dormRoom: number;
    name: Member['name'];
    telephone: Member['telephone'];
  }
  // 交换机故障上报
  interface ReportSwitchFault extends CUDTime {
    id: number;
    userId: Member['id'];
    user: Member;
    dormBlock: DormBlock;
    dormFloor: number;
    switchSerialNumber: string;
    index: number;
  }
  // 值班学期
  interface WorkSemester extends CUDTime {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    collectingTimetable: boolean;
  }
  // 排班
  interface WorkArrangement extends CUDTime {
    id: number;
    userId: User['id'];
    user: null | User;
    semesterId: WorkSemester['id'];
    semester: WorkSemester;
    weekday: number;
    area: DormBlock;
  }

  // 时间范围
  interface TimeRange {
    start?: string;
    end?: string;
  }
  // 分页
  interface Page {
    page: number;
    count: number;
    order?: string;
  }
  // GET 查询
  interface RequestQuery {
    [index: string]: any;
  }
  // POST 请求体
  interface RequestData {
    [index: string]: any;
  }
  interface CUDTime {
    createTime: string;
    updateTime: string;
    deleteTime: string;
  }
  // 分页请求体
  interface RequestPageQuery extends Page, RequestQuery {}

  // 查询移动ONU被占上报参数
  interface ReportChinaMobileOccupiedOnuListQuery
    extends RequestPageQuery,
      TimeRange {
    userId?: Member['id'];
  }
  // 增加移动ONU被占上报请求体
  interface ReportChinaMobileOccupiedOnuAddData extends RequestData {
    oldSwitchSerialNumber: ReportChinaMobileOccupiedOnu['oldSwitchSerialNumber'];
    oldOnuData: ReportChinaMobileOccupiedOnu['oldOnuData'];
    newSwitchSerialNumber: ReportChinaMobileOccupiedOnu['newSwitchSerialNumber'];
    newOnuData: ReportChinaMobileOccupiedOnu['newOnuData'];
  }
  // 修改移动ONU被占上报请求体
  interface ReportChinaMobileOccupiedOnuEditData extends RequestData {
    id: ReportChinaMobileOccupiedOnu['id'];
    oldSwitchSerialNumber: ReportChinaMobileOccupiedOnu['oldSwitchSerialNumber'];
    oldOnuData: ReportChinaMobileOccupiedOnu['oldOnuData'];
    newSwitchSerialNumber: ReportChinaMobileOccupiedOnu['newSwitchSerialNumber'];
    newOnuData: ReportChinaMobileOccupiedOnu['newOnuData'];
  }
  // 删除移动ONU被占上报请求体
  interface ReportChinaMobileOccupiedOnuDeleteData extends RequestData {
    id: ReportChinaMobileOccupiedOnu['id'][];
  }

  // 查询移动无数据上报参数
  interface ReportChinaMobileNoDataListQuery
    extends RequestPageQuery,
      TimeRange {
    userId?: Member['id'];
  }
  // 增加移动无数据上报请求体
  interface ReportChinaMobileNoDataAddData extends RequestData {
    networkAccount: ReportChinaMobileNoData['networkAccount'];
    switchSerialNumber: ReportChinaMobileNoData['switchSerialNumber'];
    onuData: ReportChinaMobileNoData['onuData'];
  }
  // 修改移动无数据上报请求体
  interface ReportChinaMobileNoDataEditData extends RequestData {
    id: ReportChinaMobileNoData['id'];
    networkAccount: ReportChinaMobileNoData['networkAccount'];
    switchSerialNumber: ReportChinaMobileNoData['switchSerialNumber'];
    onuData: ReportChinaMobileNoData['onuData'];
  }
  // 删除移动无数据上报请求体
  interface ReportChinaMobileNoDataDeleteData extends RequestData {
    id: ReportChinaMobileNoData['id'][];
  }

  // 查询主线上报参数
  interface ReportWallLineListQuery extends RequestPageQuery, TimeRange {
    userId?: Member['id'];
  }
  // 增加主线上报请求体
  interface ReportWallLineAddData extends RequestData {
    dormBlock: ReportWallLine['dormBlock']['id'];
    dormRoom: ReportWallLine['dormRoom'];
    name: ReportWallLine['name'];
    index: ReportWallLine['telephone'];
  }
  // 修改主线上报请求体
  interface ReportWallLineEditData extends RequestData {
    id: ReportWallLine['id'];
    dormBlock: ReportWallLine['dormBlock']['id'];
    dormRoom: ReportWallLine['dormRoom'];
    name: ReportWallLine['name'];
    telephone: ReportWallLine['telephone'];
  }
  // 删除主线上报请求体
  interface ReportWallLineDeleteData extends RequestData {
    id: ReportWallLine['id'][];
  }

  // 查询交换机故障上报参数
  interface ReportSwitchFaultListQuery extends RequestPageQuery, TimeRange {
    userId?: Member['id'];
  }
  // 增加交换机故障上报请求体
  interface ReportSwitchFaultAddData extends RequestData {
    dormBlock: ReportSwitchFault['dormBlock']['id'];
    dormFloor: ReportSwitchFault['dormFloor'];
    switchSerialNumber: ReportSwitchFault['switchSerialNumber'];
    index: ReportSwitchFault['index'];
  }
  // 修改交换机故障上报请求体
  interface ReportSwitchFaultEditData extends RequestData {
    id: ReportSwitchFault['id'];
    dormBlock: ReportSwitchFault['dormBlock']['id'];
    dormFloor: ReportSwitchFault['dormFloor'];
    switchSerialNumber: ReportSwitchFault['switchSerialNumber'];
    index: ReportSwitchFault['index'];
  }
  // 删除交换机故障上报请求体
  interface ReportSwitchFaultDeleteData extends RequestData {
    id: ReportSwitchFault['id'][];
  }

  // 查询用户参数
  interface UserListQuery extends RequestPageQuery {
    name?: User['name'];
    studenId?: User['studentId'];
    isp?: User['isp']['id'];
    networkAccount?: User['networkAccount'];
    dormBlock?: User['dormBlock']['id'];
    dormRoom?: User['dormBlock'];
  }
  // 增加用户请求体
  interface UserAddAdminData extends RequestData {
    name: User['name'];
    studenId: User['studentId'];
    isp: User['isp']['id'];
    networkAccount: User['networkAccount'];
    dormBlock: User['dormBlock']['id'];
    dormRoom: User['dormBlock'];
    telephone: User['telephone'];
  }
  // 修改用户请求体
  interface UserEditAdminData extends RequestData {
    id: User['id'];
    name: User['name'];
    studentId: User['studentId'];
    isp: User['isp']['id'];
    networkAccount: User['networkAccount'];
    dormBlock: User['dormBlock']['id'];
    dormRoom: User['dormRoom'];
    telephone: User['telephone'];
  }
  // 删除用户请求体
  interface UserDeleteData extends RequestData {
    id: User['id'][];
  }
  // 用户模糊搜索
  interface UserSearch extends RequestQuery {
    search: string | number;
  }

  // 查询组织成员参数
  interface MemberListQuery extends RequestPageQuery {
    userId?: MemberInfo['userId'];
    workId?: MemberInfo['workId'];
    role?: Role['id'];
    punishment?: number;
    area?: DormBlock['id'];
    workday?: WorkArrangement['weekday'];
  }
  // 增加组织成员请求体
  interface MemberAddData extends RequestData {
    userId: MemberInfo['userId'];
    workId: MemberInfo['workId'];
    role: Role['id'];
  }
  // 删除组织成员请求体
  interface MemberDeleteData extends RequestData {
    id: MemberInfo['userId'][];
  }
  // 修改组织成员请求体
  interface MemberEditData extends RequestData {
    id: MemberInfo['userId'];
    networkAccount: string;
    dormBlock: User['dormBlock']['id'];
    dormRoom: User['dormRoom'];
    telephone: User['telephone'];
    workId: MemberInfo['workId'];
    role: MemberInfo['role']['id'];
    password: string;
  }

  // 查询报修处理记录参数
  interface TicketLogListQuery extends RequestPageQuery, TimeRange {
    ticketId?: Ticket['id'];
    userId?: User['id'];
    status?: Ticket['status']['id'];
    faultType?: Ticket['faultType']['id'];
    dormBlock?: User['dormBlock']['id'];
    operatorId?: User['id'];
    deleted?: boolean;
  }

  // 查询报修参数
  interface TicketListQuery extends RequestPageQuery, TimeRange {
    userId?: Ticket['userId'];
    status?: TicketStatus['id'];
    faultType?: TicketFaultType['id'];
    dromBlock?: DormBlock['id'];
    deleted?: boolean;
  }
  // 增加报修请求体
  interface TicketAddData extends RequestData {
    userId: User['id'];
    status: TicketStatus['id'];
    faultTypeId: TicketFaultType['id'];
    comment: string;
  }
  // 删除报修请求体
  interface TicketDeleteData extends RequestData {
    id: Ticket['id'][];
  }
  // 恢复报修请求体
  interface TicketRestoreData extends RequestData {
    id: Ticket['id'][];
  }
  // 修改报修请求体
  interface TicketEditData extends RequestData {
    id: Ticket['id'];
    userId: User['id'];
    status: TicketStatus['id'];
    faultTypeId: TicketFaultType['id'];
    comment: Ticket['comment'];
  }
  // 处理报修请求体
  interface TicketOperateData extends RequestData {
    id: Ticket['id'];
    status: TicketStatus['id'];
    comment: Ticket['comment'];
  }
}
