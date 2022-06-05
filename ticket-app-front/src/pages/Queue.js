import { Card, Col, Divider, List, Row, Tag, Typography } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/SocketContext';
import { getLasts } from '../helpers/getLasts';
import { useHideMenu } from '../hooks/useHideMenu';

const {Title, Text} = Typography;


export const Queue = () => {

  useHideMenu(true)

  const { socket } = useContext(SocketContext);
  const [ticket, setTicket] = useState([]);
  
  useEffect(() => {
    socket.on('asigned-ticket', (asignedTickets) => {
      setTicket(asignedTickets)
    })

    return () => {
      socket.off('asigned-ticket')
    }
  }, [socket])

  useEffect(() => {
    getLasts().then( setTicket )
  }, [])

  return (
    <div>
      <Title level={1}>
        Serving the client
      </Title>
      <Row>
        <Col span={12}>
          <List 
            dataSource={ ticket.slice(0,3) }
            renderItem={ item => (
              <List.Item>
                <Card 
                  style={{ width: 300, marginTop: 16}}
                  actions={[
                    <Tag color="volcano">
                      {item.agent}
                    </Tag>,
                    <Tag color="magenta">
                      Desktop: {item.desktop}
                    </Tag>
                  ]}
                >
                  <Title>
                    No. {item.number}
                  </Title>
                </Card>
              </List.Item>
            ) }
          />
        </Col>
        <Col span={12}>

          <Divider> History </Divider>
          <List 
            dataSource={ ticket.slice(3) }
            renderItem={
              item => (
                <List.Item>
                  <List.Item.Meta
                    title={`Ticket No. ${ item.number }`} 
                    description={
                      <>
                        <Text type='secondary'> Desktop: </Text>
                        <Tag color='magenta'>{ item.number }</Tag>
                        <Text type='secondary'> Agent: </Text>
                        <Tag color='magenta'>{ item.agent }</Tag>
                      </>
                    }
                  />
                </List.Item>
              )
            }
          />
 
        </Col>
        
      </Row>
        
    </div>
  )
}
