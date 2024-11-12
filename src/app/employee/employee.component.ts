import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

interface Employee {
  name: string;
  age: number;
  dep: string;
  salary: number;
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  imports: [HttpClientModule, CommonModule],
  standalone: true
})
export class EmployeeComponent implements OnInit {
  employee: Employee | undefined;

  // Inject HttpClient in the constructor
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const storedEmployee = localStorage.getItem('employee');
    if (storedEmployee) {
      this.employee = JSON.parse(storedEmployee);
    } else {
      this.fetchEmployeeData().subscribe((data) => {
        this.employee = data;
        localStorage.setItem('employee', JSON.stringify(data));
      });
    }
  }

  // Define the method to fetch employee data
  fetchEmployeeData(): Observable<Employee> {
    const apiUrl = 'http://localhost:3000';

    return this.http.get<Employee>(apiUrl).pipe(
      tap((data) => console.log('Fetched employee data:', data)),
      catchError((error) => {
        console.error('Error fetching employee data:', error);
        return of(undefined as unknown as Employee); // Return an empty observable on error
      })
    );
  }
}
