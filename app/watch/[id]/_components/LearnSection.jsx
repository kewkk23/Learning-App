import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const LearnSection = ({ course }) => {
    return (
        <section>
            <div>
                <Accordion className='p-3' type="single" collapsible>
                    {Array.isArray(course) && course.length > 0 ? (
                        course.map((item, index) => (
                            <AccordionItem key={index} value={`item ${index}`}>
                                <AccordionTrigger>Dzień {item?.day} {item?.culture?.title}</AccordionTrigger>
                                <AccordionContent className='text-left'>
                                    <h2 className='text-xl font-bold'>Kultura</h2>
                                    {item?.culture?.content}
                                    <h2 className='text-xl font-bold mt-2'>Dialogi</h2>
                                    {item?.dialogues.map((dialogueItem, dialogueIndex) => (
                                        <div key={dialogueIndex}>
                                            {dialogueItem.dialogue}
                                            {dialogueItem.scene}
                                        </div>
                                    ))}
                                    <h2 className='text-xl font-bold mt-2'>Gramatyka</h2>
                                    {item?.grammar?.explanation}
                                    <h2 className='text-xl font-bold mt-2'>Miejsca które warto odwiedzić</h2>
                                    {item?.places?.title}
                                    {item?.places?.phrases.map((phraseItem, phraseIndex) => (
                                        <div key={phraseIndex}>
                                            <p>{phraseItem.phrase}</p>
                                            <p>Tłumaczenie: {phraseItem.translation}</p>
                                        </div>
                                    ))}
                                    <h2 className='text-xl font-bold mt-2'>Zadania</h2>
                                    {item?.tasks.map((taskItem, taskIndex) => (
                                        <div key={taskIndex}>
                                            <p>{taskItem.task}</p>
                                        </div>
                                    ))}
                                </AccordionContent>
                            </AccordionItem>
                        ))
                    ) : (
                        <p>No course data available.</p>
                    )}
                </Accordion>
            </div>
        </section>
    );
}

export default LearnSection;
