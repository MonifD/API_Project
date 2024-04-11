import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashboardComponent implements OnInit {
  userInfo: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.userService.getUserInfo().subscribe({
      next: (data) => {
        this.userInfo = data;
        console.log('Informations de l\'utilisateur:', this.userInfo);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
      }
    });
  }  
}