'use client';
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useInView } from "framer-motion"

interface Props {
    srcOne: string,
    srcTwo: string,
    srcThree: string
    video?: boolean
    currentSlide?: number
}

export default function TileThree({ srcOne, srcTwo, srcThree, video, currentSlide }: Props) {

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

    const [imgLoaded, setImgLoaded] = useState(false);

    return (
        <>
            <div
                ref={ref}
                className="relative w-[100vw] h-[28%] lg:h-[50vh] [&>*]:hover:scale-[1.01] [&>*]:transition-all 
                [&>*]:duration-1000 overflow-visible lg:overflow-hidden bg-black"
                style={{ textShadow: '3px 4px 8px rgba(0,0,0,0.6)' }}
            >
                <div className="absolute text-white w-[80vw] lg:w-[60em] z-10 ml-10 mt-[5em] lg:mt-[15em]">
                    <h2 className="uppercase font-bold">
                        Por las calles de Rebolo
                    </h2>
                    <p className="text-[1.7em] italic">
                        {currentSlide == 2 ? "“Alegría”, “felicidad”, “paz” y muchas más palabras positivas son asociadas con un barrio en el que las riñas, los atracos y los homicidios son el pan diario. Bien lo dijo Sheyla con el lema con el que se popularizó: “De lejos asusta, pero de cerca enamora”."
                            : "Yovani camina por las calles de su barrio, mientras todo el que le saluda le llama 'Sheyla' o 'La Butaca'. No hay quien no la reconozca, le exprese un saludo, se secretee mientras la ve pasar o simplemente le fije la mirada."
                        }
                    </p>
                </div>
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
                        objectPosition: currentSlide ? '0% 70%' : '0% 28%',
                        opacity: isInView ? '1' : '0',
                        transition: 'opacity 0.5s ease-in-out 400ms'
                    }}
                    src={srcOne}
                />
            </div>
            <div className="flex flex-col lg:flex-row">
                <div className="w-[100vw] h-[33%] lg:w-[50vw] lg:h-[50vh] [&>*]:hover:scale-[1.01] [&>*]:transition-all [&>*]:duration-1000 overflow-hidden">
                    <Image
                        alt="reina eterna"
                        onLoad={() => {
                            setImgLoaded(true);
                        }}
                        width={3000}
                        height={3000}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '0% 100%', opacity: isInView ? '1' : '0', transition: 'opacity 0.5s ease-in-out 400ms' }}
                        src={srcTwo}
                    />
                </div>
                <div className="relative w-[100vw] h-[33%] lg:w-[50vw] lg:h-[50vh] [&>*]:hover:scale-[1.01] [&>*]:transition-all [&>*]:duration-1000 overflow-hidden">
                    {!video ? (
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
                                    //autoPlay
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
                                        onLoad={() => {
                                            setImgLoaded(true);
                                        }}
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
            </div>
        </>
    )
}