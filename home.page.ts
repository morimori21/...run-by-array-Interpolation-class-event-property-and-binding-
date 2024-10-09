import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
//  WINDOWS 
  public createFisher: boolean = true;
  public gender: boolean = true;
  public username: boolean = false;
  public letsGoFishing: boolean = false;
  public fishEncylopedia: boolean = false;
  isFormSubmitted: boolean = false;

  // RECENT FISHERMAN AND CAUGHTED FISH DATA INTO ARRAY
  fisherman: { username: string; gender: string }[] = [];
  bucket: { name: string; rarity: string; fishyCOn: string }[] = [];

  // FISHERMAN IDENTITY
  fisherInput = {
    username: '',
    gender: '',
  };

  // FISH LIST AND THEIR RARITY  
  fish = [
    { name: 'Sardine', rarity: 'Common', fishyCon: '🐟' },
    { name: 'Shrimp', rarity: 'Common', fishyCon: '🦐' },
    { name: 'Jellyfish', rarity: 'Uncommon', fishyCon: '🪼' },
    { name: 'Butterfly Fish', rarity: 'Rare', fishyCon: '🐠' },
    { name: 'Sun Fish', rarity: 'Rare', fishyCon: '🐡' },
    { name: 'Hammerhead Shark', rarity: 'Epic', fishyCon: '🦈' },
  ];

//  FISHING AND FAIL
  async catchFish() {
    const rng = Math.floor(Math.random() * this.fish.length);
    const caughtFish = this.fish[rng];
    if (!this.bucket.some((fish) => fish.name === caughtFish.name)) {
      this.bucket.push({
        name: caughtFish.name,
        rarity: caughtFish.rarity,
        fishyCOn: caughtFish.fishyCon,
      });
    } else {
      const getOut = await this.alertController.create({
        header: 'No Fish Caught!',
        message: `Oh no! You failed to catch any fish this time XD.`,
        buttons: ['OK'],
      });
    }
  // RECENT CATCH  
    const alert = await this.alertController.create({
      header: 'Caught Fish!',
      message: `You caught a ** ${caughtFish.fishyCon} ${caughtFish.name}** (${caughtFish.rarity})!`,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // ENCYCLOPEDIA
  fishyDex() {
    return this.fish.map((fish) => {
      const caughtFish = this.bucket.find(
        (caught) => caught.name === fish.name
      );
      return {
        name: fish.name,
        rarity: fish.rarity,
        fishyCon: fish.fishyCon,
        info: caughtFish
          ? `${caughtFish.fishyCOn} ${caughtFish.name} (${caughtFish.rarity})`
          : '???',
      };
    });
  }

   // "MALE" OR "FEMALE" 
   selectGender(gender: string) {
    this.fisherInput.gender = gender;
  }

  // AFTER SELECTING GENDER
  selectedGender() {
    this.gender = false;
    this.username = true;
  }
  
  // AFTER INPUT FISHERMAN
  addUserData() {
    this.fisherman.push({ ...this.fisherInput });
    this.createFisher = false;
    this.letsGoFishing = true;
    this.isFormSubmitted = true;
  }

  constructor(private alertController: AlertController) {}
}
