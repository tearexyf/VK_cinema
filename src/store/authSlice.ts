import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { User, AuthInfo, RegisterData } from "../types/user";
import { loginUser, logoutUser, registerUser, getCurrentUser } from "../api/auth";

interface AuthState {
  user: User | null;       
  isLoading: boolean;    
  error: string | null;   
}
const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
}

export const login = createAsyncThunk(
  "auth/login",                    
  async (payload: AuthInfo) => {   
    const user = await loginUser(payload)
    return user
  }
)
export const register = createAsyncThunk(
  "auth/register",
  async (payload: RegisterData) => {
    const user = await registerUser(payload)
    return user
  }
)
export const logout = createAsyncThunk("auth/logout", async () => {
  await logoutUser()
})
export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async () => {
    const user = await getCurrentUser()
    return user
  }
)
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message ?? "Ошибка авторизации"
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message ?? "Ошибка регистрации"
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.user = null
      })
  },
})

export const { clearError } = authSlice.actions
export default authSlice.reducer