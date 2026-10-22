import { create } from "zustand";

export type ResourceState<T> = {
	data: T;
	error: Error | undefined;
	isLoading: boolean;
};

export type ObjectsData = {
	objectCars: ResourceState<unknown[]>;
	objectCats: ResourceState<unknown[]>;
	objectModel: ResourceState<unknown[]>;
	objectStatus: ResourceState<unknown[]>;
	aiModels: ResourceState<unknown[]>;
	tenants: ResourceState<unknown[]>;
	roles: ResourceState<unknown[]>;
	users: ResourceState<unknown[]>;
};

const createResourceState = (): ResourceState<unknown[]> => ({
	data: [],
	error: undefined,
	isLoading: false,
});

interface ObjectsStore {
	objectsData: ObjectsData;
	setObjectsData: (data: Partial<ObjectsData>) => void;
}

const useObjectsStore = create<ObjectsStore>((set) => ({
	objectsData: {
		objectCars: createResourceState(),
		objectCats: createResourceState(),
		objectModel: createResourceState(),
		objectStatus: createResourceState(),
		aiModels: createResourceState(),
		tenants: createResourceState(),
		roles: createResourceState(),
		users: createResourceState(),
	},
	setObjectsData: (data) =>
		set((state) => ({
			objectsData: { ...state.objectsData, ...data },
		})),
}));

export default useObjectsStore;
