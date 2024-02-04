import { Card, Form, Row, Space, Typography } from "antd";
import { CustomInput } from "../../Components/CustomInput";
import { PasswordInput } from "../../Components/PasswordInput";
import { CustomButton } from "../../Components/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { useState } from "react";
import { useRegisterMutation } from "../../app/services/auth";
import { User } from "@prisma/client";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";
import { ErrorMessage } from "../../Components/ErrorMessage";

type RegisterData = Omit<User, "id"> & { confirmPassword: string};

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [registerUser] = useRegisterMutation();

  const register = async(data: RegisterData) => {
    try {
      await registerUser(data).unwrap();
      navigate('/');
    } catch (error) {
      if (isErrorWithMessage(error)) {
        setError(error.data.message)
      } else {
        setError('Неизвестная ошибка')
      }
    }
  }

  return (
    <Row align="middle" justify="center">
      <Card title="Регистрация" style={{ width: '30rem' }}>
        <Form onFinish={register}>
          <CustomInput
            name="name"
            placeholder="Имя"
          />
          <CustomInput
            type="email"
            name="email"
            placeholder="Email"
          />
          <PasswordInput
            name="password"
            placeholder="Пароль"
          />
          <PasswordInput
            name="confirmPassword"
            placeholder="Повторите пароль"
          />
          <CustomButton
            type="primary"
            htmlType="submit"
          >
            Зарегистрироваться
          </CustomButton>
        </Form>
        <Space direction="vertical" size="large">
          <Typography.Text>
            Есть аккаунт? <Link to={Paths.login}>Войти</Link>
          </Typography.Text>
          <ErrorMessage message = {error} />
        </Space>
      </Card>
    </Row>
  )
}

export default Register;