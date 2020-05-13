import React from 'react'
import { NavBarItem } from './NavBarItem'
import { HOME_ROUTE, STOCK_FIINDER_ROUTE } from '../router/routes'

const NavBar = () => {
  return (
    <div>
      <NavBarItem route={{ to: HOME_ROUTE, name: 'home' }} />
      <NavBarItem route={{ to: STOCK_FIINDER_ROUTE, name: 'stocks' }} />
    </div>
  )
}
export default NavBar
