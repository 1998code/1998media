import { sharedPreferences } from "../styles/theme"

// breakpoints.lg needs to be cleaned and parsed since it is a string like '1200px'
export const detectMobileAndTablet = windowWidth =>
  windowWidth <
  parseInt(sharedPreferences.breakpoints.lg.match(/\d+/gi).join(""))

// detect server-side-rendering to fix bugs while gatsby build
export const isSSR = typeof window === "undefined"

// used to parse the publication date of medium articles
export const parseDate = date => {
  const year = date.substring(0, 4)
  const month = date.substring(5, 7)
  const day = date.substring(8, 10)

  switch (month) {
    case "01":
      return day + " 一月 " + year
    case "02":
      return day + " 二月 " + year
    case "03":
      return day + " 三月 " + year
    case "04":
      return day + " 四月 " + year
    case "05":
      return day + " 五月 " + year
    case "06":
      return day + " 六月 " + year
    case "07":
      return day + " 七月 " + year
    case "08":
      return day + " 八月 " + year
    case "09":
      return day + " 九月 " + year
    case "10":
      return day + " 十月 " + year
    case "11":
      return day + " 十一月 " + year
    case "12":
      return day + " 十二月 " + year
    default:
      return "沒有出版日期"
  }
}
