import apiInterface from 'api';

export enum TableFilterType {
  str,
  number,
  timeRange,
  time,
  select,
  selectSearch,
  muitSelect,
  image,
  password,
}

export const ticketStatus: apiInterface.TicketStatusExtra[] = [
  { id: 0, string: '待处理', status: 'error' },
  { id: 1, string: '改日修', status: 'warning' },
  { id: 2, string: '已上报', status: 'processing' },
  { id: 3, string: '已处理', status: 'success' },
];

export const ticketDeleted: apiInterface.TicketDeleted[] = [
  {
    id: true,
    string: '已删除',
  },
  {
    id: false,
    string: '未删除',
  },
];

export const ticketFaultTypeVisible: apiInterface.TicketFaultTypeVisible[] = [
  {
    id: true,
    string: '可见',
  },
  {
    id: false,
    string: '不可见',
  },
];

export const workSemesterCollecting: apiInterface.WorkSemesterCollectingExtra[] = [
  {
    id: true,
    string: '收集中',
    status: 'processing',
  },
  {
    id: false,
    string: '未在收集',
    status: 'default',
  },
];

export const registerWhitelistGroupEnabled: apiInterface.RegisterWhitelistGroupEnabled[] = [
  {
    id: true,
    string: '已启用',
  },
  {
    id: false,
    string: '未启用',
  },
];

export const ticketSortableList: apiInterface.Enum[] = [
  {
    id: 'createTime',
    string: '报修时间',
  },
  {
    id: 'lastOperateTime',
    string: '最后处理时间',
  },
];

export const ispTicketSortableList: apiInterface.Enum[] = [
  {
    id: 'createTime',
    string: '报修时间',
  },
  {
    id: 'lastOperateTime',
    string: '最后处理时间',
  },
];

export const ticketLogSortableList: apiInterface.Enum[] = [
  {
    id: 'createTime',
    string: '上报时间',
  },
];

export const ispTicketLogSortableList: apiInterface.Enum[] = [
  {
    id: 'createTime',
    string: '上报时间',
  },
];

export const reportChinaMobileOccupiedOnuSortableList: apiInterface.Enum[] = [
  {
    id: 'createTime',
    string: '处理时间',
  },
];

export const reportChinaMobileNoDataSortableList: apiInterface.Enum[] = [
  {
    id: 'createTime',
    string: '处理时间',
  },
];

export const reportWallLineSortableList: apiInterface.Enum[] = [
  {
    id: 'createTime',
    string: '处理时间',
  },
];

export const reportSwitchFaultSortableList: apiInterface.Enum[] = [
  {
    id: 'createTime',
    string: '处理时间',
  },
];

export const memberHealthSortableList: apiInterface.Enum[] = [
  {
    id: 'createTime',
    string: '时间',
  },
];

export const memberPunishmentSortableList: apiInterface.Enum[] = [
  {
    id: 'createTime',
    string: '时间',
  },
];

export const memberSortableList: apiInterface.Enum[] = [
  {
    id: 'health',
    string: '血条',
  },
  {
    id: 'punishment',
    string: '处罚星级',
  },
];

export const attendanceSortableList: apiInterface.Enum[] = [
  {
    id: 'signInTime',
    string: '签到时间',
  },
  {
    id: 'signOutTime',
    string: '签退时间',
  },
];

export const attendanceChangeSortableList: apiInterface.Enum[] = [
  {
    id: 'createTime',
    string: '申请时间',
  },
  {
    id: 'operateTime',
    string: '处理时间',
  },
];

export const roles: apiInterface.Role[] = [
  { id: 0, string: '组织成员', color: 'blue' },
  { id: 2, string: '值班组长', color: 'green' },
  { id: 3, string: '管理员', color: 'orange' },
  { id: 4, string: '超级管理员', color: 'gold' },
  { id: 1, string: '退休成员', color: 'geekblue' },
];

export const isps: apiInterface.Isp[] = [
  {
    id: 1,
    string: '电信',
  },
  {
    id: 2,
    string: '联通',
  },
  {
    id: 0,
    string: '移动',
  },
  {
    id: 3,
    string: '其它',
  },
];

export const dormBlocks: apiInterface.DormBlock[] = [
  { id: 50, string: '朝晖苑' },
  { id: 0, string: '岐头 16 栋' },
  { id: 1, string: '岐头 17 栋' },
  { id: 2, string: '岐头 18 栋' },
  { id: 3, string: '岐头 19 栋' },
  { id: 10, string: '北门 7 栋' },
  { id: 11, string: '北门 8 栋' },
  { id: 12, string: '北门 9 栋' },
  { id: 13, string: '北门 10 栋' },
  { id: 14, string: '北门 11 栋' },
  { id: 20, string: '东门 12 栋' },
  { id: 21, string: '东门 13 栋' },
  { id: 22, string: '东门 14 栋' },
  { id: 23, string: '东门 15 栋' },
  { id: 24, string: '东门 20 栋' },
  { id: 25, string: '东门 21 栋' },
  { id: 30, string: '香晖苑 A 栋' },
  { id: 31, string: '香晖苑 B 栋' },
  { id: 32, string: '香晖苑 C 栋' },
  { id: 33, string: '香晖苑 D 栋' },
  { id: 40, string: '凤翔 1 栋' },
  { id: 41, string: '凤翔 2 栋' },
  { id: 42, string: '凤翔 3 栋' },
  { id: 43, string: '凤翔 4 栋' },
  { id: 44, string: '凤翔 5 栋' },
  { id: 45, string: '凤翔 6 栋' },
];

export const areas: apiInterface.Area[] = [
  { id: 0, string: '岐头片区' },
  { id: 1, string: '北门片区' },
  { id: 2, string: '东门片区' },
  { id: 3, string: '香晖片区' },
  { id: 4, string: '风翔片区' },
  { id: 5, string: '朝晖片区' },
];

export const weekDays: apiInterface.WeekDays[] = [
  {
    id: 1,
    string: '周一',
  },
  {
    id: 2,
    string: '周二',
  },
  {
    id: 3,
    string: '周三',
  },
  {
    id: 4,
    string: '周四',
  },
  {
    id: 5,
    string: '周五',
  },
  {
    id: 6,
    string: '周六',
  },
  {
    id: 7,
    string: '周日',
  },
];

export const weekDaysPure: number[] = [1, 2, 3, 4, 5, 6, 7];

export const punishments: apiInterface.Enum[] = [
  {
    id: 1,
    string: '⭐',
  },
  {
    id: 2,
    string: '⭐⭐',
  },
  {
    id: 3,
    string: '⭐⭐⭐',
  },
];

export const punishmentsPure: number[] = [1, 2, 3];

// 值班变动申请类型
export const attendanceChangeType: apiInterface.AttendanceChangeType[] = [
  { id: 0, string: '请假' },
  { id: 1, string: '蹭班' },
  { id: 2, string: '换班' },
];

// 值班变动申请状态
export const attendanceChangeStatus: apiInterface.AttendanceChangeStatusExtra[] = [
  { id: 0, string: '待处理', status: 'default' },
  { id: 1, string: '已通过', status: 'success' },
  { id: 2, string: '未通过', status: 'warning' },
];

// 值班学期值班变动类型
export const workChangeType: apiInterface.WorkChangeType[] = [
  { id: 0, string: '不值班' },
  { id: 1, string: '更改' },
];

// 成员课程表提交状态
export const memberTimetableStatus: apiInterface.MemberTimetableStatus[] = [
  { id: 0, string: '未提交' },
  { id: 1, string: '已提交' },
];
