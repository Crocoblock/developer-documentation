# Price Filter Based on Selected Date Range

The necessity of this case is due to the fact that our pricing configurations are diverse and depend on the number of selected days,  
the days of the week selected, as well as the specific period (season), which may also include additional pricing rules.

Creating a filter based on the apartment price is not a problem by itself, but the result of such filtering will not be accurate  
in cases where advanced pricing configurations are used.

![Default Apartment Price Option](/06-jet-booking/02-common-use-cases/05-price-filter-based-on-selected-date-range/assets/default-apartment-price-option.png "Default apartment price setting")

To begin with, we need to create a date range filter. This can be done using [this article](https://crocoblock.com/knowledge-base/jetsmartfilters/how-to-apply-jetsmartfilters-to-your-booking-website/).

Next, we need to create a price range filter. This will be done using the [Range Filter](https://crocoblock.com/widgets/range-filter/).  
You can find more details about this filter type in [this article](https://crocoblock.com/knowledge-base/jetsmartfilters/jetsmartfilters-how-to-create-range-filter/).  
The general settings of the filter can be arbitrary, depending on what values are planned to be filtered.  
However, for further processing and proper functionality, it is necessary to set the `Query Variable` parameter.  
In this parameter, you can specify any unique key. This key will be required to intercept the filtering request and modify it.  
For example, the `_seasonal_price` key will be used.

![Query Variable Option Value Kay](/06-jet-booking/02-common-use-cases/05-price-filter-based-on-selected-date-range/assets/query-variable-option-value-key.png "Query Variable Option Key")

Add the implemented filtering logic to the `functions.php` file of your child theme, or use any other convenient method.


```php
add_filter( 'jet-smart-filters/query/final-query', function( $query ) {

    if ( empty( $query['meta_query'] ) ) {
        return $query;
    }
    
    foreach ( $query['meta_query'] as $index => $meta_query ) {
        if ( isset( $meta_query['key'] ) && '_seasonal_price' === $meta_query['key'] ) { // `_seasonal_price` unique key from Query Variable filter option.
            $excluded = jet_abaf_get_excluded_apartments( $meta_query['value'] );
    
            unset( $query['meta_query'][ $index ] );
    
            if ( isset( $query['post__not_in'] ) ) {
                $query['post__not_in'] = array_merge( $query['post__not_in'], $excluded );
            } else {
                $query['post__not_in'] = $excluded;
            }
        }
    }

    return $query;
    
}, 1, 20 );

function jet_abaf_get_excluded_apartments( $range_value ) {

    if ( empty( $range_value ) ) {
        return [];
    }

    $store_type     = jet_abaf()->settings->get( 'filters_store_type' );
    $searched_dates = jet_abaf()->stores->get_store( $store_type )->get( 'searched_dates' );

    if ( ! trim( $searched_dates ) ) {
        $dates = [
            strtotime( 'today' ) + 1,
            strtotime( 'today' ) + 12 * HOUR_IN_SECONDS,
        ];
    } else {
        $dates = explode( ' - ', $searched_dates );
    }

    $posts = jet_abaf()->tools->get_booking_posts();

    if ( empty( $posts ) ) {
        return [];
    }

    $excluded_posts = [];

    foreach ( $posts as $post ) {
        $period          = jet_abaf()->tools->get_booking_period( $dates[0], $dates[1], $post->ID );
        $interval        = jet_abaf()->tools->get_booking_period_interval( $dates[0], $dates[1], $post->ID );
        $price           = new \JET_ABAF\Price( $post->ID );
        $seasonal_prices = $price->seasonal_price->get_price();
        $period_prices   = [];

        foreach ( $period as $day ) {
            $pricing = [
                'price'         => $price->get_default_price(),
                'price_rates'   => $price->rates_price->get_rates(),
                'weekend_price' => $price->weekend_price->get_price(),
            ];

            if ( ! empty( $seasonal_prices ) ) {
                foreach ( $seasonal_prices as $seasonal_price ) {
                    if ( $day->getTimestamp() >= $seasonal_price['start'] && $day->getTimestamp() <= $seasonal_price['end'] ) {
                        $pricing = $seasonal_price;
                    }
                }
            }

            $weekend_price = $pricing['weekend_price'][ $day->format( 'w' ) ] ?? [];
            $day_price     = ! empty( $weekend_price ) ? $weekend_price : $pricing['price'];

            if ( ! empty( $pricing['price_rates'] ) ) {
                foreach ( $pricing['price_rates'] as $price_rate ) {
                    if ( $interval->days >= intval( $price_rate['duration'] ) ) {
                        $day_price = $price_rate['value'];
                    }
                }
            }

            $period_prices[] = floatval( $day_price );
        }

        if ( min( $period_prices ) >= $range_value[0] && min( $period_prices ) <= $range_value[1] ) {
            continue;
        }

        $excluded_posts[] = $post->ID;
    }

    return $excluded_posts;

}
```
_(the code is added to the gist https://gist.github.com/Crocoblock/f098047c348aa83a23f1d37d1619e455)_

In this code snippet, we intercept the filter query hook to handle our custom case.  
Within this hook, we check for the `Query Variable` key that we previously set for the filter,  
so the logic is executed only under the required conditions.  

During filtering, we retrieve apartments that do not meet our parameters and exclude them from the query.

As for apartments that don’t meet the parameters — the selected date range is passed,  
and within that range, we get the minimum price for all available apartments.  
This minimum price is compared against the filter values. If the price does not fall within the filter's range,  
the apartment is considered irrelevant and will be excluded from the query.

> If you use the Range Filter (price range) with the date range filter, the filtering will work without issues,  
> but the date period is required for this logic to execute, so if not provided, today’s date will be used as the period.

> The Range Filter can work independently of the date range filter — this was partially covered above.  
> However, there is one more nuance: if a date range filter was used earlier but the page has since been refreshed,  
> the dates are still saved in cookies or session storage, depending on the configuration.  
> The logic of this script relies on retrieving the dates from these sources,  
> so if you use the price range filter without applying the date range again,  
> the stored date range will still be applied. This might lead to unexpected query results.  
> For this reason, it’s recommended to follow a sequence where you first filter by date, and then by price.

