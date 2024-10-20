import Image from 'next/image'
import React from 'react'

const About = () => {
    return (
        <section className='w-full h-auto flex justify-center items-center'>
            <div className='flex flex-col w-full lg:w-11/12 xl:w-[60%] h-full'>
                <h2 className='mt-2 text-center text-5xl font-bold text-primary uppercase'>O nas</h2>
                <div className='flex flex-col lg:flex-row mt-3 w-full h-full gap-4 justify-between'>
                    <div className='relative w-full lg:w-1/2 h-[300px]'>
                        <Image className='rounded-xl' src={'/office.jpg'} layout='fill' alt='office' />
                    </div>
                    <div className='w-full lg:w-1/2 flex flex-col gap-3 text-justify tracking-wider px-3'>
                        <p>FluentAI to nowoczesna platforma e-learningowa stworzona z myślą o osobach, które chcą efektywnie opanować wybrany język obcy. Dzięki wykorzystaniu sztucznej inteligencji oraz zaawansowanych narzędzi, nasza aplikacja oferuje spersonalizowane plany nauki, dostosowane do Twoich potrzeb, umiejętności i czasu.</p>
                        <p>Dzięki FluentAI poznasz magię nauki języków wspieraną przez technologię, która dostosowuje się do Ciebie, a nie odwrotnie. Niezależnie od tego, czy dopiero zaczynasz przygodę z nowym językiem, czy chcesz doskonalić swoje umiejętności, FluentAI pomoże Ci osiągnąć zamierzone cele. Dołącz do nas i zacznij swoją podróż językową z FluentAI już dziś!</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About