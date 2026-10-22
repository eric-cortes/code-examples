import useSWR, { type SWRConfiguration } from "swr";

type FetchError = Error;

async function fetcher<T>(url: string): Promise<T> {
	const response = await fetch(url);
	if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
	return response.json() as Promise<T>;
}

export default function useFetch<T>(url: string | null, options?: SWRConfiguration<T, FetchError>) {
	const response = useSWR<T, FetchError>(url, fetcher<T>, options);

	return {
		...response,
		isLoading: response.isLoading,
	};
}
