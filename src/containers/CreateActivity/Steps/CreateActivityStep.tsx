import { Button, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { FunctionComponent } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1)
    },
    container:{
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2)
    }
  })
);

export interface CreateActivityStepProps {
  isFirst: boolean;
  isLast: boolean;
  onBack(): void;
  onNext(): void;
}

const CreateActivityStep: FunctionComponent<CreateActivityStepProps> = ({
  children,
  isFirst,
  isLast,
  onBack,
  onNext
}) => {
  const classes = useStyles({});
  return (
    <>
      <div className={classes.container}>{children}</div>
      <div className={classes.actionsContainer}>
        <Grid container alignItems="flex-start" justify="flex-end">
          <Button disabled={isFirst} onClick={onBack} className={classes.button}>
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={onNext} className={classes.button}>
            {isLast ? "Create activity" : "Next"}
          </Button>
        </Grid>
      </div>
    </>
  );
};

export default CreateActivityStep;
