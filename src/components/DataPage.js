import { useContext } from 'react';
import Layout from '../Layout';
import Chart from './Chart';
import { DataContext } from '../Context';

export default function DataPage() {
    const data = useContext(DataContext);
    const locations = Object.keys(data);
    const chartElements = locations.filter(item => item != "national").map(location => {
        return <Chart location={location} />
    })

    return (
        <Layout>
            <div>
                <h1>Singapore PSI Data</h1>
                {chartElements}
            </div>
        </Layout>
    )
}