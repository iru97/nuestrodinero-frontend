import * as _ from 'underscore';
import { Subscription } from 'rxjs';
import { chartTypesToArray } from '../utils';
import { ActivatedRoute } from '@angular/router';
import { Stats } from './statistics/stats.model';
import { COLOR_PALLETE, CHART_TYPES, AppStoreService } from '../core';
import { pymeStats } from './statistics/pymes.stats';
import { AppState, defaultState } from '../core/app.state';
import { MatSelectChange } from '@angular/material/select';
import { activityStats } from './statistics/activity.stats';
import { isPlatformBrowser, CurrencyPipe } from '@angular/common';
import { OfferValues } from '../contracts/components/sellers-offers/offerValues.model';
import {
  Chart,
  ChartData,
  ChartOptions,
  ChartConfiguration,
  ChartTooltipItem,
  PositionType,
} from 'chart.js';
import {
  Component,
  OnInit,
  PLATFORM_ID,
  Inject,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('chartContainer') chartContainer: ElementRef;
  private subscription: Subscription;

  chartOptions: string[] = chartTypesToArray();
  offerValues: OfferValues[] = [];
  pieOptions: any = this.initOptions();
  appState: AppState;
  isBrowser = false;

  //pieChart
  stats: Stats[] = [];
  chartjsInstance: Chart;
  chartjsData: ChartData;
  chartjsOptions: ChartOptions;
  chartjsConfig: ChartConfiguration;

  constructor(
    private activatedRoute: ActivatedRoute,
    private appStore: AppStoreService,
    @Inject(PLATFORM_ID) private platformId
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.appState = this.activatedRoute.snapshot.data['estadisticas'];

    if (!this.appState) {
      this.appState = defaultState();
    }

    if (this.isBrowser) {
      this.subscription = this.appStore.appState$.subscribe((state) => {
        if (state.contractCollection.length) {
          this.appState = state;
          this.ngAfterViewInit();
        }
      });
    }

    this.offerValues = this.appState.contractCollection.reduce(
      (acc, curr) => acc.concat(curr.content.offerValues),
      []
    );
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.initData();
      this.initChartConfig();
      this.drawChart();
    }
  }

  changeChartType({ value }: MatSelectChange): void {
    let data: Stats[];

    switch (value) {
      case CHART_TYPES.ACTIVITY:
        let actStat = activityStats(this.appState.contractCollection);
        data = _.sortBy(actStat, 'value');
        break;
      case CHART_TYPES.PYMES:
        let pymeStat: Stats[] = pymeStats(this.appState.contractCollection);
        data = _.sortBy(pymeStat, 'value');
        break;
    }

    this.updateChart(data);
  }

  onResize(): void {
    this.chartjsConfig.options.legend.position = this.getLegendPosition();
    this.chartjsInstance.update();
  }

  private initChartConfig(): void {
    this.chartjsData = {
      labels: this.stats.map((x) => x.label),
      datasets: [
        {
          backgroundColor: COLOR_PALLETE.slice(0, this.stats.length),
          data: this.stats.map((x) => x.value),
        },
      ],
    };

    this.chartjsOptions = {
      maintainAspectRatio: false,
      tooltips: {
        callbacks: {
          title: this.tooltipTitle.bind(this),
          label: this.tooltipLabel.bind(this),
        },
      },
      legend: {
        align: 'start',
        position: this.getLegendPosition(),
      },
    };

    this.chartjsConfig = {
      data: this.chartjsData,
      options: this.chartjsOptions,
      type: 'pie',
    };
  }

  private tooltipLabel(tooltip: ChartTooltipItem, data: ChartData) {
    let { index } = tooltip;
    return data.labels[index];
  }

  private tooltipTitle(tooltip: ChartTooltipItem[], data: ChartData) {
    let { index } = tooltip[0];
    let cost = data.datasets[0].data[index];
    return new CurrencyPipe('es').transform(cost, 'EUR', 'symbol', '.2-2');
  }

  private drawChart(): void {
    this.chartjsInstance = new Chart('chart', this.chartjsConfig);
  }

  private initData(): void {
    // by default load activity stats
    let stats: Stats[] = activityStats(this.appState.contractCollection);
    let sortedStats: Stats[] = _.sortBy(stats, 'value');

    this.stats = [...sortedStats];
  }

  private updateChart(data: Stats[]) {
    this.chartjsData = {
      labels: data.map((x) => x.label),
      datasets: [
        {
          backgroundColor: COLOR_PALLETE.slice(0, data.length),
          data: data.map((x) => x.value),
        },
      ],
    };

    this.chartjsConfig.data = this.chartjsData;

    this.chartjsInstance.update();
  }

  private initOptions(): any {
    return {
      legend: {
        position: 'bottom',
      },
    };
  }

  private getLegendPosition(): PositionType {
    if (window.screen.width <= 600) {
      return 'top';
    } else {
      return 'left';
    }
  }

  ngOnDestroy(): void {
    this.subscription ? this.subscription.unsubscribe() : '';
  }
}
