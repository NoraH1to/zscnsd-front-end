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
}
