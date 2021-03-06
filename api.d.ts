import { BadgeProps, TagProps } from 'antd';
import { AxiosResponse, CancelTokenSource } from 'axios';
import React from 'react';

export = apiInterface;
export as namespace apiInterface;

declare namespace apiInterface {
  interface ErrData {
    [index: string]: string;
  }
  interface ResponseBase {
    code: number;
    errorData?: {
      [row: number]: ErrData;
      filePath?: string;
    } | null;
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
  interface ApiResponse {
    request: () => Promise<apiInterface.Response | apiInterface.ResponsePage>;
    cancel: CancelTokenSource;
  }
  interface Api<P> {
    (params?: P): ApiResponse;
  }
  interface Api<P> {
    (data?: P): ApiResponse;
  }
  // 接口hooks
  interface Apihooks<P> {
    loading: boolean;
    setLoading: React.Dispatch<boolean>;
    setParams: React.Dispatch<P | undefined>;
    data: Response['data'] | ResponsePage['data'];
    errorData?: ResponseBase['errorData'];
    cancel?: CancelTokenSource;
  }
  // 枚举
  interface Enum {
    id: number | string | boolean;
    string: string;
  }
  interface BadgeStatus {
    status: BadgeProps['status'];
  }
  // 运营商枚举
  interface Isp extends Enum {}
  // 宿舍楼栋枚举
  interface DormBlock extends Enum {}
  // 权限枚举
  interface Role extends Enum {
    id: number;
    color: TagProps['color'];
  }
  // 片区枚举
  interface Area extends Enum {
    id: number;
  }
  interface WeekDays extends Enum {
    id: number;
  }
  // 报修工单状态枚举
  interface TicketStatus extends Enum {}
  interface TicketStatusExtra extends TicketStatus, BadgeStatus {}
  // 删除状态枚举
  interface TicketDeleted extends Enum {}
  // 考勤变动申请类型枚举
  interface AttendanceChangeType extends Enum {}
  interface AttendanceChangeTypeExtra extends Enum, BadgeStatus {}
  // 考勤变动申请状态枚举
  interface AttendanceChangeStatus extends Enum {}
  interface AttendanceChangeStatusExtra extends Enum, BadgeStatus {}
  // 值班学期收集状态枚举
  interface WorkSemesterCollecting extends Enum {}
  interface WorkSemesterCollectingExtra extends Enum, BadgeStatus {}
  // 值班学期值班变动类型枚举
  interface WorkChangeType extends Enum {}
  // 注册白名单分组启用枚举
  interface RegisterWhitelistGroupEnabled extends Enum {}
  // 报修故障错误类型可见枚举
  interface TicketFaultTypeVisible extends Enum {}
  // 成员课程表提交状态枚举
  interface MemberTimetableStatus extends Enum {}
  // 报修工单故障错误类型
  interface TicketFaultMenu extends CUDTime {
    id: number;
    content: string;
    order: number;
    visible: boolean;
  }
  // 报修操作日志
  interface TicketLog extends CUDTime {
    id: number;
    ticket: Ticket;
    ticketId: Ticket['id'];
    operatorId: User['id'];
    operator: User;
    status: TicketStatus;
    comment: string; // 处理备注
  }
  // 工单操作日志
  interface IspTicketLog extends CUDTime {
    id: number;
    ispTicket: IspTicket;
    ispTicketId: Ticket['id'];
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
    workArrangement?: WorkArrangement[];
  }
  // 用户信息
  interface User extends CUDTime {
    id: number;
    name: string;
    studentId: number;
    networkAccount: string;
    isp: Isp;
    dormBlock: DormBlock;
    dormRoom: number;
    telephone: string;
    member?: MemberInfo;
  }
  // 成员惩罚
  interface MemberPunishment extends CUDTime {
    id: number;
    userId: User['id'];
    user: User;
    value: number;
    reason: string;
    operatorId: User['id'];
    operator: User;
  }
  // 成员血条
  interface MemberHealth extends CUDTime {
    id: number;
    userId: User['id'];
    user: User;
    value: number;
    reason: string;
    operatorId: User['id'];
    operator: User;
  }
  // 报修
  interface Ticket extends CUDTime {
    id: number;
    userId: User['id'];
    user: User;
    status: TicketStatus;
    faultTypeId: number;
    faultType: TicketFaultMenu;
    comment: string; // 备注
    lastOperateLogId?: TicketLog['id'];
    lastOperateLog?: TicketLog;
  }
  // 工单
  interface IspTicket extends CUDTime {
    id: number;
    status: TicketStatus;
    name: User['name'];
    telephone: User['telephone'];
    dormBlock: User['dormBlock'];
    dormRoom: User['dormRoom'];
    comment: string; // 备注
    lastOperateLogId?: IspTicketLog['id'];
    lastOperateLog?: IspTicketLog;
  }
  // 移动ONU被占上报
  interface ReportChinaMobileOccupiedOnu extends CUDTime {
    id: number;
    userId: User['id'];
    user: User;
    oldSwitchSerialNumber: string;
    oldOnuData: string;
    newSwitchSerialNumber: string;
    newOnuData: string;
  }
  // 移动无数据上报
  interface ReportChinaMobileNoData extends CUDTime {
    id: number;
    userId: User['id'];
    user: User;
    networkAccount: User['networkAccount'];
    switchSerialNumber: string;
    onuData: string;
  }
  // 主线上报
  interface ReportWallLine extends CUDTime {
    id: number;
    userId: User['id'];
    user: User;
    dormBlock: DormBlock;
    dormRoom: number;
    name: User['name'];
    telephone: User['telephone'];
  }
  // 交换机故障上报
  interface ReportSwitchFault extends CUDTime {
    id: number;
    userId: User['id'];
    user: User;
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
    area: Area;
  }
  // 考勤记录
  interface Attendance extends CUDTime {
    id: number;
    userId: User['id'];
    user: User;
    signInTime: string;
    signOutTime: string;
    area: Area;
  }
  // 考勤变动申请
  interface AttendanceChange extends CUDTime {
    id: number;
    userId: User['id'];
    user: User;
    type: AttendanceChangeType;
    date: string;
    changeDate: string;
    status: AttendanceChangeStatus;
    reason: string;
    area: Attendance['area'];
    operatorId: User['id'];
    operateTime: string;
    operator: User;
  }
  // 注册白名单分组
  interface RegisterWhitelistGroup extends CUDTime {
    id: number;
    name: string;
    enabled: boolean;
  }
  // 注册白名单
  interface RegisterWhitelist extends CUDTime {
    id: number;
    name: User['name'];
    studentId: User['studentId'];
    groupId: RegisterWhitelistGroup['id'];
    group: RegisterWhitelistGroup;
  }
  // 值班学期值班变动
  interface WorkChange extends CUDTime {
    id: number;
    semesterId: WorkSemester['id'];
    semester: WorkSemester;
    date: string;
    type: WorkChangeType;
    changeWeekday: number;
  }
  // 成员课程表
  interface MemberTimetable extends CUDTime {
    id: number;
    userId: User['id'];
    user: User;
    semesterId: WorkSemester['id'];
    semester: WorkSemester;
    imagePath: string;
    availableWeekday: number[];
    comment: string;
  }
  // 后台登录返回数据
  interface UserLoginAdmin {
    token: string;
    user: User;
  }
  // 某周值班表
  interface WorkArrangementTimeTable {
    userId: User['id'];
    user: User;
    date: string;
    area: Area;
  }

  // 时间范围
  interface TimeRange {
    start?: string;
    end?: string;
  }
  // 分页
  interface Page {
    page?: number;
    count?: number;
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

  // 查询值班表参数
  interface WorkArrangementListQuery extends RequestQuery {
    semesterId?: WorkArrangement['semesterId'];
  }
  // 更新值班表请求体
  interface WorkArrangementUpdateData extends RequestData {
    userId: User['id'];
    semesterId: WorkArrangement['semesterId'];
    weekday: WorkArrangement['weekday'] | null;
    area: Area['id'] | null;
    cancel?: boolean;
  }
  // 查询某周值班表参数
  interface WorkArrangementTimeTableListQuery extends RequestQuery {
    date?: WorkArrangementTimeTable['date'];
  }

  // 查询成员课程表参数
  interface MemberTimetableListQuery extends RequestPageQuery {
    semesterId: WorkSemester['id'];
    userId?: User['id'];
    status: MemberTimetableStatus['id'];
  }
  // 增加成员课程表请求体
  interface MemberTimetableAddAdminData extends RequestData {
    semesterId: WorkSemester['id'];
    userId: MemberTimetable['user']['id'];
    imagePath: MemberTimetable['imagePath'];
    availableWeekday: MemberTimetable['availableWeekday'];
    comment?: MemberTimetable['comment'];
  }
  // 增加成员课程表请求体
  interface MemberTimetableAddUserData extends RequestData {
    semesterId: WorkSemester['id'];
    imagePath: MemberTimetable['imagePath'];
    availableWeekday: MemberTimetable['availableWeekday'];
    comment?: MemberTimetable['comment'];
  }
  // 修改成员课程表请求体
  interface MemberTimetableEditData extends RequestData {
    id: MemberTimetable['id'];
    semesterId: WorkSemester['id'];
    userId: MemberTimetable['user']['id'];
    imagePath: MemberTimetable['imagePath'];
    availableWeekday: MemberTimetable['availableWeekday'];
    comment?: MemberTimetable['comment'];
  }
  // 删除成员课程表请求体
  interface MemberTimetableDeleteData extends RequestData {
    id: MemberTimetable['id'][];
  }

  // 查询值班学期值班变动参数
  interface WorkChangeListQuery extends RequestPageQuery {
    semesterId: WorkChange['semesterId'];
    type?: WorkChange['type']['id'];
  }
  // 增加值班学期值班变动请求体
  interface WorkChangeAddData extends RequestData {
    semesterId: WorkChange['semesterId'];
    date: WorkChange['date'];
    type: WorkChange['type']['id'];
    changeWeekday?: WorkChange['changeWeekday'];
  }
  // 修改值班学期值班变动请求体
  interface WorkChangeEditData extends RequestData {
    id: WorkChange['id'];
    semesterId: WorkChange['semesterId'];
    date: WorkChange['date'];
    type: WorkChange['type']['id'];
    changeWeekday?: WorkChange['changeWeekday'];
  }
  // 删除注册白名单请求体
  interface WorkChangeDeleteData extends RequestData {
    id: WorkChange['id'][];
  }

  // 查询注册白名单参数
  interface RegisterWhitelistListQuery extends RequestPageQuery {
    groupId?: RegisterWhitelistGroup['id'];
    name?: RegisterWhitelist['name'];
    studentId?: RegisterWhitelist['studentId'];
  }
  // 增加注册白名单请求体
  interface RegisterWhitelistAddData extends RequestData {
    name: RegisterWhitelist['name'];
    studentId: RegisterWhitelist['studentId'];
    groupId: RegisterWhitelistGroup['id'];
  }
  // 修改注册白名单请求体
  interface RegisterWhitelistEditData extends RequestData {
    id: RegisterWhitelist['id'];
    name: RegisterWhitelist['name'];
    studentId: RegisterWhitelist['studentId'];
    groupId: RegisterWhitelistGroup['id'];
  }
  // 删除注册白名单请求体
  interface RegisterWhitelistDeleteData extends RequestData {
    id: RegisterWhitelist['id'][];
  }
  // 批量修改注册白名单请求体
  interface RegisterWhitelistBatchEditData extends RequestData {
    id: RegisterWhitelist['id'][];
    groupId: RegisterWhitelistGroup['id'];
  }

  // 查询注册白名单分组参数
  interface RegisterWhitelistGroupListQuery extends RequestPageQuery {
    name?: RegisterWhitelistGroup['name'];
    enabled?: RegisterWhitelistGroup['enabled'];
  }
  // 增加注册白名单分组请求体
  interface RegisterWhitelistGroupAddData extends RequestData {
    name: RegisterWhitelistGroup['name'];
    enabled: RegisterWhitelistGroup['enabled'];
  }
  // 修改注册白名单分组请求体
  interface RegisterWhitelistGroupEditData extends RequestData {
    id: RegisterWhitelistGroup['id'];
    name: RegisterWhitelistGroup['name'];
    enabled: RegisterWhitelistGroup['enabled'];
  }
  // 删除注册白名单请求体
  interface RegisterWhitelistGroupDeleteData extends RequestData {
    id: RegisterWhitelistGroup['id'][];
  }
  // 注册白名单分组搜索
  interface RegisterWhitelistGroupSearch extends RequestQuery {
    search: string;
  }

  // 查询值班学期参数
  interface WorkSemesterListQuery extends RequestPageQuery, TimeRange {
    name?: WorkSemester['name'];
    collecting?: WorkSemester['collectingTimetable'];
  }
  // 增加值班学期请求体
  interface WorkSemesterAddData extends RequestData {
    name: WorkSemester['name'];
    startDate: WorkSemester['startDate'];
    endDate: WorkSemester['endDate'];
  }
  // 修改值班学期请求体
  interface WorkSemesterEditData extends RequestData {
    id: WorkSemester['id'];
    name: WorkSemester['name'];
    startDate: WorkSemester['startDate'];
    endDate: WorkSemester['endDate'];
  }
  // 删除值班学期请求体
  interface WorkSemesterDeleteData extends RequestData {
    id: WorkSemester['id'][];
  }
  // 修改值班学期收集状态请求体
  interface WorkSemesterCollectData extends RequestData {
    id: WorkSemester['id'];
    collecting: WorkSemester['collectingTimetable'];
  }

  // 查询考勤变动申请参数
  interface AttendanceChangeListQuery extends RequestPageQuery, TimeRange {
    userId?: AttendanceChange['userId'];
    type?: AttendanceChange['type']['id'];
    status?: AttendanceChange['status']['id'];
    operatorId?: AttendanceChange['operatorId'];
  }
  // 增加考勤变动申请请求体
  interface AttendanceChangeAddAdminData extends RequestData {
    userId: AttendanceChange['userId'];
    type: AttendanceChange['type']['id'];
    date: AttendanceChange['date'];
    changeDate?: AttendanceChange['changeDate'];
    status: AttendanceChange['status']['id'];
    area?: AttendanceChange['area']['id'];
    reason: AttendanceChange['reason'];
  }
  // 增加考勤变动申请请求体
  interface AttendanceChangeAddUserData extends RequestData {
    type: AttendanceChange['type']['id'];
    date: AttendanceChange['date'];
    changeDate?: AttendanceChange['changeDate'];
    area: AttendanceChange['area']['id'];
    reason: AttendanceChange['reason'];
  }
  // 修改考勤变动申请请求体
  interface AttendanceChangeEditAdminData extends RequestData {
    id: AttendanceChange['id'];
    userId: AttendanceChange['userId'];
    type: AttendanceChange['type']['id'];
    date: AttendanceChange['date'];
    changeDate?: AttendanceChange['changeDate'];
    status: AttendanceChange['status']['id'];
    area?: AttendanceChange['area']['id'];
    reason: AttendanceChange['reason'];
  }
  // 修改考勤变动申请请求体
  interface AttendanceChangeEditUserData extends RequestData {
    id: AttendanceChange['id'];
    type: AttendanceChange['type']['id'];
    date: AttendanceChange['date'];
    changeDate?: AttendanceChange['changeDate'];
    area?: AttendanceChange['area']['id'];
    reason: AttendanceChange['reason'];
  }
  // 删除考勤变动申请请求体
  interface AttendanceChangeDeleteData extends RequestData {
    id: AttendanceChange['id'][];
  }
  // 处理考勤变动申请请求体
  interface AttendanceChangeOperateData extends RequestData {
    id: AttendanceChange['id'][];
    status: AttendanceChange['status']['id'];
  }
  // 查询考勤变动申请详情
  interface AttendanceChangeDetailQuery extends RequestQuery {
    attendanceChangeId: AttendanceChange['id'];
  }

  //查询考勤记录参数
  interface AttendanceListQuery extends RequestPageQuery, TimeRange {
    userId?: Attendance['userId'];
    area?: Attendance['area']['id'];
  }
  // 考勤签到请求体
  interface AttendanceSignInData extends RequestData {
    area: Attendance['area']['id'];
  }
  // 考勤签退请求体
  interface AttendanceSignOutData extends RequestData {
    area: Attendance['area']['id'];
  }

  // 查询成员惩罚记录参数
  interface MemberPunishmentListQuery extends RequestPageQuery, TimeRange {
    userId?: MemberPunishment['userId'];
    reason?: MemberPunishment['reason'];
    operatorId?: MemberPunishment['operatorId'];
  }
  // 增加成员惩罚记录请求体
  interface MemberPunishmentAddData extends RequestData {
    userId: MemberPunishment['userId'];
    value: MemberPunishment['value'];
    reason: MemberPunishment['reason'];
  }
  // 修改成员惩罚记录请求体
  interface MemberPunishmentEditData extends RequestData {
    id: MemberPunishment['id'];
    userId: MemberPunishment['userId'];
    value: MemberPunishment['value'];
    reason: MemberPunishment['reason'];
  }
  // 删除成员惩罚记录请求体
  interface MemberPunishmentDeleteData extends RequestData {
    id: MemberPunishment['id'][];
  }

  // 查询成员血条记录参数
  interface MemberHealthListQuery extends RequestPageQuery, TimeRange {
    userId?: MemberHealth['userId'];
    reason?: MemberHealth['reason'];
    operatorId?: MemberHealth['operatorId'];
  }
  // 增加成员血条记录请求体
  interface MemberHealthAddData extends RequestData {
    userId: MemberHealth['userId'];
    value: MemberHealth['value'];
    reason: MemberHealth['reason'];
  }
  // 修改成员血条记录请求体
  interface MemberHealthEditData extends RequestData {
    id: MemberHealth['id'];
    userId: MemberHealth['userId'];
    value: MemberHealth['value'];
    reason: MemberHealth['reason'];
  }
  // 删除成员血条记录请求体
  interface MemberHealthDeleteData extends RequestData {
    id: MemberHealth['id'][];
  }

  // 查询移动ONU被占上报参数
  interface ReportChinaMobileOccupiedOnuListQuery
    extends RequestPageQuery,
      TimeRange {
    userId?: User['id'];
  }
  // 查询移动ONU被占上报详情参数
  interface ReportChinaMobileOccupiedOnuDetailQuery extends RequestQuery {
    reportId: ReportChinaMobileOccupiedOnu['id'];
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
    userId?: User['id'];
  }
  // 查询移动无数据上报详情参数
  interface ReportChinaMobileNoDataDetailQuery extends RequestQuery {
    reportId: ReportChinaMobileNoData['id'];
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
    userId?: User['id'];
  }
  // 查询主线上报详情参数
  interface ReportWallLineDetailQuery extends RequestQuery {
    reportId: ReportWallLine['id'];
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
    userId?: User['id'];
  }
  // 查询交换机故障上报详情参数
  interface ReportSwitchFaultDetailQuery extends RequestQuery {
    reportId: ReportSwitchFault['id'];
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
  // 用户绑定微信
  interface UserAddData extends RequestData {
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
  interface UserSearchData extends RequestQuery {
    search: string | number;
  }
  // 后台登录请求体
  interface UserLoginAdminData extends RequestData {
    workId: MemberInfo['workId'];
    password: string;
  }
  // 登录请求体
  interface UserLoginData extends RequestData {
    code: string;
  }
  // 修改密码
  interface UserPasswordEditData extends RequestData {
    oldPassword: string;
    newPassword: string;
  }
  // 获取用户详情参数
  interface UserInfoQuery extends RequestQuery {
    userId?: User['id'];
  }
  // 修改个人用户信息请求体
  interface UserEditUserData extends RequestData {
    isp: User['isp']['id'];
    networkAccount: User['networkAccount'];
    dormBlock: User['dormBlock']['id'];
    dormRoom: User['dormRoom'];
    telephone: User['telephone'];
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
  // 查询组织成员详情参数
  interface MemberDetailQuery extends RequestQuery {
    userId?: User['id'];
  }

  // 查询工单参数
  interface IspTicketListQuery extends RequestPageQuery, TimeRange {
    status?: TicketStatus['id'];
    name?: IspTicket['name'];
    dromBlock?: DormBlock['id'];
    deleted?: boolean;
    operatorId?: User['id'];
  }
  // 增加工单请求体
  interface IspTicketAddData extends RequestData {
    status: TicketStatus['id'];
    name: IspTicket['name'];
    telephone: IspTicket['telephone'];
    dormBlock: IspTicket['dormBlock']['id'];
    dormRoom: IspTicket['dormRoom'];
    comment: string;
  }
  // 删除工单请求体
  interface IspTicketDeleteData extends RequestData {
    id: IspTicket['id'][];
  }
  // 恢复工单请求体
  interface IspTicketRestoreData extends RequestData {
    id: IspTicket['id'][];
  }
  // 修改工单请求体
  interface IspTicketEditData extends RequestData {
    id: IspTicket['id'];
    status: TicketStatus['id'];
    name: IspTicket['name'];
    telephone: IspTicket['telephone'];
    dormBlock: IspTicket['dormBlock']['id'];
    dormRoom: IspTicket['dormRoom'];
    comment: string;
  }
  // 处理工单请求体
  interface IspTicketOperateData extends RequestData {
    id: IspTicket['id'];
    status: TicketStatus['id'];
    comment: IspTicket['comment'];
  }
  // 查询工单详情参数
  interface IspTicketDetailQuery extends RequestQuery {
    ispTicketId: IspTicket['id'];
  }

  // 查询工单处理记录参数
  interface IspTicketLogListQuery extends RequestPageQuery, TimeRange {
    ticketId?: IspTicket['id'];
    status?: IspTicket['status']['id'];
    operatorId?: User['id'];
    deleted?: boolean;
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
    faultType?: TicketFaultMenu['id'];
    dromBlock?: DormBlock['id'];
    deleted?: boolean;
    operatorId?: User['id'];
  }
  // 用户查询报修参数
  interface TicketListUserQuery extends RequestPageQuery, TimeRange {
    status?: TicketStatus['id'];
    faultType?: TicketFaultMenu['id'];
  }
  // 增加报修请求体
  interface TicketAddData extends RequestData {
    userId: User['id'];
    status: TicketStatus['id'];
    faultTypeId: TicketFaultMenu['id'];
    comment: string;
  }
  // 用户增加报修请求体
  interface TicketAddUserData extends RequestData {
    faultTypeId: TicketFaultMenu['id'];
    comment: string;
  }
  // 删除报修请求体
  interface TicketDeleteData extends RequestData {
    id: Ticket['id'][];
  }
  // 用户删除报修请求体
  interface TicketDeleteUserData extends RequestData {
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
    faultTypeId: TicketFaultMenu['id'];
    comment: Ticket['comment'];
  }
  // 用户修改报修请求体
  interface TicketEditUserData extends RequestData {
    id: Ticket['id'];
    faultTypeId: TicketFaultMenu['id'];
    comment: Ticket['comment'];
  }
  // 处理报修请求体
  interface TicketOperateData extends RequestData {
    id: Ticket['id'];
    status: TicketStatus['id'];
    comment: Ticket['comment'];
  }
  // 查询报修详情参数
  interface TicketDetailQuery extends RequestQuery {
    ticketId: Ticket['id'];
  }

  // 查询报修错误类型参数
  interface TicketFaultTypeListQuery extends RequestQuery {
    content?: TicketFaultMenu['content'];
    visible?: TicketFaultMenu['visible'];
  }
  // 增加报修错误类型请求体
  interface TicketFaultMenuAddData extends RequestData {
    content: TicketFaultMenu['content'];
    order: TicketFaultMenu['order'];
    visible: TicketFaultMenu['visible'];
  }
  // 修改报修错误类型请求体
  interface TicketFaultTypeAddData extends RequestData {
    id: TicketFaultMenu['id'];
    content: TicketFaultMenu['content'];
    order: TicketFaultMenu['order'];
    visible: TicketFaultMenu['visible'];
  }
  // 删除报修错误类型请求体
  interface TicketFaultTypeDeleteData extends RequestData {
    id: TicketFaultMenu['id'][];
  }
  // 批量修改报修错误类型请求体
  interface TicketFaultTypeBatchAddData extends RequestData {
    id: TicketFaultMenu['id'][];
    visible: TicketFaultMenu['visible'];
  }

  // 下载文件参数
  interface FileDownloadQuery extends RequestQuery {
    path: string;
  }
  // 获得 Excel 模板参数
  interface FileExcelTemplateQuery extends RequestQuery {
    type: 'member' | 'ispTicket' | 'registerWhitelist';
  }
}
