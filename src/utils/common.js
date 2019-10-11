Array.prototype.contains = function (obj) {
	var index = this.length;
	while (index--) {
		if (this[index] === obj) {
			return true;
		}
	}
	return false;
}


// 判断是否移动端
export function is_mobile(){
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        return true
    } 
    return false
}