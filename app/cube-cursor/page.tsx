'use client'

import ThreeCursorCube from "@/components/ThreeCursorCube"

export default function cubeCursor() {
    return (
        <div>
            <div className=''>
                <h1 className='p-5'>Cube will move according to your mouse cursor.</h1>
                <ThreeCursorCube />
            </div>
        </div>
    )
}