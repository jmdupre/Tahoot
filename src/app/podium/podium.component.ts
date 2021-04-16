import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';

@Component({
  selector: 'app-podium',
  templateUrl: './podium.component.html',
  styleUrls: ['./podium.component.css']
})
export class PodiumComponent implements OnInit {

  podiumData: any;

  constructor(private websocketService: WebsocketService
    ) { }

  ngOnInit(): void {
    this.websocketService.getPodiumData().subscribe((data: any) => {
        this.podiumData = data;
    });
    this.podiumData.sort((a: any, b: any) => {
      return a - b;
    });
    this.podiumData.slice(0, 3);
  }

}
