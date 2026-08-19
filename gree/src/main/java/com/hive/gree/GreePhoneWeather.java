package com.hive.gree;

import androidx.annotation.StringRes;

final class GreePhoneWeather {

    static final class DayForecast {
        @StringRes final int labelRes;
        @StringRes final int conditionRes;
        final int lowTemp;
        final int highTemp;

        DayForecast(int labelRes, int conditionRes, int lowTemp, int highTemp) {
            this.labelRes = labelRes;
            this.conditionRes = conditionRes;
            this.lowTemp = lowTemp;
            this.highTemp = highTemp;
        }
    }

    static final DayForecast[] FORECAST_5_DAYS = {
            new DayForecast(R.string.gree_weather_day_today, R.string.gree_weather_cond_1, 26, 31),
            new DayForecast(R.string.gree_weather_day_thu, R.string.gree_weather_cond_2, 25, 29),
            new DayForecast(R.string.gree_weather_day_fri, R.string.gree_weather_cond_3, 26, 31),
            new DayForecast(R.string.gree_weather_day_sat, R.string.gree_weather_cond_4, 27, 32),
            new DayForecast(R.string.gree_weather_day_sun, R.string.gree_weather_cond_5, 27, 33),
    };

    private GreePhoneWeather() {
    }
}
