import { Button, Input, Heading, Text, Modal, Select } from 'rds-ui-system';
import { SyntheticEvent, useState } from 'react';
import useObjetcsStore from '@/stores/objectsStore';
import { useAppContext } from '@/context/appContext';

interface Props {
    formData: any
    setOpenModalEditDriver: (value: boolean) => void;
}

export default function Comments({ formData, setOpenModalEditDriver }: Props) {
    const { objectsData: { objectStatus: responsibilities }, } = useObjetcsStore();
    const [buttonlabelDelete, setButtonLabelDelete] = useState('Löschen');
    const [openDeleteDriver, setOpenDeleteDriver] = useState(false);

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
            <form
                className={`w-full space-y-10 transition-opacity duration-100
                    ${openDeleteDriver ? 'opacity-0' : 'opacity-100'}`
                }>
                <Heading variant='h2'>{formData && formData.name}</Heading>
                <div className='space-y-4'>
                    <div className='flex md:!flex-col'>
                        <div className='w-1/2'>
                            <Heading variant='h3'>Name</Heading>
                            <Text>{formData.name ? formData.name : 'Nicht eingegeben'}</Text>
                        </div>
                        <div className='w-1/2'>
                            <Heading variant='h3'>Homebase</Heading>
                            <Text>{formData && formData.homebaseAddress ? formData.homebaseAddress : 'Nicht eingegeben'}</Text>
                        </div>
                    </div>
                    <div className='flex w-full space-x-2'>
                        <div className='w-full'>
                            <Heading variant='h3'>Zuständigkeiten</Heading>
                            <Text>{getResponsibilityNames(formData.responsibilities) || 'Keine Zuständigkeiten'}</Text>
                        </div>
                    </div>
                </div>
                <Button
                    type='button'
                    isOutlined
                    variant='ICONPLUS'
                    iconName='Close'
                    customClasses="border-brand-button ml-auto"
                    onClick={() => {
                        setOpenModalEditDriver(false)
                    }}
                >
                    Schliessen
                </Button>
            </form>
        </>
    )
}