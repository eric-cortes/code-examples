"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";

import { useAppContext } from "@/context/appContext";
import useFetch from "@/hooks/useFetch";
import useObjectsStore, { type ObjectsData, type ResourceState } from "@/stores/objectsStore";

type ResourceKey = keyof ObjectsData;
type ResourceDefinition = {
	key: ResourceKey;
	url: string | null;
	revalidateOnFocus?: boolean;
};

function ResourceSync({ resource }: { resource: ResourceDefinition }) {
	const setObjectsData = useObjectsStore((state) => state.setObjectsData);
	const { data, error, isLoading } = useFetch<unknown[]>(resource.url, {
		revalidateOnFocus: resource.revalidateOnFocus,
	});

	useEffect(() => {
		const nextState: ResourceState<unknown[]> = {
			data: data ?? [],
			error,
			isLoading,
		};
		setObjectsData({ [resource.key]: nextState });
	}, [data, error, isLoading, resource.key, setObjectsData]);

	return null;
}

export function ObjectsProvider({ children }: { children: React.ReactNode }) {
	const { currentTenant, isGlobalOn } = useAppContext();
	const { data: session, status } = useSession();
	const isSessionReady = status === "authenticated" && Boolean(session?.accessToken);
	const tenantId = encodeURIComponent(currentTenant);

	const resources: ResourceDefinition[] = [
		{ key: "objectCars", url: isSessionReady ? `/api/cars?tenantId=${isGlobalOn ? "" : tenantId}` : null, revalidateOnFocus: false },
		{ key: "objectCats", url: isSessionReady ? "/api/objects/objectCat" : null },
		{ key: "objectModel", url: isSessionReady ? "/api/objects/objectModel" : null },
		{ key: "objectStatus", url: isSessionReady ? "/api/objects/objectStatus" : null },
		{ key: "users", url: isSessionReady ? `/api/users?tenantId=${tenantId}` : null, revalidateOnFocus: false },
		{ key: "aiModels", url: isSessionReady ? "/api/aimodels" : null, revalidateOnFocus: false },
		{ key: "tenants", url: isSessionReady ? "/api/tenants" : null, revalidateOnFocus: false },
		{ key: "roles", url: isSessionReady ? "/api/roles" : null, revalidateOnFocus: false },
	];

	return (
		<>
			{resources.map((resource) => (
				<ResourceSync key={resource.key} resource={resource} />
			))}
			{children}
		</>
	);
}
