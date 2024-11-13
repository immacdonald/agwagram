import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from '@config';
import { setAnalysis } from './settingsSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: config.apiURL
});

// Define a service using a base URL and expected endpoints
export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQuery,
    tagTypes: ['Analysis'],
    endpoints: (builder) => ({
        getSymbols: builder.query<Record<string, string>, void>({
            query: () => '/symbols'
        }),
        getDefinition: builder.query<string | null, string>({
            query: () => '/symbols',
            transformResponse(response: Record<string, string>, _, arg: string) {
                const definitions = [...arg].map((c) => response[c]);
                return definitions.join(', ');
            }
        }),
        setAnalyzeFiles: builder.mutation<Analysis, { files: File[]; changeReport: boolean; sumgramLimit: number; expertMode: boolean }>({
            query: (args) => {
                const formData = new FormData();
                args.files.forEach((file: File) => {
                    formData.append('tweet_files', file);
                });

                return {
                    url: `/analyze/file?change=${args.changeReport}&sumgrams=${args.sumgramLimit}&expert=${args.expertMode}`,
                    method: 'POST',
                    body: formData
                };
            },
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                // Set loading to true
                dispatch(setAnalysis({ loading: true }));

                try {
                    // Wait for the mutation to complete
                    const { data } = await queryFulfilled;
                    // Store the response data in Redux
                    dispatch(setAnalysis({ data }));
                } catch (error) {
                    // Store the error message in Redux
                    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                    dispatch(setAnalysis({ error: errorMessage }));
                }
            }
        })
    })
});

export const { useGetSymbolsQuery, useGetDefinitionQuery, useSetAnalyzeFilesMutation } = api;
