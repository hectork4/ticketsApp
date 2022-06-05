import { useEffect, useMemo, useState } from 'react';
import io from 'socket.io-client'

export const useSocket = ( serverPath) => {
    //useMemo was used in this case to avoid making the connection multiple times if you don't change the serverPath
    const socket = useMemo( () => io(serverPath, {
        transports: ["websocket", "polling"] // use WebSocket first, if available
    }), [serverPath]) ;

    const [online, setOnline] = useState(false);

    useEffect(() => {
        setOnline(socket.connected)
      }, [socket])
    
      useEffect(() => {
        socket.on('connect', () => {
          setOnline(true)
        })
      }, [socket])
    
      useEffect(() => {
        socket.on('disconnect', () => {
          setOnline(false)
        })
      }, [socket])

    return {
        socket,
        online
    }
}