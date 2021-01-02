import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Service } from 'src/app/interfaces/service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogoutService implements Service<void, Observable<Object>> {
  private httpClient: HttpClient;
  constructor(private injectedHttpClient: HttpClient) {
    this.httpClient = injectedHttpClient;
  }

  public provideService(arg: void): Observable<HttpResponse<Object>> {
    return this.httpClient.delete('http://localhost:8080/PokePipeline/logout', {
      observe: 'response',
    });
  }
}
