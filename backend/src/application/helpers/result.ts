export class Result<T> {
  public readonly isSuccess: boolean;
  public readonly isFailure: boolean;
  public readonly data: T | null;
  public readonly error : string | null;
  public readonly statusCode : number;

  constructor(isSuccess : boolean, statusCode : number, data : T | null, error : string | null){
    this.isSuccess = isSuccess
    this.isFailure = !isSuccess
    this.data = data 
    this.error = error 
    this.statusCode = statusCode
  }

  public static success<T>(data : T,statusCode : number) : Result<T> {
    return new Result<T>(true,statusCode,data,null)
  }
  public static failure<T>(error : string,statusCode : number) : Result<T> {
    return new Result<T>(false,statusCode,null,error)
  }
}
