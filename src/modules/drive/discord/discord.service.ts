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

  async postUrl(query: Discord, file: any): Promise<JSON> {
    let finalResponse = "empty";
    const form = new FormData();
    const fileBlob = new Blob([file.buffer]);
    form.append("file", fileBlob, file.originalname || "file");
    const payload = JSON.stringify({ content: "File", attachments: [{ id: 0, description: "Uploaded via api" }] });
    form.append("payload_json", payload);
    let config = {
      method: "post",
      url: "https://discord.com"+query.path,
      headers: { "Authorization": "Bot "+query.token }
    };
    await axios.request(config) 
    .then((response) => { finalResponse = response.data; })
    .catch((error) => { finalResponse = error; });
    return JSON.parse(JSON.stringify(finalResponse));
  }
}