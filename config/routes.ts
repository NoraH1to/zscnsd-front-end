import { IRoute } from '@umijs/types';
import { routeInterface } from 'route';

// 桌面端路由
const desktopRoute: routeInterface.route[] = [
  {
    path: '/d/permission-denied',
    component: '@/pages/permissionDenied',
    title: '无权限',
  },
  {
    path: '/d/login',
    component: '@/pages/login',
    extraOpt: {
      hidden: true,
      key: '/login',
      pageTitle: 'ZSCNSD 登入',
    },
  },
  {
    path: '/d',
    redirect: '/d/home', // TODO 改成判断手机还是pc
  },
  // PC端路由
  {
    path: '/d',
    component: '@/pages/main.tsx',
    wrappers: [
      '@/wrappers/Auth/IsLogin',
      '@/wrappers/InitUser',
      '@/wrappers/Auth/IsMgmt',
    ],
    __isDynamic: true,
    extraOpt: {
      default: '/d/home',
    },
    routes: [
      {
        path: '/d/',
        extraOpt: {
          default: '/d/home',
        },
      },
      {
        path: '/d/home',
        component: '@/pages/home',
        extraOpt: {
          key: '/d/home',
          name: '首页',
          namePath: '首页',
          menu: true,
        },
      },
      {
        path: '/d/repair-requests-mgmt',
        extraOpt: {
          default: '/d/repair-requests-mgmt/requests',
          key: '/d/repair-requests-mgmt',
          name: '报修管理',
          sub: true,
          menu: true,
        },
        routes: [
          {
            path: '/d/repair-requests-mgmt/',
            extraOpt: {
              default: '/d/repair-requests-mgmt/requests',
              key: '/d/repair-requests-mgmt',
              hidden: true,
            },
          },
          {
            path: '/d/repair-requests-mgmt/requests',
            component: '@/pages/repairRequestsMgmt/requests',
            wrappers: ['@/wrappers/Auth/IsMgmt'],
            extraOpt: {
              key: '/d/repair-requests-mgmt/requests',
              name: '所有报修',
              namePath: '报修管理/所有报修',
              menu: true,
              parentMenu: '/d/repair-requests-mgmt',
            },
          },
          {
            path: '/d/repair-requests-mgmt/records',
            component: '@/pages/repairRequestsMgmt/records',
            wrappers: ['@/wrappers/Auth/IsMgmt'],
            extraOpt: {
              key: '/d/repair-requests-mgmt/records',
              name: '报修处理记录',
              namePath: '报修管理/报修处理记录',
              menu: true,
              parentMenu: '/d/repair-requests-mgmt',
            },
          },
          {
            path: '/d/repair-requests-mgmt/detail',
            component: '@/pages/repairRequestsMgmt/detail',
            wrappers: ['@/wrappers/Auth/IsMgmt'],
            extraOpt: {
              hidden: true,
              key: '/d/repair-requests-mgmt/detail',
              name: '报修详情',
              namePath: '报修管理/报修详情',
            },
          },
        ],
      },
      {
        path: '/d/isp-tickets-mgmt',
        extraOpt: {
          default: '/d/isp-tickets-mgmt/tickets',
          key: '/d/isp-tickets-mgmt',
          name: '工单管理',
          sub: true,
          menu: true,
        },
        routes: [
          {
            path: '/d/isp-tickets-mgmt/',
            extraOpt: {
              default: '/d/isp-tickets-mgmt/tickets',
              key: '/d/isp-tickets-mgmt',
              hidden: true,
            },
          },
          {
            path: '/d/isp-tickets-mgmt/tickets',
            component: '@/pages/ispTicketsMgmt/ispTickets',
            wrappers: ['@/wrappers/Auth/IsMgmt'],
            extraOpt: {
              key: '/d/isp-tickets-mgmt/tickets',
              name: '所有工单',
              namePath: '工单管理/所有工单',
              menu: true,
              parentMenu: '/d/isp-tickets-mgmt',
            },
          },
          {
            path: '/d/isp-tickets-mgmt/records',
            component: '@/pages/ispTicketsMgmt/records',
            wrappers: ['@/wrappers/Auth/IsMgmt'],
            extraOpt: {
              key: '/d/isp-tickets-mgmt/records',
              name: '工单处理记录',
              namePath: '工单管理/工单处理记录',
              menu: true,
              parentMenu: '/d/isp-tickets-mgmt',
            },
          },
          {
            path: '/d/isp-tickets-mgmt/detail',
            component: '@/pages/ispTicketsMgmt/detail',
            wrappers: ['@/wrappers/Auth/IsMgmt'],
            extraOpt: {
              hidden: true,
              key: '/d/isp-tickets-mgmt/detail',
              name: '工单详情',
              namePath: '工单管理/工单详情',
            },
          },
        ],
      },
      {
        path: '/d/report',
        extraOpt: {
          default: '/d/report/switch-fault-report-list',
          key: '/d/report',
          name: '上报管理',
          menu: true,
          sub: true,
        },
        routes: [
          {
            path: '/d/report/',
            extraOpt: {
              default: '/d/report/switch-fault-report-list',
              key: '/d/report/',
              hidden: true,
            },
          },
          {
            path: '/d/report/switch-fault-report-list',
            component: '@/pages/reportsMgmt/switchFault',
            wrappers: ['@/wrappers/Auth/IsMgmt'],
            extraOpt: {
              key: '/d/report/switch-fault-report-list',
              name: '交换机故障上报',
              namePath: '上报管理/交换机故障上报',
              menu: true,
              parentMenu: '/d/report',
            },
          },
          {
            path: '/d/report/wall-line',
            component: '@/pages/reportsMgmt/wallLine',
            wrappers: ['@/wrappers/Auth/IsMgmt'],
            extraOpt: {
              key: '/d/report/wall-line',
              name: '主线上报',
              namePath: '上报管理/主线上报',
              menu: true,
              parentMenu: '/d/report',
            },
          },
          {
            path: '/d/report/china-mobile-nodata',
            component: '@/pages/reportsMgmt/chinaMobileNoData',
            wrappers: ['@/wrappers/Auth/IsMgmt'],
            extraOpt: {
              key: '/d/report/china-mobile-nodata',
              name: '移动无数据上报',
              namePath: '上报管理/移动无数据上报',
              menu: true,
              parentMenu: '/d/report',
            },
          },
          {
            path: '/d/report/china-mobile-occupied-onu',
            component: '@/pages/reportsMgmt/chinaMobileOccupiedOnu',
            wrappers: ['@/wrappers/Auth/IsMgmt'],
            extraOpt: {
              key: '/d/report/china-mobile-occupied-onu',
              name: '移动ONU被占上报',
              namePath: '上报管理/移动ONU被占上报',
              menu: true,
              parentMenu: '/d/report',
            },
          },
        ],
      },
      {
        path: '/d/users-mgmt',
        extraOpt: {
          default: '/d/users-mgmt/users',
          key: '/d/users-mgmt',
          name: '用户管理',
          menu: true,
          sub: true,
        },
        routes: [
          {
            path: '/d/users-mgmt/',
            extraOpt: {
              default: '/d/users-mgmt/users',
              key: '/d/users-mgmt',
              hidden: true,
            },
          },
          {
            path: '/d/users-mgmt/users',
            component: '@/pages/usersMgmt/users',
            wrappers: ['@/wrappers/Auth/IsSuperAdmin'],
            extraOpt: {
              key: '/d/users-mgmt/users',
              name: '用户列表',
              namePath: '用户管理/用户列表',
              menu: true,
              parentMenu: '/d/users-mgmt',
            },
          },
          {
            path: '/d/users-mgmt/members',
            component: '@/pages/usersMgmt/members',
            wrappers: ['@/wrappers/Auth/IsMgmt'],
            extraOpt: {
              key: '/d/users-mgmt/members',
              name: '成员列表',
              namePath: '用户管理/成员列表',
              menu: true,
              parentMenu: '/d/users-mgmt',
            },
          },
          {
            path: '/d/users-mgmt/health-points-records',
            component: '@/pages/usersMgmt/healthPointsRecords',
            wrappers: ['@/wrappers/Auth/IsMgmt'],
            extraOpt: {
              key: '/d/users-mgmt/health-points-records',
              name: '血条记录',
              namePath: '用户管理/血条记录',
              menu: true,
              parentMenu: '/d/users-mgmt',
            },
          },
          {
            path: '/d/users-mgmt/punish-records',
            component: '@/pages/usersMgmt/punishRecords',
            wrappers: ['@/wrappers/Auth/IsMgmt'],
            extraOpt: {
              key: '/d/users-mgmt/punish-records',
              name: '处罚记录',
              namePath: '用户管理/处罚记录',
              menu: true,
              parentMenu: '/d/users-mgmt',
            },
          },
        ],
      },
      {
        path: '/d/attendances-mgmt',
        extraOpt: {
          default: '/d/attendances-mgmt/records',
          key: '/d/attendances-mgmt',
          name: '考勤管理',
          menu: true,
          sub: true,
        },
        routes: [
          {
            path: '/d/attendances-mgmt/',
            extraOpt: {
              default: '/d/attendances-mgmt/records',
              key: '/d/attendances-mgmt',
              hidden: true,
            },
          },
          {
            path: '/d/attendances-mgmt/records',
            component: '@/pages/attendancesMgmt/records',
            wrappers: ['@/wrappers/Auth/IsMgmt'],
            extraOpt: {
              key: '/d/attendances-mgmt/records',
              name: '考勤记录',
              namePath: '考勤管理/考勤记录',
              menu: true,
              parentMenu: '/d/attendances-mgmt',
            },
          },
          {
            path: '/d/attendances-mgmt/change-requests-mgmt',
            component: '@/pages/attendancesMgmt/changeRequestsMgmt',
            wrappers: ['@/wrappers/Auth/IsMgmt'],
            extraOpt: {
              key: '/d/attendances-mgmt/change-requests-mgmt',
              name: '变动申请管理',
              namePath: '考勤管理/变动申请管理',
              menu: true,
              parentMenu: '/d/attendances-mgmt',
            },
          },
        ],
      },
      {
        path: '/d/scheduling-mgmt',
        component: '@/pages/schedulingMgmt',
        wrappers: ['@/wrappers/Auth/IsAdmin'],
        extraOpt: {
          key: '/d/scheduling-mgmt',
          name: '排班管理',
          namePath: '排班管理/值班学期',
          menu: true,
        },
      },
      {
        path: '/d/scheduling-mgmt/detail/:id',
        component: '@/pages/schedulingMgmt/detail',
        wrappers: ['@/wrappers/Auth/IsAdmin'],
        extraOpt: {
          key: '/d/scheduling-mgmt/detail',
          name: '学期详情',
          menu: false,
        },
      },
      {
        path: '/d/sys-mgmt',
        extraOpt: {
          default: '/d/sys-mgmt/register-able-users-mgmt',
          key: '/d/sys-mgmt',
          name: '系统管理',
          menu: true,
          sub: true,
        },
        routes: [
          {
            path: '/d/sys-mgmt/',
            extraOpt: {
              default: '/d/sys-mgmt/register-able-users-mgmt',
              key: '/d/sys-mgmt',
              hidden: true,
            },
          },
          {
            path: '/d/sys-mgmt/register-able-users-mgmt',
            component: '@/pages/sysMgmt/registerAbleUsersMgmt',
            wrappers: ['@/wrappers/Auth/IsSuperAdmin'],
            extraOpt: {
              key: '/d/sys-mgmt',
              name: '允许注册用户管理',
              namePath: '系统管理/允许注册用户管理',
              menu: true,
              parentMenu: '/d/sys-mgmt',
            },
          },
          {
            path: '/d/sys-mgmt/err-select-mgmt',
            component: '@/pages/sysMgmt/errSelectMgmt',
            wrappers: ['@/wrappers/Auth/IsSuperAdmin'],
            extraOpt: {
              key: '/d/sys-mgmt',
              name: '故障错误选项管理',
              namePath: '系统管理/故障错误选项管理',
              menu: true,
              parentMenu: '/d/sys-mgmt',
            },
          },
        ],
      },
      {
        path: '/d/user-center',
        component: '@/pages/userCenter',
        wrappers: ['@/wrappers/Auth/IsMgmt'],
        extraOpt: {
          key: '/d/user-center',
          name: '个人中心',
          namePath: '个人中心',
          nav: true,
        },
        // routes:
      },
      {
        path: '/d/test',
        component: '@/pages/test',
        extraOpt: {
          key: '/d/test',
          name: '测试页面',
          namePath: '测试页面',
          menu: true,
        },
      },
    ],
  },
];

// 移动端路由
const mobileRoute: routeInterface.mRoute[] = [
  {
    path: '/m',
    redirect: '/m/home',
  },
  {
    path: '/m',
    component: '@/mobile/pages/main.tsx',
    __isDynamic: true,
    extraOpt: {
      default: '/m/home',
    },
    routes: [
      {
        path: '/m/',
        extraOpt: {
          default: '/m/home',
        },
      },
      {
        path: '/m/home',
        component: '@/mobile/pages/home',
      },
      {
        path: '/m/work',
        component: '@/mobile/pages/work',
      },
      {
        path: '/m/user-center',
        component: '@/mobile/pages/userCenter',
      },
      {
        path: '/m/my-requests',
        component: '@/mobile/pages/myRequests',
      },
      {
        path: '/m/my-requests/detail',
        component: '@/mobile/pages/myRequests/detail',
      },
      {
        path: '/m/my-requests/records',
        component: '@/mobile/pages/myRequests/records',
      },
      {
        path: '/m/repair-requests',
        component: '@/mobile/pages/repairRequests',
      },
      {
        path: '/m/repair-requests/detail',
        component: '@/mobile/pages/repairRequests/detail',
      },
      {
        path: '/m/repair-requests/records',
        component: '@/mobile/pages/repairRequests/records',
      },
      {
        path: '/m/isp-requests',
        component: '@/mobile/pages/ispRequests',
      },
      {
        path: '/m/isp-requests/detail',
        component: '@/mobile/pages/ispRequests/detail',
      },
      {
        path: '/m/isp-requests/records',
        component: '@/mobile/pages/ispRequests/records',
      },
      {
        path: '/m/reports',
        component: '@/mobile/pages/reports',
      },
      {
        path: '/m/switch-fault-reports-detail',
        component: '@/mobile/pages/reports/switchFault/detail.tsx',
      },
      {
        path: '/m/wall-line-reports-detail',
        component: '@/mobile/pages/reports/wallLine/detail.tsx',
      },
      {
        path: '/m/china-mobile-no-data-reports-detail',
        component: '@/mobile/pages/reports/chinaMobileNoData/detail.tsx',
      },
      {
        path: '/m/china-mobile-occupied-onu-reports-detail',
        component: '@/mobile/pages/reports/chinaMobileOccupiedOnu/detail.tsx',
      },
      {
        path: '/m/attendance-change',
        component: '@/mobile/pages/attendance/attendanceChanges',
      },
      {
        path: '/m/attendance-change/detail',
        component: '@/mobile/pages/attendance/attendanceChangeDetail',
      },
      {
        path: '/m/attendance-records',
        component: '@/mobile/pages/attendance/records',
      },
      {
        path: '/m/attendance-timetable',
        component: '@/mobile/pages/attendance/timetable',
      },
      {
        path: '/m/upload-classtable',
        component: '@/mobile/pages/uploadClassTable',
      },
    ],
  },
];

export default <(routeInterface.mRoute | routeInterface.route)[]>[
  {
    path: '/',
    component: '@/index.tsx', // TODO: 判断去移动端还是后台（或者用nginx解决）
    routes: [
      { path: '/', redirect: '/d' },
      { path: '/d', component: '@/pages/index.tsx', routes: desktopRoute },
      {
        path: '/m',
        component: '@/mobile/pages/index.tsx',
        routes: mobileRoute,
      },
    ],
  },
];

export { desktopRoute, mobileRoute };
