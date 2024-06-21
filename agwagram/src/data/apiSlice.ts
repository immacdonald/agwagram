import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../config';

const baseQuery = fetchBaseQuery({
	baseUrl: config.apiURL
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
		setAnalyzeUser: builder.mutation<Analysis, string>({
			query: (username) => {
				return {
					url: `/analyze/user`,
					method: 'POST',
					body: { username }
				};
			}
		}),
		setAnalyzeFiles: builder.mutation<Analysis, { files: File[]; changeReport: boolean }>({
			query: (args) => {
				const formData = new FormData();
				args.files.forEach((file: File) => {
					console.log("Type", file);
					formData.append('tweet_files', file);
				});

				// Determine if any file in args.files is a gzip file
				const hasGzipFile = args.files.some(file => file.name.endsWith('.gz'));

				const headers = new Headers();

				// Set the appropriate content type based on whether gzip files are present
				if (hasGzipFile) {
					headers.append('Content-Type', 'application/x-gzip');
				} else {
					headers.append('Content-Type', 'application/json');
				}

				return {
					url: `/analyze/file?change_report=${args.changeReport}`,
					method: 'POST',
					body: formData
				};
			}
		})
	})
});

export const { useGetSymbolsQuery, useGetDefinitionQuery, useSetAnalyzeUserMutation, useSetAnalyzeFilesMutation } = api;
