import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Layout, Space, Typography } from 'antd';
import { LoginOutlined, LogoutOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../app/hooks';
import { logout, selectUser } from '../../features/auth/authSlice';
import { CustomButton } from '../CustomButton';
import { Paths } from '../../paths';
import styles from './index.module.css';

export const Header = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate(Paths.login);
  }

  return (
    <Layout.Header className={styles.header}>
      <Space className={styles.employeesSpace}>
        <TeamOutlined className={styles.teamIcon}/>
        <Link to={Paths.home}>
          <CustomButton type='text'>
            <Typography.Title level={ 1 }>
              Сотрудники
            </Typography.Title>
          </CustomButton>
        </Link>
      </Space>
      <Space className={styles.loginSpace}>
        {user ? (
          <CustomButton
            type='text'
            icon={ <LogoutOutlined /> }
            onClick={onLogoutClick}
          >
            Выйти
          </CustomButton>
        ) : (
          <>
            <Link to={Paths.login}>
              <CustomButton
                type='text'
                icon={ <LoginOutlined />}
              >
                Войти
              </CustomButton>
            </Link>
            <Link to={Paths.register}>
              <CustomButton
                type='text'
                icon={ <UserOutlined />}
                >
                  Регистрация
              </CustomButton>
            </Link>
          </>
        )}
        </Space>
    </Layout.Header>
  )
}
