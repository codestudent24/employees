import { Row } from "antd"
import { EmployeeForm } from "../../Components/EmployeeForm"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUser } from "../../features/auth/authSlice"
import { useAddEmployeeMutation } from "../../app/services/employees"
import { Paths } from "../../paths"
import { Employee } from "@prisma/client"
import { isErrorWithMessage } from "../../utils/isErrorWithMessage"

export const AddEmployee = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState('');
  const [addEmployee] = useAddEmployeeMutation();

  useEffect(() => {
    if (!user) {
      navigate(Paths.login)
    }
  }, [navigate, user])

  const handleAddEmployee = async (data: Employee) => {
    try {
      await addEmployee(data).unwrap();
      navigate(`${Paths.status}/created`);
    } catch (error) {
      const isError = isErrorWithMessage(error);
      if (isError) {
        setError(error.data.message);
      } else {
        setError('Неизвестная ошибка');
      }
    }
  }

  return (
    <Row align="middle" justify="center">
      <EmployeeForm
        title="Добавить сотрудника"
        btnText="Добавить"
        onFinish={ handleAddEmployee }
        error={ error }
      />
    </Row>
  )
}
