import { Component, OnInit } from '@angular/core';


import{HttpserviceService} from '../../Services/httpservice.service'
import { ActivatedRoute, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-space-component',
  templateUrl: './space-component.component.html',
  styleUrls: ['./space-component.component.css']
})
export class SpaceComponentComponent implements OnInit {
arrayofYrs: number[]=[2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020];
truefalseCombination: string[]=["true","false"];
data:any;
launchStatus:string;
landingStatus:string;
yearSelected:string;
loaded:boolean=false;

  constructor(private httpservice:HttpserviceService,private route:ActivatedRoute) {  }

  ngOnInit(): void {

    this.httpservice.getConfig().subscribe((data)=>{
       console.log(data);
       this.data=data;
       setTimeout(()=> {
        this.loaded=true;
       },2000)
    });
  }

  /********Click event on Filter Options ************/
  onClickFilter(event,statusonClick){
    console.log(event);
    if(statusonClick == "launch_year"){
      this.yearSelected=event.target.innerHTML;;
    }else if(statusonClick == "launch_success"){
      this.launchStatus=event.target.innerHTML;;
    } else if(statusonClick=="land_success"){
      this.landingStatus=event.target.innerHTML;;
    }
    this.httpservice.fetchURL(this.yearSelected,this.launchStatus,this.landingStatus).subscribe((data)=>{
      console.log(data);
      this.data=data;
   });
  }
}
