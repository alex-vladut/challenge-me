import React, { FunctionComponent, useState } from "react";

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { TextField, CircularProgress, MenuItem, Paper } from "@material-ui/core";

interface AddressSelectionProps {
  value?: any;
  error?: boolean;
  helperText?: string;
  onLocationChanged(location: any): void;
}

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
          />
          <Paper>
            {loading && <CircularProgress />}
            {suggestions.map(suggestion => (
              <MenuItem {...getSuggestionItemProps(suggestion, {})}>
                <span>{suggestion.description}</span>
              </MenuItem>
            ))}
          </Paper>
        </>
      )}
    </PlacesAutocomplete>
  );
};

export default Address;
