import { Heading, Text, Checkbox } from 'rds-ui-system';
import Team from '@/components/Planner/Teams/Team';
import 'react-datepicker/dist/react-datepicker.css';
import useFetch from '@/hooks/useFetch';
import { useEffect, useState } from 'react';
import { useAppContext } from '@/context/appContext';
import { Loader } from '@/components/Loader/Loader';

interface Props {
    teams: any
    setTeams: (value: any) => void;
}

export default function Teams({ setTeams, teams }: Props) {
    const { currentTenant } = useAppContext();

    const { data: dataSourceTeams, error, isLoading } = useFetch(`/api/teams?tenantId=${encodeURIComponent(currentTenant)}`, {
        revalidateOnFocus: false
    });
    const [filteredTeams, setFilteredTeams] = useState<any[]>([]);

    useEffect(() => {
        if (dataSourceTeams) {
            const filtered = dataSourceTeams.filter((team: any) =>
                Array.isArray(team.responsibilities) && team.responsibilities.length > 0 &&
                Array.isArray(team.drivers) && team.drivers.length > 0
            );
            setFilteredTeams(filtered);
        }
    }, [dataSourceTeams]);


    const handleAddTeam = (item: any) => {
        setTeams((prevRiders: any) => {
            if (prevRiders.includes(item)) {
                return prevRiders.filter((riders: any) => riders !== item);
            } else {
                return [...prevRiders, item];
            }
        });
    };

    const handleSelectAllRiders = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setTeams(filteredTeams);
        } else {
            setTeams([]);
        }
    };

    const displayDataRiders = filteredTeams && filteredTeams.length > 0

    return (
        <>
            <div className="px-2 md:space-y-2">
                <Heading variant='h3'>Teams</Heading>
                <div className='md:h-[50.1vh] lg:h-[45.2vh] overflow-hidden rounded'>
                    <div className="md:my-[1em] w-[100%] mx-auto md:flex md:h-auto">
                        <div className="flex justify-start md:!grid lg:!grid grid-cols-8 gap-2 w-full [&>*]:font-semibold 
                            [&>*]:uppercase place-items-center py-[0.5em] [&>:not(:first-child)]:hidden [&>:not(:first-child)]:md:grid"
                        >
                            <div className='mx-[0.75em] flex space-x-3 [&>:last-child]:md:hidden'>
                                <Checkbox
                                    id="Checkbox All"
                                    onChange={handleSelectAllRiders}
                                    checked={teams.length > 0 ? true : false}
                                />
                                <Text>Alle auswählen</Text>
                            </div>
                            <div className="col-span-2">
                                <Text>Team</Text>
                            </div>
                            <Text>Arbz.</Text>
                            <Text customClasses='col-span-2'>Zuständigkeit</Text>
                            <Text>Homebase</Text>
                            <Text>Edit</Text>
                        </div>
                    </div>
                    {filteredTeams && filteredTeams.length === 0 && (
                        <div className='p-10'>
                            Keine Teams für dieses Datum
                        </div>
                    )}
                    {isLoading && (
                        <>
                            <div className='absolute p-10'>
                                Teams werden geladen
                            </div>
                            <Loader pos='relative' />
                        </>
                    )}
                    <div className={`showScrollBars overflow-y-auto max-h-[50vh] md:pb-[8em] rounded transition-opacity duration-200 
                        border border-1 md:!border-0 ${displayDataRiders ? 'opacity-100' : 'opacity-100'}`}
                    >
                        {filteredTeams && (filteredTeams as Array<any>)
                            .slice()
                            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                            .map((item, i) => {

                                return (
                                    <div
                                        className='flex mb-2 cursor-default md:py-1 md:my-2 transition-color hover:bg-slate-100'
                                        key={i}
                                    >
                                        <Team
                                            data={item}
                                            handleAddTeam={handleAddTeam}
                                            isChecked={teams.includes(item)}
                                        />
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </>
    );
}