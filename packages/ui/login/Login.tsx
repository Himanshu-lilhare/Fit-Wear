"use client"
import React from 'react'
import {useForm } from 'react-hook-form'
  
export const Login = () => {
    const form = useForm()
  return (
    <form>
        <div>
            <label htmlFor="email">E-mail</label>
            <input type="mail" placeholder='e-mail' {...form.register("email")} />
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder='Password' {...form.register("password")}/>
        </div>
       
    </form>
  )
}

