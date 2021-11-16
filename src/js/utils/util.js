export default {
  convertTimeFormat(time) {
    const [year, month, day] = time.toString().slice(0, 10).split('-');

    return `${year}년 ${month}월 ${day}일`;
  },

  calculateElaspedTime(time) {
    const today = new Date();
    const timeValue = new Date(time);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    const betweenTimeHour = Math.floor(betweenTime / 60);
    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);

    if (betweenTime < 1) return '방금 전';
    if (betweenTime < 60) return `${betweenTime}분 전`;
    if (betweenTimeHour < 24) return `${betweenTimeHour}시간 전`;
    if (betweenTimeDay < 365) return `${betweenTimeDay}일 전`;
    return `${Math.floor(betweenTimeDay / 365)}년 전`;
  },
};
