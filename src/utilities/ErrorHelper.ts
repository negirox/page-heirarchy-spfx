import { LogHelper } from "./LogHelper";

export class ErrorHelper {


  public static handleHttpError(methodName: string, error: any): void {
    this.logError(methodName, error);
  }

  public static logError(methodName: string, error: Error):void {
    LogHelper.exception("Error Helper", methodName, error);
  }

  public static logPnpError(methodName: string, error: any | any): string | undefined {
    let msg: string | undefined;
    if (error.data !== null && error.data.responseBody && error.data.responseBody.error && error.data.responseBody.error.message) {
      // for email exceptions they weren't coming in as "instanceof any"
      msg = error.data.responseBody.error.message.value;
      LogHelper.error("Error Helper", methodName, msg!);
    }
    else if (error instanceof Error) {
      if (error.message.indexOf('[412] Precondition Failed') !== -1) {
        msg = 'Save Conflict. Your changes conflict with those made concurrently by another user. If you want your changes to be applied, resubmit your changes.';
        LogHelper.error("Error Helper", methodName, msg);
      }
      else if (error.message !== 'Unexpected token < in JSON at position 0') {
        // 'Unexpected token < in JSON at position 0' will be thrown if XML file is read; this was issue in MDF project
        msg = error.message;
        LogHelper.error("Error Helper", methodName, msg);
      }
      return msg;
    }
  }
}
