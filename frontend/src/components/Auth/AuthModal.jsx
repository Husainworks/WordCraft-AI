import React, { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import Login from "./Login";
import SignUp from "./SignUp";
import { Modal } from "../Loader/Modal";

export const AuthModal = () => {
  const { openAuthForm, setOpenAuthForm } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState("login");

  return (
    <>
      <Modal
        isOpen={openAuthForm}
        onClose={() => {
          setOpenAuthForm(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div className="">
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </>
  );
};
