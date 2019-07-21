import UserService from './service';
import { HttpError } from '../../config/error';
import UserModel, { IUserModel } from './model';
import { NextFunction, Request, Response } from 'express';
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findAll(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const users: IUserModel[] = await UserService.findAll();

        res.status(200).json(users);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findOne(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const user: IUserModel = await UserService.findOne(req.params.id);

        res.status(200).json(user);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function create(req: Request, res: Response, next: NextFunction): Promise < void > {

    const query: IUserModel = await UserModel.findOne({
        email: req.body.email
    });

    if (query) {
        next(new Error('This email already exists'));
    }

    try {

        if(!req.body.avata) {
            delete req.body.avata;
        }
        const user: IUserModel = await UserService.insert(req.body);

        res.status(201).json({
            status: 201,
            user: user
        });
    } catch (error) {
        console.log(error)
        next(new HttpError(error.message.status, error.message));
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function remove(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const user: IUserModel = await UserService.remove(req.params.id);

        res.status(200).json({
            status: 200,
            user: user
        });
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}


/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function update(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const user: IUserModel = await UserService.update(req.params.id, req.body);

        res.status(200).json({
            status: 200,
            user: user
        });
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}
