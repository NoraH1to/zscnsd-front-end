import { FC } from 'react';
import IsSthRole from '@/wrappers/Auth/IsSthRole';

const IsAdmin: FC = (props) => <IsSthRole roles={[3, 4]} {...props} />;

export default IsAdmin;
