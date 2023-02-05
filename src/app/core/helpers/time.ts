export function howLongFromPastDate(futureDate: Date | string,short=false):string{
    let date: Date;
    if(typeof futureDate === "string"){
      date = new Date(futureDate)
    } else {
      date = futureDate
    }
    const seconds = Math.floor((date.getTime() - new Date().getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) {
      if (interval < 2) return !short ? "In a year" : "1 y";
      return "In a " + Math.floor(interval) + (!short ? " años" : " y");
    }
  
    interval = seconds / 2592000;
    if (interval > 1) {
      if (interval < 2) return !short ? "In a month" : "1 m";
      return "In a " + Math.floor(interval) + (!short ? " months" : " m");
    }
  
    interval = seconds / 86400;
    if (interval > 1) {
      if (interval < 2) return !short ? "Tomorrow" : "1 d";
      return "In a " + Math.floor(interval) + (!short ? " days" : " d");
    }
  
    interval = seconds / 3600;
    if (interval > 1) {
      if (interval < 2) return !short ? "In an hour" : "1 h";
      return "In an " + Math.floor(interval) + (!short ? " hours" : " h");
    }
  
    interval = seconds / 60;
  
    return (!short ? "Past" : "Past");
  }
  