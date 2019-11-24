import React, { CSSProperties, FunctionComponent, HTMLAttributes } from "react";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import { createStyles, emphasize, makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import TextField, { BaseTextFieldProps } from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CancelIcon from "@material-ui/icons/Cancel";
import { Omit } from "@material-ui/types";
import clsx from "clsx";
import Select from "react-select";
import { ValueContainerProps } from "react-select/src/components/containers";
import { ControlProps } from "react-select/src/components/Control";
import { MenuProps, NoticeProps } from "react-select/src/components/Menu";
import { MultiValueProps } from "react-select/src/components/MultiValue";
import { OptionProps } from "react-select/src/components/Option";
import { PlaceholderProps } from "react-select/src/components/Placeholder";
import { SingleValueProps } from "react-select/src/components/SingleValue";
import { ValueType } from "react-select/src/types";

interface OptionType {
  label: string;
  value: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: 250,
      minWidth: 290
    },
    input: {
      display: "flex",
      padding: 0,
      height: "auto"
    },
    valueContainer: {
      display: "flex",
      flexWrap: "wrap",
      flex: 1,
      alignItems: "center",
      overflow: "hidden"
    },
    chip: {
      margin: theme.spacing(0.5, 0.25)
    },
    chipFocused: {
      backgroundColor: emphasize(
        theme.palette.type === "light" ? theme.palette.grey[300] : theme.palette.grey[700],
        0.08
      )
    },
    noOptionsMessage: {
      padding: theme.spacing(1, 2)
    },
    singleValue: {
      fontSize: 16
    },
    placeholder: {
      position: "absolute",
      left: 2,
      bottom: 6,
      fontSize: 16
    },
    paper: {
      position: "absolute",
      zIndex: 1,
      marginTop: theme.spacing(1),
      left: 0,
      right: 0
    },
    divider: {
      height: theme.spacing(2)
    }
  })
);

function NoOptionsMessage(props: NoticeProps<OptionType>) {
  return (
    <Typography color="textSecondary" className={props.selectProps.classes.noOptionsMessage} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

type InputComponentProps = Pick<BaseTextFieldProps, "inputRef"> & HTMLAttributes<HTMLDivElement>;

function inputComponent({ inputRef, ...props }: InputComponentProps) {
  return <div ref={inputRef} {...props} />;
}

function Control(props: ControlProps<OptionType>) {
  const {
    children,
    innerProps,
    innerRef,
    selectProps: { classes, TextFieldProps }
  } = props;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: classes.input,
          ref: innerRef,
          children,
          ...innerProps
        }
      }}
      {...TextFieldProps}
    />
  );
}

function Option(props: OptionProps<OptionType>) {
  return (
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

type MuiPlaceholderProps = Omit<PlaceholderProps<OptionType>, "innerProps"> &
  Partial<Pick<PlaceholderProps<OptionType>, "innerProps">>;
function Placeholder(props: MuiPlaceholderProps) {
  const { selectProps, innerProps = {}, children } = props;
  return (
    <Typography color="textSecondary" className={selectProps.classes.placeholder} {...innerProps}>
      {children}
    </Typography>
  );
}

function SingleValue(props: SingleValueProps<OptionType>) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props: ValueContainerProps<OptionType>) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props: MultiValueProps<OptionType>) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={clsx(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props: MenuProps<OptionType>) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer
};

export interface AutocompleteProps {
  suggestions: OptionType[];
  placeholder: string;
  label: string;
  value: OptionType;
  onChange(value: any): void;
  mapValue(value: any): OptionType;
}

const Autocomplete: FunctionComponent<AutocompleteProps> = ({
  suggestions,
  value,
  onChange,
  placeholder,
  label,
  mapValue
}: AutocompleteProps) => {
  const classes = useStyles();
  const theme = useTheme();

  const handleChangeSingle = (selectedValue: ValueType<OptionType>, e: any) => {
    const result = suggestions.find(suggestion => {
      const translatedValue = mapValue(suggestion);
      return (
        translatedValue.value === (selectedValue as OptionType).value &&
        translatedValue.label === (selectedValue as OptionType).label
      );
    });
    console.log(result);
    onChange(result);
  };

  const selectStyles = {
    input: (base: CSSProperties) => ({
      ...base,
      color: theme.palette.text.primary,
      "& input": {
        font: "inherit"
      }
    })
  };

  return (
    <Select
      classes={classes}
      styles={selectStyles}
      inputId="react-select-single"
      TextFieldProps={{
        label,
        InputLabelProps: {
          htmlFor: "react-select-single",
          shrink: true
        }
      }}
      placeholder={placeholder}
      options={suggestions.map(mapValue)}
      components={components}
      value={mapValue(value)}
      onChange={handleChangeSingle}
    />
  );
};

export default Autocomplete;
