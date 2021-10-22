import axios from "axios";
import prismaClient from "../config/prismaClient";
import { sign } from "jsonwebtoken";

interface AccessTokenResponse {
  access_token: string;
}

interface UserResponse {
  avatar_url: string;
  login: string;
  id: number;
  name: string;
}

const AuthenticationService = {
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token";

    const {
      data: { access_token: accessToken },
    } = await axios.post<AccessTokenResponse>(url, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        Accept: "application/json",
      },
    });

    const {
      data: { id, login, avatar_url, name },
    } = await axios.get<UserResponse>("https://api.github.com/user", {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    let user = await prismaClient.user.findFirst({
      where: { github_id: id },
    });

    if (!user) {
       user = await prismaClient.user.create({
        data: {
          github_id: id,
          name,
          login,
          avatar_url,
        },
      });
    }

    const token = sign(
      {
        user: {
          name: user.name,
          avatar_url: user.avatar_url,
          id: user.id,
        },
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return { token, user };
  },
};

export { AuthenticationService };
