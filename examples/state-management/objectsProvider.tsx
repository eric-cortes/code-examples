'use client';
import { useEffect, useCallback, useState } from 'react';
import useFetch from '@/hooks/useFetch';
import useObjectsStore from '@/stores/objectsStore';
import { useAppContext } from '@/context/appContext';
import { ObjectsData } from '@/stores/objectsStore';
import { useSession } from 'next-auth/react';

export const ObjectsProvider = ({ children }: { children: React.ReactNode }) => {
    const { currentTenant, isGlobalOn } = useAppContext();
    const { data: session, status } = useSession();
    const [isSessionReady, setIsSessionReady] = useState(false);

    const setObjectsData = useObjectsStore((state) => state.setObjectsData);
    const handleError = useObjectsStore((state) => state.handleError);

    const memoizedSetObjectsData = useCallback((data: Partial<ObjectsData>) => {
        setObjectsData(data);
    }, [setObjectsData]);

    useEffect(() => {
        if (status === 'authenticated' && session?.accessToken) {
            setIsSessionReady(true);
        } else {
            setIsSessionReady(false);
        }
    }, [status, session]);

    const { data: objectCars, error: objectsCarsError, isLoading: objectsCarsIsLoading } = useFetch(isSessionReady ? `/api/cars?tenantId=${isGlobalOn ? '' : currentTenant}` : null, { revalidateOnFocus: false });
    const { data: objectCats, error: objectsCatsError, isLoading: objectsCatsIsLoading } = useFetch(isSessionReady ? `/api/objects/objectCat` : null);
    const { data: objectModel, error: objectsModelError, isLoading: objectsModelIsLoading } = useFetch(isSessionReady ? `/api/objects/objectModel` : null);
    const { data: objectStatus, error: objectsStatusError, isLoading: objectsStatusIsLoading } = useFetch(isSessionReady ? `/api/objects/objectStatus` : null);
    const { data: users, error: usersError, isLoading: usersIsLoading } = useFetch(isSessionReady ? `/api/users?tenantId=${currentTenant}` : null, { revalidateOnFocus: false });
    const { data: aiModels, error: aiModelsError, isLoading: aiModelsIsLoading } = useFetch(isSessionReady ? `/api/aimodels` : null, { revalidateOnFocus: false });
    const { data: tenants, error: tenantsError, isLoading: tenantsIsLoading } = useFetch(isSessionReady ? `/api/tenants` : null, { revalidateOnFocus: false });
    const { data: roles, error: rolesError, isLoading: rolesIsLoading } = useFetch(isSessionReady ? `/api/roles` : null, { revalidateOnFocus: false });


    useEffect(() => {
        if (objectCars) {
            memoizedSetObjectsData({ objectCars, objectsCarsError, objectsCarsIsLoading });
        }
        if (objectsCarsError) {
            handleError(objectsCarsError, 'objectCars');
        }
    }, [objectCars, objectsCarsError, objectsCarsIsLoading, memoizedSetObjectsData, handleError]);

    useEffect(() => {
        if (objectCats) {
            memoizedSetObjectsData({ objectCats, objectsCatsError, objectsCatsIsLoading });
        }
        if (objectsCatsError) {
            handleError(objectsCatsError, 'objectCats');
        }
    }, [objectCats, objectsCatsError, objectsCatsIsLoading, memoizedSetObjectsData, handleError]);

    useEffect(() => {
        if (objectModel) {
            memoizedSetObjectsData({ objectModel, objectsModelError, objectsModelIsLoading });
        }
        if (objectsModelError) {
            handleError(objectsModelError, 'objectModel');
        }
    }, [objectModel, objectsModelError, objectsModelIsLoading, memoizedSetObjectsData, handleError]);

    useEffect(() => {
        if (objectStatus) {
            memoizedSetObjectsData({ objectStatus, objectsStatusError, objectsStatusIsLoading });
        }
        if (objectsStatusError) {
            handleError(objectsStatusError, 'objectStatus');
        }
    }, [objectStatus, objectsStatusError, objectsStatusIsLoading, memoizedSetObjectsData, handleError]);

    useEffect(() => {
        if (users) {
            memoizedSetObjectsData({ users, usersError, usersIsLoading });
        }
        if (usersError) {
            handleError(usersError, 'users');
        }
    }, [users, usersError, usersIsLoading, memoizedSetObjectsData, handleError]);

    useEffect(() => {
        if (aiModels) {
            memoizedSetObjectsData({ aiModels, aiModelsError, aiModelsIsLoading });
        }
        if (aiModelsError) {
            handleError(aiModelsError, 'aiModels');
        }
    }, [aiModels, aiModelsError, aiModelsIsLoading, memoizedSetObjectsData, handleError]);

    useEffect(() => {
        if (tenants) {
            memoizedSetObjectsData({ tenants, tenantsError, tenantsIsLoading });
        }
        if (tenantsError) {
            handleError(tenantsError, 'tenants');
        }
    }, [tenants, tenantsError, tenantsIsLoading, memoizedSetObjectsData, handleError]);

    useEffect(() => {
        if (roles) {
            memoizedSetObjectsData({ roles, rolesError, rolesIsLoading });
        }
        if (rolesError) {
            handleError(rolesError, 'roles');
        }
    }, [roles, rolesError, rolesIsLoading, memoizedSetObjectsData, handleError]);

    return <>{children}</>;
};
