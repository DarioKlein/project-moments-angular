import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { Moment } from '../Moment'
import { Response } from '../Response'

@Injectable({
  providedIn: 'root',
})
export class MomentService {
  private baseAPIUrl = environment.baseAPIUrl
  private apiUrl = `${this.baseAPIUrl}/api/moments`
  constructor(private http: HttpClient) {}

  getAllMoments(): Observable<Response<Moment[]>> {
    return this.http.get<Response<Moment[]>>(this.apiUrl)
  }

  getMoment(id: number): Observable<Response<Moment>> {
    const url = `${this.apiUrl}/${id}`
    return this.http.get<Response<Moment>>(url)
  }

  createMoment(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formData)
  }
}
