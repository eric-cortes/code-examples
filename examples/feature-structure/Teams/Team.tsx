import { Text, Button, Modal, Checkbox } from 'rds-ui-system';
import TeamEditForm from './TeamEditForm'
import { useState } from 'react';
import { useBreakpoint } from '@/util/useBreakpoint';
import useObjetcsStore from '@/stores/objectsStore';

interface Props {
    data: any;
    handleAddTeam: (item: any) => void;
    isChecked: boolean
}

export default function Team({ data, handleAddTeam, isChecked }: Props) {
    const { objectsData: { objectStatus: responsibilities }, } = useObjetcsStore();
    const breakpoint = useBreakpoint();
    const [openModalEditDriver, setOpenModalEditDriver] = useState(false)

    const getWidth = (breakpoint: any) => {
        if (breakpoint === 'lg') {
            return "40em";
        } else if (breakpoint === 'md') {
            return "40em";
        }
        else if (breakpoint === 'sm') {
            return "36em";
        } else {
            return "24em";
        }
    };

    const getResponsibilityNames = (responsibilityIds: string[]) => {
        return responsibilityIds
            .map((id: string) => {
                const responsibility = responsibilities.find((res: any) => res.id === id);
                return responsibility ? responsibility.name : null;
            })
            .filter(Boolean)
            .join(', ');
    };

    return (
        <>
            <div
                key={data.id}
                className="md:!items-center space-y-0 lg:space-y-0 w-full grid-cols-8 gap-2 my-0 p-2 md:!p-0 rounded bg-slate-100 md:bg-transparent
                md:!grid lg:!grid place-items-center [&>*]:mb-0 [&>*]:lg:mb-0 relative flex flex-col items-start"
            >
                <div className="mx-[0.2em]">
                    <Checkbox
                        id="Checkbox"
                        onChange={() => handleAddTeam(data)}
                        checked={isChecked}
                    />
                </div>
                <div className='flex col-span-2'>
                    <Text>{data && data.name}</Text>
                </div>
                <div className='flex'>
                    <Text>Arbeit</Text>
                </div>
                <div className='flex col-span-2'>
                    <div className='overflow-hidden w-[8em]'>
                        <Text
                            customClasses='w-[50em]'
                            title={getResponsibilityNames(data.responsibilities) || 'Keine Zuständigkeiten'}
                        >
                            {getResponsibilityNames(data.responsibilities) || 'Keine Zuständigkeiten'}
                        </Text>
                    </div>
                </div>
                <Text
                    title={`${data && data.homebaseAddress}`}
                >
                    {data.homebaseAddress}
                </Text>
                <Button
                    type="button"
                    variant='ICON'
                    iconName="Info"
                    isOutlined
                    customClasses="w-[3em] ml-auto md:mr-auto"
                    onClick={() => {
                        setOpenModalEditDriver(true)
                    }}
                />
            </div>
            {openModalEditDriver && (
                <Modal
                    width={getWidth(breakpoint)}
                    onClick={() => setOpenModalEditDriver(false)}
                >
                    <TeamEditForm
                        setOpenModalEditDriver={setOpenModalEditDriver}
                        formData={data}
                    />
                </Modal>
            )}
        </>
    )
}
