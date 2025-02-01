
interface Props {
    text?: any
}

export default function InfoText({ text }: Props) {
    return (
        <>
            <div className=" w-[100vw] h-[100%] text-[2em] items-center flex justify-center bg-black">
                <p className="w-[90vw] lg:[70vw] text-white">{text}</p>
            </div>
        </>
    )
}