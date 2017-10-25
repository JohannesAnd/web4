import { Component, OnInit, OnChanges, ElementRef, Input } from '@angular/core';
import { D3Service, D3, Selection } from 'd3-ng2-service';
import { Observable } from 'rxjs/Rx';

import { Pokemon } from '../shared/pokemon.model';

@Component({
  selector: 'app-stacked-chart',
  template: '<div><svg></svg></div>',
  providers: []
})
export class StackedChartComponent implements OnInit, OnChanges {
  @Input() pokemons: Pokemon[];

  private d3: D3;
  private parentNativeElement: any;
  private d3Svg: Selection<SVGSVGElement, any, any, any>;

  constructor(element: ElementRef, d3Service: D3Service) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit(): void {
    this.initializeChart();
  }

  ngOnChanges(): void {
    this.initializeChart();
  }

  initializeChart(): void {
    let d3 = this.d3;
    let d3ParentElement: Selection<any, any, any, any>;
    let d3Svg: Selection<SVGSVGElement, any, null, any>;

    if (this.parentNativeElement !== null) {
      d3ParentElement = this.d3.select(this.parentNativeElement);
      d3Svg = this.d3Svg = d3ParentElement.select<SVGSVGElement>('svg');
      this.createChart(d3Svg);
    }
  }

  createChart(el: Selection<any, any, any, any>) {
    const width = 800;
    const height = 150;

    el.attr('width', width).attr('height', height);

    const data = this.pokemons || [];

    const yScale = this.d3
      .scaleLinear()
      .range([0, height])
      .domain([this.d3.max(data.map(el => el.attack)), 0]);

    const xScale = this.d3
      .scaleBand()
      .range([0, width])
      .domain(data.map(el => el.name));

    const updateBars = el
      .selectAll<SVGRectElement, any>('.rect')
      .data(data, d => d._id);

    const enterBars = updateBars
      .enter()
      .append<SVGRectElement>('rect')
      .attr('class', 'rect')
      .attr('x', d => xScale(d.name))
      .attr('y', height)
      .attr('height', 0)
      .attr('width', xScale.bandwidth())
      .attr('fill', d => d.color_1);

    updateBars
      .merge(enterBars)
      .transition()
      .duration(500)
      .attr('y', d => yScale(d.attack))
      .attr('x', d => xScale(d.name))
      .attr('height', d => height - yScale(d.attack))
      .attr('width', xScale.bandwidth())
      .attr('fill', d => d.color_1);

    const exitBars = updateBars.exit().remove();
  }
}
