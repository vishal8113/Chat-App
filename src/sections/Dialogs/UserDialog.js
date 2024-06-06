import { Dialog, DialogContent, Stack, Tabs, Tab } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchUsers } from "../../redux/slices/app";
import UserDialogComponent from "../../components/UserDialogComponent";

const UsersList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchUsers());
  }, []);

  const { users } = useSelector((state) => state.app);

  return (
    <>
      {users.map((user, idx) => {
        return (
          <UserDialogComponent
            key={user._id}
            name={user.name}
            imageUrl={user.imageUrl}
          />
        );
      })}
    </>
  );
};

const Users = ({ open, handleClose }) => {
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
            <Tab label="Find Friends" />
            <Tab label="My Friends" />
          </Tabs>
        </Stack>
        <DialogContent>
          <Stack sx={{ height: "100%" }}>
            <Stack spacing={2.5}>
              {(() => {
                switch (value) {
                  case 0:
                    return <UsersList />;
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

export default Users;
