'use client'
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { FilePlus, Menu, Podcast, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SideBarMobile = () => {
    const Menuu = [
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
        <Sheet>
            <SheetTrigger><Menu size={50} color='#3139eb' /></SheetTrigger>
            <SheetContent className='bg-white'>
                <SheetHeader>
                    <SheetTitle><Link href={'/'}><h2 className='font-bold mt-10 text-3xl text-primary'>FLUENT AI</h2></Link></SheetTitle>
                    <SheetDescription>
                        <div className='flex flex-col h-full w-full gap-1 mt-2'>
                            {Menuu.map((item) => (
                                <Link key={item.id} href={item.path} className={`flex gap-3 p-5 hover:bg-primary cursor-pointer hover:text-white transition-all rounded-xl ${item.path == location ? 'bg-primary text-white' : ''}`}>
                                    {item.icon}
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>

    )
}

export default SideBarMobile