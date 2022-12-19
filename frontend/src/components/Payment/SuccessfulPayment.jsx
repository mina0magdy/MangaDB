import success from "../../Assets/Images/success.svg";
import Alert from "@mui/material/Alert";
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SuccessfulPayment() {
    const navigate = useNavigate()

  useEffect(() => {
        //call endpoint of payment
    /*setTimeout(() => {
      navigate('/home/1')
    }, 5000)*/
  }, [])
  return (
    <div className="flex flex-col space-y-5">
      <div className="flex justify-center">
        <Alert severity="success" color="info" className="mt-10 sm:w-fit md:w-[50%] md:whitespace-nowrap">
          Your payment has been done successfully!
        </Alert>
        
      </div>
      <div className="flex justify-center items-center">
      <p className="text-gray-400 text-sm font-semibold ">You will be redirected to home page shortly</p>
      <CircularProgress disableShrink className="mx-5"/>
      </div>
      <div className="flex justify-center">
        <img src={success} alt="success" className=" w-1/2 md:h-[580px] " />
      </div>
    </div>
  );
}
