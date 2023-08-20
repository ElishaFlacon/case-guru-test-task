import React, { createContext } from "react";


export const AppContext = createContext<{setSnack: any}>({ setSnack: [] });