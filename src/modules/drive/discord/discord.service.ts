import { Injectable, StreamableFile } from '@nestjs/common';
import axios from 'axios';
import FormData from 'form-data';
import { Discord } from './dto';

@Injectable()
export class DiscordService {
  async getUrl(query: Discord): Promise<JSON> {
    let finalResponse = "empty";
    let url ="https://discord.com"+query.path;
    if(query.limit) url += `&limit=${query.limit}`;
    if(query.before) url += `&before=${query.before}`;
    let config = {
      method: "get",
      url: url,
      headers: { "Content-Type": "application/json", "Authorization": "Bot "+query.token }
    };
    await axios.request(config) 
    .then((response) => { finalResponse = response.data; })
    .catch((error) => { finalResponse = error; });
    return JSON.parse(JSON.stringify(finalResponse));
  }

  async getCdn(query: any) {
    const decodedPath = Buffer.from(query.path, 'base64').toString('utf8');
    const url = `https://cdn.discordapp.com${decodedPath}`;
    const response = await axios({
      method: 'get',
      url: url,
      responseType: 'stream',
    });
    return new StreamableFile(response.data);
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