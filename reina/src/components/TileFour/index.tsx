'use client';
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useInView } from "framer-motion"

interface Props {
    srcOne: string,
    srcTwo: string,
    srcThree: string
    srcFour: string
    video?: boolean
}

export default function TileFour({ srcOne, srcTwo, srcThree, srcFour, video }: Props) {

    const ref = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const isInView = useInView(ref, { once: false, amount: 0.5 });

    const [isMuted, setIsMuted] = useState(true);

    const handlePlay = () => {
        const video = videoRef.current!
        video.muted = !video.muted;
        setIsMuted(!isMuted);
        video.play();
    };

    useEffect(() => {
        if (video !== undefined) {
            const video = videoRef.current!
            if (isInView) {
                console.log('isInView')
                setIsMuted(false);
                video.play();
            } else if (!isInView) {
                console.log('not isInView')
                setIsMuted(true);
                video.pause();

            }
        }
    }, [isInView, video])

    return (
        <>
            <div className="flex">
                <div
                    ref={ref}
                    className="w-[50vw] h-[50vh] [&>*]:hover:scale-[1.01] [&>*]:transition-all [&>*]:duration-1000 overflow-hidden"
                >
                    <Image
                        alt="reina eterna"
                        width={3000}
                        height={3000}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: isInView ? '1' : '0',
                            transition: 'opacity 0.5s ease-in-out 400ms'
                        }}
                        src={srcOne}
                    />
                </div>
                <div className="w-[50vw] h-[50vh] [&>*]:hover:scale-[1.01] [&>*]:transition-all [&>*]:duration-1000 overflow-hidden">
                    <Image
                        alt="reina eterna"
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
            </div>
            <div className="flex">
                <div className="relative w-2/3 h-[50vh] [&>*]:hover:scale-[1.01] [&>*]:transition-all [&>*]:duration-1000 overflow-hidden">
                    {!video ? (
                        <Image
                            alt="reina eterna"
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
                    )
                        :
                        (
                            <>
                                <video
                                    ref={videoRef}
                                    id="customVideo"
                                    className="object-cover w-full h-full"
                                    preload="auto"
                                    muted={isMuted}
                                    loop={true}
                                    playsInline
                                    style={{
                                        opacity: isInView ? '1' : '0',
                                        transition: 'opacity 0.5s ease-in-out 400ms'
                                    }}
                                >
                                    <source src={srcThree} type="video/mp4" />
                                </video>
                                <button
                                    onClick={handlePlay}
                                    className={`absolute top-1/2 left-1/2 w-[4em] h-[4em] transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-full ${!isMuted && 'hidden'}`}
                                >
                                    <Image
                                        alt="reina eterna"
                                        width={3000}
                                        height={3000}

                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain',
                                            opacity: isInView ? '1' : '0',
                                            transition: 'opacity 0.5s ease-in-out 400ms'
                                        }}
                                        src="/icons/play.png"
                                    />
                                </button>
                            </>
                        )
                    }
                </div>
                <div className="w-1/3 h-[50vh] [&>*]:hover:scale-[1.01] [&>*]:transition-all [&>*]:duration-1000 overflow-hidden">
                    <Image
                        alt="reina eterna"
                        width={3000}
                        height={3000}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: '0% 71%',
                            opacity: isInView ? '1' : '0',
                            transition: 'opacity 0.5s ease-in-out 400ms'
                        }}
                        src={srcFour}
                    />
                </div>
            </div>
        </>
    )
}