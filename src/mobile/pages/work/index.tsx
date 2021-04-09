import { attendanceSignIn, attendanceSignOut } from '@/api/attendance';
import { areas } from '@/common';
import { useApi } from '@/hooks';
import Card from '@/mobile/components/Card';
import CardListContainer from '@/mobile/components/Card/CardListContainer';
import { WhiteSpace, Modal } from 'antd-mobile';
import { FC } from 'react';
import { history } from 'umi';
import './index.scss';

const REPAIR_REQUESTS_PATH = '/m/repair-requests';
const REPORTS_PATH = '/m/reports';
const ATTENDANCE_CHANGE_REQUESTS_PATH = '/m/attendance-change-requests';
const ATTENDANCE_RECORDS_PATH = '/m/attendance-records';
const ATTENDANCE_TIMETABLE_PATH = '/m/attendance-timetable';
const UPLOAD_CLASSTABLE_PATH = '/m/upload-classtable';

const SignInCard: FC = () => {
  const { loading, setLoading, setParams } = useApi(attendanceSignIn);
  return (
    <>
      <Card
        key="card-sign-in"
        onClick={() => {
          Modal.operation(
            areas.map((area) => ({
              text: area.string,
              onPress: () => {
                setParams({ area: area.id });
                setLoading(true);
              },
            })),
          );
        }}
        text="签到"
        textColor="#E2BDD7"
        bgColor="#d7501e"
      />
    </>
  );
};

const SignOutCard: FC = () => {
  const { loading, setLoading } = useApi(attendanceSignOut);
  return (
    <Card
      key="card-sign-out"
      onClick={() => {
        Modal.alert('签退', '确定要签退吗？', [
          { text: '取消' },
          { text: '签退', onPress: () => setLoading(true) },
        ]);
      }}
      text="签退"
      textColor="#edd8f0"
      bgColor="#253abf"
    />
  );
};

const work: FC = () => {
  const signCards = [<SignInCard />, <SignOutCard />];
  const cards = [
    <Card
      key="card-goto-repair-requests"
      onClick={() => history.push(REPAIR_REQUESTS_PATH)}
      text="报修处理"
      textColor="#f3cedf"
      bgColor="#db6623"
    />,
    <Card
      key="card-goto-reports"
      onClick={() => history.push(REPORTS_PATH)}
      text="上报管理"
      textColor="#eee1cf"
      bgColor="#866cda"
    />,
    <Card
      key="card-goto-attendance-change-requests"
      onClick={() => history.push(ATTENDANCE_CHANGE_REQUESTS_PATH)}
      text="变动申请"
      textColor="#eee1cf"
      bgColor="#866cda"
    />,
    <Card
      key="card-goto-attendance-records"
      onClick={() => history.push(ATTENDANCE_RECORDS_PATH)}
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
    <div className="m-work">
      <h1 id="m-work-title">工作</h1>
      <CardListContainer
        style={{ width: '47%', fontSize: '0.8em' }}
        cards={signCards}
      />
      <div style={{ marginBottom: '6%' }} />
      <CardListContainer cards={cards} />
      <WhiteSpace />
    </div>
  );
};

export default work;
