export const convertStr = (e: number) => {
  let temp = e;
  let str = "";
  let count = 0;
  while (temp > 0) {
    str = (temp % 10) + str;
    count++;
    if (count % 3 === 0 && temp >= 10) {
      str = "." + str;
    }
    temp = Math.floor(temp / 10);
  }
  return str + " đ";
};
