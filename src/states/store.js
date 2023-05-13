import { configureStore } from "@reduxjs/toolkit";
import globalRedcuer from "./index.js"

const store = configureStore({
    reducer: {
        global : globalRedcuer,
    },

})

export default store ;