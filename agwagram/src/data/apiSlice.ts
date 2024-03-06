import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../Global';

const baseQuery = fetchBaseQuery({
    baseUrl: API_URL
});

// Define a service using a base URL and expected endpoints
export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQuery,
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
        setAnalyzeUser: builder.mutation<any, string>({
            query: (username) => {
                return {
                    url: `/analyze/user`,
                    method: 'POST',
                    body: { username }
                };
            },
            transformResponse(response: any) {
                console.log(response);
                return response;
            }
        }),
        setAnalyzeFiles: builder.mutation<any, File[]>({
            query: (files) => {
                const formData = new FormData();
                files.forEach((file: File) => {
                    formData.append('tweet_files', file);
                });

                return {
                    url: `/analyze/file`,
                    method: 'POST',
                    body: formData
                };
            },
            transformResponse(response: any) {
                console.log(response);
                return response;
            }
        })
    })
});

export const { useGetSymbolsQuery, useGetDefinitionQuery, useSetAnalyzeUserMutation, useSetAnalyzeFilesMutation } = api;
