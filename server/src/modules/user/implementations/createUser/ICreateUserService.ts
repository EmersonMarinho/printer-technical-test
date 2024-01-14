import ICreateUserDTO from "../../DTO/ICreateUserDTO";
import ServiceResponse from "../../../interfaces/ServiceResponse";

export default interface ICreateUserService {
    create(data: ICreateUserDTO): Promise<ServiceResponse>;
    login(data: { email: string; password: string }): Promise<ServiceResponse>;
}  