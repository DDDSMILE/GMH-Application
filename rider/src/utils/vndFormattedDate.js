const VNDFormattedDate = (dateString) => {
  let currentDate = "";
  if (typeof dateString === "string") {
    currentDate = new Date(dateString);
  } else {
    currentDate = new Date();
  }
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  return (
    day + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds
  );
};

export default VNDFormattedDate;
