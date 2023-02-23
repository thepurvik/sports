import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-score-list',
  templateUrl: './score-list.component.html',
  styleUrls: ['./score-list.component.css'],
})
@Injectable({
  providedIn: 'root', // just before your class
})
export class ScoreListComponent implements OnInit {
  @Input() searchData: any;
  @Input() loadData: any;
  leagueName: any;
  constructor(private router: Router) {}
  ngOnInit(): void {
    
  }

  team1ScoreStyle(team1_score: any, team2_score: any): any {
    if (team1_score > team2_score) {
      return 'mb-0 align-self-center score-color-win';
    } else if (team1_score < team2_score) {
      return 'mb-0 align-self-center score-color-loss';
    } else {
      return 'mb-0 align-self-center';
    }
  }

  team2ScoreStyle(team1_score: any, team2_score: any): any {
    if (team2_score > team1_score) {
      return 'mb-0 align-self-center score-color-win';
    } else if (team2_score < team1_score) {
      return 'mb-0 align-self-center score-color-loss';
    } else {
      return 'mb-0 align-self-center';
    }
  }

  timeZone(data: any) {
    return data.substring(data.indexOf(',') + 1);
  }

  gotoPlayerDetails(gameId: any, league: any, data: any) {
    this.leagueName = league;
    if (
      (league == 'CBB' || league == 'NHL' || league == 'NBA') &&
      data.islive == 1
    ) {
      this.router.navigate(['/score-player-list/' + league + '/' + gameId]);
    } else {
      return;
    }
    
  }
}
