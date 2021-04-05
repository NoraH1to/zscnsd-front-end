import { FC } from 'react';
import IsSthRole from '@/wrappers/Auth/IsSthRole';

const IsSuperAdmin: FC = (props) => <IsSthRole roles={[4]} {...props} />;

export default IsSuperAdmin;
