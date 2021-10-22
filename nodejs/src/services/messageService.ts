import prismaClient from "../config/prismaClient";

const MessageService = {
  async create(text: string, user_id: string) {
    const message = prismaClient.message.create({
      data: {
        text,
        user_id,
      },
      include: {
        user: true,
      },
    });
    return message;
  },

  async getLastMessages(numberOfMessages: number) {
    const messages = await prismaClient.message.findMany({
      take: numberOfMessages,
      orderBy: {
        created_at: "desc",
      },
      include: {
        user: true,
      },
    });

    return messages;
  },
};

export { MessageService };
