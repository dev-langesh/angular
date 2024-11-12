import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define an interface for the employee
interface Employee {
  name: string;
  age: number;
  dep: string;
  salary: number;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  // Define a mock API URL (replace it with an actual API endpoint if needed)
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  // Method to fetch employee data
  getEmployeeData(): Observable<Employee> {
    // Simulate an API call to get employee data
    return this.http.get<Employee>(this.apiUrl);
  }
}
