import React from 'react'
import Navbar from '../_components/Navbar'

const Page = () => {
    return (
        <>
            <Navbar />
            <main className='w-full h-auto flex justify-center items-center'>
                <div className='w-full lg:w-11/12 xl:w-[60%] flex justify-center items-center'>
                    <div className='w-full mt-4 lg:w-1/2 h-[400px] border p-3 flex flex-col'>
                        <h1 className='text-center text-3xl text-primary font-bold'>Adres kontaktowy</h1>
                        <p className='mt-4 text-xl'>Numer tel: +48 883 790 852</p>
                        <p className='text-xl'>Adres Email: kew.kul.webdev@gmail.com</p>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Page