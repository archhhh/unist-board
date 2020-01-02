export const formatDate = (date) => {    
    let seconds = Math.ceil((new Date() - date)/1000);
    if(seconds < 60){
        if(seconds < 1)
            return 'now';
        else if(seconds == 1)
            return '1 second ago';
        else
            return `${seconds} seconds ago`;
    }
    let minutes = Math.ceil(seconds/60);
    if(minutes < 60)
        return minutes == 1 ? '1 minute ago' : `${minutes} minutes ago`;
    let hours = Math.ceil(minutes/60);
    if(hours < 24){
        return hours == 1 ? '1 hour ago' : `${hours} hours ago`;
    }
    let days = Math.ceil(hours/24);
    if(days < 30){
        return days == 1 ? '1 day ago' : `${days} days ago`;
    }
    let months = Math.ceil(days/30);
    if(months < 12){
        return months == 1 ? '1 month ago': `${months} months ago`; 
    }
    let years =  Math.ceil(days/365);
    return years == 1 ? '1 year ago' : `${years} years ago`;
}

