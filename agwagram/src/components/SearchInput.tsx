import React, { useState } from "react";
import style from "./SearchInput.module.scss";

interface SearchInputProps {
  placeholder?: string;
  submit: Function;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "OSoMe_IU, POTUS",
  submit,
}: SearchInputProps) => {
  const [inputText, setInputText] = useState<string>("");

  const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const normalized = e.target.value.toLowerCase();
    setInputText(normalized);
  };

  return (
    <div className={style.search}>
      <input placeholder={placeholder} onChange={searchInputHandler} />
      <button onClick={() => submit(inputText)}></button>
    </div>
  );
};

export default SearchInput;
