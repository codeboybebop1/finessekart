import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    id: null,
    role: null,
    fullName: null,
  },
});

export const favouriteState = atom({
  key: "favouriteState",
  default: [],
});