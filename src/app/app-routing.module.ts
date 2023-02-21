import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { BrawlsComponent } from './pages/brawls/brawls.component';
import { ScoreComponent } from './pages/score/score.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { OtpVerificationComponent } from './auth/otp-verification/otp-verification.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { NonAuthGuard } from './guards/non-auth.guard';
import { TermsConditionComponent } from './pages/terms-condition/terms-condition.component';
import { PrivatePolicyComponent } from './pages/private-policy/private-policy.component';
import { FaqComponent } from './pages/faq/faq.component';
import { AccountComponent } from './pages/account/account.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { CreateBrawlComponent } from './pages/create-brawl/create-brawl.component';
import { BrawlsDetailsComponent } from './pages/brawls-details/brawls-details.component';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';
import { MybrawlsComponent } from './pages/my-brawls/my-brawls.component';
import { LeaderBoardComponent } from './pages/leader-board/leader-board.component';
import { GeoRestrictionComponent } from './pages/common-components/geo-restriction/geo-restriction.component';
import { PayOutComponent } from './pages/pay-out/pay-out.component';
import { SupportComponent } from './pages/support/support.component';
import { ScorePlayerListComponent } from './pages/score-player-detail/score-player-list/score-player-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NonAuthGuard],
  },
  {
    path: 'login/:id',
    component: LoginComponent,
    canActivate: [NonAuthGuard],
  },
  {
    path: 'geo-restriction',
    component: GeoRestrictionComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NonAuthGuard],
  },
  {
    path: 'register/?:id',
    component: RegisterComponent,
    canActivate: [NonAuthGuard],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [NonAuthGuard],
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [NonAuthGuard],
  },
  {
    path: 'otp-verification',
    component: OtpVerificationComponent,
    canActivate: [NonAuthGuard],
  },
  {
    path: 'home',
    component: LobbyComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'brawls',
    component: BrawlsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'terms-condition',
    component: TermsConditionComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'private-policy',
    component: PrivatePolicyComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'faq',
    component: FaqComponent,
    canActivate: [AuthenticationGuard], //AuthenticationGuard
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'account/:id',
    component: AccountComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'create-brawl',
    component: CreateBrawlComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'invite-brawl/:id',
    component: CreateBrawlComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'brawls-details/:id',
    component: BrawlsDetailsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'pay-out/:id',
    component: PayOutComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'score',
    component: ScoreComponent,
    // canActivate: [AuthenticationGuard]
  },
  // {
  //   path: 'support',
  //   component: SupportComponent,
  //   canActivate: [NonAuthGuard],
  // },

  {
    path: 'leaderboard',
    component: LeaderboardComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'leaderboard/:id',
    component: LeaderboardComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'leader-board/:id',
    component: LeaderBoardComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'my-brawls/:id',
    component: MybrawlsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'score-player-list/:id/:id1',
    component: ScorePlayerListComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
