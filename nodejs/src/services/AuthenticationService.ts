import axios from "axios";

interface AccessTokenResponse {
  access_token: string;
}

interface UserResponse {
  avatar_url: string;
  loging: string;
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

    const { data: userInfo } = await axios.get<UserResponse>(
      "https://api.github.com/user",
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return userInfo;
  },
};

export { AuthenticationService };
