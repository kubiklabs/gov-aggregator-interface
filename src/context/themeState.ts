import { atom } from "recoil";
import React, { useState} from "react";


export const themeState = atom<{
//   address: string | undefined;
//   shortAddress: string | undefined;

}>({
  key: "themeState",
  default: ((localStorage.getItem("fixedFiTheme")) === null || (localStorage.getItem("fixedFiTheme")) === undefined) ? "Dark" : (localStorage.getItem("fixedFiTheme")!),
  dangerouslyAllowMutability: true,
});
