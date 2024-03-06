import React, { useEffect, useState } from "react";
import { errorCodes } from "../Constants/Constant";

const useErrorHook = (error, errorCode) => {
  const [apiShowError, setApiShowError] = useState({
    show: false,
    title: null,
    msg: null,
    type: null,
  });
  useEffect(() => {
    if (error !== null && !error?.Success) {
      handleErrorCode(errorCode);
    }
  }, [error, errorCode]);
  const handleErrorCode = (errorCode) => {
    if (errorCodes.hasOwnProperty(errorCode)) {
      setApiShowError({
        show: true,
        title: "Error",
        msg: error?.ErrorMessage || errorCodes[errorCode],
        type: "error",
      });
    } else {
      setApiShowError({
        show: true,
        title: "Error",
        msg: error?.ErrorMessage || errorCodes.default,
        type: "error",
      });
    }
  };

  return { apiShowError, setApiShowError };
};

export default useErrorHook;
