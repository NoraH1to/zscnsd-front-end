import apiInterface from 'api';
import { FC } from 'react';
import { Badge } from 'antd';

const RegisterWhitelistGroupEnabledStatusComp: FC<{
  registerWhitelistGroup: apiInterface.RegisterWhitelistGroup;
}> = ({ registerWhitelistGroup }) => {
  if (registerWhitelistGroup.enabled)
    return <Badge text="已启用" status="processing" />;
  else return <Badge text="未启用" status="default" />;
};

export default RegisterWhitelistGroupEnabledStatusComp;
