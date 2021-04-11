import { attendanceSignIn, attendanceSignOut } from '@/api/attendance';
import { areas, TableFilterType } from '@/common';
import { useApi, useDialogForm } from '@/hooks';
import Card from '@/mobile/components/Card';
import ActionCardListContainer from '@/mobile/components/Card/ActionCardListContainer';
import PageContainer from '@/mobile/components/PageContainer';
import { mobileAuthContext } from '@/mobile/wrappers/Auth/mobileAuthContext';
import { confirmDialog } from '@/utils';
import { WhiteSpace, Modal } from 'antd-mobile';
import { stringify } from 'query-string';
import { FC, useContext } from 'react';
import componentData from 'typings';
import { history } from 'umi';
import './index.scss';

const REPAIR_REQUESTS_PATH = '/m/repair-requests';
const ISP_REQUESTS_PATH = '/m/isp-requests';
const REPORTS_PATH = '/m/reports';
const ATTENDANCE_CHANGE_REQUESTS_PATH = '/m/attendance-change';
const ATTENDANCE_RECORDS_PATH = '/m/attendance-records';
const ATTENDANCE_TIMETABLE_PATH = '/m/attendance-timetable';
const UPLOAD_CLASSTABLE_PATH = '/m/upload-classtable';

const SignInCard: FC = () => {
  const propData: componentData.PropData[] = [
    {
      key: 'area',
      name: '片区',
      type: TableFilterType.select,
      selectData: areas,
      rules: [{ required: true }],
    },
  ];
  const { visible, setVisible, DialogForm, setForm } = useDialogForm(
    attendanceSignIn,
    propData,
    '签到',
    undefined,
    true,
  );
  return (
    <>
      <Card
        onClick={() => setVisible(true)}
        text="签到"
        textColor="#E2BDD7"
        bgColor="#d7501e"
      />
      {DialogForm}
    </>
  );
};

const SignOutCard: FC = () => {
  const { loading, setLoading } = useApi(attendanceSignOut);
  return (
    <Card
      onClick={() => {
        confirmDialog({ actionText: '签退', onOk: () => setLoading(true) });
      }}
      text="签退"
      textColor="#edd8f0"
      bgColor="#253abf"
    />
  );
};

const work: FC = () => {
  const userContext = useContext(mobileAuthContext);
  const signCards = [
    <SignInCard key="card-sign-in" />,
    <SignOutCard key="card-sign-out" />,
  ];
  const cards = [
    <Card
      key="card-goto-repair-requests"
      onClick={() => history.push(REPAIR_REQUESTS_PATH)}
      text="报修处理"
      textColor="#f3cedf"
      bgColor="#db6623"
    />,
    <Card
      key="card-goto-isp-requests"
      onClick={() => history.push(ISP_REQUESTS_PATH)}
      text="工单处理"
      textColor="#f3cedf"
      bgColor="#db6623"
    />,
    <Card
      key="card-goto-reports"
      onClick={() =>
        history.push({
          pathname: REPORTS_PATH,
        })
      }
      text="上报管理"
      textColor="#eee1cf"
      bgColor="#866cda"
    />,
    <Card
      key="card-goto-attendance-changes"
      onClick={() =>
        history.push({
          pathname: ATTENDANCE_CHANGE_REQUESTS_PATH,
          search: stringify({ userId: userContext.user?.id }),
        })
      }
      text="变动申请"
      textColor="#eee1cf"
      bgColor="#866cda"
    />,
    <Card
      key="card-goto-attendance-records"
      onClick={() =>
        history.push({
          pathname: ATTENDANCE_RECORDS_PATH,
          search: stringify({ userId: userContext.user?.id }),
        })
      }
      text="考勤记录"
      textColor="#eee1cf"
      bgColor="#866cda"
    />,
    <Card
      key="card-goto-attendance-timetable"
      onClick={() => history.push(ATTENDANCE_TIMETABLE_PATH)}
      text="值班表"
      textColor="#eee1cf"
      bgColor="#866cda"
    />,
    <Card
      key="card-goto-upload-classtable"
      onClick={() => history.push(UPLOAD_CLASSTABLE_PATH)}
      text="上传课程表"
      textColor="#eee1cf"
      bgColor="#866cda"
    />,
  ];
  return (
    <PageContainer title="工作">
      <ActionCardListContainer
        style={{ width: '47%', fontSize: '0.8em' }}
        cards={signCards}
      />
      <div style={{ marginBottom: '6%' }} />
      <ActionCardListContainer cards={cards} />
      <WhiteSpace />
    </PageContainer>
  );
};

export default work;
