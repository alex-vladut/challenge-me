import differenceInMinutes from "date-fns/differenceInMinutes";

export const timeDifference = (from: Date, to: Date) => {
  const minutes = Math.floor(differenceInMinutes(to, from));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 31);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return years === 1 ? "1 year ago" : `${years} years ago`;
  }
  if (months > 0) {
    return months === 1 ? "1 month ago" : `${months} months ago`;
  }
  if (days > 0) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  }
  if (hours > 0) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  }
  if (minutes === 0) {
    return "few seconds ago";
  }
  return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
};
