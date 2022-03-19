import { getCustomRepository } from 'typeorm';
import { NextFunction, Request, Response } from "express";
import { UsersRepositories } from '../repositories/UsersRepositories';

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
  const usersRepository = getCustomRepository(UsersRepositories);
  const { user_id } = request;

  const { admin } = await usersRepository.findOne(user_id);

  if(admin) {
    return next()
  }

  return response.status(401).json({
    error: "Unauthorized"
  })
}