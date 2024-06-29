import { Dialog, Stack, Tabs, Tab, DialogContent } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchFriendRequests } from "../../redux/slices/app";
import FriendRequestComponent from "../../components/FriendRequestComponent";

const RequestList = () => {
  const dispatch = useDispatch();

  const { friendRequests } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(FetchFriendRequests());
  }, []);

  return (
    <>
      {friendRequests.map((ele, idx) => {
        return (
          <FriendRequestComponent key={idx} {...ele.sender} id={ele._id} />
        );
      })}
    </>
  );
};

const Notifications = ({ open, handleClose }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={handleClose}
        keepMounted
        sx={{ p: 4 }}
      >
        <Stack p={2} sx={{ width: "100%" }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Friend Requests" />
            <Tab label="Accepted Requests" />
          </Tabs>
        </Stack>
        <DialogContent>
          <Stack sx={{ height: "100%" }}>
            <Stack spacing={2.5}>
              {(() => {
                switch (value) {
                  case 0:
                    return <RequestList />;
                  case 1:
                    <></>;
                    break;
                  default:
                    <></>;
                }
              })()}
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Notifications;
