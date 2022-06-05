import React, { createContext, useState } from 'react'

export const UIContext = createContext();

export const UIContextProvider = ({ children }) => {

    const [hide, setHideMenu] = useState(true);

    const showMenu = () => {
        setHideMenu(false)
    }

    const hideMenu = () => {
        setHideMenu(true)
    }

  return (
    <UIContext.Provider value={{
        hide,
        showMenu,
        hideMenu
    }}>
        {children}
    </UIContext.Provider>
  )
}
