import React, { useContext, useEffect, useState } from "react";
import style from "./Analyze.module.scss";
import SearchInput from "../components/SearchInput";
import FileUploadPortal from "../components/FileUploadPortal";
import { AnalysisContext } from "../contexts/AnalysisContext";
import { API_URL } from "../Global";
import Results from "./Results";
import { Link } from "react-router-dom";

const Analyze: React.FC = () => {
  const { results, setResults } = useContext(AnalysisContext);
  const [displayResults, setDisplayResults] = useState<boolean>(false);

  async function uploadFiles(url: string = "", files: File[]) {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("tweet_files", file);
    });

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    return response.json();
  }

  const submitFiles = (files: File[]) => {
    uploadFiles(`${API_URL}/analyze/file`, files).then((data) => {
      setResults(data);
    });
  };

  async function analyzeUsername(url: string = "", username: string) {
    const response = await fetch(`${url}?username=${username}`, {
      method: "GET",
    });
    return response.json();
  }

  const searchUsername = (input: string) => {
    analyzeUsername(`${API_URL}/analyze/user`, input).then((data) => {
      setResults(data);
    });
  };

  useEffect(() => {
    setDisplayResults(results);
  }, [results]);

  const submitJsonFile = async (file: string) => {
    try {
      setSelectedExample(file);
      const response = await fetch(`/static/${file}`);
      const data = await response.blob();
      // Convert Blob to File object
      const actualFile = new File([data], file, { type: "application/json" });
      submitFiles([actualFile]);
    } catch (error) {
      console.error("Error fetching or submitting file:", error);
    }
  };

  const exampleFile = (
    file: string,
    title: string,
    format: string = "JSON",
  ) => {
    const customStyle = { backgroundColor: "#143aa2", color: "white" } as React.CSSProperties;
    return (
      
      <div className={style.example}>
        <button onClick={() => submitJsonFile(file)} style={file == selectedExample ? customStyle : undefined}>{title}</button>
        <Link to={`/static/${file}`} target="_blank" download>
          Download {format} File
        </Link>
      </div>
    );
  };

  useEffect(() => {
    if(results == null) {
      console.log("First load");
      submitJsonFile("sample_storygraphbot.jsonl")
    }
  }, [])

  const [selectedExample, setSelectedExample] = useState<string>("");

  return (
    <div className={style.content}>
      <h1>Analyze</h1>
      <div className={style.columns}>
        <div>
          {true && (
            <div className={style.card}>
              <h3>Analyze From Example File</h3>
              <p>
                Test the capabilities of Agwagram using one of our example
                Twitter data files.
              </p>
              <div>
                {exampleFile(
                  "sample_storygraphbot.jsonl",
                  "@StoryGraphBot",
                  "JSONL",
                )}
                {exampleFile("sample_jesus.jsonl", "@Jesus", "JSONL")}
                {exampleFile(
                  "sample_combined.json",
                  "Combined",
                  "JSON",
                )}
              </div>
            </div>
          )}
          <div className={style.card}>
            <h3>
              Analyze By Username <b>(Coming Soon)</b>
            </h3>
            <p>
              Search for one or more accounts (separated by a comma) by their
              current Twitter username.
            </p>
            <SearchInput submit={searchUsername} />
          </div>
        </div>
        <div className={style.card}>
          <h3>Analyze By File</h3>
          <p>
            Upload files containing Tweet data to be analyzed using the BLOC
            algorithm. Files can be in <strong>JSON</strong> or{" "}
            <strong>JSONL</strong> formats and can be uploaded unzipped or as
            Gzip files. To upload multiple files at once please select them all
            in the file selection prompt or drag-and-drop them each in.
          </p>
          <p>
            <strong>Note:</strong> JSON files are expected to contain the Tweet
            data as an array of Tweet objects, while the JSONL files are
            expected to be formatted with each line being a Tweet, <em>not</em>{" "}
            an account.
          </p>
          <FileUploadPortal submit={submitFiles} />
        </div>
      </div>
      {displayResults && <>
      <hr />
    <Results />
    </>}
    </div>

  )
};

export default Analyze;
