import prismaClient from "../config/prismaClient";

const MessageService = {
  async userInfo(user_id: string) {
    const user = await prismaClient.user.findFirst({
      where: { id: user_id },
    });

    return user;
  },
};

export { MessageService };
