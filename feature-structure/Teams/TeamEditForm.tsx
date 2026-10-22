import { Button, Heading, Text } from "rds-ui-system";

import type { Responsibility, TeamData } from "./Team";

type Props = { formData: TeamData; responsibilities: Responsibility[]; setOpenModalEditDriver: (value: boolean) => void };

export default function TeamDetails({ formData, responsibilities, setOpenModalEditDriver }: Props) {
	const responsibilityNames = formData.responsibilities.map((id) => responsibilities.find((responsibility) => responsibility.id === id)?.name).filter(Boolean).join(", ");
	return <section className="w-full space-y-10"><Heading variant="h2">{formData.name}</Heading><div className="space-y-4"><div className="flex md:flex-col"><div className="w-1/2"><Heading variant="h3">Name</Heading><Text>{formData.name || "Nicht eingegeben"}</Text></div><div className="w-1/2"><Heading variant="h3">Homebase</Heading><Text>{formData.homebaseAddress || "Nicht eingegeben"}</Text></div></div><Heading variant="h3">Zuständigkeiten</Heading><Text>{responsibilityNames || "Keine Zuständigkeiten"}</Text></div><Button type="button" isOutlined variant="ICONPLUS" iconName="Close" customClasses="ml-auto border-brand-button" onClick={() => setOpenModalEditDriver(false)}>Schliessen</Button></section>;
}
