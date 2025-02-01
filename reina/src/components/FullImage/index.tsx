import Image from "next/image";

interface Props {
    srcOne: string
    title?: string
    text?: string
}

export default function FullImage({ srcOne, title, text }: Props) {

    return (
        <>
            <div className="w-[100vw] h-[100%] items-center flex justify-center">
                {title && (
                    <>
                        <div className="absolute text-white z-10">
                            <h1 className="w-auto text-center lg:text-left leading-[1] uppercase justify-center">{title}</h1>
                            <p className="w-auto text-center italic text-[2.1em] lg:text-[2.6em]">{text}</p>
                        </div>
                        <div className="bg-black absolute w-full h-full opacity-[0.1] top-0"></div>
                    </>
                )}
                <Image
                    alt="reina eterna"
                    width={3000}
                    height={3000}
                    priority
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                    src={srcOne}
                />
            </div>
        </>
    )
}