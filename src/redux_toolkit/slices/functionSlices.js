import { createSlice } from "@reduxjs/toolkit";



const functionSlices = createSlice({
    name: "functions",
    initialState: {
        searchName: "",
        filterArr: [],
        isAddProduct:false,
    },
    reducers: {

        isAddProductReducer:(state, action) =>{
            state.isAddProduct=action.payload;
        },

        searchNameReducer: (state, action) => {
            state.searchName = action.payload;
        },

        filterArrReducer: (state, action) => {
            state.filterArr = action.payload;
        }
    }
});

export const { searchNameReducer, filterArrReducer,isAddProductReducer } = functionSlices.actions;
export default functionSlices.reducer;