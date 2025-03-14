const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  let className = "";

  if (type === "error") {
    className = "error";
  } else if (type === "success") {
    className = "success";
  }

  return <div className={className}>{message}</div>;
};

export default Notification;
