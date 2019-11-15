import provinces from "./provinces";
import cities from "./cities";
import areas from "./areas";

export function combine(level: 0 | 1 | 2) {
  provinces.forEach((provice:any) => {
    if (level >= 1) {
      provice.children = [];
      cities.forEach((city:any) => {
        if (level === 2) {
          city.children = [];
          areas.forEach((area:any) => {
            if (area.cityCode === city.code) {
              city.children.push(area);
            }
          });
        }
        if (city.provinceCode === provice.code) {
          provice.children.push(city);
        }
      });
    }
  });
  return provinces;
}

export function copyValLabel(data: any, val: string, label?: string) {
  data.map((item: any) => {
    item["value"] = item[val];
    item["label"] = label ? item[label] : item[val];
    if (item.children) {
      copyValLabel(item.children, val, label);
    }
  });
  return data;
}
