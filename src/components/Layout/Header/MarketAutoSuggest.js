import React, { useState, useEffect, useContext } from "react";
import Autosuggest from "react-autosuggest";
import LangCtx from "../../../store/LangContext";
const MarketAutoSuggest = ({
  suggestData,
  placeholder,
  selectedValueHandel,
  modalValue,
  inpuChangeHandel,
  removeValue,
}) => {
  const [suggestValue, setSuggestValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { lang } = useContext(LangCtx);
  useEffect(() => {
    console.log("suggest Value", suggestData);
  }, []);

  useEffect(() => {
    if (removeValue) {
      setSuggestValue("");
    }
  }, [removeValue]);

  useEffect(() => {
    if (modalValue) {
      setSuggestValue(modalValue);
      console.log("modalValue1", modalValue);
    }
  }, [modalValue]);
  const getSuggestionValue = (suggestion) => {
    return suggestion.username[lang];
  };

  const renderSuggestion = (suggestion) => {
    return <div className="suggest_value">{suggestion.username[lang]}</div>;
  };

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : suggestData.filter(
          (item) =>
            item.username[lang].toLowerCase().slice(0, inputLength) ===
            inputValue
        );
  };

  const onChange = (e, { newValue }) => {
    setSuggestValue(newValue);
    inpuChangeHandel(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const suggestSelected = (event, { suggestion, suggestionValue }) => {
    selectedValueHandel(suggestion);
    console.log("suggestion", suggestion);
  };
  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      onSuggestionSelected={suggestSelected}
      inputProps={{
        placeholder: placeholder,
        value: suggestValue,
        onChange: onChange,
      }}
    />
  );
};

export default MarketAutoSuggest;
