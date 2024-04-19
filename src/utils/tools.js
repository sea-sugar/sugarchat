/**
* 参数处理
* @param {*} params  参数
*/
export function tansParams(params) {
	let result = ''
	for (const propName of Object.keys(params)) {
		const value = params[propName];
		var part = encodeURIComponent(propName) + "=";
		if (value !== null && typeof (value) !== "undefined") {
			if (typeof value === 'object') {
				for (const key of Object.keys(value)) {
					if (value[key] !== null && typeof (value[key]) !== 'undefined') {
						let params = propName + '[' + key + ']';
						var subPart = encodeURIComponent(params) + "=";
						result += subPart + encodeURIComponent(value[key]) + "&";
					}
				}
			} else {
				result += part + encodeURIComponent(value) + "&";
			}
		}
	}
	return result
}

export function formatTimeBox(time) {
	const date = new Date(time);

	// 获取时间的小时和分钟
	const hours = date.getHours();
	const minutes = date.getMinutes();

	// 对小时和分钟进行补零处理
	const formattedHours = hours < 10 ? `0${hours}` : hours;
	const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

	// 获取当前日期的年月日
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth() + 1;
	const currentDay = currentDate.getDate();

	// 获取传入时间的年月日
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();

	// 如果传入时间与当前时间的年月日相同，则只返回小时和分钟；否则返回完整的日期加上小时和分钟
	if (year === currentYear && month === currentMonth && day === currentDay) {
	  return `${formattedHours}:${formattedMinutes}`;
	} else {
	  return `${year}/${month}/${day} ${formattedHours}:${formattedMinutes}`;
	}
  }

export function formatTimeGroup(time) {
	const date = new Date(time);

	// 获取时间的小时和分钟
	const hours = date.getHours();
	const minutes = date.getMinutes();

	// 对小时和分钟进行补零处理
	const formattedHours = hours < 10 ? `0${hours}` : hours;
	const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

	// 获取当前日期的年月日
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth() + 1;
	const currentDay = currentDate.getDate();

	// 获取传入时间的年月日
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();

	// 如果传入时间与当前时间的年月日相同，则只返回小时和分钟；否则返回完整的日期加上小时和分钟
	if (year === currentYear && month === currentMonth && day === currentDay) {
	  return `${formattedHours}:${formattedMinutes}`;
	} else {
	  return `${year}/${month}/${day}`;
	}
  }