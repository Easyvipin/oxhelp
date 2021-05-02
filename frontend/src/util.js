import validator from "validator";
import { isMobilePhone, isAlpha } from "validator";
export const checkMobilePhone = (phoneNumber) => {
  phoneNumber.forEach((item) => {
    if (item.current) {
      if (
        !isMobilePhone(`+91${item.current.value}`, ["en-IN"], {
          strictMode: true,
        })
      ) {
        console.log("invalid");
        return {
          phoneNumber: item.current.value,
          result: false,
        };
      }
    }
    return {
      result: true,
    };
  });
};

export const checkName = (fullname) => {
  return isAlpha(fullname);
};
