import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Discord } from './dto';

@Injectable()
export class DiscordService {
  async getUrl(query: Discord): Promise<JSON> {
    let finalResponse = "empty";
    let config = {
      method: "get",
      url: "https://discord.com"+query.path,
      headers: { "Content-Type": "application/json", "Authorization": "Bot "+query.token }
    };
    await axios.request(config) 
    .then((response) => { finalResponse = response.data; })
    .catch((error) => { finalResponse = error; });
    return JSON.parse(JSON.stringify(finalResponse));
  }
}