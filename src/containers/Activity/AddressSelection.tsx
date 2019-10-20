import React, { FunctionComponent, useState } from "react";

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { TextField, CircularProgress, MenuItem, Paper } from "@material-ui/core";

interface AddressSelectionProps {
  error: boolean;
  helperText: string;
  onLocationChanged(location: any): void;
}

const AddressSelection: FunctionComponent<AddressSelectionProps> = ({ error, helperText, onLocationChanged }) => {
  const [address, setAddress] = useState("");

  const handleChange = (address: string) => {
    setAddress(address);
    onLocationChanged(null);
  };

  const handleSelect = async (address: string) => {
    setAddress(address);

    const results = await geocodeByAddress(address);
    const { lat: latitude, lng: longitude } = await getLatLng(results[0]);

    onLocationChanged({ latitude, longitude, address });
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
        <div>
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
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default AddressSelection;
