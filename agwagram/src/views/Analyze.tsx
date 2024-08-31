import React, { useEffect, useMemo, useState } from 'react';
import { Accordion, Dropdown, FileUploadPortal, Heading, NullablePrimitive, TabGroup, Text } from 'phantom-library';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { config } from '@config';
import { useSetAnalyzeFilesMutation } from '@data/apiSlice';
import { clearResults, setExample, setLoading, setResults } from '@data/settingsSlice';

const getStaticDataFile = async (file: string, folder: string = '/data'): Promise<File> => {
    if (config.mode == 'production' && file.endsWith('.gz')) {
        const response = await fetch(`${import.meta.env.BASE_URL}/${folder}/${file}`, {
            headers: {
                Accept: 'application/octet-stream'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.statusText}`);
        }

        const data = await response.arrayBuffer();
        // Convert ArrayBuffer to Blob and then to File object
        const blob = new Blob([data], { type: 'application/x-gzip' });
        const fileObj = new File([blob], file, { type: 'application/x-gzip' });
        return fileObj;
    }

    // The browser always decompresses a fetched gzip in local development, this is not preventable
    const response = await fetch(`${folder}/${file}`);
    const data = await response.blob();
    // Convert Blob to File object
    const fileObj = new File([data], file.replace('.gz', ''), { type: 'application/json' });
    return fileObj;
};

const Analyze: React.FC = () => {
    const [setFiles, results] = useSetAnalyzeFilesMutation();
    //const [setUser] = useSetAnalyzeUserMutation();

    const dispatch = useDispatch();

    const submitFiles = (files: File[], example?: string): void => {
        dispatch(clearResults());
        dispatch(setLoading(true));
        if (example) {
            dispatch(setExample(example));
        }
        setFiles({ files, changeReport: false });
    };

    useEffect(() => {
        if (results.isSuccess) {
            dispatch(setResults(results.data!));
        } else if (results.isError) {
            dispatch(setResults((results.error as { data: Analysis }).data));
        }
    }, [results]);

    /*const searchUsername = (username: string) => {
		dispatch(clearResults());
		dispatch(setLoading(true));
		setUser(username);
	};*/

    const submitJsonFile = (file: string): void => {
        getStaticDataFile(file).then((data) => submitFiles([data], file));
    };

    const [selectedFile, setSelectedFile] = useState<number>(-1);

    useEffect(() => {
        if (!results.data && !results.isLoading) {
            // On first load preview one of the example files
            setSelectedFile(config.exampleFilesInitial[Math.floor(Math.random() * config.exampleFilesInitial.length)]);
        }
    }, []);

    /*const [generateChange, setGenerateChange] = useState<boolean>(false);
	const toggleGenerateChange = () => {
		setGenerateChange(!generateChange);
	};*/

    const changedFile = (title: string): void => {
        setSelectedFile(config.exampleFiles.findIndex((file: { title: string }) => file.title == title));
    };

    useEffect(() => {
        if (selectedFile > -1) {
            submitJsonFile(config.exampleFiles[selectedFile].file);
        }
    }, [selectedFile]);

    const helperText = useMemo(() => {
        if (selectedFile > -1) {
            const file = config.exampleFiles[selectedFile];
            return (
                <Link to={`/data/${file.file}`} target="_blank" download>
                    Download {file.title} {file.type} File
                </Link>
            );
        } else {
            return false;
        }
    }, [selectedFile]);

    return (
        <TabGroup
            variant="segmented"
            tabs={[
                {
                    label: 'File',
                    tab: (
                        <div>
                            <Heading minor title="Analyze File" />
                            <Text>Upload tweet file(s) to be analyzed by agwagram.</Text>
                            <Accordion label="File Requirements">
                                <Text>
                                    Files must be in <strong>JSON</strong> or <strong>JSONL</strong> formats and may be uploaded uncompressed or as Gzip files. To upload multiple files at once, please
                                    select all your files in the file selection prompt or drag-and-drop them individually.
                                </Text>
                                <Text>
                                    JSON files must contain the tweet data as a array of Twitter{' '}
                                    <Link to="https://web.archive.org/web/20240615012946/https://developer.x.com/en/docs/twitter-api/v1/data-dictionary/object-model/tweet" target="_blank">
                                        v1.1 tweet
                                    </Link>{' '}
                                    objects. JSONL files must contain a{' '}
                                    <Link to="https://web.archive.org/web/20240615012946/https://developer.x.com/en/docs/twitter-api/v1/data-dictionary/object-model/tweet" target="_blank">
                                        v1.1 tweet
                                    </Link>{' '}
                                    per line, <i>not</i> an account. For more details, download a tweet file from the "Example Files" tab.
                                </Text>
                            </Accordion>
                            <FileUploadPortal submit={submitFiles} />
                            {/*<span>Generate Change Reports <Switch state={generateChange} onChange={() => toggleGenerateChange()} /</span>*/}
                        </div>
                    )
                },
                {
                    label: 'Example Files',
                    tab: (
                        <div>
                            <Heading minor title="Analyze From Examples" />
                            <Text>Test agwagram by selecting from our sample of tweet files.</Text>
                            <Dropdown
                                options={config.exampleFiles.map((file: ExampleFile) => ({ label: file.title, value: file.title }))}
                                placeholder="Select File"
                                onChange={(value: NullablePrimitive) => changedFile(value as string)}
                            />
                            <br />
                            {helperText && <Text>{helperText}</Text>}
                        </div>
                    )
                },
                {
                    label: 'Username',
                    tab: (
                        <div>
                            <Heading
                                minor
                                title={
                                    <>
                                        Analyze By Username <i>(Coming Soon)</i>
                                    </>
                                }
                            />
                            <Text>Search for one or more accounts (separated by a comma) by their current Twitter username.</Text>
                        </div>
                    ),
                    disabled: true
                }
            ]}
        />
    );
};

export { Analyze };
