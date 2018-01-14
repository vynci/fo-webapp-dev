import { Injectable }    from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams} from '@angular/http';
import { Config } from './env.config';

import 'rxjs/add/operator/map';

@Injectable()
export class HelperService {

	private headers = new Headers({'Content-Type': 'application/json'});
	private endpoint = Config;
	private url = this.endpoint + 'system/';
	private options = new RequestOptions({ headers: this.headers});

	constructor(private http: Http) { }

	setTime(data:any){
		var url = this.url + 'set-date/' + data;

		return this.http.get(url, {headers: this.headers})
		.map((response: Response) => response.json());
	}

	softwareUpdate(data:any){
		var url = this.url + 'software-update';

		return this.http.get(url, {headers: this.headers})
		.map((response: Response) => response.json());
	}

	systemReboot(data:any){
		var url = this.url + 'reboot';

		return this.http.get(url, {headers: this.headers})
		.map((response: Response) => response.json());
	}

	setWifi(data:any){
		var url = this.url + 'set-wifi/' + data.oldssid  + '/' + data.newssid  + '/' + '/' + data.oldpass  + '/' + '/' + data.newpass  + '/' ;

		return this.http.get(url, {headers: this.headers})
		.map((response: Response) => response.json());
	}	
}