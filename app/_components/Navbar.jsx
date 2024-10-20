'use client'
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    const { user } = useUser()
    return (
        <header className='w-full h-[70px] flex justify-center items-center shadow-md'>
            <nav className='w-full lg:w-11/12 xl:w-[60%] flex justify-between items-center p-3 lg:p-0'>
                <div>
                    <Link href={'/'}><h2 className='font-bold text-2xl text-primary'>FLUENT AI</h2></Link>
                </div>
                <div>
                    {user ? <div className='flex items-center gap-3'><Link href={'/dashboard'}><Button className='rounded-xl text-white w-[100px]'>Panel</Button></Link><UserButton /></div> : <Link href={'/sign-in'}><Button className='rounded-xl text-white'>Zaloguj się</Button></Link>}
                </div>
            </nav>
        </header>
    )
}

export default Navbar