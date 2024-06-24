import dayjs from "dayjs";

export default function generateLog(log) {
  const date = dayjs(log.createdAt).format("hh:mm:ss DD/MM/YYYY");
  let message = "";
  switch (log.type) {
    case "UPDATE_WORKER_DATA":
      message = `Sửa thông tin nhân viên ${log.userId}: ${log.name}`;
      break;
    case "WORKER_REQUEST":
      message = `Yêu cầu thêm nhân viên ${log.userId}`;
      break;
  }
  return message + " " + "vào" + " " + date;
}
