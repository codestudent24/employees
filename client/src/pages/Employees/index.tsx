import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { Employee } from "@prisma/client"
import { Table } from "antd"
import { PlusCircleOutlined } from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"
import { Paths } from "../../paths"
import { CustomButton } from "../../Components/CustomButton"
import { useGetAllEmployeesQuery } from "../../app/services/employees"
import { selectUser } from "../../features/auth/authSlice"

const columns: ColumnsType<Employee> = [
  {
    title: 'Имя',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'Возраст',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Адрес',
    dataIndex: 'address',
    key: 'address',
  },
]

export const Employees = () => {
  const navigate =useNavigate();
  const user  = useSelector(selectUser);
  const { data, isLoading } = useGetAllEmployeesQuery();

  useEffect(() => {
    if (!user) navigate(`${Paths.login}`);
  }, [navigate, user])

  const goToAddUser = () => navigate(Paths.employeeAdd);

  return (
    <>
      <CustomButton type="primary" onClick={goToAddUser} icon={ <PlusCircleOutlined /> }>
        Добавить
      </CustomButton>
      <Table
        loading={ isLoading }
        dataSource={ data }
        pagination={ false }
        columns={ columns }
        rowKey={ (record) => record.id }
        onRow={ (record) => {
          return {
            onClick: () => navigate(`${Paths.employee}/${record.id}`)
          }
        }}
      />
    </>
  )
}
