import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useSnackbar, SnackbarProvider } from "notistack";

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

  return children;
};

const mapStateToProps = ({ notifications: { item } }: State) => ({ item });

const mapDispatchToProps = (dispatch: any) => ({
  clear: () => dispatch(Clear.create())
});

const NotificationsWithRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);

export default function NotificationsWithSnackbar(props: any) {
  return (
    <SnackbarProvider>
      <NotificationsWithRedux {...props} />
    </SnackbarProvider>
  );
}
