import React from 'react'
import './css/HeroImage.css'
import Image from 'next/image'
const Hero = () => {
    return (
        <section className='heroImage w-full h-[70vh] lg:h-[60vh] flex justify-center items-center'>
            <div className='w-full lg:w-11/12 xl:w-[60%] h-full flex  justify-center items-center'>
                <div className='flex flex-col lg:flex-row justify-evenly lg:justify-between w-full h-full items-center'>
                    <div className='w-full lg:w-1/2'>
                        <h1 className='text-white mb-3 border w-full lg:w-1/2 text-center text-5xl font-bold p-3 hover:bg-white hover:text-primary transition-all ease-in-out'>FLUENT AI</h1>
                        <h2 className='text-white font-bold text-4xl text-center lg:text-left'>Naucz się każdego języka na świecie!</h2>
                        <h2 className='text-white tracking-wider text-center lg:text-left'>Poznaj magię AI i zanurz się w swoim ukochanym języku</h2>
                    </div>
                    <div className='w-full lg:w-1/2 flex relative overflow-hidden hover:scale-105 transition-all ease-in-out'>
                        <Image className='rounded-xl' src={'/screen1.png'} alt='Scr1' width={1000} height={300} />
                        <Image className=' absolute left-[40%] overflow-hidden' alt='Scr2' src={'/phone.png'} width={500} height={300} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero