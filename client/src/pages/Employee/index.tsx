import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { useGetEmployeeQuery, useRemoveEmployeeMutation } from "../../app/services/employees";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { Descriptions, Divider, Modal, Space } from "antd";
import { CustomButton } from "../../Components/CustomButton";
import { Paths } from "../../paths";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ErrorMessage } from "../../Components/ErrorMessage";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";

export const Employee = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const params = useParams<{id: string}>();
  const user = useSelector(selectUser);
  const { data, isLoading } = useGetEmployeeQuery(params.id || '');
  const [removeEmployee] = useRemoveEmployeeMutation();

  const handleDeleteUser = () => {
    setIsModalOpen(false);

    try {
      removeEmployee(data!.id).unwrap();
      setTimeout(() => {
        navigate(`${Paths.status}/deleted`);
      }, 4000);
    } catch (error) {
      const isError = isErrorWithMessage(error);
      if (isError) {
        setError(error.data.message);
      } else {
        setError('Неизвестная ошибка');
      }
    }
  }

  if (isLoading) {
    return <span>Загрузка...</span>
  }

  if (!data) {
    navigate('/');
  }

  return (
    <>
      <Descriptions title="Информация o сотруднике" bordered>
        <Descriptions.Item label="Имя" span={ 3 }>
          { `${data?.firstName} ${data?.lastName}` }
        </Descriptions.Item>
        <Descriptions.Item label="Возраст" span={ 3 }>
          { `${data?.age}` }
        </Descriptions.Item>
        <Descriptions.Item label="Адрес" span={ 3 }>
          { `${data?.address}` }
        </Descriptions.Item>
      </Descriptions>
      { user?.id === data?.userId && (
        <>
          <Divider orientation="left">
            Действия
          </Divider>
          <Space>
            <Link to={`${Paths.employeeEdit}/${data?.id}`}>
              <CustomButton
                shape="round"
                type="default"
                icon={ <EditOutlined /> }
              >
                Редактировать
              </CustomButton>
            </Link>
            <CustomButton
              shape="round"
              danger
              onClick={() => {setIsModalOpen(true)}}
              icon={ <DeleteOutlined /> }
            >
              Удалить
            </CustomButton>
          </Space>
          <ErrorMessage message={error} />
          <Modal
            title="Подтвердите удаление"
            open={ isModalOpen }
            onOk={handleDeleteUser}
            onCancel={() => {setIsModalOpen(false)}}
            okText="Подтвердить"
            cancelText="Отменить"
          >
            Вы действительно хотите удалить сотрудника из таблицы?
          </Modal>
        </>
      )}
    </>
  )
}
