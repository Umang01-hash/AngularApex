import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup , FormGroupDirective, NgForm } from '@angular/forms';
import {
  ChartComponent,

} from "ng-apexcharts";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  @ViewChild('chart') chart!:ChartComponent;

  form! : FormGroup;

  constructor(private fb:FormBuilder){
    this.form=new FormGroup({
      title: new FormControl('Basic Chart'),
      type: new FormControl('line'),
      height: new FormControl(350),
      width: new FormControl(500),
      //series attribute
      series: new FormArray([
        new FormGroup({
          name: new FormControl('Series'),
          type: new FormControl('line'),
          data : new FormArray([
            new FormControl(this.getRandomArbitrary(0, 100)),
            new FormControl(this.getRandomArbitrary(0, 100)),
            new FormControl(this.getRandomArbitrary(0, 100)),
            new FormControl(this.getRandomArbitrary(0, 100)),
            new FormControl(this.getRandomArbitrary(0, 100)),
            new FormControl(this.getRandomArbitrary(0, 100)),
            new FormControl(this.getRandomArbitrary(0, 100))
          ])
        })
      ]),
      //x-axis attribute
      xaxis: new FormArray([
        new FormControl('Jan'),
        new FormControl('Feb'),
        new FormControl('March'),
        new FormControl('April'),
        new FormControl('May'),
        new FormControl('June')
      ])

    });


  }
  private getRandomArbitrary(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min) ;

}
get seriesForm(){
  return this.form.get('series') as FormArray
}

get seriesX(){
  return this.form.get('xaxis') as FormArray
}


get seriesData(){
  return this.seriesForm.get("data") as FormArray
}


addValue() {

  (<FormArray>this.form.get('series'))['controls'].forEach((c) => {
    (<FormArray>c.get('data')).push(new FormControl(this.getRandomArbitrary(0, 100)));
  });
  (<FormArray>this.form.get('xaxis')).push(new FormControl('Jan'));
}

withoutType(series: { name: any; data: any; }[]) {
  return series.map((s: { name: any; data: any; }) => {return { name: s.name, data: s.data }});
}
}

