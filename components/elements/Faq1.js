
'use client'
import { useState } from 'react'

export default function Faq1() {
    const [isActive, setIsActive] = useState({
        status: false,
        key: 1,
    })

    const handleClick = (key) => {
        if (isActive.key === key) {
            setIsActive({
                status: false,
            })
        } else {
            setIsActive({
                status: true,
                key,
            })
        }
    }

    return (
        <>
            <div id="faqs">
                <div className="single-faq">
                    <h2 className={isActive.key == 1 ? "faq-heading" : "faq-heading collapsed"} onClick={() => handleClick(1)}>
                        What is the best way to give a PowerPoint presentation?
                    </h2>
                    <div id="collapse1" className={isActive.key == 1 ? "accordion-collapse collapse show" : "accordion-collapse collapse"}>
                        <p>
                            When it comes to business, listen to Henry David
                            Thoreau: things usually don’t happen overnight –
                            instead, to find success takes a lot of time, effort,
                            and courage.
                        </p>
                    </div>
                </div>
                <div className="single-faq">
                    <h2 className={isActive.key == 2 ? "faq-heading" : "faq-heading collapsed"} onClick={() => handleClick(2)}>
                        Why does Bill Gates want to buy TikTok?
                    </h2>
                    <div id="collapse2" className={isActive.key == 2 ? "accordion-collapse collapse show" : "accordion-collapse collapse"}>
                        <p>
                            When it comes to business, listen to Henry David
                            Thoreau: things usually don’t happen overnight –
                            instead, to find success takes a lot of time, effort,
                            and courage.
                        </p>
                    </div>
                </div>
                <div className="single-faq">
                    <h2 className={isActive.key == 3 ? "faq-heading" : "faq-heading collapsed"} onClick={() => handleClick(3)}>
                        What is the process to become a full-stack web developer?
                    </h2>
                    <div id="collapse3" className={isActive.key == 3 ? "accordion-collapse collapse show" : "accordion-collapse collapse"}>
                        <p>
                            When it comes to business, listen to Henry David
                            Thoreau: things usually don’t happen overnight –
                            instead, to find success takes a lot of time, effort,
                            and courage.
                        </p>
                    </div>
                </div>
                <div className="single-faq">
                    <h2 className={isActive.key == 4 ? "faq-heading" : "faq-heading collapsed"} onClick={() => handleClick(4)}>
                        How can I be the next Mark Zuckerberg or Bill Gates?
                    </h2>
                    <div id="collapse4" className={isActive.key == 4 ? "accordion-collapse collapse show" : "accordion-collapse collapse"}>
                        <p>
                            When it comes to business, listen to Henry David
                            Thoreau: things usually don’t happen overnight –
                            instead, to find success takes a lot of time, effort,
                            and courage.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
