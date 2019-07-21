import AuthService from './service';
import HttpError from '../../config/error';
import { IUserModel } from '../User/model';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import app from '../../config/server/server';

/**
 * @export
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Promise < void >}
 */
export async function signup(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {

        const user: IUserModel = await AuthService.createUser(req.body);
        // const token: string = jwt.sign({ email: user.email }, app.get('secret'), {
        //     expiresIn: '60m'
        // });
        
        res.json({
            status: 200,
            logged: false,
            // token: token,
            message: 'Sign in successfull'
        });
    } catch (error) {
        if (error.code === 500) {
            return next(new HttpError(error.message.status, error.message));
        }

        res.status(400).json({
            status: false,
            message: error.message
        })
        // res.json({
        //     status: 400,
        //     message: error.message
        // });
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function login(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const user: IUserModel = await AuthService.getUser(req.body);
        
        const token: string = jwt.sign({ email: user.email }, app.get('secret'), {
            expiresIn: '60m'
        });
        
        if(user.is_active) {
            res.json({
                status: 200,
                logged: true,
                token: token,
                message: 'Sign in successfull',
                user: user
            });
        } else {
            res.status(400).json({
                status: false,
                message: "Inactivated account."
            })
        }
    } catch (error) {
        if (error.code === 500) {
            return next(new HttpError(error.message.status, error.message));
        }

        res.status(400).json({
            status: false,
            message: error.message
        })
    }
}
