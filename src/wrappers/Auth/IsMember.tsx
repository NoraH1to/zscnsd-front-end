import { FC } from 'react';
import IsSthRole from '@/wrappers/Auth/IsSthRole';

const IsMember: FC = (props) => <IsSthRole roles={[0, 2, 3, 4]} {...props} />;

export default IsMember;
