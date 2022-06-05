import React, { useContext, useEffect } from 'react'
import { UIContext } from '../context/uiContext'

export const useHideMenu = ( hidden ) => {

    const { showMenu, hideMenu } = useContext(UIContext);

    useEffect( () => {
        if(hidden) {
            showMenu()
        } else {
            hideMenu()
        }
    }, [hidden, showMenu, hideMenu ])
}
