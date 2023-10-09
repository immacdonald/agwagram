import React, { useState } from 'react';
import style from './Analyze.module.scss';

const MAX_COUNT: number = 5;

const Analyze: React.FC = () => {

    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [fileLimit, setFileLimit] = useState<boolean>(false);

    const handleUploadFiles = (files: File[]) => {
        const uploaded: File[] = [...uploadedFiles];
        let limitExceeded = false;
        files.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file);
                if (uploaded.length === MAX_COUNT) setFileLimit(true);
                if (uploaded.length > MAX_COUNT) {
                    alert(`You can only add a maximum of ${MAX_COUNT} files`);
                    setFileLimit(false);
                    limitExceeded = true;
                    return true;
                }
            }
            return false; // Added for clarity, but not necessary
        });
        if (!limitExceeded) setUploadedFiles(uploaded);
    };

    const handleFileEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        const chosenFiles = Array.from(e.target.files || []);
        handleUploadFiles(chosenFiles);
    };

    return (
        <div className={style.content}>
            <h1>Analyze</h1>
            <div className={style.columns}>
                <div>
                    <h3>Analyze By Username</h3>
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
                    <input id='fileUpload' type='file' multiple
                        accept='application/pdf, image/png'
                        onChange={handleFileEvent}
                        disabled={fileLimit}
			        />

                    <div className={style.submit}>
                        <button>Upload Files</button>
                    </div>

                    <div>
                        {uploadedFiles.map(file => (
                            <div >
                                {file.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Analyze;
