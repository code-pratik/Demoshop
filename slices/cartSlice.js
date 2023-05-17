import { createSlice } from "@reduxjs/toolkit";
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartproducts: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cartproducts.find(
        (item) => item.id === action.payload.id
      );
      if (itemInCart) {
        const indexToUpdate = state.cartproducts.findIndex(
          (item) => item.id === action.payload.id
        );
        state.cartproducts.splice(indexToUpdate, 1, { ...action.payload });
        localStorage.setItem(
          "cartproducts",
          JSON.stringify(state.cartproducts)
        );
      } else {
        state.cartproducts.push({ ...action.payload });

        localStorage.setItem(
          "cartproducts",
          JSON.stringify(state.cartproducts)
        );
      }
    },
    DeleteItem: (state, action) => {
      const itemIndex = state.cartproducts.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cartproducts.splice(itemIndex, 1);
      localStorage.setItem("cartproducts", JSON.stringify(state.cartproducts));
    },
    //   extraReducers: (builder) => {
  },
  //     builder.addCase(fetchPokemonName.fulfilled, (state, action) => {
  //       state.pokemonname = action.payload;
  //     });
  //     builder.addCase(fetchPokemonName.pending, (state, action) => {
  //       state.pokemonname = [];
  //     });
  //   },
});

export const { addToCart, DeleteItem } = cartSlice.actions;
export default cartSlice.reducer;
