const VNDFormattedDate = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  // Xây dựng chuỗi định dạng "dd/mm/yyyy"
  return (
    day + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds
  );
};

export default VNDFormattedDate;
