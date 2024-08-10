import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { GameInfoComponent } from '../game-info/game-info.component';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent,  MatButtonModule, MatIconModule, DialogAddPlayerComponent, MatDialogModule, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  pickCardAnimation = false; 
  game: Game = new Game();
  currentCard: string = '';

  constructor(private dialog: MatDialog) {}  // Inject MatDialog here


  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
  }


  takeCard() {
    if(!this.pickCardAnimation) {
      const card = this.game.stack.pop();
      if (card !== undefined) {
        this.currentCard = card;
        this.pickCardAnimation = true;
        console.log('New Card: ' + this.currentCard)
        console.log('Game is', this.game)

        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
        setTimeout(() =>{
          this.game.playedCard.push(this.currentCard);
          this.pickCardAnimation = false
        }, 1000)
      }
      console.log(this.currentCard)
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      //console.log('The dialog was closed', name);
      if(name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
  
}
