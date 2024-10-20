'use client'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import GlobalApi, { AI_PROMPT, chatSession, db } from '@/api/GlobalApi'
import { Button } from '@/components/ui/button'
import { doc, setDoc } from 'firebase/firestore'
import { useUser } from '@clerk/nextjs'
import { BookText, CalendarClock, GraduationCap, Languages, Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'
const Page = () => {
    const { toast } = useToast()
    const [langValue, setLangValue] = useState('')
    const [levelValue, setLevelValue] = useState('')
    const [daysValue, setDaysValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [subscription, setSubscription] = useState(null)
    const { user } = useUser()
    const router = useRouter()
    const userEmail = user?.primaryEmailAddress?.emailAddress

    const handleClickButton = async () => {
        if (!subscription) {
            toast({
                title: "Nie masz subskrypcji"
            })
            return
        }
        if (loading) {
            return
        }
        if (langValue === '' || levelValue === '' || daysValue === '') {
            toast({
                title: "Proszę uzupełnić wszystkie luki"
            })
            return;
        }
        setLoading(true)
        const finalPrompt = AI_PROMPT
            .replace('{lang}', langValue)
            .replace('{level}', levelValue)
            .replace('{days}', daysValue)
        const result = await chatSession.sendMessage(finalPrompt)
        setLoading(false)
        SaveCourse(result?.response?.text())
    }
    const SaveCourse = async (courseData) => {
        setLoading(true)
        const docID = Date.now().toString()

        let textParse;
        try {
            textParse = typeof courseData === 'string' ? JSON.parse(courseData) : courseData;
        } catch (error) {
            console.error("Error parsing courseData:", error);
            toast({
                title: "Błąd przy przetwarzaniu kursu",
                description: "Nie można przetworzyć danych kursu.",
            });
            setLoading(false);
            return;
        }


        await setDoc(doc(db, "AICourse", docID), {
            userSelection: {
                langValue,
                levelValue,
                daysValue
            },
            courseInfo: textParse,
            userEmail: userEmail,
            id: docID
        });

        const data = {
            CourseID: docID,
            courseName: langValue + ' ' + levelValue,
            userEmail: userEmail
        }

        await GlobalApi.saveCourseInStripe(data)
        setLoading(false)
        router.push('/watch/' + docID)
    }

    const checkSub = async () => {
        const result = await GlobalApi.GetSubscriptionInfo(userEmail)
        const users = result.data.data[0]
        setSubscription(users?.Subscription)
    }
    useEffect(() => {
        checkSub()
    }, [user])
    return (
        <main className='flex flex-col w-full h-auto items-center relative'>
            <div className={`${subscription ? 'hidden' : 'absolute'} flex z-50 flex-col justify-center items-center w-full h-screen bg-white left-0 top-0`}>
                <h2 className='text-3xl'>Nie masz aktywnej subskrypcji</h2>
                <p>Aby używać programu zakup subskrypcje</p>
                <Link className='w-1/2 mt-3' href={'/dashboard/subscription'}><Button className="w-full text-white rounded-xl">Kup teraz</Button></Link>
            </div>
            <div className='w-full lg:w-11/12 xl:w-[60%] flex flex-col'>
                <div className='mt-10'>
                    <h1 className='text-5xl text-primary font-bold text-center flex items-center justify-center gap-2'>Stwórz kurs <GraduationCap size={30} /></h1>
                </div>

                <div className='mt-10'>
                    <h2 className='text-xl text-center lg:text-left font-bold flex gap-2 items-center justify-center lg:justify-start'>Podaj język, którego planujesz się uczyć <BookText /></h2>
                    <Input
                        placeholder='np. angielski'
                        value={langValue}
                        onChange={(e) => setLangValue(e.target.value)}
                        className='mt-2'
                    />
                </div>

                <div className='mt-10'>
                    <h2 className='text-xl text-center lg:text-left font-bold flex gap-2 items-center justify-center lg:justify-start'>Wybierz poziom, którego chcesz się nauczyć <Languages /></h2>
                    <Select onValueChange={(value) => setLevelValue(value)}>
                        <SelectTrigger className="w-full mt-2 z-30">
                            <SelectValue placeholder="Wybierz poziom" />
                        </SelectTrigger>
                        <SelectContent className='bg-white'>
                            <SelectItem value="Podstawowy">Podstawowy</SelectItem>
                            <SelectItem value="Średnio-zaawansowany">Średnio-zaawansowany</SelectItem>
                            <SelectItem value="Zaawansowany">Zaawansowany</SelectItem>
                            <SelectItem value="Ekspert">Ekspert</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className='mt-10'>
                    <h2 className='text-xl text-center lg:text-left font-bold flex gap-2 items-center justify-center lg:justify-start'>Wybierz ilość dni, ile planujesz się uczyć <CalendarClock /></h2>
                    <Select onValueChange={(value) => setDaysValue(value)}>
                        <SelectTrigger className="w-full mt-2 z-30">
                            <SelectValue placeholder="Wybierz ilość dni" />
                        </SelectTrigger>
                        <SelectContent className='bg-white'>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className='mt-10'>
                    <Button onClick={handleClickButton} className={`w-full text-white font-bold rounded-xl ${loading && 'cursor-not-allowed'}`}>{loading ? <Loader2Icon className='animate-spin' /> : 'Wygeneruj'}</Button>
                </div>
            </div>
        </main>
    )
}

export default Page
