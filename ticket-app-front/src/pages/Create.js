import { DownloadOutlined } from '@ant-design/icons';
import { Button, Col, Row, Typography } from 'antd'
import React, { useContext, useState } from 'react'
import { SocketContext } from '../context/SocketContext';
import { useHideMenu } from '../hooks/useHideMenu';

const {Title, Text} = Typography;

export const Create = () => {

  useHideMenu(true)

  const { socket } = useContext(SocketContext)
  const [lastTicket, setLastTicket] = useState()

  const handleClick = () => {
    /*el primer argunmento es el nombre de la acción a emitir, el segundo es los datos a enviar, y el tercer es un callback 
    que se ejecuta por el backend cuando el backend de la orden*/
    socket.emit('solicitar-ticket', null, (ticket) => {
      setLastTicket(ticket)
    });
  }

  return (
    <>
      <Row>
        <Col span={14} offset={6} align="center">
          <Title level={3}>
            Press here to generate a new ticket
          </Title>

          <Button
            type='primary'
            shape='round'
            icon={<DownloadOutlined />}
            size='large'
            onClick={handleClick}
          >
            New Ticket
          </Button>
        </Col>
      </Row>
      {lastTicket &&
        <Row style={{ marginTop: 100 }}>
          <Col span={14} offset={6} align='center'>
            <Text level={2}>
              Your number
            </Text>
            <br />
            <Text type='success' style={{fontSize: 55}}>
              { lastTicket.number}
            </Text>
          </Col>
        </Row>
      }
    </>
  )
}
