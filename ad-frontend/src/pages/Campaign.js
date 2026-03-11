import { useEffect, useState } from 'react';
import { getAllCampaigns } from '../services/campaignService';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

const countries = [
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'FR', name: 'France' },
    { code: 'ES', name: 'Spain' },
    { code: 'DE', name: 'Germany' },
];

const statuses = ['active', 'paused', 'ended'];

const Campaign = () => {
    const [campaigns, setCampaigns] = useState([])
    const [open, setOpen] = useState(false)
    const [filters, setFilters] = useState({
        advertiser: '',
        targetCountries: '',
        status: ''
    });

    const handleFilter = (e) => {
        const { name, value } = e.target
        setFilters(prev => ({ ...prev, [name]: value }))
    };

    useEffect(() => {
        const activeFilters = {
            ...(filters.advertiser?.trim() && { advertiser: filters.advertiser }),
            ...(filters.targetCountries?.length && { country: filters.targetCountries }),
            ...(filters.status && { status: filters.status }),
        }

        getAllCampaigns(activeFilters)
            .then(setCampaigns)
            .catch(console.error)
    }, [filters])

    return (
        <>
            <div>
                <button
                    onClick={() => setOpen(true)}
                    className="bg-sky-500/100 px-2.5 py-1.5 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-sky-700"
                >
                    Create Campaign
                </button>
                <Dialog open={open} onClose={setOpen} className="relative z-10">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                    />

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <DialogPanel
                                transition
                                className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                            >
                                <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <DialogTitle as="h3" className="text-base font-semibold text-white">
                                                Create a new campaign
                                            </DialogTitle>
                                            <div className="mt-2">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-700/25 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        onClick={() => setOpen(false)}
                                        className="inline-flex w-full justify-center rounded-md bg-sky-500/100 hover:bg-sky-700 px-3 py-2 text-sm font-semibold text-white hover:bg-red-400 sm:ml-3 sm:w-auto"
                                    >
                                        Create
                                    </button>
                                    <button
                                        type="button"
                                        data-autofocus
                                        onClick={() => setOpen(false)}
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20 sm:mt-0 sm:w-auto"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </DialogPanel>
                        </div>
                    </div>
                </Dialog>
            </div>

            <div className="relative w-full">
                <form className="flex flex-col md:flex-row w-full items-start my-2 gap-2">
                    <input
                        type="text"
                        name="advertiser"
                        value={filters.advertiser}
                        onChange={handleFilter}
                        placeholder="Advertiser"
                        className="px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium rounded-base ps-9 text-heading text-sm focus:ring-brand focus:border-brand block w-full placeholder:text-body"
                    />

                    <select
                        name="targetCountries"
                        value={filters.targetCountries}
                        onChange={handleFilter}
                        className="block w-full ps-9 pe-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs"
                    >
                        {countries.map((c) => (
                            <option key={c.code} value={c.code}>{c.name}</option>
                        ))}
                    </select>

                    <select
                        name="status"
                        value={filters.status}
                        onChange={handleFilter}
                        className="block w-full ps-9 pe-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs"
                    >
                        <option value="">All statuses</option>
                        {statuses.map((s) => (
                            <option key={s} value={s}>
                                {s.charAt(0).toUpperCase() + s.slice(1)}
                            </option>
                        ))}
                    </select>

                    <button onClick={handleFilter} className="inline-flex items-center text-white bg-sky-500/100 hover:bg-sky-700 box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
                        <svg className="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" /></svg>
                        Search
                    </button>
                </form>
            </div>

            <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">

                <table className="w-full text-sm text-left rtl:text-right text-body">
                    <thead className="text-sm text-body bg-gray-700 border-b rounded-base border-default">
                        <tr className="text-white">
                            <th scope="col" className="px-6 py-3 font-medium">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Advertiser
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Impressions
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Budget
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaigns.map((campaign) => (
                            <tr key={campaign._id} className="bg-neutral-primary border-b border-default">
                                <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                    {campaign.name}
                                </th>
                                <td className="px-6 py-4">
                                    {campaign.advertiser}
                                </td>
                                <td className="px-6 py-4 ">
                                    {
                                        campaign.status === 'active'
                                            ? <span className="inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 inset-ring inset-ring-green-500/20">{campaign.status}</span>
                                            : <span className="inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 inset-ring inset-ring-red-400/20">{campaign.status}</span>

                                    }
                                </td>
                                <td className="px-6 py-4">
                                    {campaign.impressionsServed}
                                </td>
                                <td className="px-6 py-4">
                                    {campaign.budget}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    );
};

export default Campaign;