import React from 'react'
import Switch from 'react-switch'
import { Filter, Filters, FilterLabel, FilterValue } from './pages/styles'
import Slider from '../../components/Slider'
import DateInput from '../../components/DateInput'
import Select, { SingleOption } from '../../components/Select'
import colors from '../../constants/colors'
import { STOCK_DATA_INTERVAL_TYPES, INTRADAY_INTERVALS } from './pages/SingleStockPage'
import { StockValue } from './types/StockInfo'

interface Props {
    type: SingleOption;
    setType: React.Dispatch<React.SetStateAction<SingleOption>>,
    graphComponentType: SingleOption;
    setGraphComponentType: React.Dispatch<React.SetStateAction<SingleOption>>,
    graphType: SingleOption;
    setGraphType: React.Dispatch<React.SetStateAction<SingleOption>>,
    bucketSize: number;
    setBucketSize: React.Dispatch<React.SetStateAction<number>>;
    startDate: string;
    endDate: string;
    setStartDate: React.Dispatch<React.SetStateAction<string>>;
    setEndDate: React.Dispatch<React.SetStateAction<string>>;
    showAverage: boolean;
    toggleAverage: (() => void);
    data: StockValue[];
    intradayInterval: SingleOption;
    setIntradayInterval: React.Dispatch<React.SetStateAction<SingleOption>>
}
const SinglePageFilters: React.FunctionComponent<Props> = (props) => {
    const {
        type,
        setType,
        graphComponentType,
        setGraphComponentType,
        graphType,
        setGraphType,
        setBucketSize,
        showAverage,
        toggleAverage,
        data,
        bucketSize,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        intradayInterval,
        setIntradayInterval
    } = props
    return (
        <Filters>
            <Filter>
                <FilterLabel>Time frame</FilterLabel>
                <FilterValue>
                    <Select
                        value={type}
                        onChange={(value) => setType(value)}
                        options={Object.keys(STOCK_DATA_INTERVAL_TYPES).map(key => STOCK_DATA_INTERVAL_TYPES[key])}
                    />
                </FilterValue>
            </Filter>
            {type === STOCK_DATA_INTERVAL_TYPES.Intraday && <Filter>
                <FilterLabel>Time interval</FilterLabel>
                <FilterValue>
                    <Select
                        value={intradayInterval}
                        onChange={(value) => setIntradayInterval(value)}
                        options={Object.keys(INTRADAY_INTERVALS).map(key => INTRADAY_INTERVALS[key])}
                    />
                </FilterValue>

            </Filter>
            }
            <Filter>
                <FilterLabel>Component type</FilterLabel>
                <FilterValue>
                    <Select
                        value={graphComponentType}
                        onChange={(value) => setGraphComponentType(value)}
                        options={[
                            {
                                label: 'Plotify',
                                value: 'plotify'
                            },
                            {
                                label: 'D3',
                                value: 'd3'
                            }
                        ]}
                    />
                </FilterValue>
            </Filter>
            {graphComponentType.value === 'd3' && (
                <Filter>
                    <FilterLabel>Graph type</FilterLabel>
                    <FilterValue>
                        <Select
                            value={graphType}
                            onChange={(value) => setGraphType(value)}
                            options={[
                                {
                                    label: 'Candlesticks',
                                    value: 'candlesticks'
                                },
                                {
                                    label: 'Line',
                                    value: 'line'
                                }
                            ]}
                        />
                    </FilterValue>
                </Filter>)}
            <Filter>
                <FilterLabel>Show average</FilterLabel>
                <FilterValue>
                    <Switch checked={showAverage} onChange={toggleAverage} onColor={colors.primary} />
                </FilterValue>
            </Filter>
            {showAverage && (
                <Filter>
                    <FilterLabel>Average bucket size</FilterLabel>
                    <FilterValue>
                        <Slider value={bucketSize} min={2} max={data.length - 1} onChange={(value) => { setBucketSize(value) }} />
                    </FilterValue>
                </Filter>)}
            <Filter>
                <FilterLabel>Start date</FilterLabel>
                <FilterValue><DateInput value={startDate} onChange={setStartDate} /></FilterValue>
            </Filter>
            <Filter>
                <FilterLabel>End date</FilterLabel>
                <FilterValue><DateInput value={endDate} onChange={setEndDate} /></FilterValue>
            </Filter>
        </Filters>
    )
}
export default SinglePageFilters