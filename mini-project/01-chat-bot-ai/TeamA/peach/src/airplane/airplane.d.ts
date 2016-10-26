declare class AirplaneResult {
    source: string; //來源 (航空公司)
    date: string; //日期 MM/DD
    weekDay?: string; //星期縮寫
    price?: number;  //價錢
    currencyCode: string; //貨幣
    from: string; //起飛點
    to: string; //到達點
}