import { Skeleton, SkeletonProps } from 'antd';
import { FC } from 'react';

const SkeletonContainer: FC<{
  when: boolean;
  skeletonProps?: SkeletonProps;
}> = ({ when, skeletonProps, children }) => (
  <>{when ? children : <Skeleton active {...skeletonProps} />}</>
);

export default SkeletonContainer;
