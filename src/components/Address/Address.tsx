import React, { FunctionComponent, useState } from "react";

import { CircularProgress, IconButton, InputBase, MenuItem, Paper } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { CloseRounded, Search } from "@material-ui/icons";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";

interface AddressSelectionProps {
  value?: any;
  error?: boolean;
  helperText?: string;
  onLocationChanged(location: any): void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
      padding: "2px 4px",
      position: "relative"
    },
    input: {
      margin: theme.spacing(0.25),
      flex: 1
    },
    iconButton: {
      padding: 10
    },
    divider: {
      height: 28,
      margin: 4
    },
    paper: {
      position: "absolute",
      zIndex: 1,
      marginTop: theme.spacing(1),
      left: 0,
      right: 0
    }
  })
);

const getLocationDescription = (description: string) =>
  description && description.length > 70 ? `${description.slice(0, 70)}...` : description;

const Address: FunctionComponent<AddressSelectionProps> = ({ value, error, onLocationChanged }) => {
  const classes = useStyles();

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
    <Paper className={classes.root}>
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
            <InputBase
              className={classes.input}
              {...getInputProps({
                label: "Location",
                placeholder: "Search location...",
                required: true,
                fullWidth: true,
                error
              })}
              startAdornment={
                <IconButton className={classes.iconButton} disabled={true}>
                  <Search />
                </IconButton>
              }
              endAdornment={
                <IconButton aria-label="close" onClick={() => handleChange("")}>
                  <CloseRounded />
                </IconButton>
              }
            />
            <Paper className={classes.paper}>
              {loading && <CircularProgress />}
              {suggestions.map(suggestion => (
                <MenuItem {...getSuggestionItemProps(suggestion, {})}>
                  {getLocationDescription(suggestion.description)}
                </MenuItem>
              ))}
            </Paper>
          </>
        )}
      </PlacesAutocomplete>
    </Paper>
  );
};

export default Address;
