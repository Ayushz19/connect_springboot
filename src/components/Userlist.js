import React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import UpdateUserFrom from "./UpdateUserFrom";
import DeleteUser from "./DeleteUser";


const Userlist = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [userIdToEdit, setUserIdToEdit] = useState(null);
  const handleEditUserClick = (id) => {
    setUserIdToEdit(id);
    setShowForm(true);
  };

  const handleSave = (updatedUser) => {
    setShowForm(false);
    // Optionally, refresh user list or handle updated user
    console.log("User updated:", updatedUser);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/employees")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const handleDeleteUser = (userId) => {
    // Send a DELETE request to delete the user
    fetch(`http://localhost:8080/api/employees/${userId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log(`User with ID ${userId} deleted successfully`);
        // After successfully deleting the user, fetch the updated user list
        //   fetchUsers();
        setTimeout(() => {
          window.location.reload();
        }, 1000); // Reload after 1 second (1000 milliseconds)
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  return (
    <div>
      <TableContainer>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>First Name</StyledTableCell>
              <StyledTableCell>Last Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell>{user.id}</StyledTableCell>
                <StyledTableCell>{user.firstName}</StyledTableCell>
                <StyledTableCell>
                  {user.lastName}{" "}
                  
                </StyledTableCell>
                <StyledTableCell>{user.email}</StyledTableCell>
                <StyledTableCell>
                  <button onClick={() => handleEditUserClick(user.id)}>
                    Edit
                  </button>
                  {showForm && userIdToEdit === user.id && (
                    <UpdateUserFrom userId={user.id} onSave={handleSave} />
                  )}
                  <DeleteUser userId={user.id} onDelete={handleDeleteUser} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
            {showForm && !userIdToEdit && (
              <UpdateUserFrom userId={userIdToEdit} onSave={handleSave} />
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>
              ID: {user.id} <br />
            </strong>
            <strong>Name:</strong> {user.firstName} <br />
            <strong>Email:</strong> {user.email}
          </li>
        ))}
      </ul> */}

      {/* {showForm && (
                    <UpdateUserFrom userId={userIdToEdit} onSave={handleSave} />
                  )}
                  <button onClick={() => handleEditUserClick(1)}>
                    Edit User 1
                  </button> */}
    </div>
  );
};
export default Userlist;
