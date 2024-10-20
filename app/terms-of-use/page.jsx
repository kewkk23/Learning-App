import React from 'react'
import Navbar from '../_components/Navbar'

const page = () => {
    return (
        <>
            <Navbar />
            <main className='w-full h-auto flex justify-center items-center'>
                <div className='w-full lg:w-11/12 xl:w-[60%] h-full flex flex-col justify-center items-center'>
                    <h1 className='lg:text-4xl text-3xl text-center mt-5 text-primary font-bold uppercase'>Regulamin korzystania z platformy FluentAI</h1>
                    <div className='mt-2 px-3'>
                        <h2 className='text-2xl font-bold'>1. Postanowienia ogólne</h2>
                        <p className='text-justify text-xl'>1.1. Niniejszy regulamin określa zasady korzystania z platformy e-learningowej FluentAI, dostępnej pod adresem Fluent. 1.2. Korzystanie z platformy FluentAI oznacza akceptację niniejszego regulaminu. 1.3. Platforma FluentAI jest własnością podmiotu, który obecnie nie jest zarejestrowaną firmą. Wszelkie operacje prowadzone są na zasadach indywidualnej działalności.</p>
                        <h2 className='text-2xl font-bold'>2. Rejestracja i użytkowanie konta</h2>
                        <p className='text-justify text-xl'>2.1. Rejestracja w platformie FluentAI jest bezpłatna, jednak pełen dostęp do wszystkich funkcji (w tym generowania planów nauki) jest możliwy wyłącznie po wykupieniu subskrypcji. 2.2. Użytkownik jest odpowiedzialny za podanie prawidłowych danych podczas rejestracji oraz za bezpieczeństwo swojego konta, w tym ochronę hasła. 2.3. FluentAI zastrzega sobie prawo do zablokowania konta użytkownika w przypadku naruszenia postanowień regulaminu.</p>
                        <h2 className='text-2xl font-bold'>3. Subskrypcje i opłaty</h2>
                        <p className='text-justify text-xl'>3.1. Aby uzyskać pełny dostęp do funkcji platformy FluentAI, konieczne jest wykupienie subskrypcji w wysokości 9,99 zł miesięcznie. 3.2. Subskrypcja odnawia się automatycznie co miesiąc, a opłaty są pobierane z wybranego przez użytkownika środka płatności. 3.3. Użytkownik może anulować subskrypcję w dowolnym momencie, jednak dostęp do płatnych funkcji zostanie zachowany do końca opłaconego okresu rozliczeniowego. 3.4. Platforma nie oferuje zwrotów za niewykorzystany okres subskrypcji.</p>
                        <h2 className='text-2xl font-bold'>4. Zakres funkcji platformy</h2>
                        <p className='text-justify text-xl'>4.1. FluentAI oferuje spersonalizowane plany nauki języków obcych, interaktywne lekcje oraz inne funkcje wspierające naukę języków. 4.2. Zakres dostępnych funkcji może się zmieniać, a FluentAI zastrzega sobie prawo do wprowadzania zmian w ofercie bez wcześniejszego powiadomienia użytkowników.</p>
                        <h2 className='text-2xl font-bold'>5. Odpowiedzialność</h2>
                        <p className='text-justify text-xl'>5.1. FluentAI dokłada wszelkich starań, aby platforma działała bez przerw i zgodnie z najwyższymi standardami. Jednakże nie gwarantuje pełnej bezawaryjności oraz nie ponosi odpowiedzialności za czasowe przerwy w dostępie do usług. 5.2. FluentAI nie odpowiada za skutki wynikające z błędnego użytkowania platformy przez użytkownika.</p>
                        <h2 className='text-2xl font-bold'>6. Własność intelektualna</h2>
                        <p className='text-justify text-xl'>6.1. Wszystkie materiały dostępne na platformie FluentAI, w tym teksty, grafiki, oprogramowanie oraz inne treści, są chronione prawem autorskim i stanowią własność podmiotu odpowiedzialnego za platformę. 6.2. Użytkownicy mają prawo korzystać z treści dostępnych na platformie wyłącznie w celach edukacyjnych i osobistych. Jakiekolwiek inne wykorzystanie, w tym komercyjne, bez zgody właściciela platformy, jest zabronione.</p>
                        <h2 className='text-2xl font-bold'>7. Ochrona danych osobowych</h2>
                        <p className='text-justify text-xl'>7.1. FluentAI przetwarza dane osobowe użytkowników zgodnie z obowiązującymi przepisami o ochronie danych osobowych oraz zgodnie z Polityką Prywatności dostępną na stronie Fluent. 7.2. Użytkownik ma prawo wglądu do swoich danych, ich edycji oraz usunięcia w dowolnym momencie.</p>
                        <h2 className='text-2xl font-bold'>8. Postanowienia końcowe</h2>
                        <p className='text-justify text-xl'>8.1. FluentAI zastrzega sobie prawo do wprowadzania zmian w regulaminie. Wszelkie zmiany wchodzą w życie po ich opublikowaniu na stronie internetowej. 8.2. W przypadku pytań dotyczących niniejszego regulaminu, prosimy o kontakt pod adresem e-mail: kew.kul.webdev@gmail.com .</p>
                        <h3 className='text-center mt-4 uppercase text-primary text-2xl lg:text-3xl font-bold'>FluentAI - Twoje wsparcie w nauce języków dzięki sztucznej inteligencji.</h3>
                    </div>
                </div>
            </main>
        </>
    )
}

export default page