import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ImageDetailComponent } from './image-detail/image-detail.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { SeasonGiftComponent } from './components/season-gift/season-gift.component';
import { SeasonGreetingComponent } from './components/season-greeting/season-greeting.component';
const routes: Routes = [
  { path: '', redirectTo: '/season-greeting', pathMatch: 'full' },
  { path: 'season-greeting', component: SeasonGreetingComponent },
  { path: 'season-gift', component: SeasonGiftComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'image-detail', component:ImageDetailComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}