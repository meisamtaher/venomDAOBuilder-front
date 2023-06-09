import BigNumber from "bignumber.js"
export const getValueForSend = (value: string | number): string => {
    return new BigNumber(value).multipliedBy(10 ** 9).toString();
  };
  