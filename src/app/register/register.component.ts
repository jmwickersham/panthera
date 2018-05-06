import { Component, OnInit } from '@angular/core';
import { HttpClient }        from '@angular/common/http';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { tap, catchError }   from 'rxjs/operators';
import { of }                from 'rxjs/observable/of';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerData = { username: '', password: '' };
  message = '';

  constructor(
    private http: HttpClient, 
    private router: Router
  ) { }

  ngOnInit() {
  }

  register() {
    this.http.post('/api/register', this.registerData)
      .subscribe(resp => {
        console.log(resp);
        this.router.navigate(['login']);
      }, err => {
        this.message = err.error.msg;
      });
  }
}
