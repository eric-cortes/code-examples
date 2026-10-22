import { useEffect, useMemo } from "react";
import { Checkbox, Heading, Text } from "rds-ui-system";

import Team, { type Responsibility, type TeamData } from "./Team";
import { Loader } from "@/components/Loader/Loader";
import { useAppContext } from "@/context/appContext";
import useFetch from "@/hooks/useFetch";
import useObjectsStore from "@/stores/objectsStore";

type Props = { teams: TeamData[]; setTeams: React.Dispatch<React.SetStateAction<TeamData[]>> };

export default function Teams({ teams, setTeams }: Props) {
	const { currentTenant } = useAppContext();
	const responsibilities = useObjectsStore((state) => state.objectsData.objectStatus.data as Responsibility[]);
	const { data: sourceTeams = [], error, isLoading } = useFetch<TeamData[]>(currentTenant ? `/api/teams?tenantId=${encodeURIComponent(currentTenant)}` : null, { revalidateOnFocus: false });
	const eligibleTeams = useMemo(() => sourceTeams.filter((team) => team.responsibilities.length > 0 && team.drivers.length > 0), [sourceTeams]);
	const selectedIds = useMemo(() => new Set(teams.map(({ id }) => id)), [teams]);

	useEffect(() => { const availableIds = new Set(eligibleTeams.map(({ id }) => id)); setTeams((current) => current.filter(({ id }) => availableIds.has(id))); }, [eligibleTeams, setTeams]);
	const toggleTeam = (team: TeamData) => setTeams((current) => selectedIds.has(team.id) ? current.filter(({ id }) => id !== team.id) : [...current, team]);

	return <div className="px-2 md:space-y-2"><Heading variant="h3">Teams</Heading><div className="overflow-hidden rounded md:h-[50.1vh] lg:h-[45.2vh]"><div className="grid grid-cols-8 place-items-center gap-2 py-2 font-semibold uppercase"><Checkbox id="select-all-teams" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTeams(event.target.checked ? eligibleTeams : [])} checked={eligibleTeams.length > 0 && teams.length === eligibleTeams.length} /><div className="col-span-2"><Text>Team</Text></div><Text>Arbz.</Text><Text customClasses="col-span-2">Zuständigkeit</Text><Text>Homebase</Text><Text>Edit</Text></div>{error && <div className="p-10">Teams konnten nicht geladen werden.</div>}{isLoading && <Loader pos="relative" />}{!isLoading && !error && eligibleTeams.length === 0 && <div className="p-10">Keine Teams verfügbar</div>}<div className="showScrollBars max-h-[50vh] overflow-y-auto rounded">{eligibleTeams.toSorted((left, right) => left.name.localeCompare(right.name)).map((team) => <div key={team.id} className="mb-2 flex cursor-default md:my-2 md:py-1"><Team data={team} responsibilities={responsibilities} onToggle={toggleTeam} isSelected={selectedIds.has(team.id)} /></div>)}</div></div></div>;
}
