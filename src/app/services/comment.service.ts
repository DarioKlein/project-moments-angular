import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { Comment } from '../Comment'
import { Observable } from 'rxjs'
import { Response } from '../Response'

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private baseAPIUrl = environment.baseAPIUrl
  private APIUrl = `${this.baseAPIUrl}/api/moments`

  constructor(private http: HttpClient) {}

  createComment(data: Comment): Observable<Response<Comment>> {
    const url = `${this.APIUrl}/${data.momentId}/comments`
    return this.http.post<Response<Comment>>(url, data)
  }
}
