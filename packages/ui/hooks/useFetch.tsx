"use client";

import axios from "axios";
import React, { useEffect } from "react";

export const useFetch = (url: string) => {
    
  useEffect(() => {
    async function fetchBaby() {
      const {data} = await axios.get(url,{
        withCredentials:true
      });

     
      console.log(data);
    }

    fetchBaby();
  }, []);

  return null;
};
