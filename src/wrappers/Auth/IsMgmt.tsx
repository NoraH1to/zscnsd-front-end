import { FC } from 'react';
import IsSthRole from '@/wrappers/Auth/IsSthRole';

const IsMgmt: FC = (props) => <IsSthRole roles={[2, 3, 4]} {...props} />;

export default IsMgmt;
