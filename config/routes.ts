// 桌面端路由
const desktopRoute: routeInterface.route[] = [
  {
    path: '/',
    redirect: '/d/home', // TODO 改成判断手机还是pc
  },
  // PC端路由
  {
    path: '/login',
    component: '@/pages/login',
    extraOpt: {
      hidden: true,
      key: '/login',
      pageTitle: 'ZSCNSD 登入',
    },
  },
  {
    path: '/d',
    component: '@/pages/index.tsx',
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
        extraOpt: {
          key: '/d/scheduling-mgmt',
          name: '排班管理',
          namePath: '排班管理/值班学期',
          menu: true,
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
    component: '@/pages/mobile',
  },
];

export default <(routeInterface.mRoute | routeInterface.route)[]>(
  desktopRoute.concat(mobileRoute)
);

export { desktopRoute, mobileRoute };
