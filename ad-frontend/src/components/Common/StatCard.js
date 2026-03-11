const StatCard = ({ title, value }) => {
    return (
        <>
            <div className="w-full max-w-sm bg-neutral-primary-soft p-6 border border-default rounded-base shadow-xs">
                <div>
                    <a href="#">
                        <h5 className="text-xl text-heading font-semibold tracking-tight">{title}</h5>
                    </a>
                    <div className="flex items-center justify-between mt-2">
                        <span className="text-3xl font-extrabold text-heading">{value}</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StatCard;