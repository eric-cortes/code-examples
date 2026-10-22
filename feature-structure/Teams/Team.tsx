import { useState } from "react";
import { Button, Checkbox, Modal, Text } from "rds-ui-system";

import TeamDetails from "./TeamEditForm";
import { useBreakpoint } from "@/util/useBreakpoint";

type Responsibility = { id: string; name: string };
type TeamData = { id: string; name: string; responsibilities: string[]; drivers: string[]; homebaseAddress?: string; homebaseLat?: number; homebaseLng?: number };
type Props = { data: TeamData; responsibilities: Responsibility[]; onToggle: (team: TeamData) => void; isSelected: boolean };
const getModalWidth = (breakpoint?: string) => breakpoint === "lg" || breakpoint === "md" ? "40em" : breakpoint === "sm" ? "36em" : "24em";

export default function Team({ data, responsibilities, onToggle, isSelected }: Props) {
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);
	const breakpoint = useBreakpoint();
	const responsibilityNames = data.responsibilities.map((id) => responsibilities.find((responsibility) => responsibility.id === id)?.name).filter(Boolean).join(", ");
	return <>
		<div className="relative flex w-full flex-col items-start gap-2 rounded bg-slate-100 p-2 md:grid md:grid-cols-8 md:place-items-center md:bg-transparent md:p-0">
			<div className="mx-[0.2em]"><Checkbox id={`team-${data.id}`} onChange={() => onToggle(data)} checked={isSelected} /></div>
			<div className="col-span-2"><Text>{data.name}</Text></div><Text>Arbeit</Text>
			<div className="col-span-2 max-w-full overflow-hidden"><Text title={responsibilityNames}>{responsibilityNames || "Keine Zuständigkeiten"}</Text></div>
			<Text title={data.homebaseAddress}>{data.homebaseAddress || "Nicht eingegeben"}</Text>
			<Button type="button" variant="ICON" iconName="Info" isOutlined customClasses="ml-auto w-[3em] md:mr-auto" onClick={() => setIsDetailsOpen(true)} />
		</div>
		{isDetailsOpen && <Modal width={getModalWidth(breakpoint)} onClick={() => setIsDetailsOpen(false)}><TeamDetails setOpenModalEditDriver={setIsDetailsOpen} formData={data} responsibilities={responsibilities} /></Modal>}
	</>;
}

export type { Responsibility, TeamData };
