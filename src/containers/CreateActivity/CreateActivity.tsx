import React, { FunctionComponent, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import { CircularProgress, Paper, Stepper, Step, StepContent, StepLabel, Typography } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import { Create } from "../../store/actions/activities.actions";
import { State } from "../../store/reducers";

import Description from "./Steps/Description/Description";
import Location from "./Steps/Location/Location";
import DateTime from "./Steps/DateTime/DateTime";
import Attendants from "./Steps/Attendants/Attendants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    resetContainer: {
      padding: theme.spacing(3)
    }
  })
);

const steps = ["General details", "Select a location", "Select date and time", "Number of attendants"];

export interface CreateActivityProps {
  loading: boolean;
  created: string | null;
  sports: any[];
  createActivity(activity: any): void;
}

const CreateActivity: FunctionComponent<CreateActivityProps> = ({
  loading,
  created,
  sports,
  createActivity
}: CreateActivityProps) => {
  const classes = useStyles();

  const [activity, setActivity] = useState<any>({});
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (activeStep === steps.length) {
      createActivity(activity);
    }
  }, [activity, activeStep, createActivity]);

  const handleNext = (data: any) => {
    setActivity({ ...activity, ...data });
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  if (loading) {
    return <CircularProgress />;
  }
  if (created) {
    return <Redirect to={`/activities/${created}`} />;
  }

  const stepContent: any = {
    0: (
      <Description
        sports={sports}
        isFirst={activeStep === 0}
        isLast={activeStep === steps.length - 1}
        onBack={handleBack}
        onNext={handleNext}
      />
    ),
    1: (
      <Location
        isFirst={activeStep === 0}
        isLast={activeStep === steps.length - 1}
        onBack={handleBack}
        onNext={handleNext}
      />
    ),
    2: (
      <DateTime
        isFirst={activeStep === 0}
        isLast={activeStep === steps.length - 1}
        onBack={handleBack}
        onNext={handleNext}
      />
    ),
    3: (
      <Attendants
        isFirst={activeStep === 0}
        isLast={activeStep === steps.length - 1}
        onBack={handleBack}
        onNext={handleNext}
      />
    )
  };

  return (
    <Paper className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>{stepContent[index]}</StepContent>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
        </Paper>
      )}
    </Paper>
  );
};

const mapStateToProps = ({ activities: { loading, created, sports } }: State) => ({
  loading,
  created,
  sports
});

const mapDispatchToProps = (dispatch: any) => ({
  createActivity: (activity: any) => dispatch(Create.create(activity))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateActivity);
