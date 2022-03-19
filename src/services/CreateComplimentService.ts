import { getCustomRepository } from 'typeorm';
import { ComplimentsRepositories } from '../repositories/ComplimentsRepositories';
import { UsersRepositories } from '../repositories/UsersRepositories';


interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

class CreateComplimentService{
  async execute({ tag_id, user_sender,  user_receiver, message }: IComplimentRequest) {
    const complimentsRepository = await getCustomRepository(ComplimentsRepositories);
    const usersRepository = await getCustomRepository(UsersRepositories);

    if (user_sender == user_receiver) {
      throw new Error("Sending a compliment to yourself isn't allowed")
    }
    
    const userReceiverExists = await usersRepository.findOne(user_receiver)

    if (!userReceiverExists) {
      throw new Error("User receiver does not exists")
    }

    const compliment = await complimentsRepository.create({
      user_sender,
      user_receiver,
      tag_id,
      message
    })

    await complimentsRepository.save(compliment);

    return compliment;
  }
}

export { CreateComplimentService }