import { atom } from "recoil";
import React, { useState} from "react";


export const favourites = atom<{
//   address: string | undefined;
//   shortAddress: string | undefined;

}>({
  key: "favourites",
  default: JSON.parse(localStorage.getItem("favlist")!) === null ? [] : JSON.parse(localStorage.getItem("favlist")!),
  dangerouslyAllowMutability: true,
});
