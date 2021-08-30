import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = (message, type) => {
  switch (type) {
    case 1:
      toast.success(message, {
        theme: "colored",
      });
      break;
    case 2:
      toast.error(message, {
        theme: "colored",
      });
      break;
    default:
      break;
  }
};
export default Toast;
