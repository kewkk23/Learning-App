import Image from 'next/image'
import React from 'react'

const PaymentOptions = () => {
    return (
        <section className='w-full h-auto flex justify-center items-center'>
            <div className='w-full lg:w-11/12 xl:w-[60%] h-full flex justify-between items-center'>
                <div className='w-[100px] grayscale h-[100px] lg:w-[300px] lg:h-[200px] relative hover:grayscale-0 transition-all ease-in-out'>
                    <Image alt='Visa Logo' src={'/visaLogo.png'} layout='fill' />
                </div>
                <div className='w-[100px] h-[100px] grayscale lg:w-[300px] lg:h-[200px] relative hover:grayscale-0 transition-all ease-in-out'>
                    <Image alt='MasterCard logo' src={'/mastercardlogo.svg'} layout='fill' />
                </div>
                <div className='w-[100px] h-[100px] grayscale lg:w-[300px] lg:h-[200px] relative hover:grayscale-0 transition-all ease-in-out'>
                    <Image alt='gpay logo' src={'/gpay.png'} layout='fill' />
                </div>
            </div>
        </section>
    )
}

export default PaymentOptions