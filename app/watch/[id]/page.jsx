'use client'
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import GlobalApi, { db } from '@/api/GlobalApi';
import Image from 'next/image';
import LearnSection from './_components/LearnSection';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Navbar from '@/app/_components/Navbar';

const Page = ({ params }) => {
    const { user } = useUser();
    const email = user?.primaryEmailAddress?.emailAddress;
    const courseId = params?.id;
    const [course, setCourse] = useState([]);
    const [emailMatch, setEmailMatch] = useState(false);
    const [subscription, setSubscription] = useState(null)
    const router = useRouter()
    useEffect(() => {
        if (courseId) {
            GetCourseData();
        }
    }, [courseId]);
    useEffect(() => {
        if (emailMatch) {
            router.push('/')
        }
    }, [user])

    const GetCourseData = async () => {
        try {
            const docRef = doc(db, 'AICourse', courseId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const courseData = docSnap.data();
                setCourse(courseData);

                if (courseData?.email === email) {
                    setEmailMatch(true);
                }
            } else {
                console.log("No such document");
            }
        } catch (error) {
            console.error("Error fetching document: ", error);
        }
    };
    const checkSub = async () => {
        const result = await GlobalApi.GetSubscriptionInfo(email)
        const users = result.data.data[0]
        setSubscription(users?.Subscription)
    }
    useEffect(() => {
        checkSub()
    }, [user])

    return (
        <>
            <Navbar />
            <main className='w-full h-auto flex flex-col justify-center items-center'>
                <div className={`${subscription ? 'hidden' : 'absolute'} flex z-50 flex-col justify-center items-center w-full h-screen bg-white left-0 top-0`}>
                    <h2 className='text-3xl'>Nie masz aktywnej subskrypcji</h2>
                    <p>Aby używać programu zakup subskrypcje</p>
                    <Link className='w-1/2 mt-3' href={'/dashboard/subscription'}><Button className="w-full text-white rounded-xl">Kup teraz</Button></Link>
                </div>
                <div className='w-full lg:w-11/12 xl:w-[60%] h-full flex flex-col'>
                    <div className={`${emailMatch ? 'absolute' : 'hidden'} w-[600px] h-[300px] bg-red-600 text-white top-[50%] left-[25%] border-2 p-3 -translate-y-[50%] flex justify-center items-center`}>
                        <h2>UWAGA EMAIL NIE ZGADZA SIĘ Z BAZĄ DANYCH</h2>
                    </div>
                    <div className='mt-10'>
                        <h2 className='text-center font-bold text-3xl'>
                            Witaj w kursie języka {course?.userSelection?.langValue}
                        </h2>
                        <p className='text-center text-xl'>
                            Mamy nadzieję, że będziesz się świetnie bawił
                        </p>
                    </div>

                    <div className='w-full h-[20vh] mt-5 relative'>
                        <Image className='rounded-xl' src={'/earth.jpg'} alt='earth' layout='fill' />
                    </div>


                    <div className='mt-10'>
                        <h2 className='text-center font-bold text-2xl'>Pora zaczynać zabawę!</h2>
                        <LearnSection course={course.courseInfo} />
                    </div>
                </div>
            </main>
        </>
    );
};

export default Page;
