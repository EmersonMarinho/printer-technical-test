import User from "../../../../database/models/UserModel";
import ServiceResponse from "../../../interfaces/ServiceResponse";
import ICreateUserService from "./ICreateUserService";
import * as bcrypt from 'bcryptjs';
import { sign } from "jsonwebtoken";

const secret = process.env.JWT_SECRET || 'default';

export default class CreateUserService implements ICreateUserService {
    async create(data: { name: string; email: string; password: string; role?: string }): Promise<ServiceResponse> {
        const { name, email, password, role = 'OWNER' } = data;

        const userExists = await User.findOne({ where: { email } });

        if (userExists) {
            return {
                status: 400,
                data: { message: 'User already exists' }
            };
        }

        const hashedPassword = await bcrypt.hash(password, 8);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        const token = sign({}, secret, {
            subject: newUser.toString(),
            expiresIn: '1d'
        });

        return {
            status: 201,
            data: {
                message: 'User created successfully',
                token
            }
        };
    }

    async login(data: { email: string; password: string }): Promise<ServiceResponse> {
        const { email, password } = data;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return {
                status: 400,
                data: { message: 'User not found' }
            };
        }

        const passwordMatched = await bcrypt.compare(password, user.password);

        if (!passwordMatched) {
            return {
                status: 400,
                data: { message: 'Incorrect email/password combination' }
            };
        }

        const token = sign({}, secret, {
            subject: user.toString(),
            expiresIn: '1d'
        });

        return {
            status: 200,
            data: {
                message: 'User logged in successfully',
                token
            }
        };
    }
}
