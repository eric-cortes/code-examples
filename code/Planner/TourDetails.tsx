'use client'
import { Heading, Text } from 'rds-ui-system';
import TourDetailsComp from '@/components/Tours/TourDetailsComp'
import { convertToNormalDate } from '@/util/goodies';
import { StatusOpen, StatusDone, StatusStarted } from '@/components/UI';
import useFetch from '@/hooks/useFetch';
import { useAppContext } from '@/context/appContext';

export default function TourDetailsList({ params }: { params: { id: string } }) {
    const { currentTenant } = useAppContext();
    const { id: tourId } = params;
    const { data, error: tourError, isLoading: tourLoading } = useFetch(`/api/tours/${tourId}?currentTenant=${currentTenant}`);

    const confirmed = data && data?.booking?.filter((item: any) => item.pickupStatus === "CONFIRMED")
    const activity = data && data?.booking?.filter((item: any) => item.pickupStatus === "COMPLETED" || item.pickupStatus === "CANCELLED")

    const confirmedSorted = confirmed !== undefined
        ? [...confirmed].sort((a, b) => parseInt(a.sequence) - parseInt(b.sequence))
        : [];

    const activitySorted = activity !== undefined
        ? [...activity].sort((a, b) => parseInt(a.updatedAt) - parseInt(b.updatedAt))
        : [];

    const convertedDateCreated = convertToNormalDate(data && data.createdAt);

    // Completed
    const allCompleted = data?.booking.every((bookingItem: any) => bookingItem.pickupStatus === "COMPLETED");
    const allCancelled = data?.booking.every((bookingItem: any) => bookingItem.pickupStatus === "CANCELLED");
    const completedOrCancelledAndNoneConfirmed =
        data?.booking.some((bookingItem: any) => bookingItem.pickupStatus === "COMPLETED") &&
        data?.booking.some((bookingItem: any) => bookingItem.pickupStatus === "CANCELLED") &&
        data?.booking.every((bookingItem: any) => bookingItem.pickupStatus !== "CONFIRMED");

    const statusCompleted = allCompleted || completedOrCancelledAndNoneConfirmed || allCancelled;

    // Open
    const allOpen = data?.booking.every((bookingItem: any) => bookingItem.pickupStatus === "CONFIRMED");
    const confirmedOrCancelledNoneCompleted =
        data?.booking.some((bookingItem: any) => bookingItem.pickupStatus === "CONFIRMED") &&
        data?.booking.some((bookingItem: any) => bookingItem.pickupStatus === "CANCELLED") &&
        data?.booking.every((bookingItem: any) => bookingItem.pickupStatus !== "COMPLETED");
    const statusOpen = allOpen || confirmedOrCancelledNoneCompleted;

    // In Progress
    const confirmedOrCompleted = data?.booking.some((bookingItem: any) => bookingItem.pickupStatus === "COMPLETED") &&
        data?.booking.some((bookingItem: any) => bookingItem.pickupStatus === "CONFIRMED");
    const confirmedOrCancelledOrCompleted = data?.booking.some((bookingItem: any) => bookingItem.pickupStatus === "COMPLETED") &&
        data?.booking.some((bookingItem: any) => bookingItem.pickupStatus === "CONFIRMED") &&
        data?.booking.some((bookingItem: any) => bookingItem.pickupStatus === "CANCELLED")
    const statusInProgress = confirmedOrCompleted || confirmedOrCancelledOrCompleted


    const displayDataTest = data && data.booking !== undefined

    function goBack() {
        history.back();
    }

    return (
        <>
            <div className={`w-full md:w-[90vw] p-2 bg-white mx-auto transition-opacity duration-200
                ${displayDataTest ? 'opacity-100' : 'opacity-0'}`}
            >
                <Text bold><span onClick={() => { goBack() }} className="hover:cursor-pointer">Tour</span> &nbsp;&gt; Tour Details</Text>
                <div className='flex items-center space-x-4'>
                    <Text><span className="font-semibold">Tour ID</span> {data && data.readableId}, {convertedDateCreated} <br /></Text>
                    <Text><span className="font-semibold">Fahrer</span> {data?.rider?.user.firstName} {data?.rider?.user.lastName}</Text>
                    {statusCompleted && (<StatusDone />)}
                    {statusOpen && (<StatusOpen />)}
                    {/* if not statusCompleted */}
                    {statusInProgress && (<StatusStarted />)}
                </div>
                <Heading variant='h3'>Austehende Abholungen</Heading>
                {confirmedSorted.map((item: any, index: number) => {

                    return (
                        <div
                            key={index}
                        >
                            <TourDetailsComp
                                data={item}
                            />
                        </div>
                    )
                })}
                <Heading variant='h3'>Tour Aktivitäten</Heading>
                {activitySorted.map((item: any, index: number) => {
                    return (
                        <div
                            key={index}
                        >
                            <TourDetailsComp
                                data={item}
                            />
                        </div>
                    )
                })}
            </div >
        </>
    )
}