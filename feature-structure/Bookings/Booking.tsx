import { Text, Button, Modal, Checkbox, Icon } from 'rds-ui-system';
import { useState } from 'react';
import BookingEditForm from './BookingEditForm'
import { useBreakpoint } from '@/util/useBreakpoint';
import { convertToNormalDate } from '@/util/goodies';
import Image from 'next/image'
import 'react-datepicker/dist/react-datepicker.css';

interface ObjectStatus {
    id: string;
    name: string;
    objectModelId: string;
    readableId: number;
}

interface ObjectModel {
    id: string;
    name: string;
    version: string;
}

interface Props {
    data: any;
    objectStatus: ObjectStatus[];
    objectModel: ObjectModel[];
    handleAddBooking: (item: any) => void;
    isChecked: boolean
    currentPlanDate: string
    currentBookingDate: string
}

export default function Booking({ data, objectStatus, objectModel, handleAddBooking, isChecked, currentPlanDate, currentBookingDate }: Props) {
    const [openModalEditBooking, setOpenModaEditBooking] = useState(false)
    const date = convertToNormalDate(data.bookingDate)
    const breakpoint = useBreakpoint()

    const getWidth = (breakpoint: any) => {
        if (breakpoint === 'lg') {
            return "50em";
        } else if (breakpoint === 'md') {
            return "50em";
        }
        else if (breakpoint === 'sm') {
            return "36em";
        } else {
            return "23em";
        }
    };

    const filteredObjectStatus = Array.isArray(data.objectStatusIds)
        ? objectStatus.filter(obj => data.objectStatusIds.includes(obj.id))
        : [];
    const objectStatusNames = filteredObjectStatus.map(obj => obj.name).join(', ');
    const correctObjectModel = objectModel.find(model => model.id === data.objectModelId);

    return (
        <>
            <div
                key={data.id}
                className="md:!items-center space-y-0 lg:space-y-0 w-full grid-cols-8 gap-2 my-0 p-2 md:!p-0 rounded bg-slate-100 md:bg-transparent
                md:!grid lg:!grid place-items-center [&>*]:mb-0 [&>*]:lg:mb-0 relative flex flex-col items-start"
            >
                <div className="mx-[0.2em]">
                    <Checkbox
                        id="Checkbox in Booking"
                        onChange={() => { handleAddBooking(data) }}
                        checked={isChecked}
                    />
                </div>
                <div className={`flex w-[2.5em] h-[2.5em] rounded overflow-hidden 
                    ${!data.imageUrl.startsWith('https:') && 'bg-black'}`}
                >
                    {data.imageUrl && data.imageUrl.startsWith('https:') && (
                        <Image
                            src={data.imageUrl}
                            width={500}
                            height={500}
                            alt="Picture of the author"
                        />
                    )}
                </div>
                {/* <div className='flex space-x-3 [&>:first-child]:md:hidden'>
                    <Text bold>Model</Text>
                    <Text>{correctObjectModel?.name}</Text>
                </div> */}
                <div className='overflow-hidden md:w-[12em] flex space-x-3 [&>:first-child]:md:hidden col-span-2'>
                    <Text bold>Status</Text>
                    <Text
                        customClasses='w-[50em]'
                        title={data && data.name}
                    >
                        {objectStatusNames}
                    </Text>
                </div>
                <div className='flex space-x-3 [&>:first-child]:md:hidden'>
                    <Icon name="Place" />
                    <Text>{date ? date : 'Nicht Eingegeben'}</Text>
                </div>
                <div className='flex col-span-2'>
                    <div className='overflow-hidden md:w-[10em] flex space-x-3 [&>:first-child]:md:hidden'>
                        <Icon name="CalendarToday" />
                        <Text
                            customClasses='w-[20em]'
                            title={`${data && data.locationAddress.street} ${data && data.locationAddress.number} ${data && data.locationAddress.postCode} ${data && data.locationAddress.place}`}
                        >
                            {data && data.locationAddress.street} {data && data.locationAddress.number} {data && data.locationAddress.postCode} {data && data.locationAddress.place}
                        </Text>
                    </div>
                </div>
                <Button
                    type="button"
                    variant='ICON'
                    iconName="Edit"
                    isOutlined
                    customClasses="w-[3em] ml-auto md:mr-auto"
                    onClick={() => {
                        setOpenModaEditBooking(true)
                    }}
                />
            </div>
            {openModalEditBooking && (
                <Modal
                    width={getWidth(breakpoint)}
                    onClick={() => setOpenModaEditBooking(false)}
                    customClasses='overflow-scroll'
                >
                    <BookingEditForm
                        setOpenModaEditBooking={setOpenModaEditBooking}
                        formData={data}
                        currentPlanDate={currentPlanDate}
                        currentBookingDate={currentBookingDate}
                    />
                </Modal>
            )}
        </>
    )
}