import SecondaryButton from "./SecondaryButton";
import { useRef, useState } from "react";
import { EyeIcon } from "@heroicons/react/solid";
import { EyeOffIcon } from "@heroicons/react/solid";

export default function ResetPassword() {
  const newPasswordRef = useRef();
  const confirmNewPasswordRef = useRef();

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const toggleShowNewPasswordHandler = (e) => {
    e.preventDefault();
    setShowNewPassword(!showNewPassword);
  };

  const toggleShowConfirmNewPasswordHandler = (e) => {
    e.preventDefault();
    setShowConfirmNewPassword(!showConfirmNewPassword);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(newPasswordRef.current.value);
    console.log(confirmNewPasswordRef.current.value);
    //handle patch request
    
  };
  return (
    <div class="mt-[10%]">
      
      <div class="antialiased ">
        <div class="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
          <h1 class="text-4xl font-medium">Reset password</h1>
          <p class="text-slate-500 pl-1">
            Fill up the form to reset the password
          </p>

          <form action="" class="my-10"   onSubmit={onSubmitHandler}>
            <div class="flex flex-col space-y-5">
              <label for="newPassword">
                <p class="font-medium text-slate-700 pb-2">New Password</p>

                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    ref={newPasswordRef}
                    class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-primaryBlue hover:shadow"
                    placeholder="New Password"
                    required
                  />

                  {showNewPassword ? (
                    <EyeOffIcon
                      className="w-6 h-6 opacity-50 absolute top-[25%] left-[90%] hover:cursor-pointer"
                      onClick={toggleShowNewPasswordHandler}
                    ></EyeOffIcon>
                  ) : (
                    <EyeIcon
                      className="w-6 h-6 opacity-50 absolute top-[25%] left-[90%] hover:cursor-pointer"
                      onClick={toggleShowNewPasswordHandler}
                    ></EyeIcon>
                  )}
                </div>
              </label>
              <label for="Confirm New Password">
                <p class="font-medium text-slate-700 pb-2">
                  Confirm New Password
                </p>
                <div className="relative">
                  <input
                    ref={confirmNewPasswordRef}
                    type={showConfirmNewPassword ? "text" : "password"}
                    class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-primaryBlue hover:shadow"
                    placeholder="Confirm New Password"
                    required
                  />

                  {showConfirmNewPassword ? (
                    <EyeOffIcon
                      className="w-6 h-6 opacity-50 absolute top-[25%] left-[90%] hover:cursor-pointer"
                      onClick={toggleShowConfirmNewPasswordHandler}
                    ></EyeOffIcon>
                  ) : (
                    <EyeIcon
                      className="w-6 h-6 opacity-50 absolute top-[25%] left-[90%] hover:cursor-pointer"
                      onClick={toggleShowConfirmNewPasswordHandler}
                    ></EyeIcon>
                  )}
                </div>
              </label>

              <SecondaryButton
                type="submit"
                className="flex space-x-2 items-center justify-center py-3"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 justify-self-start"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                    />
                  </svg>
                }
                text="Reset Password"
              ></SecondaryButton>
            </div>
          </form>
          <p class="text-center">Not registered yet? <a href="#" class="text-primaryBlue hover:opacity-70 ease-in-out duration-300 font-medium inline-flex space-x-1 items-center"><span>Register now </span><span><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg></span></a></p>
        </div>
        
      </div>
      
    </div>
  );
}
