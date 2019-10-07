import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MovieModule } from './modules/movie/movie.module';
import { RouterModule, Routes }  from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule,MatFormFieldModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
const appRoutes: Routes = [{
 path: '',   
 redirectTo: 'movies', 
 pathMatch: 'full'
}];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MovieModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
