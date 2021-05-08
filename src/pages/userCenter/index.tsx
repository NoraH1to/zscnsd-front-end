import { useDialogForm, useInit, useRealLocation } from '@/hooks';
import { authContext } from '@/wrappers/Auth/authContext';
import { Button, Skeleton, Tabs } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { FC, useContext, useEffect, useState } from 'react';
import UserInfo from './UserInfo';
import './index.scss';
import { userDetail, userEdit } from '@/api/user';
import apiInterface from 'api';
import componentData from 'typings';
import { dormBlocks, isps, TableFilterType } from '@/common';
import SkeletonContainer from '@/components/SkeletonContainer';
import Requests from '@/pages/repairRequestsMgmt/requests';
import RequestRecords from '@/pages/repairRequestsMgmt/records';
import IspRecords from '@/pages/ispTicketsMgmt/records';
import HealthPointsRecords from '@/pages/usersMgmt/healthPointsRecords';
import PunishRecords from '@/pages/usersMgmt/punishRecords';
import AttendanceRecords from '@/pages/attendancesMgmt/records';

const EditUserInfoBtn: FC<{ user?: apiInterface.User; onChange?: any }> = ({
  user,
  onChange,
}) => {
  const userContext = useContext(authContext);

  const propData: componentData.PropData[] = [
    {
      key: 'isp',
      type: TableFilterType.select,
      name: '运营商',
      selectData: isps,
      rules: [{ required: true }],
    },
    {
      key: 'networkAccount',
      type: TableFilterType.str,
      name: '宽带账号',
      rules: [{ required: true }],
    },
    {
      key: 'dormBlock',
      type: TableFilterType.select,
      name: '宿舍楼',
      selectData: dormBlocks,
      rules: [{ required: true }],
    },
    {
      key: 'dormRoom',
      type: TableFilterType.number,
      name: '宿舍房间号',
      rules: [{ required: true }],
    },
    {
      key: 'telephone',
      type: TableFilterType.str,
      name: '手机号',
      rules: [{ required: true }],
    },
  ];
  const { visible, setVisible, DialogForm, setForm } = useDialogForm(
    userEdit,
    propData,
    '修改个人信息',
    (res: any) => {
      onChange && onChange(res);
      userContext.setUser && userContext.setUser(res.data);
    },
  );

  useEffect(() => {
    setForm({
      isp: user?.isp.id,
      networkAccount: user?.networkAccount,
      dormBlock: user?.dormBlock.id,
      dormRoom: user?.dormRoom,
      telephone: user?.telephone,
    });
  }, [user]);

  return (
    <>
      <Button
        type="primary"
        ghost
        icon={<EditOutlined />}
        onClick={() => setVisible(true)}
      >
        编辑信息
      </Button>
      {DialogForm}
    </>
  );
};

const userCenter: FC = () => {
  const location = useRealLocation();
  const userContext = useContext(authContext);

  const isSelf = () =>
    Object.keys(location.query).length == 0 ||
    parseInt((location.query?.id && location.query?.id.toString()) || '-1') ==
      userContext.user?.id;
  const isMember = () => !!userContext.user?.member;
  const getParams = () => ({
    userId: isSelf()
      ? undefined
      : parseInt((location.query?.id && location.query?.id.toString()) || '-1'),
  });

  const [user, setUser] = useState<apiInterface.User | undefined>();
  const { data, loading, setLoading, setParams } = useInit(
    userDetail,
    getParams(),
    (res: any) => setUser(res.data),
  );

  const onUserInfoChange = (res?: any) => {
    setParams(getParams());
    setLoading(true);
  };

  // id 变了刷新数据
  useEffect(() => onUserInfoChange(), [location.search]);

  return (
    <div className="user-center-container">
      <div className="row">
        <div className="user-info-container">
          <UserInfo user={user} loading={loading} />
        </div>
        {isSelf() && (
          <EditUserInfoBtn user={user} onChange={onUserInfoChange} />
        )}
      </div>
      {isMember() && (
        <div className="tabs-container">
          <Tabs>
            <Tabs.TabPane tab="报修记录" key="repair">
              <SkeletonContainer when={!!user?.id}>
                <Requests defaultFormData={{ userId: user?.id }} />
              </SkeletonContainer>
            </Tabs.TabPane>
            <Tabs.TabPane tab="报修处理记录" key="repair-records">
              <SkeletonContainer when={!!user?.id}>
                <RequestRecords defaultFormData={{ operatorId: user?.id }} />
              </SkeletonContainer>
            </Tabs.TabPane>
            <Tabs.TabPane tab="工单处理记录" key="isp-records">
              <SkeletonContainer when={!!user?.id}>
                <IspRecords defaultFormData={{ operatorId: user?.id }} />
              </SkeletonContainer>
            </Tabs.TabPane>
            <Tabs.TabPane tab="考勤记录" key="attendance-records">
              <SkeletonContainer when={!!user?.id}>
                <AttendanceRecords defaultFormData={{ userId: user?.id }} />
              </SkeletonContainer>
            </Tabs.TabPane>
            <Tabs.TabPane tab="血条记录" key="health-records">
              <SkeletonContainer when={!!user?.id}>
                <HealthPointsRecords defaultFormData={{ userId: user?.id }} />
              </SkeletonContainer>
            </Tabs.TabPane>
            <Tabs.TabPane tab="处罚记录" key="punish-records">
              <SkeletonContainer when={!!user?.id}>
                <PunishRecords defaultFormData={{ userId: user?.id }} />
              </SkeletonContainer>
            </Tabs.TabPane>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default userCenter;
