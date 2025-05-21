import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lead-to-login',
  imports: [],
  templateUrl: './lead-to-login.component.html',
  styleUrl: './lead-to-login.component.scss'
})
export class LeadToLoginComponent {

  constructor(private router: Router, private dialogRef: MatDialogRef<LeadToLoginComponent>){}
  toLogin(){
    this.dialogRef.close();
    this.router.navigate(['/login']);
  }
}
