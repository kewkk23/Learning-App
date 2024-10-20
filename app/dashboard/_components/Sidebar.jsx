'use client'
import { FilePlus, Podcast, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

const Sidebar = () => {
    const Menu = [
        {
            id: 1,
            name: 'Moje kursy',
            path: '/dashboard',
            icon: <User />
        },
        {
            id: 2,
            name: 'Stwórz kurs',
            path: '/dashboard/create',
            icon: <FilePlus />
        },
        {
            id: 3,
            name: 'Subskrypcja',
            path: '/dashboard/subscription',
            icon: <Podcast />
        }

    ]
    const location = usePathname()
    return (
        <div className=' lg:w-[300px] h-screen shadow-lg lg:flex flex-col justify-center items-center overflow-hidden '>
            <Link className='flex justify-center items-center' href={'/'}><h2 className='font-bold mt-10 text-3xl text-primary'>FLUENT AI</h2></Link>
            <hr className='w-full mt-6' />
            <div className='flex flex-col h-full w-full gap-1 mt-2'>
                {Menu.map((item) => (
                    <Link key={item.id} href={item.path} className={`flex gap-3 p-5 hover:bg-primary cursor-pointer hover:text-white transition-all rounded-xl ${item.path == location ? 'bg-primary text-white' : ''}`}>
                        <p>{item.icon}</p>
                        <p>{item.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Sidebar