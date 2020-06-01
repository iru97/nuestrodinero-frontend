import * as d3 from 'd3';
import * as _ from 'underscore';
import { legendColor } from 'd3-svg-legend';
import { AppState } from '../core/app.state';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser, CurrencyPipe } from '@angular/common';
import {
  Component,
  OnInit,
  PLATFORM_ID,
  Inject,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { Contract } from '../contracts/components/contract/contract.model';
import { activityStats } from './statistics/activity.stats';
import { COLOR_PALLETE } from '../core';
import { Stats } from './statistics/stats.model';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.scss'],
})
export class GraphicsComponent implements OnInit, AfterViewInit {
  contractsCollection: Contract[] = [];
  isBrowser = false;
  @ViewChild('chartContainer') chartContainer: ElementRef;

  private radius;
  private margin;
  private svgDimension = { width: 0, height: 0 };

  constructor(
    private activatedRoute: ActivatedRoute,
    private renderer2: Renderer2,
    @Inject(PLATFORM_ID) private platformId
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    let appState: AppState = this.activatedRoute.snapshot.data['estadisticas'];

    this.contractsCollection = appState.contractCollection;
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.initDimensions();
      this.drawPieGraphs();
    }
  }

  initDimensions(): void {
    let htmlElement: HTMLDivElement = this.chartContainer.nativeElement;
    this.svgDimension.width = htmlElement.getBoundingClientRect().width;
    this.svgDimension.height = htmlElement.getBoundingClientRect().height;
    console.log('inti dimension', this.svgDimension);

    this.margin = {
      left: 10,
      right: 10,
      top: 10,
      bottom: 10,
    };

    this.radius = this.svgDimension.width / 3;
  }

  drawPieGraphs(): void {
    let data = activityStats(this.contractsCollection);
    data = _.sortBy(data, 'value');

    const colors = COLOR_PALLETE.slice(0, data.length);
    const politicalPartiesKeys: string[] = data.map((d) => {
      let k = new CurrencyPipe('es').transform(
        d.value,
        'EUR',
        'symbol',
        '.2-2'
      );
      return `${k} | ${d.label}`;
    });

    var ordinalColorScale = d3
      .scaleOrdinal()
      .domain(politicalPartiesKeys)
      .range(colors);

    const svgElement = d3
      .select('#chartContainer')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr(
        'viewBox',
        `0 0 
         ${this.svgDimension.width}
         ${this.svgDimension.height}`
      );

    svgElement
      .append('g')
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', this.svgDimension.width)
      .attr('height', this.svgDimension.height)
      .attr('style', 'fill: #FAFAFA');

    const chartGroup = svgElement
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
      .attr('width', this.svgDimension.width)
      .attr('height', this.svgDimension.height);

    const pieMarginLeft = this.svgDimension.width / 2;
    const pieMarginTop = this.radius + this.margin.top;

    chartGroup.attr(
      'transform',
      `translate(${pieMarginLeft}, ${pieMarginTop})`
    );

    const arc = d3.arc().innerRadius(0).outerRadius(this.radius);

    const pieChart = d3
      .pie()
      .value((d) => d['value'] as any)
      .sort(null);

    const pie = pieChart(<any>data);

    chartGroup
      .selectAll('slice')
      .data(pie)
      .enter()
      .append('path')
      .attr('fill', (d, i) => colors[i])
      .attr('d', <any>arc); // Hack typing: https://stackoverflow.com/questions/35413072/compilation-errors-when-drawing-a-piechart-using-d3-js-typescript-and-angular/38021825

    // Legend

    var legendOrdinal = legendColor().scale(ordinalColorScale);

    const legendLeft = this.margin.left;
    const legendTop = this.margin.top * 2 + this.radius * 2;

    const legendGroup = svgElement
      .append('g')
      .attr('transform', `translate(${legendLeft},${legendTop})`)
      .attr('style', 'font-size:10px');

    legendGroup.call(legendOrdinal);
    //////////////////////////////
    // const colors = COLOR_PALLETE.slice(0, data.length);
    // const politicalPartiesKeys: string[] = data.map((d) => {
    //   let k = new CurrencyPipe('es').transform(
    //     d.value,
    //     'EUR',
    //     'symbol',
    //     '.2-2'
    //   );
    //   return `${k} | ${d.label}`;
    // });
    // var ordinalColorScale = d3
    //   .scaleOrdinal()
    //   .domain(politicalPartiesKeys)
    //   .range(colors);

    // const svg = d3
    //   .select('#activityChart')
    //   .append('svg')
    //   .attr('width', svgDimensions.width)
    //   .attr('height', svgDimensions.height)
    //   .attr('style', 'background-color: #FBFAF0');

    // const chartGroup = svg
    //   .append('g')
    //   .attr('transform', `translate(${margin.left}, ${margin.top})`)
    //   .attr('width', chartDimensions.width)
    //   .attr('height', chartDimensions.height);

    // const radius = Math.min(chartDimensions.width, chartDimensions.height) / 2;

    // chartGroup.attr('transform', `translate(${radius},${radius})`);

    // const arc = d3
    //   .arc()
    //   .innerRadius(radius / 1.7) // We want to have an arc with a propotional width
    //   .outerRadius(radius);

    // const pieChart = d3
    //   .pie()
    //   .startAngle(-90 * (Math.PI / 180))
    //   .endAngle(90 * (Math.PI / 180))
    //   .value((d) => d['value'] as any)
    //   .sort(null);

    // const pie = pieChart(<any>data);

    // chartGroup
    //   .selectAll('slice')
    //   .data(pie)
    //   .enter()
    //   .append('path')
    //   .attr('fill', (d, i) => colors[i])
    //   .attr('d', <any>arc); // Hack typing: https://stackoverflow.com/questions/35413072/compilation-errors-when-drawing-a-piechart-using-d3-js-typescript-and-angular/38021825

    // // Legend

    // var legendOrdinal = legendColor().scale(ordinalColorScale);

    // const legendLeft = margin.left;
    // const legendTop = radius + 5;

    // const legendGroup = svg
    //   .append('g')
    //   .attr('transform', `translate(${legendLeft},${legendTop})`);

    // legendGroup.call(legendOrdinal);
  }
}
