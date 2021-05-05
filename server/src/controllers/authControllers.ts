import { Gmailer } from "../services"
import { BadRequestError } from "../errors";
import { User, UserDoc } from "../models/user"
import { catchAsync } from "../middlewares"
import { Request, Response, NextFunction, CookieOptions } from "express"
import jwt from "jsonwebtoken"
import { StatusCodes } from 'http-status-codes';

const generateRandom = function (min: number, max: number) {
    var ranNum = Math.floor(Math.random()*(max-min+1)) + min;

    return ranNum;
  }

const generateToken = (id?: string, email?: String): string => {
    return jwt.sign(
        { id, email },
        //@ts-ignore
        process.env.JWT_KEY!,
        {
            expiresIn: process.env.JWT_EXPIRES_IN!,
        }
    );
};

const createSendToken = (user: UserDoc, statusCode: StatusCodes, req: Request, res: Response): void => {
    const token: string = generateToken(user.id, user.email)
    //@ts-ignore
    const expiration: Date = new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN! * 24 * 60 * 60 * 1000)

    const cookieOptions: CookieOptions = {
        expires: expiration,
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    };

    res.cookie('jwt', token, cookieOptions);

    if (user.password) {
        user.password = undefined;
    }

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
}

export const signup = catchAsync(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        const { name, email, password, confirmPassword, university } = req.body

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            throw new BadRequestError("사용중인 이메일 입니다.")
        }

        const user = User.build({ name, email, password, confirmPassword, university })

        await user.save()

        createSendToken(user, StatusCodes.CREATED, req, res);

    },
);

export const signin = catchAsync(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        const { email, password } = req.body

        const existingUser = await User.findOne({ email }).select('+password');

        if (!existingUser) {
            throw new BadRequestError("Invalid credentials")
        }

        const passwordsMatch = await User.correctPassword(password, existingUser.password!)

        if (!passwordsMatch) {
            throw new BadRequestError("Invalid credentials")
        }

        createSendToken(existingUser, StatusCodes.OK, req, res);


    })

export const signout = (
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        res.cookie('jwt', 'loggedout', {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true
        });
        res.status(StatusCodes.OK).json({ status: 'success' });
    }
)

export const currentUser = (
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        res.send({ currentUser: req.currentUser || null })
    }
)

export const forgotPassword = (
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    }
)

export const resetPassword = (
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    }
)

export const sendEmail = catchAsync(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        const number = generateRandom(111111,999999)

        const { email } = req.body

        const message = "오른쪽 숫자 6자리를 입력해주세요 : " + number

        const gmail = new Gmailer()

        gmail.sendMessage({
            email: email,
            subject: "웹메일 인증",
            message
        })

        res.status(StatusCodes.OK).json({
            data: {
                number, email
            }
        })
    }
);