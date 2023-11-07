import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/Home/home.component';
import { ContactUsComponent } from './components/contactus/contactus.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { TheatreComponent } from './components/theatres/theatres.component';
import { SeatComponent } from './components/seats/seats.component';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'home',component:HomeComponent},
  {path:'contactus',component:ContactUsComponent},
  {path:'theatres/:movieId/:selectedCity',component:TheatreComponent},
  {path:'seats',component:SeatComponent},
  {path:'dashboard', component:DashboardComponent, canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes),CommonModule],
  exports: [RouterModule],
declarations: [TheatreComponent, SeatComponent],


})


export class AppRoutingModule { }
