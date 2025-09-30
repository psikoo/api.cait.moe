import { Injectable } from '@nestjs/common';

let tamagotchi = {
  name: "Tamago :3",
  state:"Alive",
  bornTime: new Date().valueOf(),
  deadTime: new Date().valueOf(),
  happiness: 10,
  hunger: 10,
  energy: 10,
  lastUpdate: new Date().valueOf()
}

@Injectable()
export class TamagotchiService {

  async getTamagotchi(): Promise<JSON> {
    if((tamagotchi.happiness <= 0) || (tamagotchi.hunger <= 0) || (tamagotchi.energy <= 0)) {
      tamagotchi.state = "Dead";
      tamagotchi.happiness = 0;
      tamagotchi.hunger = 0;
      tamagotchi.energy = 0;
    } 
    return JSON.parse(JSON.stringify(tamagotchi));
  }

  async getPlay(): Promise<JSON> {
    tamagotchi.hunger--;
    tamagotchi.energy--;
    if(tamagotchi.happiness < 10) { 
      tamagotchi.happiness++; 
      return JSON.parse(JSON.stringify({"message": "Your Tamagotchi feels happier"}));
    } else { 
      return JSON.parse(JSON.stringify({"message": "Your Tamagotchi is too happy, you made it tired"}));
    }
  }
  
  async getFeed(): Promise<JSON> {
    if(tamagotchi.hunger < 10 && tamagotchi.energy < 10) { 
      tamagotchi.hunger++; 
      tamagotchi.energy++; 
      return JSON.parse(JSON.stringify({"message": "Your Tamagotchi feels fuller"}));
    } else {
      return JSON.parse(JSON.stringify({"message": "Your Tamagotchi is too full or energetic to eat"}));
    }
  }

  async getRest(): Promise<JSON> {
    tamagotchi.hunger--;
    if(tamagotchi.energy < 10) { 
      tamagotchi.energy++;
      return JSON.parse(JSON.stringify({"message": "Your Tamagotchi feels rested"}));
    } else {
      return JSON.parse(JSON.stringify({"message": "Your Tamagotchi is too energetic, you made it hungry"}));
    }
  }

  async getReload(): Promise<JSON> {
    if((tamagotchi.happiness <= 0) || (tamagotchi.hunger <= 0) || (tamagotchi.energy <= 0)) {
      tamagotchi.state = "Dead";
      tamagotchi.happiness = 0;
      tamagotchi.hunger = 0;
      tamagotchi.energy = 0;
    } else {
      let currentTime = new Date().valueOf()
      let timePassed = (currentTime)-tamagotchi.lastUpdate;
      let secondsPassed = timePassed/1000;
      let timeForTick = 3600; // seconds
      if(secondsPassed/timeForTick >= 1) {
        let subtract = Math.floor(secondsPassed/timeForTick);
        if((tamagotchi.happiness - subtract <= 0) || (tamagotchi.hunger - subtract <= 0) || (tamagotchi.energy - subtract <= 0)) {
          tamagotchi.state = "Dead";
          tamagotchi.happiness = 0;
          tamagotchi.hunger = 0;
          tamagotchi.energy = 0;
        } else {
          tamagotchi.deadTime = currentTime;
          tamagotchi.happiness -= subtract;
          tamagotchi.hunger -= subtract;
          tamagotchi.energy -= subtract;
          tamagotchi.lastUpdate = currentTime;
        }
      }
    }
    return JSON.parse(JSON.stringify(tamagotchi));
  }

  async getNew(): Promise<JSON> {
    let currentTime = new Date().valueOf()
    tamagotchi.name = "Tamago :3";
    tamagotchi.state = "Alive";
    tamagotchi.bornTime = currentTime;
    tamagotchi.deadTime = currentTime;
    tamagotchi.happiness = 10;
    tamagotchi.hunger = 10;
    tamagotchi.energy = 10;
    tamagotchi.lastUpdate = currentTime;
    return JSON.parse(JSON.stringify(tamagotchi));
  }
}