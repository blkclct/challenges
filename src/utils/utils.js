export function summaryDonations (donateAmountList) {
  const donateAmountAll = donateAmountList;
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  return donateAmountAll.reduce(reducer);
}