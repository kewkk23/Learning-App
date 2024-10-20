'use client'
import GlobalApi, { plan } from '@/api/GlobalApi'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const SubscriptionCheck = () => {
    const [subscriptionStatus, setSubscriptionStatus] = useState(null)
    const { user } = useUser()
    const email = user?.primaryEmailAddress.emailAddress

    const fetchSubscriptionStatus = async () => {
        try {
            const result = await GlobalApi.GetSubscriptionInfo(email)
            const users = result.data.data[0]
            setSubscriptionStatus(users.Subscription)
        } catch (err) {
            console.log(err)
            setSubscriptionStatus(false)
        }
    }

    useEffect(() => {
        if (email) {
            fetchSubscriptionStatus()
            GlobalApi.ChangeSubscription(email)
        }
    }, [email])
    const router = useRouter()

    return (
        <div className='w-full h-screen relative'>
            <h2 className=' absolute top-1 lg:top-[20%] text-center w-full font-bold text-5xl text-primary'>Subskrypcje</h2>
            <div className='w-full h-full flex justify-center items-center'>
                <div className='w-[400px] flex gap-3 flex-col p-3 h-[500px] border-2 border-primary rounded-xl'>
                    <h2 className='text-center mt-10 font-bold text-2xl'>PREMIUM</h2>
                    <ul className='flex flex-col gap-3 list-disc ml-3'>
                        <li>Nieograniczony dostęp do twoich kursów</li>
                        <li>Kiedy chcesz i gdzie chcesz</li>
                        <li>Możliwość anulowania subskrypcji w każdej chwili</li>
                        <li>I wiele więcej</li>
                    </ul>
                    <p className='text-center text-2xl text-primary'>Cena: 9.99 zł/miesiąc</p>
                    <div className='w-full flex justify-center'>
                        {subscriptionStatus ? <Button variant='outline' className='text-black w-full rounded-xl border-black hover:bg-black hover:text-white cursor-not-allowed transition-all'>Masz aktywną subskrypcję</Button> : <Link target='_blank' className='w-full' href={plan.link + '?prefilled_email=' + email}><Button className='text-white w-full rounded-xl'>{subscriptionStatus === null ? (
                            <div>Ładowanie...</div>
                        ) : subscriptionStatus ? (
                            <div>Subskrypcja aktywna</div>
                        ) : (
                            <div>Zasubskrybuj</div>
                        )}</Button></Link>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubscriptionCheck
