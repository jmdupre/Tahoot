import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HostNameService {

  localHolder: any;
  host_name: any = '';
  collect: any;

  // constructor(private auth: AuthService) {}

  setHostName(host_name: any){
    this.host_name = host_name;
  }

  getHostName(){
      this.collect = localStorage.getItem('name');
      this.host_name = JSON.parse (this.collect).name;
      return this.host_name;
    }

}
