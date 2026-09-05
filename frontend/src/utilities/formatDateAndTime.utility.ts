const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? dateStr : parsed.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
  };

 const formatTime = (dateStr?: string) => {
    if (!dateStr) return "";
    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? "" : parsed.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  export {
    formatDate,
    formatTime
  }
