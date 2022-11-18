import { createSlice } from "@reduxjs/toolkit";
const page = {
  1: "Dashboard",
  2: "Projects",
  3: "About Me",
  4: "Contact Me",
  5: "Not Found! [ 404 ]",
  6: "Internal Server Error! [ 500 ] ",
  7: "Admin",
  8: "Admin Authentication",
};
const initialState = {
  barOpen: false,
  barFocus: false,
  currPage: page[1],
  width: window.innerWidth || document.documentElement.clientWidth,
  initLoading: true,
  info: {},
  githubRepos: [],
  projects: [],
  isAdminAuth: false,
};

export const Reducer = createSlice({
  name: "Reducer",
  initialState,
  reducers: {
    setBarOpenTrue: (state) => {
      state.barOpen = true;
    },
    setBarOpenFalse: (state) => {
      state.barOpen = false;
    },
    setIsAdminAuthTrue: (state) => {
      state.isAdminAuth = true;
    },
    setIsAdminAuthFalse: (state) => {
      state.isAdminAuth = false;
    },
    setInitLoadingTrue: (state) => {
      state.initLoading = true;
    },
    setInitLoadingFalse: (state) => {
      state.initLoading = false;
    },
    setBarFocusTrue: (state) => {
      state.barFocus = true;
    },
    setBarFocusFalse: (state) => {
      state.barFocus = false;
    },
    setInfoImage: (state, action) => {
      state.info.image = action.payload;
    },
    setWidth: (state) => {
      state.width = document.documentElement.clientWidth || window.innerWidth;
    },
    setCurrPage: (state, action) => {
      state.currPage = page[action.payload];
    },
    setInfo: (state, action) => {
      state.info = action.payload;
    },
    setGithubRepos: (state, action) => {
      state.githubRepos = action.payload;
    },
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
  },
});

export const {
  setBarOpenTrue,
  setBarOpenFalse,
  setBarFocusTrue,
  setBarFocusFalse,
  setWidth,
  setCurrPage,
  setInitLoadingTrue,
  setInitLoadingFalse,
  setInfo,
  setGithubRepos,
  setProjects,
  setIsAdminAuthTrue,
  setIsAdminAuthFalse,
  setInfoImage,
} = Reducer.actions;

export default Reducer.reducer;
