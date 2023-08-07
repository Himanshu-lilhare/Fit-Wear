"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type LoginForm = {
  email: string;
  password: string;
};
export const Login = () => {
  const form = useForm<LoginForm>();

  const { control, handleSubmit, formState } = form;
  const { errors } = formState;

  function onSubmit(data: LoginForm) {

    console.log(data.email + data.password);
    
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            required
            type="mail"
            placeholder="e-mail"
            {...form.register("email", {
              required: "Email is Required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please Provide Email in Right Format",
              },
              
            })}
          />
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            required
            type="password"
            placeholder="Password"
            {...form.register("password", 
            { required: "Pasword is Required",
              pattern:{
                value:/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
                message:"Password Must Contain Special Character , Number and Uppercase Letter"
              },
              minLength:{
                value:20,
                message:"Min Length is 20"
              }
          })}
          />
          <p>{errors.password?.message}</p>
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};
