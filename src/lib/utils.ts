/**
 * @description 숫자의 3자리 단위로 콤마를 추가합니다.
 * @param number
 * @returns string
 */
export const commaSeparate = (number: number): string => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
