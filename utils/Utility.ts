const formatNumberWithCommas = (value: string): string => {
  return Number(value).toLocaleString();
};

export default {
  formatNumberWithCommas,
};
