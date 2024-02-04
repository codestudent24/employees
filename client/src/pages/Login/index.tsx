import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Form, Row, Space, Typography } from "antd";
import { CustomInput } from "../../Components/CustomInput";
import { PasswordInput } from "../../Components/PasswordInput";
import { CustomButton } from "../../Components/CustomButton";
import { Paths } from "../../paths";
import { UserData, useLoginMutation } from "../../app/services/auth";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";
import { ErrorMessage } from "../../Components/ErrorMessage";

const Login = () => {
  const navigate = useNavigate();
  const [loginUser] = useLoginMutation();
  const [error, setError] = useState('')
  const login = async (data: UserData) => {
    try {
      await loginUser(data).unwrap();
      navigate("/");
    } catch (err) {
      if (isErrorWithMessage(err)) {
        setError(err.data.message)
      } else {
        setError('Неизвестная ошибка')
      }
    }
  }

  return (
    <Row align="middle" justify="center">
      <Card title="Войдите" style={{ width: '30rem' }}>
        <Form onFinish={ login }>
          <CustomInput
            type="email"
            name="email"
            placeholder="Email"
          />
          <PasswordInput
            name="password"
            placeholder="Пароль"
          />
          <CustomButton
            type="primary"
            htmlType="submit"
          >
            Войти
          </CustomButton>
        </Form>
        <Space direction="vertical" size="large">
          <Typography.Text>
            Нет аккаунта? <Link to={Paths.register}>Зарегистрироваться</Link>
          </Typography.Text>
          <ErrorMessage message={ error } />
        </Space>
      </Card>
    </Row>
  )
}

export default Login;