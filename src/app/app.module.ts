import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbDateCustomParserFormatter } from "../app/service/validation/ngbDatePickerFormat";
import { NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { OtpVerificationComponent } from './auth/otp-verification/otp-verification.component';
import { AuthGuardService } from './service/auth-guard.service';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { BrawlsComponent } from './pages/brawls/brawls.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { HeaderComponent } from './pages/common-components/header/header.component';
import { FooterComponent } from './pages/common-components/footer/footer.component';
import { AdvertiseSliderComponent } from './pages/common-components/advertise-slider/advertise-slider.component';
import { ContestCardComponent } from './pages/common-components/contest-card/contest-card.component';
import { HowToPalyAccordionComponent } from './pages/common-components/how-to-paly-accordion/how-to-paly-accordion.component';
import { LeagueFilterComponent } from './pages/common-components/league-filter/league-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { CommonTitleComponent } from './pages/common-components/common-title/common-title.component';
import { TermsConditionComponent } from './pages/terms-condition/terms-condition.component';
import { CommonContentComponent } from './pages/common-components/common-content/common-content.component';
import { PrivatePolicyComponent } from './pages/private-policy/private-policy.component';
import { FaqComponent } from './pages/faq/faq.component';
import { AccountComponent } from './pages/account/account.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { DialogBoxComponent } from './pages/common-components/dialog-box/dialog-box.component'
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';
import { HeaderSet } from '../app/service/header.service';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { SportsSelectComponent } from './pages/common-components/sports-select/sports-select.component';
import { CreateBrawlComponent } from './pages/create-brawl/create-brawl.component';
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import { BrawlsDetailsComponent } from './pages/brawls-details/brawls-details.component';
import { BrawlsTeamsListComponent } from './pages/common-components/brawls-teams-list/brawls-teams-list.component';
import { BrawlsSlipComponent } from './pages/common-components/brawls-slip/brawls-slip.component';
import { FilterLeaguePipe } from './pipe/filter-league.pipe';
import { ScoreComponent } from './pages/score/score.component';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';
import { MybrawlsComponent } from './pages/my-brawls/my-brawls.component';
import { LeaderBoardComponent } from './pages/leader-board/leader-board.component';
import { NoDataFoundComponent } from './pages/common-components/no-data-found/no-data-found.component';
import { AddBuddyComponent } from './pages/common-components/add-buddy/add-buddy.component';
import { BrawlPlayerListComponent } from './pages/brawl-player-list/brawl-player-list.component';
import { GeoRestrictionComponent } from './pages/common-components/geo-restriction/geo-restriction.component';
import { ScoreListComponent } from './pages/score-list/score-list.component';
import { DatePipe } from '@angular/common';
import { SearchPipe } from './pipe/search.pipe';
import { ScoreFilterComponent } from './pages/common-components/score-filter/score-filter.component';
import { PayOutComponent } from './pages/pay-out/pay-out.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AdvertisingDialogBoxComponent } from './pages/common-components/advertising-dialog-box/advertising-dialog-box.component';
import { SupportComponent } from './pages/support/support.component';
import { ScorePlayerListComponent } from './pages/score-player-detail/score-player-list/score-player-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    OtpVerificationComponent,
    LobbyComponent,
    BrawlsComponent,
    ScoreComponent,
    LeaderboardComponent,
    HeaderComponent,
    FooterComponent,
    AdvertiseSliderComponent,
    ContestCardComponent,
    HowToPalyAccordionComponent,
    LeagueFilterComponent,
    CommonTitleComponent,
    TermsConditionComponent,
    CommonContentComponent,
    PrivatePolicyComponent,
    FaqComponent,
    AccountComponent,
    DialogBoxComponent,
    AboutUsComponent,
    SportsSelectComponent,
    CreateBrawlComponent,
    BrawlsDetailsComponent,
    BrawlsTeamsListComponent,
    BrawlsSlipComponent,
    FilterLeaguePipe,
    MybrawlsComponent,
    LeaderBoardComponent,
    NoDataFoundComponent,
    AddBuddyComponent,
    BrawlPlayerListComponent,
    GeoRestrictionComponent,
    ScoreListComponent,
    SearchPipe,
    ScoreFilterComponent,
    PayOutComponent,
    AdvertisingDialogBoxComponent,
    SupportComponent,
    ScorePlayerListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    SocialLoginModule,
    ClipboardModule,
    NgWizardModule,
    InfiniteScrollModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [HeaderSet,AuthenticationGuard,NgbActiveModal,
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          // {
          //   id: GoogleLoginProvider.PROVIDER_ID,
          //   provider: new GoogleLoginProvider(
          //     '1060489067658-oar265a69japls2uv4qjk6m2qvua0294.apps.googleusercontent.com'
          //   ),
          // },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('480301823658616'),
          }
        ],
      } as SocialAuthServiceConfig,
    } , AuthGuardService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
