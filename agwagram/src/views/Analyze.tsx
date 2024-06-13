import { Accordion, Dropdown, FileUploadPortal, NullablePrimitive, TabGroup, getStaticFile } from '@imacdonald/phantom';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import config from '../config';
import { useSetAnalyzeFilesMutation, useSetAnalyzeUserMutation } from '../data/apiSlice';
import { clearResults, selectResults, setExample, setLoading } from '../data/settingsSlice';

const Analyze: React.FC = () => {
	const [setFiles] = useSetAnalyzeFilesMutation();
	const [setUser] = useSetAnalyzeUserMutation();

	const dispatch = useDispatch();
	const results = useSelector(selectResults);

	const submitFiles = (files: File[], example?: string) => {
		dispatch(clearResults());
		dispatch(setLoading(true));
		if (example) {
			dispatch(setExample(example));
		}
		setFiles({ files, changeReport: false });
	};

	/*const searchUsername = (username: string) => {
		dispatch(clearResults());
		dispatch(setLoading(true));
		setUser(username);
	};*/

	const submitJsonFile = (file: string) => {
		getStaticFile(file).then((data) => submitFiles([data], file));
	};

	const [selectedFile, setSelectedFile] = useState<number>(-1);

	useEffect(() => {
		if (!results.data) {
			// On first load preview one of the example files
			setSelectedFile(0);
		}
	}, []);

	/*const [generateChange, setGenerateChange] = useState<boolean>(false);
	const toggleGenerateChange = () => {
		setGenerateChange(!generateChange);
	};*/

	const changedFile = (title: string) => {
		setSelectedFile(config.exampleFiles.findIndex((file) => file.title == title));
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
							<h3>Analyze By File</h3>
							<p>Upload files containing Tweet data to be analyzed by agwagram.</p>
							<Accordion label="File Requirements">
								<p>
									Files can be in <strong>JSON</strong> or <strong>JSONL</strong> formats and can be uploaded uncompressed or as Gzip files. To upload multiple files at once, please
									select all your files in the file selection prompt or drag-and-drop them individually.
								</p>
								<p>
									JSON files must contain the Tweet data as a array of Tweet objects. JSONL files must contain a Tweet per line,{' '}
									<i>not</i> an account.
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
							<p>Test agwagram by selecting from our sample of Twitter data files.</p>
							<Dropdown
								options={config.exampleFiles.map((file: ExampleFile) => file.title)}
								placeholder="Select File"
								onChange={(value: NullablePrimitive) => changedFile(value as string)}
							/>
							<br/>
							{helperText && <p>{helperText}</p>}
						</div>
					)
				},
				{
					label: 'Username',
					tab: (
						<div>
							<h3>Analyze By Username <b>(Coming Soon)</b></h3>
							<p>Search for one or more accounts (separated by a comma) by their current Twitter username.</p>
						</div>
					),
					disabled: true
				}
			]}
		/>
	);
};

export default Analyze;
