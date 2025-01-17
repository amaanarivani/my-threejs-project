'use client'

import ThreeCursorCube from "@/components/ThreeCursorCube"
import ThreeCursorImage from "@/components/ThreeCursorImage"

export default function imageCursor() {
    return (
        <div>
            <div className=''>
                <h1 className='p-5'>Image will move according to your mouse cursor.</h1>
                <ThreeCursorImage />
            </div>
        </div>
    )
}