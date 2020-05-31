import * as d3 from 'd3';
import * as _ from 'underscore';
import { AppState } from '../core/app.state';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  OnInit,
  PLATFORM_ID,
  Inject,
  AfterViewInit,
} from '@angular/core';
import { Contract } from '../contracts/components/contract/contract.model';
import { activityStats } from './statistics/activity.stats';
import { COLOR_PALLETE } from '../core';
import { piecewise } from 'd3';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.scss'],
})
export class GraphicsComponent implements OnInit, AfterViewInit {
  contractsCollection: Contract[] = [];
  isBrowser = false;

  constructor(
    private activatedRoute: ActivatedRoute,
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
      this.drawPieGraphs();
    }
  }

  drawPieGraphs(): void {
    let data = activityStats(this.contractsCollection);
    console.log('GraphicsComponent -> drawPieGraphs -> data', data);

    const svgDimensions = {
      width: 500,
      height: 500,
    };

    const margin = {
      left: 5,
      right: 50,
      top: 10,
      bottom: 10,
    };

    const chartDimensions = {
      width: svgDimensions.width - margin.left - margin.right,
      height: svgDimensions.height - margin.bottom - margin.top,
    };

    const colors = COLOR_PALLETE.slice(0, data.length);

    let activityChartSvg = d3
      .select('#activityChart')
      .append('svg')
      .attr('width', svgDimensions.width)
      .attr('height', svgDimensions.height)
      .attr('style', 'background-color:#FAFAFA');

    const chartGroup = activityChartSvg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const radius = Math.min(chartDimensions.width, chartDimensions.height) / 2;

    chartGroup.attr('transform', `translate(${radius},${radius})`);

    const arc = d3
      .arc()
      .innerRadius(radius / 5) // We want to have an arc with a propotional width
      .outerRadius(radius);

    const pieChart = d3.pie();
    // .startAngle(-90 * (Math.PI / 180))
    // .endAngle(90 * (Math.PI / 180));

    const onlyMoneySpent = data.map((d) => d.value);
    console.log(
      'GraphicsComponent -> drawPieGraphs -> onlyMoneySpent',
      colors.length,
      onlyMoneySpent.length
    );

    const pie = pieChart(onlyMoneySpent);

    const arcs = chartGroup.selectAll('slice').data(pie).enter();

    arcs
      .append('path')
      .attr('d', <any>arc) // Hack typing: https://stackoverflow.com/questions/35413072/compilation-errors-when-drawing-a-piechart-using-d3-js-typescript-and-angular/38021825
      .attr('fill', (d, i) => colors[i]);
  }

  drawBarsGraphs(): void {
    let data = activityStats(this.contractsCollection);
    const svgDimensions = {
      width: 500,
      height: 500,
    };
    const margin = {
      left: 5,
      right: 50,
      top: 10,
      bottom: 10,
    };

    const chartDimensions = {
      width: svgDimensions.width - margin.left - margin.right,
      height: svgDimensions.height - margin.bottom - margin.top,
    };

    const maxValue = _.max(data, (x) => x.value).value;
    const maxActivityNumbers = data.length;
    const barPadding = 5;
    const barWidth =
      (chartDimensions.width - barPadding * maxActivityNumbers) /
      maxActivityNumbers;

    const activityColorScale = d3
      .scaleOrdinal(data.map((d) => d.label))
      .range(d3.schemeSet3);

    let activityChartSvg = d3
      .select('#activityChart')
      .append('svg')
      .attr('width', svgDimensions.width)
      .attr('height', svgDimensions.height)
      .attr('style', 'background-color:#000');

    // escalar
    const yScale = d3
      .scaleLinear()
      // dominio es de 0 hasta el maximo de valor de Y, + un margen para que no llene todo el svg
      .domain([0, maxValue])
      // los pixeles que voy a tener disponibles es desde 0 hasta 480
      .range([0, chartDimensions.height]);

    const chartGroup = activityChartSvg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    chartGroup
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('width', barWidth)
      .attr('height', (d) => yScale(d.value))
      .attr('x', (d, i) => i * (barWidth + barPadding))
      .attr('y', (d) => chartDimensions.height - yScale(d.value)) //empezar a pintar de 500px abajo hacia arriba
      .attr('fill', (d) => activityColorScale(d.label));
  }
}
