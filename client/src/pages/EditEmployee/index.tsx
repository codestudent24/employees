import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useEditEmployeeMutation, useGetEmployeeQuery } from "../../app/services/employees";
import { Row } from "antd";
import { EmployeeForm } from "../../Components/EmployeeForm";
import { Employee } from "@prisma/client";
import { Paths } from "../../paths";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";

export const EditEmployee = () => {
  const navigate = useNavigate();
  const params = useParams<{id: string}>();
  const [error, setError] = useState('');
  const { data, isLoading } = useGetEmployeeQuery(params.id || '');
  const [editEmployee] = useEditEmployeeMutation();

  if (isLoading) {
    return <span>Загрузка...</span>
  }

  const handleEditUser = async (employee: Employee) => {
    try {
      const editedEmployee = {
        ...data,
        ...employee,
      };
      // await editEmployee(editedEmployee).unwrap();
      // navigate(`${Paths.status}/updated`);
      editEmployee(editedEmployee).unwrap();
      setTimeout(() => {
        navigate(`${Paths.status}/updated`)
      }, 4000)
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
        title="Редактировать сотрудника"
        btnText="Сохранить"
        error={ error }
        employee={ data }
        onFinish={handleEditUser}
      />
    </Row>
  )
}
