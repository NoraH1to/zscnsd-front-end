import apiInterface from 'api';
import axios from 'axios';
import { FC, useContext, useState } from 'react';
import { memberDetail } from './api/member';
import LoadingPage from './components/LoadingPage';
import { useInit } from './hooks';
import { authContext } from './wrappers/Auth/authContext';

const index: FC = (props) => <>{props.children}</>;

export default index;
