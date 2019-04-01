import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero }         from '../hero';
import { HeroService }  from '../hero.service';

import {
  D3Service,
  D3,
  Axis,
  BrushBehavior,
  BrushSelection,
  D3BrushEvent,
  ScaleLinear,
  ScaleOrdinal,
  Selection,
  Transition
} from 'd3-ng2-service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  private d3: D3;
  

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location

  ) {}

  ngOnInit(): void {
    this.getHero();
    let d3 = this.d3;
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  setGraph(): void{
    let width = 300;
    let height = 60;
    //Create SVG element
    let svg = d3.select("#svgcontainer")
       .append("svg")
       .attr("width", width)
       .attr("height", height);
    //Create and append rectangle element
    svg.append("rect")
       .attr("x", 0)
       .attr("y", 0)
       .attr("width", this.hero.victoires)
       .attr("height", 20)
       .attr("fill", "green");
    svg.append("rect")
       .attr("x", 0)
       .attr("y", 20)
       .attr("width", this.hero.defaites)
       .attr("height", 20)
       .attr("fill", "yellow");
    svg.append("rect")
       .attr("x", 0)
       .attr("y", 40)
       .attr("width", this.hero.egalite)
       .attr("height", 20)
       .attr("fill", "blue");

    let w = 0,                        //width
    h = 0,                            //height
    r = 0,                            //radius
    color = d3.scaleLinear();

    let data = [
      {"label":"victoires", "value":this.hero.victoires},
      {"label":"defaites", "value":this.hero.defaites},
      {"label":"victoires", "value":this.hero.egalite}
    ];

    let vis = d3.select("body")
    .append("svg:svg")              //create the SVG element inside the <body>
    .data([data])                   //associate our data with the document
        .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
        .attr("height", h)
    .append("svg:g")                //make a group to hold our pie chart
        .attr("transform", "translate(" + r + "," + r + ")")    //move the center of the pie chart from 0, 0 to radius, radius

let arc = d3.arc()              //this will create <path> elements for us using arc data
    .outerRadius(r);
    
}
}