'use client'
import GlobalApi from '@/api/GlobalApi'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [myCourses, setMyCourses] = useState([])
    const { user } = useUser()

    const getCourses = async () => {
        if (user?.primaryEmailAddress?.emailAddress) {
            const result = await GlobalApi.GetUserCourses(user.primaryEmailAddress.emailAddress)
            setMyCourses(result.data.data)
        }
    }

    useEffect(() => {
        if (user) {
            getCourses()
        }
    }, [user])

    return (
        <div className='flex flex-col h-auto w-full '>
            <h2 className='text-center mt-5 font-bold text-5xl text-primary'>MOJE KURSY</h2>
            <div className='mt-5 mb-3'>
                {myCourses.length === 0
                    ? <div>Nie masz żadnych kursów</div>
                    : <div className=' flex flex-wrap  w-full h-full gap-1' >{myCourses.map((item, index) => (
                        <Link key={index} className='w-full lg:w-[400px]  flex' href={'/watch/' + item.CourseID}><div className='w-full lg:w-[400px] h-[300px] border rounded-xl hover:border-primary hover:scale-105 cursor-pointer transition-all'>
                            <div className='h-[85%] w-full relative'>
                                <Image className='rounded-xl' src={'/lang.jpg'} alt='image' layout='fill' />
                            </div>
                            <div className='px-3 flex justify-center items-center h-[15%]'>
                                <p className='text-xl lg:text-3xl font-bold text-center'>{item.courseName}</p>
                            </div>
                        </div></Link>
                    ))}</div>
                }
            </div>
        </div>
    )
}

export default Page
