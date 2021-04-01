import qs from 'qs';
import { Request, Response } from 'express-serve-static-core';
import Mock, { Random } from 'mockjs';
import {
  weekDaysPure,
  punishmentsPure,
  ticketStatus,
  roles,
  isps,
  dormBlocks,
  areas,
  attendanceChangeType,
  attendanceChangeStatus,
  workChangeType,
} from '../src/common';
import update from 'immutability-helper';
import apiInterface from 'api';

const maxDataCount = 56;

export default (dataIndex: string, data: object, msg?: string) => {
  return (req: Request, res: Response) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.query.page) {
      const { page, count, order }: apiInterface.Page = req.query;
      res.json(
        Mock.mock({
          code: 200,
          msg,
          data: {
            [page * count > maxDataCount
              ? `content|${maxDataCount - (page - 1) * count}`
              : `content|${count}`]: data,
            currentPage: parseInt(page),
            pageSize: parseInt(count),
            totalPages:
              maxDataCount % count === 0
                ? Math.floor(maxDataCount / count)
                : Math.floor(maxDataCount / count) + 1,
            hasPrevious: page > 1,
            hasNext: page * count < maxDataCount,
            totalRecords: maxDataCount,
          },
        }),
      );
    } else {
      res.json(
        Mock.mock({
          code: 200,
          msg,
          [dataIndex]: data,
        }),
      );
    }
  };
};

export const getRandomDateTime: Function = () =>
  Mock.Random.datetime('yyyy-MM-dd HH:mm:ss');

export const getCUDTime: Function = (): apiInterface.CUDTime => ({
  createTime: getRandomDateTime(),
  updateTime: getRandomDateTime(),
  deleteTime: getRandomDateTime(),
});

export const ticketFaultType: apiInterface.TicketFaultMenu[] = [
  {
    id: 1,
    content: Random.ctitle(),
    order: 1,
    visible: true,
    createTime: getRandomDateTime(),
    updateTime: getRandomDateTime(),
    deleteTime: getRandomDateTime(),
  },
  {
    id: 2,
    content: Random.ctitle(),
    order: 2,
    visible: false,
    createTime: getRandomDateTime(),
    updateTime: getRandomDateTime(),
    deleteTime: getRandomDateTime(),
  },
  {
    id: 3,
    content: Random.ctitle(),
    order: 3,
    visible: true,
    createTime: getRandomDateTime(),
    updateTime: getRandomDateTime(),
    deleteTime: getRandomDateTime(),
  },
  {
    id: 4,
    content: Random.ctitle(),
    order: 4,
    visible: true,
    createTime: getRandomDateTime(),
    updateTime: getRandomDateTime(),
    deleteTime: getRandomDateTime(),
  },
];

export const semester = {
  'id|+1': 1,
  name: '@ctitle',
  startDate: getRandomDateTime(),
  endDate: getRandomDateTime(),
  collectingTimetable: '@boolean',
  ...getCUDTime(),
};

export const arrangementWithoutUser = {
  'id|+1': 1,
  'userId|+1': 1,
  'semesterId|+1': 1,
  semester: semester,
  weekday: Random.integer(1, 7),
  'area|1': areas,
  ...getCUDTime(),
};

export const member = {
  'userId|+1': 1,
  workId: '@string("number", 4)',
  'role|1': roles,
  health: '@integer(10, 100)',
  punishment: Random.integer(1, 3),
  'workArrangement|1-2': [arrangementWithoutUser],
  ...getCUDTime(),
};

export const user = {
  'id|+1': 1,
  name: Random.cname(),
  studentId: Number.parseInt(Random.string('number', 13)),
  'isp|1': isps,
  networkAccount: Random.email(),
  'dormBlock|1': dormBlocks,
  dormRoom: Number.parseInt(Random.string('number', 3)),
  member: member,
  telephone: /[1][3,4,5,7,8,9][0-9]{9}/,
  ...getCUDTime(),
};

export const ticketOperateLogWithoutTicket = {
  'id|+1': 1,
  'ticketId|+1': 1,
  'operatorId|+1': 1,
  operator: user,
  'status|1': ticketStatus,
  comment: '@cparagraph(0, 30)',
  ...getCUDTime(),
};

export const faultTypeList = {
  'id|+1': 1,
  content: '@ctitle',
  order: '@integer(1, 100)',
  visible: true,
  ...getCUDTime(),
};

export const ticket = {
  'id|+1': 1,
  'userId|+1': 1,
  user: user,
  'status|1': ticketStatus,
  'faultType|1': ticketFaultType,
  'faultTypeId|+1': 1,
  comment: '@cparagraph(0, 30)',
  'lastOperateLogId|+1': 1,
  lastOperateLog: ticketOperateLogWithoutTicket,
  ...getCUDTime(),
};

export const ticketOperateLog = {
  'id|+1': 1,
  'ticketId|+1': 1,
  ticket,
  'operatorId|+1': 1,
  operator: user,
  'status|1': ticketStatus,
  comment: '@cparagraph(0, 30)',
  ...getCUDTime(),
};

export const arrangement = update(arrangementWithoutUser, {
  user: {
    $set: user,
  },
});

export const reportSwitchFault = {
  'id|+1': 1,
  'userId|+1': 1,
  user,
  'dormBlock|1': dormBlocks,
  dormFloor: '@integer(1, 8)',
  switchSerialNumber: '@string(10, 12)',
  index: '@integer(1, 11)',
  ...getCUDTime(),
};

export const reportWallLine = {
  'id|+1': 1,
  'userId|+1': 1,
  user,
  'dormBlock|1': dormBlocks,
  dormRoom: Number.parseInt(Random.string('number', 3)),
  name: Random.cname(),
  telephone: /[1][3,4,5,7,8,9][0-9]{9}/,
  ...getCUDTime(),
};

export const reportChinaMobileNoData = {
  'id|+1': 1,
  'userId|+1': 1,
  user,
  networkAccount: Random.email(),
  switchSerialNumber: '@string(10, 12)',
  onuData: '@string(15, 20)',
  ...getCUDTime(),
};

export const reportChinaMobileOccupiedOnu = {
  'id|+1': 1,
  'userId|+1': 1,
  user,
  oldSwitchSerialNumber: '@string(10, 12)',
  oldOnuData: '@string(15, 20)',
  newSwitchSerialNumber: '@string(10, 12)',
  newOnuData: '@string(15, 20)',
  ...getCUDTime(),
};

export const memberHealth = {
  'id|+1': 1,
  'userId|+1': 1,
  user: user,
  value: '@integer(-10, 15)',
  reason: Random.ctitle(),
  'operatorId|+1': 1,
  operator: user,
  ...getCUDTime(),
};

export const memberPunishment = {
  'id|+1': 1,
  'userId|+1': 1,
  user: user,
  value: '@integer(1, 3)',
  reason: Random.ctitle(),
  'operatorId|+1': 1,
  operator: user,
  ...getCUDTime(),
};

export const ispTicketOperateLogWithoutIspTicket = {
  'id|+1': 1,
  'ispTicketId|+1': 1,
  'operatorId|+1': 1,
  operator: user,
  'status|1': ticketStatus,
  comment: '@cparagraph(0, 30)',
  ...getCUDTime(),
};

export const ispTicket = {
  'id|+1': 1,
  'status|1': ticketStatus,
  name: Random.cname(),
  telephone: /[1][3,4,5,7,8,9][0-9]{9}/,
  'dormBlock|1': dormBlocks,
  dormRoom: Number.parseInt(Random.string('number', 3)),
  comment: '@cparagraph(0, 30)',
  'lastOperateLogId|+1': 1,
  lastOperateLog: ispTicketOperateLogWithoutIspTicket,
  ...getCUDTime(),
};

export const ispTicketOperateLog = {
  // TODO ispTicketOperateLog Mock
  'id|+1': 1,
  'ispTicketId|+1': 1,
  ispTicket,
  'operatorId|+1': 1,
  operator: user,
  'status|1': ticketStatus,
  comment: '@cparagraph(0, 30)',
  ...getCUDTime(),
};

export const attendance = {
  'id|+1': 1,
  'userId|+1': 1,
  user,
  signInTime: getRandomDateTime(),
  signOutTime: getRandomDateTime(),
  'area|1': areas,
  ...getCUDTime(),
};

export const attendanceChangeRequest = {
  'id|+1': 1,
  'userId|+1': 1,
  user,
  'type|1': attendanceChangeType,
  date: getRandomDateTime(),
  changeDate: getRandomDateTime(),
  'status|1': attendanceChangeStatus,
  reason: Random.ctitle(),
  'area|1': areas,
  'operatorId|+1': 1,
  operateTime: getRandomDateTime(),
  operator: user,
  ...getCUDTime(),
};

export const registerWhitelistGroupList: apiInterface.RegisterWhitelistGroup[] = [
  {
    id: 1,
    name: '分组一',
    enabled: true,
    ...getCUDTime(),
  },
  {
    id: 2,
    name: '分组二',
    enabled: true,
    ...getCUDTime(),
  },
  {
    id: 3,
    name: '分组三',
    enabled: false,
    ...getCUDTime(),
  },
  {
    id: 4,
    name: '分组四',
    enabled: true,
    ...getCUDTime(),
  },
];

export const registerWhitelist = {
  'id|+1': 1,
  name: Random.cname(),
  studentId: Number.parseInt(Random.string('number', 13)),
  'group|1': registerWhitelistGroupList,
  ...getCUDTime(),
};

export const workChange = {
  'id|+1': 1,
  'semesterId|+1': 1,
  semester,
  date: getRandomDateTime(),
  'type|1': workChangeType,
  changeWeekday: Random.integer(1, 7),
  ...getCUDTime(),
};

export const memberTimetable = {
  'id|+1': 1,
  'userId|+1': 1,
  user,
  'semesterId|+1': 1,
  semester,
  imagePath: Random.image('500x300', '#989898'),
  availableWeekday: weekDaysPure.slice(0, 3),
  comment: Random.ctitle(10, 20),
  ...getCUDTime(),
};
