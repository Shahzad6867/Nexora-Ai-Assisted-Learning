export interface ApiSuccessResponse<T> {
    success: boolean;
    statusCode: number;
    data: T;
    message: string;
  }
  export interface ApiFailureResponse {
      success: boolean;
      statusCode: number;
      error : string;
  }
  