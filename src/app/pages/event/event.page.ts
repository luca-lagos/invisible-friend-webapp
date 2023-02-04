import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  constructor(private ActivatedRoute: ActivatedRoute) {
    ActivatedRoute.params.subscribe((params) => {
      console.log(params['id']);
    });
  }

  ngOnInit() {}
}
