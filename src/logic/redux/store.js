import { configureStore } from "@reduxjs/toolkit";
import graphSlice from "./graphSlice";

export default configureStore({
  reducer: { graph: graphSlice },
});
