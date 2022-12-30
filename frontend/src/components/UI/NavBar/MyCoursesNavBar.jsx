import React from "react";
import PrimaryButton from "../PrimaryButton";

const MyCoursesNavBar = (props) => {
  return (
    <li>
      <PrimaryButton className={`flex space-x-4 ${props.active ? 'underline decoration-primaryBlue font-medium decoration-4 underline-offset-8' : 'no-underline'}`}>
        <span className={`${props.search ? "xl:hidden" : "md:hidden"}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            width="22"
            height="22"
            fill="currentColor"
            class="bi bi-cart"
          >
            <path d="M18 31h3v6H7c-.79 0-1.51.47-1.83 1.19-.32.73-.18 1.57.35 2.16 5 5.5 5 13.8 0 19.3-.53.59-.67 1.43-.35 2.16C5.49 62.53 6.21 63 7 63h75c7.17 0 13-5.83 13-13s-5.83-13-13-13H41v-6h52c.79 0 1.51-.47 1.83-1.19.32-.73.18-1.57-.35-2.16-5-5.5-5-13.8 0-19.3.53-.59.67-1.43.35-2.16A2.008 2.008 0 0 0 93 5H18C10.83 5 5 10.83 5 18s5.83 13 13 13zm64 10c4.96 0 9 4.04 9 9s-4.04 9-9 9H10.91a18.274 18.274 0 0 0 0-18H21v8a2 2 0 0 0 3.2 1.6l6.8-5.1 6.8 5.1c.35.26.78.4 1.2.4a2 2 0 0 0 2-2v-8h41zm-57 4V21h12v24l-4.8-3.6c-.36-.27-.78-.4-1.2-.4s-.84.13-1.2.4L25 45zM18 9h71.09a18.274 18.274 0 0 0 0 18H41v-8c0-1.1-.9-2-2-2H23c-1.1 0-2 .9-2 2v8h-3c-4.96 0-9-4.04-9-9s4.04-9 9-9zm76.83 61.19A2.008 2.008 0 0 0 93 69H18c-7.17 0-13 5.83-13 13s5.83 13 13 13h75c.79 0 1.51-.47 1.83-1.19.32-.73.18-1.57-.35-2.16-5-5.5-5-13.8 0-19.3.53-.59.67-1.43.35-2.16zM89.09 91H18c-4.96 0-9-4.04-9-9s4.04-9 9-9h71.09a18.274 18.274 0 0 0 0 18z" />
          </svg>
        </span>
        <span>My Courses</span>
      </PrimaryButton>
    </li>
  );
};

export default MyCoursesNavBar;
