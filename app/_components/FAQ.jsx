import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const FAQ = () => {
    return (
        <section className='w-full h-auto flex justify-center items-center'>
            <div className='w-full lg:w-11/12 xl:w-[60%] px-2'>
                <h2 className='mt-5 text-center text-5xl font-bold text-primary uppercase'>FAQ</h2>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className='text-left font-bold text-primary'>1. Czym jest FluentAI?</AccordionTrigger>
                        <AccordionContent className='text-left'>
                            FluentAI to innowacyjna platforma e-learningowa, która wykorzystuje sztuczną inteligencję do tworzenia spersonalizowanych planów nauki języka obcego. Dzięki naszym zaawansowanym narzędziom, możesz uczyć się w tempie dostosowanym do Twoich potrzeb i celów.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className='text-left font-bold text-primary'>2. Jak działa FluentAI?</AccordionTrigger>
                        <AccordionContent className='text-left'>
                            Po zarejestrowaniu się w FluentAI, nasza AI zapyta o Twoje cele językowe, aktualny poziom znajomości języka i dostępny czas na naukę. Na tej podstawie wygeneruje dla Ciebie spersonalizowany plan nauki, który pozwoli Ci efektywnie i konsekwentnie rozwijać swoje umiejętności językowe.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className='text-left font-bold text-primary'>3. Ile kosztuje korzystanie z FluentAI?</AccordionTrigger>
                        <AccordionContent className='text-left'>
                            FluentAI oferuje jedną prostą subskrypcję w cenie 9,99 zł miesięcznie. Jest to bardzo niska cena, zwłaszcza biorąc pod uwagę ogromną wartość, jaką otrzymujesz – spersonalizowany plan nauki dostosowany do Twoich potrzeb, dostęp do interaktywnych lekcji i wsparcie sztucznej inteligencji. Bez tej subskrypcji generowanie planu nauki nie jest możliwe.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger className='text-left font-bold text-primary'>4. Czy mogę przetestować FluentAI przed wykupieniem subskrypcji?</AccordionTrigger>
                        <AccordionContent className='text-left'>
                            Tak, możesz założyć darmowe konto i zapoznać się z podstawowymi funkcjami aplikacji. Jednak aby wygenerować spersonalizowany plan nauki i uzyskać pełny dostęp do wszystkich funkcji, potrzebna jest aktywna subskrypcja.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                        <AccordionTrigger className='text-left font-bold text-primary'>5. Jakie języki mogę się uczyć z FluentAI?</AccordionTrigger>
                        <AccordionContent className='text-left'>
                            FluentAI oferuje naukę wielu języków, od najpopularniejszych, takich jak angielski, hiszpański, czy niemiecki, po mniej popularne języki, jak koreański czy szwedzki. Regularnie dodajemy nowe języki do naszej oferty.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-6">
                        <AccordionTrigger className='text-left font-bold text-primary'>6. Czy FluentAI oferuje wsparcie dla użytkowników?</AccordionTrigger>
                        <AccordionContent className='text-left'>
                            Oczywiście! Jeśli masz jakiekolwiek pytania lub problemy techniczne, nasz zespół wsparcia technicznego jest dostępny, aby Ci pomóc. Możesz skontaktować się z nami poprzez e-mail lub czat na naszej stronie.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </section>
    )
}

export default FAQ