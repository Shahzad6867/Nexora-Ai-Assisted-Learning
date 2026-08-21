import { GoogleUserDTO } from "../application/dtos/user.dto";



declare global {

    namespace Express {

        interface User
            extends  GoogleUserDTO {}

    }

}