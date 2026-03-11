import { useEffect, useState } from 'react';
import { getStats } from '../services/campaignService';
import StatCard from '../components/Common/StatCard';

const Dashboard = () => {
    const [stats, setStats] = useState([]);
    useEffect(() => {
        getStats()
            .then((res) => {
                setStats(res);
            })
            .catch(console.error)
            ;
    }, []);

    return (
        <>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-2">
                <StatCard title="Total Campaigns" value={stats.totalCampaings} />
                <StatCard title="Active Campaigns" value={stats.activeCampaings} />
                <StatCard title="Total Impressions" value={stats.totalImpressions} />
            </div>

            <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">

                <table className="w-full text-sm text-left rtl:text-right text-body">
                    <thead className="text-sm text-body bg-gray-700 border-b rounded-base border-default">
                        <tr className="text-white">
                            <th scope="col" className="px-6 py-3 font-medium">
                                Advertiser
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Total Campaigns
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Active Campaigns
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Total Impressions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats.topAdvertisers?.map((advertiser) => (
                            <tr key={advertiser._id} className="bg-neutral-primary border-b border-default">
                                <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                    {advertiser._id}
                                </th>
                                <td className="px-6 py-4">
                                    {advertiser.totalCampaigns}
                                </td>
                                <td className="px-6 py-4">
                                    {advertiser.activeCampaigns}
                                </td>
                                <td className="px-6 py-4">
                                    {advertiser.totalImpressions}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Dashboard;