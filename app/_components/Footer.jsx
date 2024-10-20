import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className='mt-4 bg-primary w-full h-auto flex justify-center items-center'>
            <div className='flex flex-col lg:flex-row gap-3 lg:gap-0 justify-evenly lg:justify-between text-white py-4 items-center w-full lg:w-11/12 xl:w-[60%] h-full'>
                <Link href={'/'}>
                    <h1 className='text-3xl font-bold border p-3 hover:bg-white hover:text-primary transition-all ease-in-out'>FLUENT AI</h1>
                </Link>
                <div className='flex flex-col text-xl uppercase text-center'>
                    <Link className='hover:underline' href={'/terms-of-use'}>Regulamin</Link>
                    <Link className='hover:underline' href={'/kontakt'}>Kontakt</Link>
                    <Link className='hover:underline' target='_blank' href={'https://github.com/kewkk23'}>website by Kewin Kulas</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer