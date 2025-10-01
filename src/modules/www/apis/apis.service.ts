import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class ApisService {
  constructor(private readonly configService: ConfigService) {}
  async getWeather() {
    let finalResponse = "empty";
    let config = {
      method: "get",
      url: "https://api.openweathermap.org/data/2.5/weather?lat=40.420&lon=-3.705&units=metric&appid="+this.configService.get("WEATHER_KEY"),
      headers: { "Content-Type": "application/json" }
    };
    await axios.request(config) 
    .then((response) => { finalResponse = response.data; })
    .catch((error) => { finalResponse = error; });
    return JSON.parse(JSON.stringify(finalResponse));
  }

  async getLastFM(): Promise<JSON> {
    let finalResponse = "empty";
    let config = {
      method: "get",
      url: "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=psikooUwU&limit=1&format=json&api_key="+this.configService.get("LASTFM_KEY"),
      headers: { "Content-Type": "application/json" }
    };
    await axios.request(config) 
    .then((response) => { finalResponse = response.data; })
    .catch((error) => { finalResponse = error; });
    return JSON.parse(JSON.stringify(finalResponse));
  }

  async getDiscord(): Promise<JSON> {
    let finalResponse = "empty";
    let config = {
      method: "get",
      url: "https://discord.com/api/v10/users/614870731322425374",
      headers: { "Content-Type": "application/json", "Authorization": "Bot "+this.configService.get("DISCORD_KEY") }
    };
    await axios.request(config) 
    .then((response) => { finalResponse = response.data })
    .catch((error) => { finalResponse = error; });
    let JSONResponse = JSON.parse(JSON.stringify(finalResponse));
    let JSONFormattedResponse = {
      username: JSONResponse.username,
      avatar: "https://cdn.discordapp.com/avatars/614870731322425374/"+JSONResponse.avatar,
    }
    
    return JSON.parse(JSON.stringify(JSONFormattedResponse));
  }
}