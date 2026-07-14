import { create } from 'zustand';

export type ObjectsData = {
    objectCars: any;
    objectsCarsError: any;
    objectsCarsIsLoading: boolean;
    objectCats: any;
    objectsCatsError: any;
    objectsCatsIsLoading: boolean;
    objectModel: any;
    objectsModelError: any;
    objectsModelIsLoading: boolean;
    objectStatus: any;
    objectsStatusError: any;
    objectsStatusIsLoading: boolean;
    aiModels: any;
    aiModelsError: any;
    aiModelsIsLoading: boolean;
    tenants: any;
    tenantsError: any;
    tenantsIsLoading: boolean;
    roles: any;
    rolesError: any;
    rolesIsLoading: boolean;
    users: any[];
    usersError: any;
    usersIsLoading: boolean;
};

interface ObjectsStore {
    objectsData: ObjectsData;
    setObjectsData: (data: Partial<ObjectsData>) => void;
    handleError: (error: any, source: string) => void;
}

const useObjectsStore = create<ObjectsStore>(set => ({
    objectsData: {
        objectCars: [],
        objectsCarsError: null,
        objectsCarsIsLoading: false,
        objectCats: [],
        objectsCatsError: null,
        objectsCatsIsLoading: false,
        objectModel: [],
        objectsModelError: null,
        objectsModelIsLoading: false,
        objectStatus: [],
        objectsStatusError: null,
        objectsStatusIsLoading: false,
        aiModels: [],
        aiModelsError: null,
        aiModelsIsLoading: false,
        tenants: [],
        tenantsError: null,
        tenantsIsLoading: false,
        roles: [],
        rolesError: null,
        rolesIsLoading: false,
        users: [],
        usersError: null,
        usersIsLoading: false
    },
    setObjectsData: (data: Partial<ObjectsData>) =>
        set((state) => ({
            objectsData: {
                ...state.objectsData,
                ...data
            }
        })),
    handleError: (error: any, source: string) => {
        console.error(`Error in ${source}:`, error);
    },
}));

export default useObjectsStore;
