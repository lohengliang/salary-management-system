import "@testing-library/jest-dom/extend-expect";
import React from "react";
import EditUserForm from "../components/EditUserForm";
// We're using our own custom render function and not RTL's render
// our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import { render, screen } from "./test-utils";

it("Edit user form can render without crashing", () => {
  render(<EditUserForm />, {
    initialState: {
      editUserModal: {
        modalProps: {
          open: true,
        },
        modalType: "",
      },
    },
  });
  expect(screen.getByText("User Name")).toBeInTheDocument();
});
