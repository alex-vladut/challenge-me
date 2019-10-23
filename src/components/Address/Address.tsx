import React, { FunctionComponent, useState } from "react";

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { TextField, CircularProgress, MenuItem, Paper, InputAdornment, IconButton } from "@material-ui/core";
import { Search, CloseRounded } from "@material-ui/icons";

interface AddressSelectionProps {
  value?: any;
  error?: boolean;
  helperText?: string;
  onLocationChanged(location: any): void;
}

const getLocationDescription = (description: string) =>
  description && description.length > 70 ? `${description.slice(0, 70)}...` : description;

const Address: FunctionComponent<AddressSelectionProps> = ({ value, error, helperText, onLocationChanged }) => {
  const [address, setAddress] = useState((value && value.address) || "");

  const handleChange = (address: string) => {
    setAddress(address);
    onLocationChanged(null);
  };

  const handleSelect = async (address: string) => {
    setAddress(address);

    const results = await geocodeByAddress(address);
    const { lat, lng: lon } = await getLatLng(results[0]);

    onLocationChanged({ location: { lat, lon }, address });
  };

  const onError = async (error: any) => {
    console.error(error);
    setAddress("");
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
      onError={onError}
      shouldFetchSuggestions={address.length >= 2}
      debounce={300}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <>
          <TextField
            {...getInputProps({
              label: "Location",
              placeholder: "Search location...",
              className: "location-search-input",
              fullWidth: true,
              required: true,
              error,
              helperText
            })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              endAdornment: address ? (
                <IconButton aria-label="close" onClick={() => setAddress("")}>
                  <CloseRounded />
                </IconButton>
              ) : null
            }}
          />
          <Paper>
            {loading && <CircularProgress />}
            {suggestions.map(suggestion => (
              <MenuItem {...getSuggestionItemProps(suggestion, {})}>
                <span>{getLocationDescription(suggestion.description)}</span>
              </MenuItem>
            ))}
          </Paper>
        </>
      )}
    </PlacesAutocomplete>
  );
};

export default Address;
