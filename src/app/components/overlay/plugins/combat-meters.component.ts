import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { CombatService } from '../../../providers/combat.service';

import * as d3 from "d3";

@Component({
  selector: 'combat-meters',
  templateUrl: './combat-meters.component.html',
  styleUrls: ['./combat-meters.component.scss']
})
export class CombatMetersComponent implements OnInit {
  public draggable: boolean;
  public fromMain: string;
  public noOp: number;
  public sleepy: number;
  
  public pos1: number;
  public pos2: number;
  public pos3: number;
  public pos4: number;

  public anchor: HTMLElement;

  //private center = $(window).scrollTop() + $(window).height() / 2;
  mouseDown = (ev: MouseEvent) => {
    window.addEventListener("mousemove", this.mouseMove);
    ev.preventDefault();
    // get the mouse cursor position at startup:
    this.pos3 = ev.clientX;
    this.pos4 = ev.clientY;
    //document.onmouseup = this.closeDragElement;
    // call a function whenever the cursor moves:
    //document.onmousemove = this.elementDrag;
  }
  mouseUp = (ev: MouseEvent) => {
    window.removeEventListener("mousemove", this.mouseMove);
  }
  mouseMove = (ev: MouseEvent) => {
    ev.preventDefault();
    // calculate the new cursor position:
    this.pos1 = this.pos3 - ev.clientX;
    this.pos2 = this.pos4 - ev.clientY;
    this.pos3 = ev.clientX;
    this.pos4 = ev.clientY;
    // set the element's new position:
    this.anchor.style.top = (this.anchor.offsetTop - this.pos2) + "px";
    this.anchor.style.left = (this.anchor.offsetLeft - this.pos1) + "px";
  }
  
  constructor(private cs: CombatService, private ref: ChangeDetectorRef) {
    this.draggable = false;
    this.noOp = 0;
    this.sleepy = 0;
 
    this.pos1 = 0;
    this.pos2 = 0;
    this.pos3 = 0;
    this.pos4 = 0;

    this.anchor = document.getElementById("blessing-combat-meters") as HTMLElement;

    window.addEventListener("mousedown", this.mouseDown);
    window.addEventListener("mouseup", this.mouseUp);

    this.cs.on('combat', (event, args) => {
      switch(args.case) {
        case 'update':
          this.fromMain = args.arg;
          break;
        case 'drag':
          if(args.arg == 'on') {
            this.draggable = true;
          } else {
            this.draggable = false;
          }
          break;
        case 'sleepy':
          this.sleepy = args.arg;
          break;
        default:
          this.noOp++;
          break;
      }
      this.ref.detectChanges();
    });
  }
  
  ngOnInit() {
    this.pos1 = 0;
    this.pos2 = 0;
    this.pos3 = 0;
    this.pos4 = 0;
    this.anchor = document.getElementById("blessing-combat-meters") as HTMLElement;
    this.anchor.style.left = 380 + "px";
    this.anchor.style.top = 510 + "px";
    this.draggable = false;
    this.graph();
  }

  graph() {
    var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

    // Parse the date / time
    var  parseDate = d3.timeFormat("%Y-%m").parse;

    var x = d3.scaleOrdinal().rangeRoundBands([0, width], .05);

    var y = d3.scaleLinear().range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(d3.timeFormat("%Y-%m"));

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);

    var svg = d3.select(".dps-meter").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

    d3.json("assets/data.json", function(error, data) {

        data.forEach(function(d) {
            d.player = parseDate(d.player);
            d.value = +d.value;
        });
      
      x.domain(data.map(function(d) { return d.player; }));
      y.domain([0, d3.max(data, function(d) { return d.value; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-90)" );

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Value ($)");

    svg.selectAll("bar")
        .data(data)
      .enter().append("rect")
        .style("fill", "steelblue")
        .attr("x", function(d) { return x(d.player); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); });
    });
  }
}
