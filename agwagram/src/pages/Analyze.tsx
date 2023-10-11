import React from 'react';
import style from './Analyze.module.scss';
import SearchInput from '../components/SearchInput';
import FileUploadPortal from '../components/FileUploadPortal';

const Analyze: React.FC = () => {
    const submitFiles = (files : File[]) => {
        console.log(files);
    }

    const searchUsername = (input : string) => {
        console.log("Searching for: " + input);
    }

    return (
        <div className={style.content}>
            <h1>Analyze</h1>
            <div className={style.columns}>
                <div>
                    <h3>Analyze By Username</h3>
                    <p>
                        Search for one or more accounts (separated by a comma) by their current Twitter username.
                    </p>
                    <br />
                    <SearchInput submit={searchUsername}/>
                </div>
                <div>
                    <h3>Analyze By File</h3>
                    <div>
                        Upload files containing Tweet data to be analyzed using the BLOC algorithm.
                        Files can be in <strong>JSON</strong> or <strong>JSONL</strong> formats and can be uploaded unzipped or as Gzip files.
                        To upload multiple files at once please select them all in the file selection prompt
                        or drag-and-drop them each in.
                    </div>
                    <br />
                    <div>
                        <strong>Note:</strong> JSON files are expected to contain the Tweet data as an array of Tweet objects, while the JSONL files are expected to be formatted with each line being a Tweet, <em>not</em> an account.
                    </div>
                    <br />
                    <FileUploadPortal submit={submitFiles}/>
                </div>
            </div>
        </div>
    );
}

export default Analyze;
