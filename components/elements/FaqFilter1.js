
'use client'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from "react"

export default function FaqFilter1({ twocol, blogSm }) {
    // Isotope
    const isotope = useRef()
    const [filterKey, setFilterKey] = useState("*")
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        if (!isClient || typeof window === 'undefined') return

        let timeoutId = null

        const initIsotope = async () => {
            const Isotope = (await import("isotope-layout")).default
            timeoutId = setTimeout(() => {
                const gridElement = document.getElementById("masonry-grid")
                if (gridElement && !isotope.current) {
                    isotope.current = new Isotope("#masonry-grid", {
                        itemSelector: ".mesonry-item",
                        // layoutMode: "fitRows",
                        percentPosition: true,
                        masonry: {
                            columnWidth: ".mesonry-item",
                        },
                        animationOptions: {
                            duration: 750,
                            easing: "linear",
                            queue: false,
                        },
                    })
                }
            }, 1000)
        }

        initIsotope()

        return () => {
            if (timeoutId) clearTimeout(timeoutId)
            if (isotope.current) {
                isotope.current.destroy()
                isotope.current = null
            }
        }
    }, [isClient])
    useEffect(() => {
        if (isotope.current) {
            filterKey === "*"
                ? isotope.current.arrange({ filter: `*` })
                : isotope.current.arrange({ filter: `.${filterKey}` })
        }
    }, [filterKey])
    const handleFilterKeyChange = useCallback((key) => () => {
        setFilterKey(key)
    },
        []
    )

    const activeBtn = (value) => (value === filterKey ? "active" : "")
    return (
        <>
            <div className="faq-area section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="mesonry-menu">
                                <ul id="grid-filter">
                                    <li className={activeBtn("*")} onClick={handleFilterKeyChange("*")}>All</li>
                                    <li  className={activeBtn("general")} onClick={handleFilterKeyChange("general")}data-category="general">General</li>
                                    <li  className={activeBtn("security")} onClick={handleFilterKeyChange("security")}data-category="security">Security</li>
                                    <li  className={activeBtn("money")} onClick={handleFilterKeyChange("money")}data-category="money">Moving Money</li>
                                    <li  className={activeBtn("d-card")} onClick={handleFilterKeyChange("d-card")}data-category="d-card">Debit Card</li>
                                    <li  className={activeBtn("pricing")} onClick={handleFilterKeyChange("pricing")}data-category="pricing">Pricing</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="faq-items" id="masonry-grid">
                                <div className="mesonry-item general single-price-list">
                                    <div className="faqs inner-faq">
                                        <h3>General</h3>
                                        <div id="general">
                                            <div className="single-faq">
                                                <h2 className="faq-heading font-f-3 weight-700" id="faq-heading1" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="true" aria-controls="collapse1">
                                                    What is the best way to give a PowerPoint presentation?
                                                </h2>
                                                <div id="collapse1" className="accordion-collapse collapse show" aria-labelledby="faq-heading1" data-bs-parent="#general">
                                                    <p className="font-f-3 weight-500">
                                                        When it comes to business, listen to Henry David
                                                        Thoreau: things usually don’t happen overnight –
                                                        instead, to find success takes a lot of time, effort,
                                                        and courage.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="single-faq">
                                                <h2 className="faq-heading collapsed font-f-3 weight-700" id="faq-heading2" data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapse2">
                                                    Why does Bill Gates want to buy TikTok?
                                                </h2>
                                                <div id="collapse2" className="accordion-collapse collapse" aria-labelledby="faq-heading2" data-bs-parent="#general">
                                                    <p className="font-f-3 weight-500">
                                                        When it comes to business, listen to Henry David
                                                        Thoreau: things usually don’t happen overnight –
                                                        instead, to find success takes a lot of time, effort,
                                                        and courage.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="single-faq">
                                                <h2 className="faq-heading collapsed font-f-3 weight-700" id="faq-heading3" data-bs-toggle="collapse" data-bs-target="#collapse3" aria-expanded="false" aria-controls="collapse3">
                                                    What is the process to become a full-stack web
                                                    developer?
                                                </h2>
                                                <div id="collapse3" className="accordion-collapse collapse" aria-labelledby="faq-heading3" data-bs-parent="#general">
                                                    <p className="font-f-3 weight-500">
                                                        When it comes to business, listen to Henry David
                                                        Thoreau: things usually don’t happen overnight –
                                                        instead, to find success takes a lot of time, effort,
                                                        and courage.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="single-faq">
                                                <h2 className="faq-heading collapsed font-f-3 weight-700" id="faq-heading4" data-bs-toggle="collapse" data-bs-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                                                    How can I be the next Mark Zuckerberg or Bill Gates?
                                                </h2>
                                                <div id="collapse4" className="accordion-collapse collapse" aria-labelledby="faq-heading4" data-bs-parent="#general">
                                                    <p className="font-f-3 weight-500">
                                                        When it comes to business, listen to Henry David
                                                        Thoreau: things usually don’t happen overnight –
                                                        instead, to find success takes a lot of time, effort,
                                                        and courage.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="single-faq">
                                                <h2 className="faq-heading collapsed font-f-3 weight-700" id="faq-heading5" data-bs-toggle="collapse" data-bs-target="#collapse5" aria-expanded="false" aria-controls="collapse5">
                                                    What is Consulotic?
                                                </h2>
                                                <div id="collapse5" className="accordion-collapse collapse" aria-labelledby="faq-heading5" data-bs-parent="#general">
                                                    <p className="font-f-3 weight-500">
                                                        When it comes to business, listen to Henry David
                                                        Thoreau: things usually don’t happen overnight –
                                                        instead, to find success takes a lot of time, effort,
                                                        and courage.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="single-faq">
                                                <h2 className="faq-heading collapsed font-f-3 weight-700" id="faq-heading6" data-bs-toggle="collapse" data-bs-target="#collapse6" aria-expanded="false" aria-controls="collapse6">
                                                    What do i need to appy for an account?
                                                </h2>
                                                <div id="collapse6" className="accordion-collapse collapse" aria-labelledby="faq-heading6" data-bs-parent="#general">
                                                    <p className="font-f-3 weight-500">
                                                        When it comes to business, listen to Henry David
                                                        Thoreau: things usually don’t happen overnight –
                                                        instead, to find success takes a lot of time, effort,
                                                        and courage.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="single-faq">
                                                <h2 className="faq-heading collapsed font-f-3 weight-700" id="faq-heading7" data-bs-toggle="collapse" data-bs-target="#collapse7" aria-expanded="false" aria-controls="collapse7">
                                                    Is my account FIDC Insured?
                                                </h2>
                                                <div id="collapse7" className="accordion-collapse collapse" aria-labelledby="faq-heading7" data-bs-parent="#general">
                                                    <p className="font-f-3 weight-500">
                                                        When it comes to business, listen to Henry David
                                                        Thoreau: things usually don’t happen overnight –
                                                        instead, to find success takes a lot of time, effort,
                                                        and courage.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mesonry-item security single-price-list">
                                    <div className="faqs inner-faq">
                                        <h3>Security</h3>
                                        <div id="security">
                                            <div className="single-faq">
                                                <h2 className="faq-heading font-f-3 weight-700" id="faq-heading8" data-bs-toggle="collapse" data-bs-target="#collapse8" aria-expanded="true" aria-controls="collapse8">
                                                    What is the best way to give a PowerPoint presentation?
                                                </h2>
                                                <div id="collapse8" className="accordion-collapse collapse show" aria-labelledby="faq-heading8" data-bs-parent="#security">
                                                    <p className="font-f-3 weight-500">
                                                        When it comes to business, listen to Henry David
                                                        Thoreau: things usually don’t happen overnight –
                                                        instead, to find success takes a lot of time, effort,
                                                        and courage.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="single-faq">
                                                <h2 className="faq-heading collapsed font-f-3 weight-700" id="faq-heading9" data-bs-toggle="collapse" data-bs-target="#collapse9" aria-expanded="false" aria-controls="collapse9">
                                                    Why does Bill Gates want to buy TikTok?
                                                </h2>
                                                <div id="collapse9" className="accordion-collapse collapse" aria-labelledby="faq-heading9" data-bs-parent="#security">
                                                    <p className="font-f-3 weight-500">
                                                        When it comes to business, listen to Henry David
                                                        Thoreau: things usually don’t happen overnight –
                                                        instead, to find success takes a lot of time, effort,
                                                        and courage.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="single-faq">
                                                <h2 className="faq-heading collapsed font-f-3 weight-700" id="faq-heading10" data-bs-toggle="collapse" data-bs-target="#collapse10" aria-expanded="false" aria-controls="collapse10">
                                                    What is the process to become a full-stack web
                                                    developer?
                                                </h2>
                                                <div id="collapse10" className="accordion-collapse collapse" aria-labelledby="faq-heading10" data-bs-parent="#security">
                                                    <p className="font-f-3 weight-500">
                                                        When it comes to business, listen to Henry David
                                                        Thoreau: things usually don’t happen overnight –
                                                        instead, to find success takes a lot of time, effort,
                                                        and courage.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="single-faq">
                                                <h2 className="faq-heading collapsed font-f-3 weight-700" id="faq-heading11" data-bs-toggle="collapse" data-bs-target="#collapse11" aria-expanded="false" aria-controls="collapse11">
                                                    How can I be the next Mark Zuckerberg or Bill Gates?
                                                </h2>
                                                <div id="collapse11" className="accordion-collapse collapse" aria-labelledby="faq-heading11" data-bs-parent="#security">
                                                    <p className="font-f-3 weight-500">
                                                        When it comes to business, listen to Henry David
                                                        Thoreau: things usually don’t happen overnight –
                                                        instead, to find success takes a lot of time, effort,
                                                        and courage.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="single-faq">
                                                <h2 className="faq-heading collapsed font-f-3 weight-700" id="faq-heading12" data-bs-toggle="collapse" data-bs-target="#collapse12" aria-expanded="false" aria-controls="collapse12">
                                                    What is Consulotic?
                                                </h2>
                                                <div id="collapse12" className="accordion-collapse collapse" aria-labelledby="faq-heading12" data-bs-parent="#security">
                                                    <p className="font-f-3 weight-500">
                                                        When it comes to business, listen to Henry David
                                                        Thoreau: things usually don’t happen overnight –
                                                        instead, to find success takes a lot of time, effort,
                                                        and courage.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mesonry-item money single-price-list">
                                    <div className="faqs inner-faq">
                                        <h3>Moving Money</h3>
                                        <div id="money">
                                            <div className="single-faq">
                                                <h2 className="faq-heading font-f-3 weight-700" id="faq-heading13" data-bs-toggle="collapse" data-bs-target="#collapse13" aria-expanded="true" aria-controls="collapse13">
                                                    What is the best way to give a PowerPoint presentation?
                                                </h2>
                                                <div id="collapse13" className="accordion-collapse collapse show" aria-labelledby="faq-heading13" data-bs-parent="#money">
                                                    <p className="font-f-3 weight-500">
                                                        When it comes to business, listen to Henry David
                                                        Thoreau: things usually don’t happen overnight –
                                                        instead, to find success takes a lot of time, effort,
                                                        and courage.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="single-faq">
                                                <h2 className="faq-heading collapsed font-f-3 weight-700" id="faq-heading14" data-bs-toggle="collapse" data-bs-target="#collapse14" aria-expanded="false" aria-controls="collapse14">
                                                    Why does Bill Gates want to buy TikTok?
                                                </h2>
                                                <div id="collapse14" className="accordion-collapse collapse" aria-labelledby="faq-heading14" data-bs-parent="#money">
                                                    <p className="font-f-3 weight-500">
                                                        When it comes to business, listen to Henry David
                                                        Thoreau: things usually don’t happen overnight –
                                                        instead, to find success takes a lot of time, effort,
                                                        and courage.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="single-faq">
                                                <h2 className="faq-heading collapsed font-f-3 weight-700" id="faq-heading15" data-bs-toggle="collapse" data-bs-target="#collapse15" aria-expanded="false" aria-controls="collapse15">
                                                    What is the process to become a full-stack web
                                                    developer?
                                                </h2>
                                                <div id="collapse15" className="accordion-collapse collapse" aria-labelledby="faq-heading15" data-bs-parent="#money">
                                                    <p className="font-f-3 weight-500">
                                                        When it comes to business, listen to Henry David
                                                        Thoreau: things usually don’t happen overnight –
                                                        instead, to find success takes a lot of time, effort,
                                                        and courage.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="single-faq">
                                                <h2 className="faq-heading collapsed font-f-3 weight-700" id="faq-heading16" data-bs-toggle="collapse" data-bs-target="#collapse16" aria-expanded="false" aria-controls="collapse16">
                                                    How can I be the next Mark Zuckerberg or Bill Gates?
                                                </h2>
                                                <div id="collapse16" className="accordion-collapse collapse" aria-labelledby="faq-heading16" data-bs-parent="#money">
                                                    <p className="font-f-3 weight-500">
                                                        When it comes to business, listen to Henry David
                                                        Thoreau: things usually don’t happen overnight –
                                                        instead, to find success takes a lot of time, effort,
                                                        and courage.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="single-faq">
                                                <h2 className="faq-heading collapsed font-f-3 weight-700" id="faq-heading17" data-bs-toggle="collapse" data-bs-target="#collapse17" aria-expanded="false" aria-controls="collapse17">
                                                    What is Consulotic?
                                                </h2>
                                                <div id="collapse17" className="accordion-collapse collapse" aria-labelledby="faq-heading17" data-bs-parent="#money">
                                                    <p className="font-f-3 weight-500">
                                                        When it comes to business, listen to Henry David
                                                        Thoreau: things usually don’t happen overnight –
                                                        instead, to find success takes a lot of time, effort,
                                                        and courage.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mesonry-item d-card single-price-list">
                                    <div className="faqs inner-faq">
                                        <h3>Debit Card</h3>
                                        <div id="d-card">
                                            <div className="single-faq">
                                                <h2 className="faq-heading font-f-3 weight-700" id="faq-heading18" data-bs-toggle="collapse" data-bs-target="#collapse18" aria-expanded="true" aria-controls="collapse18">
                                                    What is the best way to give a PowerPoint presentation?
                                                </h2>
                                                <div id="collapse18" className="accordion-collapse collapse show" aria-labelledby="faq-heading18" data-bs-parent="#d-card">
                                                    <p className="font-f-3 weight-500">
                                                        When it comes to business, listen to Henry David
                                                        Thoreau: things usually don’t happen overnight –
                                                        instead, to find success takes a lot of time, effort,
                                                        and courage.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="single-faq">
                                                <h2 className="faq-heading collapsed font-f-3 weight-700" id="faq-heading19" data-bs-toggle="collapse" data-bs-target="#collapse19" aria-expanded="false" aria-controls="collapse19">
                                                    Why does Bill Gates want to buy TikTok?
                                                </h2>
                                                <div id="collapse19" className="accordion-collapse collapse" aria-labelledby="faq-heading19" data-bs-parent="#d-card">
                                                    <p className="font-f-3 weight-500">
                                                        When it comes to business, listen to Henry David
                                                        Thoreau: things usually don’t happen overnight –
                                                        instead, to find success takes a lot of time, effort,
                                                        and courage.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="single-faq">
                                                <h2 className="faq-heading collapsed font-f-3 weight-700" id="faq-heading20" data-bs-toggle="collapse" data-bs-target="#collapse20" aria-expanded="false" aria-controls="collapse20">
                                                    What is the process to become a full-stack web
                                                    developer?
                                                </h2>
                                                <div id="collapse20" className="accordion-collapse collapse" aria-labelledby="faq-heading20" data-bs-parent="#d-card">
                                                    <p className="font-f-3 weight-500">
                                                        When it comes to business, listen to Henry David
                                                        Thoreau: things usually don’t happen overnight –
                                                        instead, to find success takes a lot of time, effort,
                                                        and courage.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="single-faq">
                                                <h2 className="faq-heading collapsed font-f-3 weight-700" id="faq-heading21" data-bs-toggle="collapse" data-bs-target="#collapse21" aria-expanded="false" aria-controls="collapse21">
                                                    How can I be the next Mark Zuckerberg or Bill Gates?
                                                </h2>
                                                <div id="collapse21" className="accordion-collapse collapse" aria-labelledby="faq-heading21" data-bs-parent="#d-card">
                                                    <p className="font-f-3 weight-500">
                                                        When it comes to business, listen to Henry David
                                                        Thoreau: things usually don’t happen overnight –
                                                        instead, to find success takes a lot of time, effort,
                                                        and courage.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="single-faq">
                                                <h2 className="faq-heading collapsed font-f-3 weight-700" id="faq-heading22" data-bs-toggle="collapse" data-bs-target="#collapse22" aria-expanded="false" aria-controls="collapse22">
                                                    What is Consulotic?
                                                </h2>
                                                <div id="collapse22" className="accordion-collapse collapse" aria-labelledby="faq-heading22" data-bs-parent="#d-card">
                                                    <p className="font-f-3 weight-500">
                                                        When it comes to business, listen to Henry David
                                                        Thoreau: things usually don’t happen overnight –
                                                        instead, to find success takes a lot of time, effort,
                                                        and courage.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mesonry-item pricing single-price-list">
                                    <div className="faqs inner-faq">
                                        <h3>Pricing</h3>
                                        <div id="pricing">
                                            <div className="single-faq">
                                                <h2 className="faq-heading font-f-3 weight-700" id="faq-heading23" data-bs-toggle="collapse" data-bs-target="#collapse23" aria-expanded="true" aria-controls="collapse23">
                                                    What is the best way to give a PowerPoint presentation?
                                                </h2>
                                                <div id="collapse23" className="accordion-collapse collapse show" aria-labelledby="faq-heading23" data-bs-parent="#pricing">
                                                    <p className="font-f-3 weight-500">
                                                        When it comes to business, listen to Henry David
                                                        Thoreau: things usually don’t happen overnight –
                                                        instead, to find success takes a lot of time, effort,
                                                        and courage.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="single-faq">
                                                <h2 className="faq-heading collapsed font-f-3 weight-700" id="faq-heading24" data-bs-toggle="collapse" data-bs-target="#collapse24" aria-expanded="false" aria-controls="collapse24">
                                                    Why does Bill Gates want to buy TikTok?
                                                </h2>
                                                <div id="collapse24" className="accordion-collapse collapse" aria-labelledby="faq-heading24" data-bs-parent="#pricing">
                                                    <p className="font-f-3 weight-500">
                                                        When it comes to business, listen to Henry David
                                                        Thoreau: things usually don’t happen overnight –
                                                        instead, to find success takes a lot of time, effort,
                                                        and courage.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="single-faq">
                                                <h2 className="faq-heading collapsed font-f-3 weight-700" id="faq-heading25" data-bs-toggle="collapse" data-bs-target="#collapse25" aria-expanded="false" aria-controls="collapse25">
                                                    What is the process to become a full-stack web
                                                    developer?
                                                </h2>
                                                <div id="collapse25" className="accordion-collapse collapse" aria-labelledby="faq-heading25" data-bs-parent="#pricing">
                                                    <p className="font-f-3 weight-500">
                                                        When it comes to business, listen to Henry David
                                                        Thoreau: things usually don’t happen overnight –
                                                        instead, to find success takes a lot of time, effort,
                                                        and courage.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="single-faq">
                                                <h2 className="faq-heading collapsed font-f-3 weight-700" id="faq-heading26" data-bs-toggle="collapse" data-bs-target="#collapse26" aria-expanded="false" aria-controls="collapse26">
                                                    How can I be the next Mark Zuckerberg or Bill Gates?
                                                </h2>
                                                <div id="collapse26" className="accordion-collapse collapse" aria-labelledby="faq-heading26" data-bs-parent="#pricing">
                                                    <p className="font-f-3 weight-500">
                                                        When it comes to business, listen to Henry David
                                                        Thoreau: things usually don’t happen overnight –
                                                        instead, to find success takes a lot of time, effort,
                                                        and courage.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="single-faq">
                                                <h2 className="faq-heading collapsed font-f-3 weight-700" id="faq-heading27" data-bs-toggle="collapse" data-bs-target="#collapse27" aria-expanded="false" aria-controls="collapse27">
                                                    What is Consulotic?
                                                </h2>
                                                <div id="collapse27" className="accordion-collapse collapse" aria-labelledby="faq-heading27" data-bs-parent="#pricing">
                                                    <p className="font-f-3 weight-500">
                                                        When it comes to business, listen to Henry David
                                                        Thoreau: things usually don’t happen overnight –
                                                        instead, to find success takes a lot of time, effort,
                                                        and courage.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="faq-notic">
                            <h4>
                                If you still have other questions, please visit our
                                <Link href="/contact-1">Contact Us</Link> for get help.
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
