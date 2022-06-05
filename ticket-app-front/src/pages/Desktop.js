import { CloseCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Row, Typography } from 'antd'
import React, { useContext, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';
import { getUserStorage } from '../helpers/getUserStorage';
import { useHideMenu } from '../hooks/useHideMenu';

const { Title, Text } = Typography;

export const Desktop = () => {

  const historyDotPush = useNavigate();

  useHideMenu(false)

  const [user] = useState(getUserStorage());
  const { socket } = useContext(SocketContext);
  const [ticket, setTicket] = useState(null);
  const [pending, setPending] = useState(false);

  if(!user || !user?.username || !user?.desktop) {
    return  <Navigate replace to="/enter" />
  }

  const handleExit = () => {
    localStorage.clear()
    historyDotPush('/enter')
  }

  const handleClick = () => {
    socket.emit('next-ticket-toWork', user, (ticket) => {
      setTicket(ticket)
    });
  }

  socket.on('enable-ticket', (state) => setPending(state))
 
  return (
    <>
      <Row>
        <Col span={20}>
          <Title level={2}>{ user.username }</Title>
          <Text>Working in desktop N. </Text>
          <Text type='success'>{ user.desktop }</Text>
        </Col>

        <Col span={4} align="right">
          <Button
            shape='round'
            type='danger'
            onClick={handleExit}
          >
            <CloseCircleOutlined />
            Exit
          </Button>
        </Col>
      </Row>

      <Divider />
      { ticket &&
          <Row>
            <Col>
              <Text>Current ticket:</Text>
              <Text style={{fontSize: 30}} type="danger">{ticket.number}</Text>
            </Col>
          </Row>
      }
      { pending ?
          <Row>
            <Col offset={18} span={6} align="right">
              <Button
                onClick={handleClick}
                shape='round'
                type='primary'
              >
                <RightCircleOutlined />
                Next
              </Button>
            </Col>
          </Row> :
          <p>There are no pending tickets</p>
        }
    </>
  )
}
