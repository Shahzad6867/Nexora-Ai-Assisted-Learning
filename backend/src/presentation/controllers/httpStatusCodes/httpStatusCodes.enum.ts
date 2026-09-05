
export enum HTTP_STATUS_CODES {
    // --- FETCHING ENTITIES ---
    OK = 200,                    
    NOT_FOUND = 404,             
  
    // --- CREATING ENTITIES ---
    CREATED = 201,              
  
    // --- UPDATING & BLOCKING ---
    NO_CONTENT = 204,           
    
    // --- VALIDATION & BUSINESS RULES ---
    BAD_REQUEST = 400,           
    UNAUTHORIZED = 401,         
    FORBIDDEN = 403,            
    CONFLICT = 409,          
    
    GONE = 410,
  
    // --- SERVER ERRORS ---
    INTERNAL_SERVER_ERROR = 500
  }
  