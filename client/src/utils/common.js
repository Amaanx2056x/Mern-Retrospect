import { toast } from "react-toastify";

export let toastMessage = (type, msg) => {
  toast[type](msg, { theme: "colored" });
};
export let handleAxiosError = (error) => {
  let errorCodes = [400, 500];
  if (
    errorCodes.includes(error.response.status) &&
    error.response.data.error.length > 0
  ) {
    toastMessage("error", error.response.data.error[0].msg);
  } else {
    toastMessage("error", "Something went wrong");
  }
};
