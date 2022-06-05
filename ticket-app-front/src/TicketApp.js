import React from 'react'
import { SocketProvider } from './context/SocketContext'
import { UIContextProvider } from './context/uiContext'
import { RouterPage } from './pages/RouterPage'

export const TicketApp = () => {
  return (
    <SocketProvider>
      <UIContextProvider>
          <RouterPage />
      </UIContextProvider>
    </SocketProvider>
  )
}
