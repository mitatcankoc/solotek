'use client'
import { useState } from 'react'
export default function QuantityInput() {
    const [value, setValue] = useState(1)

    const handleUpClick = () => {
        setValue(value + 1)
    }

    const handleDownClick = () => {
        setValue(value - 1)
    }

    return (
        <>
            <div className="qty-container">
                <button className="qty-btn-minus btn-light" type="button" onClick={handleDownClick}>
                    <i className="fa fa-minus" />
                </button>
                <input type="text" name="qty" className="input-qty" value={value} onChange={(e) => setValue(e.target.value)} />
                <button className="qty-btn-plus btn-light" type="button" onClick={handleUpClick}>
                    <i className="fa fa-plus" />
                </button>
            </div>
        </>
    )
}