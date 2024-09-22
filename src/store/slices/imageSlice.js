import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch product images
export const fetchProductImage = createAsyncThunk(
    'images/fetchImage',
    async (itemId) => {
        const response = await fetch(`http://localhost:8080/api/products/${itemId}`);
        const product = await response.json();
        const fileName = product.imageURL;
        const imageResponse = await fetch(`http://localhost:8080/api/s3/${fileName}`);
        const fullImageUrl = await imageResponse.text(); // Assuming backend returns a text URL
        console.log(fullImageUrl);
        
        return { itemId, fullImageUrl }; // Return the itemId and image URL
    }
);

const imageSlice = createSlice({
    name: 'images',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProductImage.fulfilled, (state, action) => {
            state[action.payload.itemId] = action.payload.fullImageUrl; // Store image URL by item ID
        });
    },
});

export default imageSlice;
