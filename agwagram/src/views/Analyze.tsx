import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Input/Button';
import FileUploadPortal from '../components/Input/FileUploadPortal';
import SearchInput from '../components/Input/SearchInput';
import { useSetAnalyzeFilesMutation, useSetAnalyzeUserMutation } from '../data/apiSlice';
import { getStaticFile } from '../utility';
import style from './Analyze.module.scss';

const Analyze: React.FC = () => {
    const [setFiles] = useSetAnalyzeFilesMutation({ fixedCacheKey: 'analysis' });
    const [setUser] = useSetAnalyzeUserMutation({ fixedCacheKey: 'analysis' });

    const submitFiles = (files: File[]) => {
        setFiles(files);
    };

    const searchUsername = (username: string) => {
        setUser(username);
    };

    const submitJsonFile = (file: string) => {
        try {
            setSelectedExample(file);
            getStaticFile(file).then((data) => submitFiles([data]));
        } catch (error) {
            console.error('Error fetching or submitting file:', error);
        }
    };

    const exampleFile = (file: string, title: string, format: string = 'JSON') => {
        return (
            <div className={style.example}>
                <Button onClick={() => submitJsonFile(file)} label={title} visual={file == selectedExample ? 'filled' : 'outline'} />
                <Link to={`/static/${file}`} target="_blank" download>
                    Download {format} File
                </Link>
            </div>
        );
    };

    useEffect(() => {
        console.log('First load');
        submitJsonFile('sample_storygraphbot.jsonl');
    }, []);

    const [selectedExample, setSelectedExample] = useState<string>('');

    return (
        <>
            <h1>Analyze</h1>
            <div className={style.columns}>
                <div>
                    {true && (
                        <div className={style.card}>
                            <h3>Analyze From Example File</h3>
                            <p>Test the capabilities of Agwagram using one of our example Twitter data files.</p>
                            <div>
                                {exampleFile('sample_storygraphbot.jsonl', '@StoryGraphBot', 'JSONL')}
                                {exampleFile('sample_jesus.jsonl', '@Jesus', 'JSONL')}
                                {exampleFile('sample_combined.json', 'Combined', 'JSON')}
                            </div>
                        </div>
                    )}
                    <div className={style.card}>
                        <h3>
                            Analyze By Username <b>(Coming Soon)</b>
                        </h3>
                        <p>Search for one or more accounts (separated by a comma) by their current Twitter username.</p>
                        <SearchInput submit={searchUsername} />
                    </div>
                </div>
                <div className={style.card}>
                    <h3>Analyze By File</h3>
                    <p>
                        Upload files containing Tweet data to be analyzed using the BLOC algorithm. Files can be in <strong>JSON</strong> or <strong>JSONL</strong> formats and can be uploaded unzipped
                        or as Gzip files. To upload multiple files at once please select them all in the file selection prompt or drag-and-drop them each in.
                    </p>
                    <p>
                        <strong>Note:</strong> JSON files are expected to contain the Tweet data as an array of Tweet objects, while the JSONL files are expected to be formatted with each line being a
                        Tweet, <em>not</em> an account.
                    </p>
                    <FileUploadPortal submit={submitFiles} />
                </div>
            </div>
        </>
    );
};

export default Analyze;
