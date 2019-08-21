import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";

import { State } from "../store/reducers";
import { Clear } from "../store/actions/notifications.actions";

const Notifications = ({ item, children, clear }: any) => {
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (item) {
      enqueueSnackbar(item.message, { variant: item.level });
      clear();
    }
  }, [item, enqueueSnackbar, clear]);

  return <Fragment>{children}</Fragment>;
};

const mapStateToProps = ({ notifications: { item } }: State) => ({ item });

const mapDispatchToProps = (dispatch: any) => ({
  clear: () => dispatch(Clear.create())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);
