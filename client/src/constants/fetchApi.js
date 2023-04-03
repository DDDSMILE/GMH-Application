// Get flag icon (height is fixed, width is variable)
const getFlagIcon = (code = "vn") =>
  `${"https://flagcdn.com/h60/"}/${code}.png`;

export { getFlagIcon };
