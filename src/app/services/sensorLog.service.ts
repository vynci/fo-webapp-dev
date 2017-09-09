import { Injectable }    from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams} from '@angular/http';
import { Config } from './env.config';

import 'rxjs/add/operator/map';

@Injectable()
export class SensorLogService {

	private headers = new Headers({'Content-Type': 'application/json'});
	private endpoint = Config;
	private url = this.endpoint + 'sensor-log';
	private options = new RequestOptions({ headers: this.headers});

	constructor(private http: Http) { }

	get(data:any, skip:number, limit:number)
	{
		let filter = JSON.stringify(data);
		let search = new URLSearchParams('filter=' + filter);
		search.append('limit', limit.toString());
		search.append('skip', skip.toString());
		let options = new RequestOptions({ headers: this.headers, search: search});

		return this.http.get(this.url, options)
		.map((response: Response) => response.json());
	}

	getAll()
	{
		let options = new RequestOptions({ headers: this.headers});

		return this.http.get(this.url, options)
		.map((response: Response) => response.json());
	}	

	count(data:any)
	{
		let filter = JSON.stringify(data);
		let search = new URLSearchParams('filter=' + filter);
		let options = new RequestOptions({ headers: this.headers, search: search});

		return this.http.get(this.url + '-count', options)
		.map((response: Response) => response.json());
	}	

	create(data:any){
		let body = data;

		return this.http.post(this.url, JSON.stringify(body), {headers: this.headers})
		.map((response: Response) => response.json());
	}

	update(data:any){
		let body = data;

		var url = this.url + '/' + body._id;

		return this.http.put(url, JSON.stringify(body), {headers: this.headers})
		.map((response: Response) => response.json());
	}

	delete(id:string){
		var url = this.url + '/' + id;

		return this.http.delete(url, {headers: this.headers})
		.map((response: Response) => response.json());
	}	
}