const VNDCurrencyFormatting = (price) => {
  const formatPrice = price.toLocaleString("vi", {
    style: "currency",
    currency: "VND",
  });
  return formatPrice;
};

export default VNDCurrencyFormatting;
