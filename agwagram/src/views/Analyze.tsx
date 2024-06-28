import React, { useEffect, useMemo, useState } from 'react';
import { Accordion, Dropdown, FileUploadPortal, NullablePrimitive, TabGroup } from 'phantom-library';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { config } from '../config';
import { useSetAnalyzeFilesMutation } from '../data/apiSlice';
import { clearResults, setExample, setLoading, setResults } from '../data/settingsSlice';

const getStaticDataFile = async (file: string, folder: string = '/data') => {
    if (config.mode == 'production' && file.endsWith('.gz')) {
        const response = await fetch(`${folder}/${file}`, {
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

    const submitFiles = (files: File[], example?: string) => {
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

    const submitJsonFile = (file: string) => {
        getStaticDataFile(file).then((data) => submitFiles([data], file));
    };

    const [selectedFile, setSelectedFile] = useState<number>(-1);

    useEffect(() => {
        if (!results.data && !results.isLoading) {
            // On first load preview one of the example files
            setSelectedFile(Math.floor(Math.random() * config.exampleFiles.length));
        }
    }, []);

    /*const [generateChange, setGenerateChange] = useState<boolean>(false);
	const toggleGenerateChange = () => {
		setGenerateChange(!generateChange);
	};*/

    const changedFile = (title: string) => {
        setSelectedFile(config.exampleFiles.findIndex((file: any) => file.title == title));
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
                <Link to={`/static/${file.file}`} target="_blank" download>
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
                            <h3>Analyze File</h3>
                            <p>Upload tweet file(s) to be analyzed by agwagram.</p>
                            <Accordion label="File Requirements">
                                <p>
                                    Files must be in <strong>JSON</strong> or <strong>JSONL</strong> formats and may be uploaded uncompressed or as Gzip files. To upload multiple files at once, please
                                    select all your files in the file selection prompt or drag-and-drop them individually.
                                </p>
                                <p>
                                    JSON files must contain the tweet data as a array of Twitter{' '}
                                    <Link to="https://web.archive.org/web/20240615012946/https://developer.x.com/en/docs/twitter-api/v1/data-dictionary/object-model/tweet" target="_blank">
                                        v1.1 tweet
                                    </Link>{' '}
                                    objects. JSONL files must contain a{' '}
                                    <Link to="https://web.archive.org/web/20240615012946/https://developer.x.com/en/docs/twitter-api/v1/data-dictionary/object-model/tweet" target="_blank">
                                        v1.1 tweet
                                    </Link>{' '}
                                    per line, <i>not</i> an account. For more details, download a tweet file from the "Example Files" tab.
                                </p>
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
                            <h3>Analyze From Examples</h3>
                            <p>Test agwagram by selecting from our sample of tweet files.</p>
                            <Dropdown
                                options={config.exampleFiles.map((file: ExampleFile) => ({ label: file.title, value: file.title }))}
                                placeholder="Select File"
                                onChange={(value: NullablePrimitive) => changedFile(value as string)}
                            />
                            <br />
                            {helperText && <p>{helperText}</p>}
                        </div>
                    )
                },
                {
                    label: 'Username',
                    tab: (
                        <div>
                            <h3>
                                Analyze By Username <b>(Coming Soon)</b>
                            </h3>
                            <p>Search for one or more accounts (separated by a comma) by their current Twitter username.</p>
                        </div>
                    ),
                    disabled: true
                }
            ]}
        />
    );
};

export { Analyze };
