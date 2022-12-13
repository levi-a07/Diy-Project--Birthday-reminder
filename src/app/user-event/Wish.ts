import { IEmployee } from "../employee/Employee"
import { IloginUser } from "../login/loginUser"

export interface IWish{

    wish_id :number,
wish_text:string,
reciever : IloginUser,
sender: IloginUser
}
