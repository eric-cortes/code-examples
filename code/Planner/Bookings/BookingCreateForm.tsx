'use client';
import { useAppContext } from '@/context/appContext';
import { fadeIn } from '@/util/motion';
import de from 'date-fns/locale/de';
import { motion } from 'framer-motion';
import { Button, Heading, Input, Modal } from 'rds-ui-system';
import { SyntheticEvent, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Car } from '@/models/CarModel';
import { TooltipButton } from "@/components/Tours/TooltipButton/TooltipButton";
import { useRouter } from 'next/navigation';
import useObjetcsStore from '@/stores/objectsStore';

registerLocale('de', de);

interface Props {
    selectedImages: any;
    setSelectedImages?: any;
    users?: any;
    clearClickHandler?: any;
    objectStatus?: string[];
    objectModel?: string[];
    objectCars?: string[];
    objectCats?: string[]
}

export default function TourCreateForm({
    selectedImages,
    setSelectedImages,
    clearClickHandler,
}: Props) {
    const { objectsData: { objectStatus, objectCars, objectModel, objectCats, users }, } = useObjetcsStore();
    const router = useRouter()
    const { currentTenant } = useAppContext();
    const [isEditingItem, setIsEditingItem] = useState(false);
    const [buttonLabel, setButtonLabel] = useState('Speichern');
    /////////////////////////////////////////
    // Date Picker
    const [startDate, setStartDate] = useState(new Date());
    const convertedDateStr = startDate.toISOString();

    const [editedData, setEditedData] = useState({
        name: '',
        externalEmployee: ''
    });

    function clearForm() {
        setIsEditingItem(false);
        setButtonLabel('Speichern');
        setSelectedImages([]);
        clearClickHandler();
    }

    async function handleSave(event: SyntheticEvent) {
        event.preventDefault();
        setButtonLabel('Wird gespeichert');
        const filteredImages = selectedImages.filter((image: any) => {
            return !(
                image.status === "PLANNED" ||
                image.status === "COMPLETED" ||
                (Array.isArray(image.objectStatusIds) && image.objectStatusIds.includes('5fa3f237298ad1f439edb6cc'))
            );
        });

        const updatedData = {
            ids: filteredImages.map((image: any) => image.id),
            bookingDate: convertedDateStr,
        };
        
        try {
            const res = await fetch(`api/booking?tenantid=${currentTenant}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });
            if (res.ok === true) {
                setButtonLabel('Gespeichert');
                setTimeout(() => {
                    clearForm();
                    router.push('/tours/planner');
                }, 1500);
            } else {
                setButtonLabel('Error');
                throw new Error('Failed to update item name');
            }
        } catch (error) {
            console.error('Error updating item name:', error);
            setButtonLabel('Add Tour');
        }
    }

    return (
        <>
            {isEditingItem && (
                <Modal
                    width="60vw"
                    height="70vh"
                    onClick={() => {
                        clearForm();
                    }}>
                    <div className="top-modal flex justify-between h-[4em]">
                        <Heading>Auftrag erstellen</Heading>
                        <div onClick={() => clearForm()}
                            className="mt-2 cursor-pointer">
                            <svg
                                width={25}
                                height={24}
                                viewBox="0 0 25 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                preserveAspectRatio="none">
                                <path
                                    d="M24.1673 2.6835L21.8173 0.333496L12.5007 9.65016L3.18398 0.333496L0.833984 2.6835L10.1507 12.0002L0.833984 21.3168L3.18398 23.6668L12.5007 14.3502L21.8173 23.6668L24.1673 21.3168L14.8507 12.0002L24.1673 2.6835Z"
                                    fill="black"
                                />
                            </svg>
                        </div>
                    </div>
                    <motion.div
                        initial="closed"
                        animate={'open'}
                        variants={fadeIn(0.2, 0.2)}
                        aria-labelledby="modal-title"
                        role="dialog"
                        aria-modal="true"
                        className="overflow-y-auto">
                        <form onSubmit={handleSave}>
                            <div className="flex flex-col space-y-6 overflow-y-auto ">
                                <div className="grid items-start w-full grid-cols-2 gap-10 p-1 my-3">
                                    <div className="relative h-[90vh]">
                                        <div className="absolute top-[-0.5em] left-[0.7em] flex z-[1] items-center bg-brand-white rounded justify-start px-1">
                                            <p className="text-xs text-left text-black">Geplantes Datum</p>
                                        </div>
                                        <DatePicker
                                            selected={startDate}
                                            className='h-[3.1em]'
                                            onChange={(date: any) => {
                                                setStartDate(date)
                                                localStorage.setItem('bookingDate', date)
                                            }}
                                            dateFormat="dd.MM.yyyy"
                                        />
                                    </div>
                                    <Input
                                        id='selected-employee'
                                        label="Zugewiesener Mitarbeiter (Freitext)"
                                        placeholder="Nicht eingegeben"
                                        value={editedData.externalEmployee}
                                        onChange={(e) =>
                                            setEditedData({
                                                ...editedData,
                                                externalEmployee: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div
                                    className="flex justify-end w-full bg-brand-white
                                space-x-3 h-[7em] items-end p-[2em] absolute left-0 bottom-0 border-t-[1px]
                                border-brand-grey-light">
                                    <Button
                                        variant="OUTLINED"
                                        type="button"
                                        onClick={() => {
                                            clearForm();
                                        }}>
                                        Abbrechen
                                    </Button>
                                    <Button
                                        type="submit"
                                    //isDisabled={editedData.externalEmployee.trim() !== '' ? false : true}
                                    //isDisabled={startDate !== '' ? false : true}
                                    >
                                        {buttonLabel}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                </Modal>
            )}
            <div className="justify-end flex mt-[-3.5em] mb-[0em] w-auto h-[3em] z-[1]">
                <TooltipButton disabled={selectedImages.length <= 0}
                    onButtonClick={() => {
                        setIsEditingItem(true);
                    }}
                />
            </div>
        </>
    );
}