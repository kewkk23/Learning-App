'use client'
import React, { useEffect } from 'react'
import Sidebar from './_components/Sidebar'
import { useUser } from '@clerk/nextjs'
import GlobalApi from '@/api/GlobalApi'
import SideBarMobile from './_components/SideBarMobile'


const layout = ({ children }) => {
  const { user } = useUser()
  const VerifyUser = async () => {
    const result = await GlobalApi.GetUserInfo(user?.primaryEmailAddress?.emailAddress)
    if (result.data.data.length !== 0) {
      return;
    } else {
      try {
        const data = {
          email: user?.primaryEmailAddress?.emailAddress,
          Name: user?.username
        }
        const result = await GlobalApi.CreateNewUser(data)
        return result
      } catch (err) {
        console.log(err);
      }
    }


  }
  useEffect(() => {
    VerifyUser()
  }, [user])
  return (
    <div className='flex'>
      <div className='hidden lg:flex'>
        <Sidebar />
      </div>
      <div className=' absolute lg:hidden right-0'>
        <SideBarMobile />
      </div>
      <div className='w-full px-3 my-10 lg:my-0 '>
        {children}
      </div>
    </div>
  )
}

export default layout