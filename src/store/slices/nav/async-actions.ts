import { createAsyncThunk } from "@reduxjs/toolkit";
import { CategoryService } from "../../../services/category-service";
import { Category } from "../../../types/data.types";
import {setAlertFounder} from "../popup/popup-slice";
import {AlertFounders} from "../../../utils/constants";


export const fetchGenres = createAsyncThunk<Category[], undefined, {rejectValue: string}>(
    'nav/fetchGenres',
    async (_, {rejectWithValue, dispatch}) => {
        try{
            dispatch(setAlertFounder(AlertFounders.CATEGORIES))
            return await CategoryService.getCategories()
        }catch(error: any){
            return rejectWithValue(error.message);
        }
    }
)
