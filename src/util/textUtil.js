export function unescapeHtml(escaped) {
    return escaped
        .replace("&amp;", "&")
        .replace("&lt;", "<")
        .replace("&gt;", ">")
        .replace("&quot;", "\"")
        .replace("&#039;", "'");
}

export const toHHMMSS = (secs) => {
    var sec_num = parseInt(secs, 10)
    var hours   = Math.floor(sec_num / 3600)
    var minutes = Math.floor(sec_num / 60) % 60
    var seconds = sec_num % 60

    return [hours,minutes,seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v,i) => v !== "00" || i > 0)
        .join(":")
}

export const hhMMToSeconds = (hhmm) => {
    const a = hhmm.split(":");
    return parseInt(a[0]) % 12 * 3600 + parseInt(a[1]) * 60 + (a[1].includes("PM") ? 12 * 3600 : 0);
}

export const dateToDaySeconds = (d) => {
    let time = d.getSeconds();
    time += d.getMinutes() * 60;
    time += d.getHours() * 3600;
  
    return time;
}