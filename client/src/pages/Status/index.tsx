import { Button, Result, Row } from "antd";
import { Link, useParams } from "react-router-dom"

const statuses: Record<string, string> = {
  created: 'Пользователь успешно создан',
  updated: 'Пользователь успешно обновлен',
  deleted: 'Пользователь успешно удален',
}

export const Status = () => {
  const { status } = useParams();
  return (
    <Row
      align="middle"
      justify="center"
      style={{
        width: '100%'
      }}
    >
      <Result
        status={ status ? 'success' : 404}
        title={ status ? statuses[status] : 'He найдено'}
        extra={
          <Button key="dashboard">
            <Link to='/'>
              Ha главную
            </Link>
          </Button>
        }
      />
    </Row>
  )
}
