import React from 'react';
import { IAsyncData } from 'models';
import { BASE_URL, INITIAL_ASYNC_DATA } from 'consts';
import axios from 'axios';

export function useAsyncData<T>(path: string, defaultParams?: any): [IAsyncData<T>, (params?: any) => void] {
    const [data, setData] = React.useState<IAsyncData<T>>(INITIAL_ASYNC_DATA);

    const getData = React.useCallback((params?: any) => {
        if (!!path) {
            setData(oldData => ({ ...oldData, loading: true }));
            axios.get<T>(`${BASE_URL}${path}`, { params: params ?? defaultParams }).then(({ data }) => {
                setData(oldData => ({ ...oldData, loading: false, data, error: undefined }));
            }).catch((error) => {
                setData({ data: undefined, loading: false, error: error.toString() });
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path]);

    React.useEffect(() => {
        getData();
    }, [getData]);

    return [data, getData];
}
