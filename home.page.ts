import { CalendarComponent } from 'ionic2-calendar/calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';


import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

	event = {
		id:0,
		title:'',
		desc: '',
		emptyString:'',
		startTime:'',
		endTime:'',
		eventColor: 'yellow',
		allDay:false
	};

	minDate=new Date().toISOString();

	eventSource = [];
	viewTitle;

	calendar = {
		mode:'day',
		currentDate: new Date()
	}
	public items:any;
	public load_events:any;
    private events :[]; 




	@ViewChild(CalendarComponent) myCal:CalendarComponent;

	constructor(public router: Router,private alertCtrl: AlertController,public http:HttpClient,
	 @Inject(LOCALE_ID) private locale: string) 
	{
		this.addnewEvent(1,'title','desc','blue',"2019-04-26 09:00:00","2019-04-26 11:20:00",false); 
		this.addnewEvent(2,'title2','desc2','green',"2019-04-26 13:00:00","2019-04-26 15:30:00",false); 
		this.addnewEvent(3,'title3','desc3','red',"2019-04-26 14:00:00","2019-04-26 18:20:00",false); 
	}
	ngOnInit(){
	 	this.resetEvent();
	}
	resetEvent(){
		this.event = {
		id:0,
		title:'',
		desc: '',
		emptyString:" ",
		startTime:new Date().toISOString(),
		endTime:new Date().toISOString(),
		eventColor: 'blue',
		allDay:false
	};
	}


	addnewEvent(id_ev,t,d,color,start,end,allDay){
		let eventCopy = {
		id:id_ev,
		title:t,
		desc:d,
		emptyString:" ",
		startTime:new Date(start),
		endTime:new Date(end),
		eventColor:color,
		allDay:allDay
	}
	this.eventSource.push(eventCopy);
	}

	/*gotopage2(){
		this.router.navigateByUrl('page2');
	}*/

	addEvent(){

		let eventCopy = {
		id:this.event.id,
		title:this.event.title,
		desc: this.event.desc,
		emptyString:'',
		startTime:new Date(this.event.startTime),
		endTime:new Date(this.event.endTime),
		eventColor: 'pink',
		allDay:this.event.allDay
	}
	if(eventCopy.allDay){

		let start= eventCopy.startTime;
		let end= eventCopy.endTime;

		eventCopy.startTime=new Date(Date.UTC(start.getUTCFullYear(),start.getUTCMonth(),start.getUTCDate()));
		eventCopy.endTime=new Date(Date.UTC(end.getUTCFullYear(),end.getUTCMonth(),end.getUTCDate()+1));

	}
	this.eventSource.push(eventCopy);
	//this.myCal.loadEvents();
	//this.resetEvent();

	}
	changeMode(mode){ this.calendar.mode=mode;}
	back()
	{
		var swiper = document.querySelector('.swiper-container')['swiper'];
 		swiper.slidePrev();
	}
	today(){ this.calendar.currentDate=new Date();}
	next()
	{
		var swiper = document.querySelector('.swiper-container')['swiper'];
 		swiper.slideNext();
	}
	// Calendar event was clicked
	async onEventSelected(event) {
	  // Use Angular date pipe for conversion
	  let start = formatDate(event.startTime, 'medium', this.locale);
	  let end = formatDate(event.endTime, 'medium', this.locale);
	 
	  /*const alert = await this.alertCtrl.create({
	    header: event.title,
	    subHeader: event.desc,
	    message: 'From: ' + start + '<br><br>To: ' + end,
	    buttons: ['OK']
	  });
	  alert.present();*/
	  this.router.navigate(['details-event',''+event.id]);

	}
	onViewTitleChanged(title){this.viewTitle = title;}
	onTimeSelected(ev) 
	{
		  let selected = new Date(ev.selectedTime);
		  this.event.startTime = selected.toISOString();
		  selected.setHours(selected.getHours() + 1);
		  this.event.endTime = (selected.toISOString());
	}
	getCustomClass(date) {
    return 'test';
  }

}
