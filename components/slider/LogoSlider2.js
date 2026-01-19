'use client'
import { useState, useEffect } from 'react'
import { Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
    modules: [Autoplay],
    slidesPerView: 5,
    spaceBetween: 30,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    loop: true,
    loopAdditionalSlides: 3,
    speed: 800,
    centeredSlides: false,
    freeMode: false,

    breakpoints: {
        320: {
            slidesPerView: 2,
            spaceBetween: 15,
            loopAdditionalSlides: 2,
        },
        575: {
            slidesPerView: 3,
            spaceBetween: 20,
            loopAdditionalSlides: 2,
        },
        767: {
            slidesPerView: 3,
            spaceBetween: 30,
            loopAdditionalSlides: 3,
        },
        991: {
            slidesPerView: 4,
            spaceBetween: 30,
            loopAdditionalSlides: 3,
        },
        1199: {
            slidesPerView: 5,
            spaceBetween: 30,
            loopAdditionalSlides: 3,
        },
        1350: {
            slidesPerView: 5,
            spaceBetween: 30,
            loopAdditionalSlides: 3,
        },
    }
}

export default function LogoSlider2() {
    const [referanslar, setReferanslar] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchReferanslar = async () => {
            try {
                const res = await fetch('/api/referanslar')
                if (res.ok) {
                    const data = await res.json()
                    setReferanslar(data)
                }
            } catch (error) {
                console.error('Referanslar yüklenirken hata:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchReferanslar()
    }, [])

    // Loading veya veri yoksa statik logolar göster
    if (loading || referanslar.length === 0) {
        return (
            <Swiper {...swiperOptions} className="logos logos2 owl-carousel">
                <SwiperSlide className="single-logo">
                    <img src="/assets/img/re/zebra-logo-horizontal.svg" alt="Zebra Technologies" />
                </SwiperSlide>
                <SwiperSlide className="single-logo">
                    <img src="/assets/img/re/HON logo_200x37 2.png" alt="Honeywell" />
                </SwiperSlide>
                <SwiperSlide className="single-logo">
                    <img src="/assets/img/re/logo.png" alt="Datalogic" />
                </SwiperSlide>
            </Swiper>
        )
    }

    // Referansları 2 kez tekrarla (loop için yeterli slide)
    const slides = [...referanslar, ...referanslar]

    return (
        <>
            <Swiper {...swiperOptions} className="logos logos2 owl-carousel">
                {slides.map((ref, index) => (
                    <SwiperSlide key={`${ref.id}-${index}`} className="single-logo">
                        <img
                            src={ref.logo_url || ref.logo || '/assets/img/placeholder-logo.png'}
                            alt={ref.firma_adi || ref.name || 'Referans'}
                            style={{ maxHeight: '50px', objectFit: 'contain' }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}
