'use client';
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useInView } from "framer-motion"

interface Props {
    srcOne: string
    loop?: boolean
    onVideoEnd?: (swiper?: any) => void;
}

export default function FullVideo({ srcOne, loop, onVideoEnd }: Props) {
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
    }, [isInView])

    useEffect(() => {
        const video = videoRef.current!;
        const handleVideoEnd = () => {
            console.log('end');
            if (onVideoEnd) {
                onVideoEnd();
            }
        };

        video.addEventListener('ended', handleVideoEnd);

        return () => {
            video.removeEventListener('ended', handleVideoEnd);
        };
    }, [onVideoEnd]);

    return (
        <div
            ref={ref}
            className="relative w-[100vw] h-[100%] lg:h-[100vh] flex content-center flex-wrap"
        >
            <video
                ref={videoRef}
                id="customVideo"
                className="object-cover w-full h-auto lg:h-full"
                preload="none"
                //preload="auto"
                muted={isMuted}
                loop={loop !== undefined ? true : false}
                playsInline
                style={{
                    opacity: isInView ? '1' : '0',
                    transition: 'opacity 0.5s ease-in-out 400ms'
                }}
            >
                <source src={srcOne} type="video/mp4" />
            </video>
            <button
                onClick={handlePlay}
                className={`absolute top-1/2 left-1/2 w-[4em] h-[4em] transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-full ${!isMuted && 'hidden'}`}
            >
                <Image
                    alt="reina eterna"
                    width={3000}
                    height={3000}
                    priority
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    src="/icons/play.png"
                />
            </button>
        </div>
    );
}