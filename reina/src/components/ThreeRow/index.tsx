'use client';
import { useState, useRef } from "react";
import Image from "next/image";
import { useInView } from "framer-motion"

interface Props {
    srcOne: string,
    srcTwo: string,
    srcThree: string
}

export default function ThreeRow({ srcOne, srcTwo, srcThree }: Props) {
    const [imgLoaded, setImgLoaded] = useState(false);

    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: false, amount: 0.5 });

    return (
        <>
            <div
                ref={ref}
                className="flex [&>*]:[&>*]w-1/3 [&>*]:[&>*]h-[100vh] [&>*]:[&>*]:hover:scale-[1.01] 
                [&>*]:[&>*]:transition-all [&>*]:[&>*]:duration-1000 overflow-hidden"
            >
                <div className={`transition-all duration-700 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}>
                    <Image
                        alt="reina eterna"
                        onLoad={() => {
                            setImgLoaded(true);
                        }}
                        width={3000}
                        height={3000}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: '50% 0%',
                            opacity: isInView ? '1' : '0',
                            transition: 'opacity 0.5s ease-in-out 400ms'
                        }}
                        src={srcOne}
                    />
                </div>
                <div className={`transition-all duration-700 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}>
                    <Image
                        alt="reina eterna"
                        onLoad={() => {
                            setImgLoaded(true);
                        }}
                        width={3000}
                        height={3000}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: isInView ? '1' : '0',
                            transition: 'opacity 0.5s ease-in-out 400ms'
                        }}
                        src={srcTwo}
                    />
                </div>
                <div className={`transition-all duration-700 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}>
                    <Image
                        alt="reina eterna"
                        onLoad={() => {
                            setImgLoaded(true);
                        }}
                        width={3000}
                        height={3000}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: isInView ? '1' : '0',
                            transition: 'opacity 0.5s ease-in-out 400ms'
                        }}
                        src={srcThree}
                    />
                </div>
            </div>
        </>
    )
}