import { Text, Button, Icon, Radio, Modal } from 'rds-ui-system';
import { useState } from 'react';

interface Props {
    data: any;
    setSelectedPlan: (value: []) => void;
    selectedPlan: string[]
}

export default function Plan({ data, selectedPlan, setSelectedPlan }: Props) {
    const [openError, setOpenError] = useState(false);
    const [planInfo, setPlanInfo] = useState(false);

    const handleCheckboxChange = () => {
        if (selectedPlan === data) {
            setSelectedPlan([]);
        } else {
            setSelectedPlan(data);
        }
    };

    // const cleanedString = data && data.requestData
    //     .replace(/\\n/g, '')
    //     .trim();
    // const jsonObject = JSON.parse(cleanedString);

    return (
        <>
            <div
                key={data.id}
                className="md:!items-center space-y-0 lg:space-y-0 w-full grid-cols-5 gap-2 my-0 p-2 md:!p-0 rounded bg-slate-100 md:bg-transparent
                md:!grid lg:!grid place-items-center [&>*]:mb-0 [&>*]:lg:mb-0 relative flex flex-col items-start"
            >
                <div className="mx-[0.1em] md:mx-[0.2em]">
                    <Radio
                        id='select plan'
                        checked={selectedPlan === data}
                        onChange={handleCheckboxChange}
                    />
                </div>
                <div className='flex space-x-3 md:space-x-0 [&>:first-child]:md:hidden'>
                    <Icon name='Info' />
                    <Text>{data && data.readableId}</Text>
                </div>
                <div className='flex space-x-3 md:space-x-0 [&>:first-child]:md:hidden'>
                    <Icon name='AccountCircle' />
                    <Text>{data.summary && data.summary.bookingsCount}</Text>
                    {data && data.status === "ERROR" && (
                        <div
                            className='[&>*]:[&>*]:[&>*]:[&>*]:fill-brand-color-error hover:cursor-pointer'
                            onClick={() => setOpenError(true)}
                        >
                            <Icon name='Error' />
                        </div>
                    )}
                </div>
                <div className='flex space-x-3 md:space-x-0 [&>:first-child]:md:hidden'>
                    <Icon name="Schedule" />
                    <Text>{data && data.summary.tours !== null ? data.summary.tours.length : ' - '}</Text>
                </div>
                {openError && (
                    <div className="fixed w-[20em] md:w-[20em] h-[18em] overflow-scroll bg-white border z-10
                            border-brand-color-error rounded-md margin-auto right-[2em] md:right-[10em] bottom-[10em] p-0">
                        <div className='absolute z-40 top-2 right-0 [&>*]:[&>*]:[&>*]:[&>*]:[&>*]:[&>*]:fill-brand-color-error'>
                            <Button
                                type='button'
                                variant='ICON'
                                iconName='Close'
                                onClick={() => {
                                    setOpenError(false);
                                }}
                            />
                        </div>
                        <div className='p-4 mt-4'>
                            <Text>{data.error !== null && data.error}</Text>
                        </div>
                    </div>
                )}
                <Button
                    type="button"
                    variant='ICON'
                    iconName="MoreHoriz"
                    isOutlined
                    customClasses="w-[3em] ml-auto md:mr-auto"
                    onClick={() => {
                        setPlanInfo(true);
                    }}
                />
            </div >
            {/* {planInfo && (
                <Modal
                    width='80vw'
                    height='80vh'
                    customClasses='overflow-scroll'
                    onClick={() => {
                        setPlanInfo(false);
                    }}
                >
                    <div className="overflow-hidden">
                        <pre className="box-border whitespace-pre-wrap">Info Summary maybe not needed</pre>
                        <pre className="box-border whitespace-pre-wrap">{JSON.stringify(jsonObject, null, 2)}</pre>
                    </div>

                </Modal>
            )} */}
        </>
    );
}