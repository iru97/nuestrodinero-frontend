import * as d3 from 'd3';
import * as _ from 'underscore';
import { legendColor } from 'd3-svg-legend';
import { AppState } from '../core/app.state';
import { chartTypesToArray } from '../utils';
import { ActivatedRoute } from '@angular/router';
import { Stats } from './statistics/stats.model';
import { COLOR_PALLETE, CHART_TYPES } from '../core';
import { pymeStats } from './statistics/pymes.stats';
import { MatSelectChange } from '@angular/material/select';
import { activityStats } from './statistics/activity.stats';
import { isPlatformBrowser, CurrencyPipe } from '@angular/common';
import { Contract } from '../contracts/components/contract/contract.model';
import { OfferValues } from '../contracts/components/sellers-offers/offerValues.model';
import {
  Component,
  OnInit,
  PLATFORM_ID,
  Inject,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit, AfterViewInit {
  @ViewChild('chartContainer') chartContainer: ElementRef;
  chartOptions: string[] = chartTypesToArray();
  offerValues: OfferValues[] = [];
  contractCollection: Contract[] = [];
  chartData: Stats[] = [];
  isBrowser = false;

  private radius;
  private margin;
  private svgDimension = { width: 0, height: 0 };

  constructor(
    private activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    let appState: AppState = this.activatedRoute.snapshot.data['estadisticas'];

    this.offerValues = appState.contractCollection.reduce(
      (acc, curr) => acc.concat(curr.content.offerValues),
      []
    );

    this.contractCollection = appState.contractCollection;
    //this.chartData = _.sortBy(activityStats(this.contractCollection), 'value');
    let pymeStatsa: Stats[] = pymeStats(this.contractCollection).map((p) => {
      p.label = `${p.numberOfCompanies} ${p.label}`;
      return {
        label: p.label,
        value: p.value,
      };
    });

    this.chartData = _.sortBy(pymeStatsa, 'value');
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.initSvgDimensions();
      this.drawCharts();
    }
  }

  changeChartType({ value }: MatSelectChange): void {
    switch (value) {
      case CHART_TYPES.ACTIVITY:
        this.chartData = _.sortBy(
          activityStats(this.contractCollection),
          'value'
        );
        break;
      case CHART_TYPES.PYMES:
        let pymeStatsa: Stats[] = pymeStats(this.contractCollection).map(
          (p) => {
            p.label = `${p.numberOfCompanies} ${p.label}`;
            return {
              label: p.label,
              value: p.value,
            };
          }
        );

        //this.chartData = _.sortBy(pymeStatsa, 'value');
        console.log(
          'ChartsComponent -> changeChartType -> this.chartData',
          _.sortBy(pymeStatsa, 'value')
        );
        break;
    }

    this.updateChart(this.chartData);
  }

  private updateChart(data: Stats[]): void {
    const arc = d3.arc().innerRadius(0).outerRadius(this.radius);
    const pieChart = d3
      .pie()
      .value((d) => d['value'] as any)
      .sort(null);

    d3.selectAll('path')
      .data(pieChart(<any>data))
      .transition()
      .duration(500)
      .attr('d', <any>arc);
  }

  // also is called on window resize
  initSvgDimensions(): void {
    let htmlElement: HTMLDivElement = this.chartContainer.nativeElement;
    this.svgDimension.width = htmlElement.getBoundingClientRect().width;

    this.margin = {
      left: 10,
      right: 10,
      top: 10,
      bottom: 10,
    };

    this.radius = this.svgDimension.width / 3;
    this.svgDimension.height = this.calculateSvgHeight();
  }

  private drawCharts(): void {
    const colors = COLOR_PALLETE.slice(0, this.chartData.length);
    const ordinalColorScale = this.createColorScate(this.chartData, colors);
    const svgLayout = this.drawSvgLayout();
    const pieChartGroup = this.drawPieChartLayout(svgLayout);
    const arc = d3.arc().innerRadius(0).outerRadius(this.radius);

    const pieChart = d3
      .pie()
      .value((d) => d['value'] as any)
      .sort(null);

    const pie = pieChart(<any>this.chartData);

    pieChartGroup
      .selectAll('slice')
      .data(pie)
      .enter()
      .append('path')
      .attr('fill', (d, i) => colors[i])
      .attr('d', <any>arc); // Hack typing: https://stackoverflow.com/questions/35413072/compilation-errors-when-drawing-a-piechart-using-d3-js-typescript-and-angular/38021825

    this.drawLegend(svgLayout, ordinalColorScale);
  }

  private drawSvgLayout() {
    let layout = d3
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

    layout
      .append('g')
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', this.svgDimension.width)
      .attr('height', this.svgDimension.height)
      .attr('style', 'fill: #FAFAFA');

    return layout;
  }

  private drawPieChartLayout(svgLayout) {
    const pieMarginLeft = this.svgDimension.width / 2;
    const pieMarginTop = this.radius + this.margin.top;
    return svgLayout
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
      .attr('width', this.svgDimension.width)
      .attr('height', this.svgDimension.height)
      .attr('transform', `translate(${pieMarginLeft}, ${pieMarginTop})`);
  }

  private drawLegend(svgLayout, ordinalColorScale): void {
    var legendOrdinal = legendColor().scale(ordinalColorScale);

    const legendLeft = 0;
    const legendTop = this.margin.top * 2 + this.radius * 2;

    const legendGroup = svgLayout
      .append('g')
      .attr('transform', `translate(${legendLeft},${legendTop})`)
      .attr('style', 'font-size:10px');

    legendGroup.call(legendOrdinal);
  }

  private createColorScate(data, colors) {
    const legendKeys: string[] = data.map((d) => {
      let cost = new CurrencyPipe('es').transform(
        d.value,
        'EUR',
        'symbol',
        '.2-2'
      );
      return `${cost} | ${d.label}`;
    });

    return d3.scaleOrdinal().domain(legendKeys).range(colors);
  }

  private calculateSvgHeight(): number {
    // returns the height in pixels by adding
    // piechart diameter + topmargin + 20px per each item in the pie
    let LINE_HEIGHT = 20;

    return (
      this.radius * 2 + this.margin.top + this.chartData.length * LINE_HEIGHT
    );
  }
}
