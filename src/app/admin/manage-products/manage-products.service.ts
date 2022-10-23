import { Injectable, Injector } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { ApiService } from '../../core/api.service';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class ManageProductsService extends ApiService {
  constructor(injector: Injector) {
    super(injector);
  }

  uploadProductsCSV(file: File): Observable<unknown> {
    if (!this.endpointEnabled('import')) {
      console.warn(
        'Endpoint "import" is disabled. To enable change your environment.ts config'
      );
      return EMPTY;
    }

    return this.getPreSignedUrl(file.name).pipe(
      switchMap((url) =>
        this.http.put(url.urlForUpload, file, {
          headers: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'text/csv',
          },
        })
      )
    );
  }

  private getPreSignedUrl(
    fileName: string
  ): Observable<Record<string, string>> {
    const url = this.getUrl('import', 'import');

    return this.http.get<Record<string, string>>(url, {
      params: {
        name: fileName,
      },
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: `Bearer ${this.getAuthToken()}`,
      },
    });
  }

  private getAuthToken(): string {
    try {
      const authorizationToken = localStorage.getItem('authorization_token');
      return authorizationToken || '';
    } catch (e) {
      console.log(JSON.stringify(e));
    }
    return '';
  }
}
