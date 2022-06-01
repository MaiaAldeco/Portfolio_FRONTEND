import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';
import { LoginComponent } from './auth/login.component';
import { RegistroComponent } from './auth/registro.component';
import { ContactComponent } from './contact/contact.component';
import { ExperienceComponent } from './experience/experience.component';
import { MenuComponent } from './menu/menu.component';
import { ProjectsComponent } from './projects/projects.component';
import { SkillsComponent } from './skills/skills.component';

const routes: Routes=[
  {path: '', component: MenuComponent},
  {path:'login', component:LoginComponent},
  {path:'registro', component: RegistroComponent},
  {path:'about', component:AboutMeComponent},
  {path:'experience', component:ExperienceComponent},
  {path:'skills', component:SkillsComponent},
  {path:'projects', component:ProjectsComponent},
  {path:'contact', component:ContactComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
