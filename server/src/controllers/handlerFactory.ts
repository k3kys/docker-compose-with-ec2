import { StatusCodes } from 'http-status-codes';
import { RequestHandler, Request, Response, NextFunction } from 'express';
import { BadRequestError } from './../errors';
import { catchAsync } from './../middlewares';
import mongoose from "mongoose"

export const getAll = (Model: mongoose.Model<any>, popOptions: string): RequestHandler =>
    catchAsync(
        async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            let doc = Model.find({})
            if (!doc) {
                throw new BadRequestError("No document found")
            }

            res.status(StatusCodes.OK).json({
                status: 'success',
                data: {
                    data: doc
                }
            });
        },
    );

export const getOne = (Model: mongoose.Model<any>, popOptions: string): RequestHandler =>
    catchAsync(
        async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            let query = Model.findById(req.params.id)
            if (popOptions) query = query.populate(popOptions);
            const doc = await query;

            if (!doc) {
                throw new BadRequestError("No document found with that ID")
            }

            res.status(StatusCodes.OK).json({
                status: 'success',
                data: {
                    data: doc
                }
            });
        },
    );

export const createOne = (Model: mongoose.Model<any>): RequestHandler =>
    catchAsync(
        async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            const doc = await Model.create(req.body);

            res.status(StatusCodes.CREATED).json({
                status: 'success',
                data: {
                    data: doc
                }
            });
        },
    );
export const updateOne = (Model: mongoose.Model<any>): RequestHandler =>
    catchAsync(
        async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });

            if (!doc) {
                throw new BadRequestError("No document found with that ID")
            }

            res.status(StatusCodes.OK).json({
                status: 'success',
                data: {
                    data: doc
                }
            });
        },
    );

export const deleteOne = (Model: mongoose.Model<any>): RequestHandler =>
    catchAsync(
        async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            const doc = await Model.findByIdAndDelete(req.params.id);

            if (!doc) {
                throw new BadRequestError("No document found with that ID")
            }

            res.status(StatusCodes.ACCEPTED).json({
                status: "success",
                data: null,
            });
        },
    );