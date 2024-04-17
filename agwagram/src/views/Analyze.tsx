import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Accordion, BooleanDropdown, Button, Dropdown, Row, Section, Split } from '@imacdonald/phantom';
import FileUploadPortal from '../components/Input/FileUploadPortal';
import SearchInput from '../components/Input/SearchInput';
import Toggle from '../components/Input/Toggle';
import { useSetAnalyzeFilesMutation, useSetAnalyzeUserMutation } from '../data/apiSlice';
import { clearResults, selectResults, setExample, setLoading } from '../data/settingsSlice';
import { getStaticFile } from '../utility';
import style from './Analyze.module.scss';
import { Dataset } from '../icons';
import { TabGroup } from '../components/TabGroup';

const files = [
	{ file: 'sample_storygraphbot.jsonl', title: '@StoryGraphBot', type: 'JSONL' },
	{ file: 'sample_jesus.jsonl', title: '@Jesus', type: 'JSONL' },
	{ file: 'sample_combined.json', title: 'Combined', type: 'JSON' }
]

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
		setFiles({ files, changeReport: generateChange });
	};

	const searchUsername = (username: string) => {
		dispatch(clearResults());
		dispatch(setLoading(true));
		setUser(username);
	};

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

	const [generateChange, setGenerateChange] = useState<boolean>(false);
	const toggleGenerateChange = () => {
		setGenerateChange(!generateChange);
	};

	const changedFile = (title: string) => {
		setSelectedFile(files.findIndex(file => file.title == title));
	}

	useEffect(() => {
		if (selectedFile > -1) {
			submitJsonFile(files[selectedFile].file);
		}
	}, [selectedFile]);

	const helperText = useMemo(() => {
		if (selectedFile > -1) {
			const file = files[selectedFile];
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
		<>
			<TabGroup tabLabels={['File', 'Example Files', 'Username']} tabs={[
				<div>
					<h3>Analyze By File</h3>
					<p>Upload files containing Tweet data to be analyzed using the BLOC algorithm.</p>
					<Accordion label="File Requirements" Icon={Dataset}>
						<p>
							Files can be in <strong>JSON</strong> or <strong>JSONL</strong> formats and can be uploaded unzipped
							or as Gzip files. To upload multiple files at once please select them all in the file selection prompt or drag-and-drop them each in.
						</p>
						<p>
							JSON files are expected to contain the Tweet data as an array of Tweet objects, while the JSONL files are expected to be formatted with each line being a
							Tweet, <i>not</i> an account.
						</p>
					</Accordion>
					<FileUploadPortal submit={submitFiles} />
					<span>
						Generate Change Reports <Toggle state={generateChange} onChange={() => toggleGenerateChange()} />
					</span>
				</div>,
				<div>
					<h3>Analyze From Example File</h3>
					<p>Test the capabilities of Agwagram using one of our example Twitter data files.</p>
					<Dropdown options={files.map((file: any) => file.title)} placeholder='Select File' onChange={(value: any) => changedFile(value as string)} />
					{helperText && <p>{helperText}</p>}
				</div>,
				<div>
					<h3>
						Analyze By Username <b>(Coming Soon)</b>
					</h3>
					<p>Search for one or more accounts (separated by a comma) by their current Twitter username.</p>
					<SearchInput submit={searchUsername} />
				</div>
			] as React.ReactNode[]}
			/>
		</>
	);
};

export default Analyze;
