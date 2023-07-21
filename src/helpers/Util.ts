import moment from "moment";

export class Util {
  static formatDate(date: string, format?: string) {
    return moment(date).format(format || "DD-MM-YYYY");
  }

  static formAmount(amount: number | undefined, isKobo?: boolean) {
    if (!amount) return `N 0.00`;
    if (isKobo) return `N ${(Number(amount) / 100).toFixed(2)}`;

    return `N ${Number(amount).toFixed(2)}`;
  }
}
