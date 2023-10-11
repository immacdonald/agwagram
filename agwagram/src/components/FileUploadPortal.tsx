import React, { useState, useEffect, useMemo } from 'react';
import style from './FileUploadPortal.module.scss';

interface FileUploadPortalProps {
    maxFiles?: number;
    submit: Function;
}

const FileUploadPortal: React.FC<FileUploadPortalProps> = ({ maxFiles = 2, submit }: FileUploadPortalProps) => {

    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [fileLimit, setFileLimit] = useState<boolean>(false);

    const handleUploadFiles = (files: File[]) => {
        const uploaded: File[] = [...uploadedFiles];
        let limitExceeded = false;
        files.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file);
                if (uploaded.length === maxFiles) {
                    setFileLimit(true);
                }
                if (uploaded.length > maxFiles) {
                    alert(`You can only add a maximum of ${maxFiles} files`);
                    setFileLimit(false);
                    limitExceeded = true;
                    return true;
                }
            }
            return false;
        });
        if (!limitExceeded) {
            console.log("Uploaded!");
            setUploadedFiles(uploaded);
        }
        console.log("Uploaded files:")
        console.log(uploadedFiles);
    };

    useEffect(() => {
        setFileLimit(uploadedFiles.length >= maxFiles);
    }, [uploadedFiles]);

    const removeFile = (index: number) => {
        console.log("Removing at " + index);
        console.log(uploadedFiles);
        setUploadedFiles(uploadedFiles.splice(index, 1));
        console.log(uploadedFiles);
    }

    const handleFileEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        const chosenFiles = Array.from(e.target.files || []);
        handleUploadFiles(chosenFiles);
    };

    const fileList = useMemo(()  => {
        return (
            uploadedFiles.map((file : File, i : number) => (
                <div key={file.name}>
                    <strong>{i + 1}.</strong> {file.name}
                    <button onClick={() => removeFile(i)}>X</button>
                </div>
            ))
        )
    }, [uploadedFiles]);

    return (
        <div>
            <input type='file' multiple
                onChange={handleFileEvent}
                disabled={fileLimit}
            />
            <div className={style.fileList}>
                {fileList}
            </div>
            <div className={style.submit}>
                <button onClick={() => submit(uploadedFiles)} disabled={fileLimit}>Upload Files</button>
            </div>
        </div>
    )

}

export default FileUploadPortal;