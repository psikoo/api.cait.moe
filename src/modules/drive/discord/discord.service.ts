import { Injectable } from '@nestjs/common';
import axios from 'axios';
import FormData from 'form-data';
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
    form.append("file", file.buffer, { filename: file.originalname || "file", contentType: file.mimetype });
    form.append('payload_json', JSON.stringify({ content: '' }));
    await axios.post("https://discord.com"+query.path, form, {headers: { ...form.getHeaders(), "Authorization": "Bot "+query.token }}) 
    .then((response) => { finalResponse = response.data; })
    .catch((error) => { finalResponse = error; });
    return JSON.parse(JSON.stringify(finalResponse));
  }

  async deleteUrl(query: Discord): Promise<JSON> {
    let finalResponse = "empty";
    let config = {
      method: "delete",
      url: "https://discord.com"+query.path,
      headers: { "Authorization": "Bot "+query.token }
    };
    await axios.request(config) 
    .then((response) => { finalResponse = response.data; })
    .catch((error) => { finalResponse = error; });
    return JSON.parse(JSON.stringify(finalResponse));
  }
}