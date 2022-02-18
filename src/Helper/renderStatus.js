const renderStatus = (
  requestStatus,
  setRequestStatus,
  renderText,
  textColor
) => {
  let renderValue;
  if (requestStatus === "Pending") {
    renderValue = <h2 style={{ color: textColor }}>{renderText}</h2>;
  } else if (requestStatus === "Error") {
    renderValue = (
      <h2 style={{ color: "#e84118" }}>An Unknown Error Occurred</h2>
    );
    setTimeout(() => {
      setRequestStatus(null);
    }, 3000);
  }
  return renderValue;
};

export default renderStatus;
