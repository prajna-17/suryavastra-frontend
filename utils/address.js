import { getUserIdFromToken } from "./auth";

export const getAddressKey = () => {
  const userId = getUserIdFromToken();
  return userId ? `userAddress_${userId}` : "userAddress_guest";
};
