import React from 'react'
import UsersHeader from './UsersHeader'
import { Outlet } from 'react-router'

const UsersLayout = () => {
  return (
    <>
      <UsersHeader />
      <Outlet />
    </>
  )
}

export default UsersLayout