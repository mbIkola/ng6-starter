class TrafficChartController {

  constructor($scope) {
    'ngInject';

    this.name = 'traffic-chart';
    this.$scope = $scope;
    console.log("TrafficChart controller");

    function shade(color, weight) {
      return mix('#000000', color, weight);
    }

    function mix(color1, color2, weight) {
      // convert a decimal value to hex
      function d2h(d) {
        return d.toString(16);
      }

      // convert a hex value to decimal
      function h2d(h) {
        return parseInt(h, 16);
      }

      var result = "#";
      for (var i = 1; i < 7; i += 2) {
        var color1Part = h2d(color1.substr(i, 2));
        var color2Part = h2d(color2.substr(i, 2));
        var resultPart = d2h(Math.floor(color2Part + (color1Part - color2Part) * (weight / 100.0)));
        result += ('0' + resultPart).slice(-2);
      }
      return result;
    }

    //$scope.transparent = baConfig.theme.blur;
    var dashboardColors = {
      blueStone: '#005562',
      surfieGreen: '#0e8174',
      silverTree: '#6eba8c',
      gossip: '#b9f2a1',
      white: '#10c4b5',
    };

    $scope.doughnutData = {
      labels: [
        'Other',
        'Search engines',
        'Referral Traffic',
        'Direct Traffic',
        'Ad Campaigns'
      ],
      datasets: [
        {
          data: [2000, 1500, 1000, 1200, 400],
          backgroundColor: [
            dashboardColors.white,
            dashboardColors.blueStone,
            dashboardColors.surfieGreen,
            dashboardColors.silverTree,
            dashboardColors.gossip

          ],
          hoverBackgroundColor: [
            shade(dashboardColors.white, 15),
            shade(dashboardColors.blueStone, 15),
            shade(dashboardColors.surfieGreen, 15),
            shade(dashboardColors.silverTree, 15),
            shade(dashboardColors.gossip, 15)
          ],
          percentage: [87, 22, 70, 38, 17]
        }]
    }
  }

  $onInit() {
      var ctx = document.getElementById('chart-area').getContext('2d');
      this.chart = new Chart(ctx, {
        type: 'doughnut',
        data: this.$scope.doughnutData,
        options: {
          cutoutPercentage: 64,
          responsive: true,
          elements: {
            arc: {
              borderWidth: 0
            }
          }
        }
      });
  }
}

export default TrafficChartController;
